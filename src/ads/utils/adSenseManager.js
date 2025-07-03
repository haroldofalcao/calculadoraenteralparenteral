// Utilitário para gerenciar AdSense de forma robusta e evitar conflitos
class AdSenseManager {
	constructor() {
		this.autoAdsInitialized = false
		this.loadedAds = new Set()
		this.initTimeout = null
		this.autoAdsEnabled = true // Habilitar anúncios automáticos
	}

	// Verificar se Auto Ads já foi inicializado globalmente
	isAutoAdsAlreadyInitialized() {
		return (
			window.adsbygoogle &&
			window.adsbygoogle.loaded === true &&
			window.adsbygoogle.push.name === 'push'
		)
	}

	// Inicializar Auto Ads apenas uma vez com verificações robustas
	initializeAutoAds() {
		if (this.autoAdsInitialized || typeof window === 'undefined') return

		console.log(
			'✅ Inicializando Auto Ads - anúncios automáticos habilitados',
		)

		// Verificar se já foi inicializado por outro script
		if (this.isAutoAdsAlreadyInitialized()) {
			this.autoAdsInitialized = true
			console.log('Auto Ads already initialized by external script')
			return
		}

		try {
			// Garantir que adsbygoogle existe
			window.adsbygoogle = window.adsbygoogle || []

			// Verificar se enable_page_level_ads já foi configurado
			const hasPageLevelAds = window.adsbygoogle.some(
				(item) =>
					item && typeof item === 'object' && item.enable_page_level_ads,
			)

			if (hasPageLevelAds) {
				console.log('Auto Ads already configured')
				this.autoAdsInitialized = true
				return
			}

			window.adsbygoogle.push({
				google_ad_client: 'ca-pub-2235031118321497',
				enable_page_level_ads: true, // Habilitando anúncios automáticos
			})

			this.autoAdsInitialized = true
			console.log('✅ Auto Ads initialized successfully - automáticos habilitados')
		} catch (error) {
			console.warn('Auto Ads initialization error:', error.message)
			this.autoAdsInitialized = true // Marcar como inicializado para evitar retry
		}
	}

	// Carregar anúncio individual com verificações avançadas
	loadAd(adElement, adSlot) {
		if (typeof window === 'undefined' || !window.adsbygoogle) return

		// Verificar se a página está marcada como sem anúncios
		const noAdsElement = document.querySelector('[data-no-ads="true"]')
		if (noAdsElement) {
			console.log(`Skipping ad load due to no-ads marker: ${adSlot}`)
			return
		}

		// Verificar se há conteúdo skeleton/placeholder ativo com timeout
		const hasSkeletons = () => {
			const skeletonElements = document.querySelectorAll(
				'.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton',
			)
			
			if (skeletonElements.length > 0) {
				// Verificar se skeletons estão realmente visíveis
				const visibleSkeletons = Array.from(skeletonElements).filter(el => {
					const style = window.getComputedStyle(el)
					return style.display !== 'none' && style.visibility !== 'hidden'
				})
				
				if (visibleSkeletons.length === 0) {
					return false // Skeletons não visíveis, permitir anúncios
				}
				
				// Permitir um tempo máximo para carregamento
				const pageLoadTime = performance.now()
				if (pageLoadTime > 12000) { // 12 segundos
					console.warn(`🚨 Skeletons detectados após 12s para anúncio ${adSlot} - liberando forçadamente`)
					return false // Permitir anúncios mesmo com skeletons
				}
				
				console.log(`⏳ Skeletons visíveis detectados para anúncio ${adSlot} - aguardando carregamento`)
				return true
			}
			return false
		}
		
		if (hasSkeletons()) {
			console.log(`⏳ Skipping ad load due to skeleton content: ${adSlot}`)
			return
		}

		// Verificar se a página tem conteúdo suficiente
		const mainContent = document.querySelector('main')
		if (mainContent) {
			const textContent = mainContent.innerText || ''
			const contentLength = textContent.replace(/\s+/g, ' ').trim().length

			if (contentLength < 300) {
				console.log(
					`Skipping ad load due to insufficient content (${contentLength} chars): ${adSlot}`,
				)
				return
			}
		}

		// Criar ID único para o anúncio
		const adId = `${adSlot}-${adElement?.getAttribute?.('data-ad-slot') || Math.random()}`

		// Evitar carregar o mesmo anúncio múltiplas vezes
		if (this.loadedAds.has(adId)) {
			console.log(`Ad already loaded: ${adSlot}`)
			return
		}

		try {
			// Verificar se o elemento já tem anúncio renderizado
			const hasIframe = adElement?.querySelector?.('iframe[id*="google_ads"]')
			const hasInsContent = adElement?.querySelector?.(
				'ins.adsbygoogle[data-ad-status]',
			)

			if (hasIframe || hasInsContent) {
				console.log(`Ad already rendered in element: ${adSlot}`)
				this.loadedAds.add(adId)
				return
			}

			// Verificar se o elemento ins tem a classe correta
			const insElement = adElement?.querySelector?.('ins.adsbygoogle')
			if (!insElement) {
				console.warn(`No adsbygoogle ins element found for: ${adSlot}`)
				return
			}

			// Verificar se já tem data-ad-status (já processado)
			if (insElement.getAttribute('data-ad-status')) {
				console.log(`Ad element already processed: ${adSlot}`)
				this.loadedAds.add(adId)
				return
			}

			// Carregar o anúncio
			window.adsbygoogle.push({})
			this.loadedAds.add(adId)
			console.log(`Ad push successful: ${adSlot}`)
		} catch (error) {
			console.error(`Error loading ad ${adSlot}:`, error.message)
		}
	}

	// Limpar anúncios carregados (útil para desenvolvimento)
	clearLoadedAds() {
		this.loadedAds.clear()
		console.log('Loaded ads cache cleared')
	}

	// Reset completo do manager (útil para desenvolvimento)
	reset() {
		this.autoAdsInitialized = false
		this.loadedAds.clear()
		if (this.initTimeout) {
			clearTimeout(this.initTimeout)
			this.initTimeout = null
		}
		console.log('AdSense manager reset')
	}

	// Verificar status atual
	getStatus() {
		return {
			autoAdsInitialized: this.autoAdsInitialized,
			loadedAdsCount: this.loadedAds.size,
			adsbygoogleExists: typeof window !== 'undefined' && !!window.adsbygoogle,
		}
	}

	// Verificar se anúncios automáticos estão habilitados
	areAutoAdsEnabled() {
		return this.autoAdsEnabled
	}
}

// Instância global
export const adSenseManager = new AdSenseManager()

// Inicializar com cuidado para evitar conflitos
if (typeof window !== 'undefined') {
	// Função de inicialização com retry e verificações
	const safeInitialize = () => {
		// Aguardar que o script do AdSense seja carregado
		if (!window.adsbygoogle) {
			setTimeout(safeInitialize, 100)
			return
		}

		// Aguardar um pouco mais para garantir que não há conflitos
		setTimeout(() => {
			adSenseManager.initializeAutoAds()
		}, 1500)
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', safeInitialize)
	} else {
		safeInitialize()
	}

	// Limpeza para desenvolvimento (Hot Module Replacement)
	if (import.meta.hot) {
		import.meta.hot.dispose(() => {
			adSenseManager.clearLoadedAds()
		})
	}
}

export default adSenseManager

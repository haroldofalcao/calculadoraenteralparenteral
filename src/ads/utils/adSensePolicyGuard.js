// Sistema de proteção avançado contra violações de políticas AdSense
// Este módulo monitora continuamente a página e bloqueia anúncios quando necessário

class AdSensePolicyGuard {
	constructor() {
		this.isMonitoring = false
		this.violationCallbacks = []
		this.lastValidation = null
		this.observer = null
	}

	// Iniciar monitoramento contínuo
	startMonitoring() {
		if (this.isMonitoring) return

		this.isMonitoring = true
		console.log('🛡️ AdSense Policy Guard ativado')

		// Validação inicial
		this.performCheck()

		// Observer para mudanças no DOM
		this.observer = new MutationObserver(() => {
			// Debounce para evitar muitas chamadas
			clearTimeout(this.checkTimeout)
			this.checkTimeout = setTimeout(() => {
				this.performCheck()
			}, 1000)
		})

		this.observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['class', 'style', 'data-no-ads'],
		})

		// Verificação periódica
		this.interval = setInterval(() => {
			this.performCheck()
		}, 5000)

		// Monitorar mudanças de URL (SPA)
		this.setupRouteMonitoring()
	}

	// Parar monitoramento
	stopMonitoring() {
		this.isMonitoring = false

		if (this.observer) {
			this.observer.disconnect()
			this.observer = null
		}

		if (this.interval) {
			clearInterval(this.interval)
			this.interval = null
		}

		if (this.checkTimeout) {
			clearTimeout(this.checkTimeout)
		}

		console.log('🛡️ AdSense Policy Guard desativado')
	}

	// Realizar verificação de políticas
	performCheck() {
		const validation = this.validatePage()

		// Se mudou o status de validação
		if (this.lastValidation?.isValid !== validation.isValid) {
			this.lastValidation = validation

			if (!validation.isValid) {
				console.warn('🚨 Violação de política detectada!')
				console.warn('Issues:', validation.issues)
				this.blockAds()
				this.notifyViolation(validation)
			} else {
				console.log('✅ Página em compliance - anúncios permitidos')
				this.allowAds()
			}
		}

		return validation
	}

	// Validar página atual
	validatePage() {
		// Verificar se é um crawler/bot - Para eles, nunca bloqueie
		const userAgent = navigator.userAgent.toLowerCase();
		const isCrawler = /bot|crawl|spider|googlebot|bingbot|yandex|baidu|slurp|duckduckbot/i.test(userAgent);
		
		// Se for um crawler, retornar sempre válido para permitir indexação
		if (isCrawler) {
			return {
				isValid: true,
				issues: [],
				timestamp: Date.now()
			};
		}
		
		const results = {
			isValid: true,
			issues: [],
			timestamp: Date.now(),
		}

		// 1. Verificar conteúdo de loading/skeleton
		const loadingElements = document.querySelectorAll(
			'.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton, ' +
				'.shimmer, .pulse, [data-loading="true"]',
		)

		if (loadingElements.length > 0) {
			results.isValid = false
			results.issues.push(
				`Página em carregamento: ${loadingElements.length} elementos encontrados`,
			)
		}

		// 2. Verificar conteúdo insuficiente
		const mainContent = document.querySelector('main')
		if (mainContent) {
			const textContent = mainContent.innerText || ''
			const contentLength = textContent.replace(/\s+/g, ' ').trim().length

			if (contentLength < 500) {
				results.isValid = false
				results.issues.push(
					`Conteúdo insuficiente: ${contentLength} caracteres`,
				)
			}

			// Verificar conteúdo de baixo valor
			const lowValuePatterns = [
				/lorem\s+ipsum/i,
				/texto\s+de\s+exemplo/i,
				/placeholder/i,
				/loading\.{3}/i,
				/carregando\.{3}/i,
				/aguarde/i,
				/em\s+construção/i,
			]

			if (lowValuePatterns.some((pattern) => pattern.test(textContent))) {
				results.isValid = false
				results.issues.push('Conteúdo de baixo valor detectado')
			}
		} else {
			results.isValid = false
			results.issues.push('Elemento <main> não encontrado')
		}

		// 3. Verificar páginas de erro/navegação
		const pathname = window.location.pathname.toLowerCase()
		const invalidPatterns = [
			/\/404/,
			/\/error/,
			/\/maintenance/,
			/\/coming-?soon/,
			/\/under-?construction/,
			/\/redirect/,
			/\/exit/,
			/\/thank-?you/,
			/\/confirmation/,
			/\/loading/,
		]

		if (invalidPatterns.some((pattern) => pattern.test(pathname))) {
			results.isValid = false
			results.issues.push(`URL inadequada: ${pathname}`)
		}

		// 4. Verificar marcadores de no-ads
		if (document.querySelector('[data-no-ads="true"]')) {
			results.isValid = false
			results.issues.push('Página marcada como data-no-ads')
		}

		// 5. Verificar modais/overlays bloqueando conteúdo
		const blockingElements = document.querySelectorAll(
			'.modal.show, .overlay:not([style*="none"]), .popup:not(.d-none)',
		)

		if (blockingElements.length > 0) {
			results.isValid = false
			results.issues.push(
				`${blockingElements.length} elementos bloqueando o conteúdo`,
			)
		}

		return results
	}

	// Bloquear anúncios
	blockAds() {
		// Não aplicar o atributo ao body inteiro para não prejudicar indexação
		// Em vez disso, aplicar apenas aos contêineres de anúncios
		const adContainers = document.querySelectorAll('.ad-container, .adsbygoogle-container')
		adContainers.forEach((container) => {
			container.setAttribute('data-ads-blocked', 'true')
		})

		// Ocultar anúncios existentes
		const adElements = document.querySelectorAll('.adsbygoogle')
		adElements.forEach((ad) => {
			ad.style.display = 'none'
			ad.setAttribute('data-policy-blocked', 'true')
		})

		// Evitar carregamento de novos anúncios
		if (window.adsbygoogle) {
			window.adsbygoogle.blocked = true
		}

		// Log para depuração em desenvolvimento
		if (!import.meta.env.PROD) {
			console.debug('🚫 Bloqueio de anúncios aplicado apenas aos contêineres de anúncios')
		}
	}

	// Permitir anúncios
	allowAds() {
		// Remover bloqueio
		document.body.removeAttribute('data-ads-blocked')

		// Restaurar anúncios que foram bloqueados por política
		const blockedAds = document.querySelectorAll('[data-policy-blocked="true"]')
		blockedAds.forEach((ad) => {
			ad.style.display = ''
			ad.removeAttribute('data-policy-blocked')
		})
		
		// Limpar também qualquer contêiner marcado
		const blockedContainers = document.querySelectorAll('[data-ads-blocked="true"]')
		blockedContainers.forEach((container) => {
			container.removeAttribute('data-ads-blocked')
		})

		// Permitir carregamento de novos anúncios
		if (window.adsbygoogle) {
			delete window.adsbygoogle.blocked
		}
	}

	// Configurar monitoramento de rotas (SPA)
	setupRouteMonitoring() {
		let currentPath = window.location.pathname

		// Observer para mudanças de URL
		const checkUrlChange = () => {
			if (window.location.pathname !== currentPath) {
				currentPath = window.location.pathname
				console.log('🔄 Mudança de rota detectada:', currentPath)

				// Aguardar um pouco para o conteúdo carregar
				setTimeout(() => {
					this.performCheck()
				}, 1500)
			}
		}

		// Monitorar pushState/replaceState
		const originalPushState = history.pushState
		const originalReplaceState = history.replaceState

		history.pushState = function (...args) {
			originalPushState.apply(this, args)
			setTimeout(checkUrlChange, 100)
		}

		history.replaceState = function (...args) {
			originalReplaceState.apply(this, args)
			setTimeout(checkUrlChange, 100)
		}

		// Monitorar popstate
		window.addEventListener('popstate', () => {
			setTimeout(checkUrlChange, 100)
		})
	}

	// Registrar callback para violações
	onViolation(callback) {
		this.violationCallbacks.push(callback)
	}

	// Notificar violações
	notifyViolation(validation) {
		this.violationCallbacks.forEach((callback) => {
			try {
				callback(validation)
			} catch (error) {
				console.error('Erro em callback de violação:', error)
			}
		})
	}

	// Obter status atual
	getStatus() {
		return {
			isMonitoring: this.isMonitoring,
			lastValidation: this.lastValidation,
			adsBlocked: document.querySelectorAll('[data-ads-blocked="true"]').length > 0,
		}
	}

	// Forçar validação manual
	forceValidation() {
		return this.performCheck()
	}
}

// Instância global
export const policyGuard = new AdSensePolicyGuard()

// Auto-inicialização em produção
if (typeof window !== 'undefined' && import.meta.env.PROD) {
	// Aguardar carregamento inicial
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			setTimeout(() => policyGuard.startMonitoring(), 2000)
		})
	} else {
		setTimeout(() => policyGuard.startMonitoring(), 2000)
	}

	// Limpeza para desenvolvimento
	if (import.meta.hot) {
		import.meta.hot.dispose(() => {
			policyGuard.stopMonitoring()
		})
	}
}

// Adicionar ao window para debugging
if (typeof window !== 'undefined') {
	window.policyGuard = policyGuard
	window.checkAdPolicy = () => policyGuard.forceValidation()
}

export default policyGuard

// Funções auxiliares compartilhadas por vários componentes de anúncios

/**
 * Verifica se a página tem conteúdo suficiente para anúncios
 */
export const hasValidContent = () => {
	// Verificar se existe conteúdo principal real na página
	const mainContent = document.querySelector('main')
	if (!mainContent) return false

	// Verificar se a página está marcada como sem anúncios
	const noAdsElement = document.querySelector('[data-no-ads="true"]')
	if (noAdsElement) return false

	// Whitelist de páginas funcionais que devem sempre passar na validação
	const currentPath = window.location.pathname.toLowerCase()
	const functionalPages = ['/nenpt', '/gids', '/nenpt/gerenciar-produtos']
	const isFunctionalPage = functionalPages.some((page) =>
		currentPath.includes(page),
	)

	if (isFunctionalPage) {
		console.log(
			`✅ Página funcional detectada (${currentPath}) - aplicando validação flexibilizada`,
		)
	}

	// Verificar se há placeholders ou skeletons ativos com timeout
	const hasSkeletons = () => {
		const skeletonElements = document.querySelectorAll(
			'.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton',
		)

		// Se encontrou skeletons, verificar se são temporários
		if (skeletonElements.length > 0) {
			// Permitir um tempo máximo para carregamento (15 segundos após carregamento da página)
			const pageLoadTime = performance.now()
			if (pageLoadTime > 15000) {
				console.warn(
					'🚨 Skeletons detectados após 15s - liberando anúncios forçadamente',
				)
				return false // Permitir anúncios mesmo com skeletons
			}

			// Verificar se skeletons estão realmente visíveis
			const visibleSkeletons = Array.from(skeletonElements).filter((el) => {
				const style = window.getComputedStyle(el)
				return style.display !== 'none' && style.visibility !== 'hidden'
			})

			if (visibleSkeletons.length === 0) {
				return false // Skeletons não visíveis, permitir anúncios
			}

			console.log(
				`⏳ ${visibleSkeletons.length} skeleton(s) visível(is) detectado(s) - aguardando carregamento`,
			)
			return true // Bloquear se ainda em tempo de carregamento
		}
		return false
	}

	if (hasSkeletons()) return false

	// Verificar páginas "em construção" ou "coming soon"
	const pageTitle = document.title.toLowerCase()
	const constructionKeywords = [
		'construção',
		'desenvolvimento',
		'coming soon',
		'em breve',
		'maintenance',
		'manutenção',
	]
	if (constructionKeywords.some((keyword) => pageTitle.includes(keyword)))
		return false

	// Verificar se há alertas/modais visíveis que possam interferir
	const alertElements = document.querySelectorAll(
		'.alert:not(.d-none), .modal.show, .overlay:not([style*="none"])',
	)
	if (alertElements.length > 0) return false

	// Verificar se há texto suficiente (mínimo reduzido de 500 para 300 caracteres)
	const textContent = mainContent.innerText || ''
	const contentLength = textContent.replace(/\s+/g, ' ').trim().length

	// Para páginas funcionais, ser muito mais flexível
	const minContentRequired = isFunctionalPage ? 100 : 300

	if (contentLength < minContentRequired) {
		// Para páginas interativas (formulários, calculadoras), ser mais flexível
		const interactiveElements = mainContent.querySelectorAll(
			'form, input, button, select, textarea, .calculator, .interactive',
		)

		// Se há elementos interativos, reduzir ainda mais o requisito
		if (interactiveElements.length > 0 && contentLength >= 50) {
			console.log(
				`📝 Página com ${interactiveElements.length} elementos interativos - requisito de conteúdo flexibilizado (${contentLength} chars)`,
			)
			// Continuar verificação com requisito flexibilizado
		} else if (interactiveElements.length > 3 || isFunctionalPage) {
			// Se há muitos elementos interativos ou é página funcional, assumir que é uma página válida
			console.log(
				`📝 Página ${isFunctionalPage ? 'funcional' : 'altamente interativa'} (${interactiveElements.length} elementos) - liberando mesmo com pouco texto (${contentLength} chars)`,
			)
		} else {
			console.log(
				`❌ Conteúdo insuficiente: ${contentLength}/${minContentRequired} caracteres e poucos elementos interativos (${interactiveElements.length})`,
			)
			return false
		}
	}

	// Verificar se não é conteúdo de baixo valor
	const lowValueKeywords = [
		'lorem ipsum',
		'texto de exemplo',
		'placeholder',
		'exemplo de texto',
		'content here',
	]
	if (
		lowValueKeywords.some((keyword) =>
			textContent.toLowerCase().includes(keyword),
		)
	)
		return false

	// Verificar se há elementos vazios dominando a página
	const emptyStateElements = document.querySelectorAll(
		'.empty-state, .no-results, .not-found',
	)
	if (emptyStateElements.length > 0) {
		// Se há estados vazios, verificar se ainda há conteúdo suficiente
		const visibleEmptyStates = Array.from(emptyStateElements).filter((el) => {
			const style = window.getComputedStyle(el)
			return style.display !== 'none' && !el.classList.contains('d-none')
		})
		if (visibleEmptyStates.length > 0 && contentLength < 600) {
			console.log(
				`❌ Estados vazios detectados com conteúdo insuficiente: ${contentLength}/600 caracteres`,
			)
			return false
		}
	}

	console.log(`✅ Conteúdo válido detectado: ${contentLength} caracteres`)
	return true
}

/**
 * Verifica se a URL atual é adequada para anúncios
 */
export const isValidPageForAds = (pathname) => {
	const invalidPages = [
		'/404',
		'/error',
		'/skeleton',
		'/loading',
		'/maintenance',
		'/coming-soon',
		'/under-construction',
		'/redirect',
		'/exit',
		'/thank-you',
		'/thanks',
		'/confirmation',
		'/confirm',
		'/navigation',
		'/sitemap',
	]

	return !invalidPages.some((page) =>
		pathname.toLowerCase().includes(page.toLowerCase()),
	)
}

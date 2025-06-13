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

	// Verificar se há placeholders ou skeletons ativos
	const hasSkeletons =
		document.querySelectorAll(
			'.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton',
		).length > 0
	if (hasSkeletons) return false

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

	// Verificar se há texto suficiente (mínimo de 500 caracteres de conteúdo real)
	const textContent = mainContent.innerText || ''
	const contentLength = textContent.replace(/\s+/g, ' ').trim().length

	if (contentLength < 500) return false

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
		const visibleEmptyStates = Array.from(emptyStateElements).filter(
			(el) => el.style.display !== 'none' && !el.classList.contains('d-none'),
		)
		if (visibleEmptyStates.length > 0 && contentLength < 800) return false
	}

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

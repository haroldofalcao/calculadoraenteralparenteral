// Script específico para testar a validação da página NENPT
// Execute este código no console do navegador na página /nenpt

const testNenptValidation = () => {
	console.log('🧪 TESTANDO VALIDAÇÃO DA PÁGINA NENPT')
	console.log('='.repeat(50))

	// Teste 1: Verificar se existe elemento main
	console.log('\n1️⃣ TESTE: Elemento Main')
	const mainContent = document.querySelector('main')
	console.log(
		`   Elemento main: ${mainContent ? '✅ Encontrado' : '❌ Não encontrado'}`,
	)
	if (mainContent) {
		console.log(`   Classes do main: ${mainContent.className || 'nenhuma'}`)
	}

	// Teste 2: Verificar conteúdo da página
	console.log('\n2️⃣ TESTE: Conteúdo da Página')
	const textContent = mainContent?.innerText || ''
	const contentLength = textContent.replace(/\s+/g, ' ').trim().length
	console.log(`   Caracteres de conteúdo: ${contentLength}`)

	// Teste 3: Verificar URL atual
	console.log('\n3️⃣ TESTE: URL e Path')
	const currentPath = window.location.pathname.toLowerCase()
	console.log(`   Path atual: ${currentPath}`)
	const functionalPages = ['/nenpt', '/gids', '/nenpt/gerenciar-produtos']
	const isFunctionalPage = functionalPages.some((page) =>
		currentPath.includes(page),
	)
	console.log(
		`   É página funcional: ${isFunctionalPage ? '✅ SIM' : '❌ NÃO'}`,
	)

	// Teste 4: Verificar elementos interativos
	console.log('\n4️⃣ TESTE: Elementos Interativos')
	const interactiveElements =
		mainContent?.querySelectorAll(
			'form, input, button, select, textarea, .calculator, .interactive',
		) || []
	console.log(
		`   Total de elementos interativos: ${interactiveElements.length}`,
	)

	if (interactiveElements.length > 0) {
		const elementTypes = {}
		interactiveElements.forEach((el) => {
			const type = el.tagName.toLowerCase()
			elementTypes[type] = (elementTypes[type] || 0) + 1
		})
		console.log(`   Tipos encontrados:`, elementTypes)
	}

	// Teste 5: Verificar skeletons
	console.log('\n5️⃣ TESTE: Skeletons')
	const skeletonElements = document.querySelectorAll(
		'.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton',
	)
	const visibleSkeletons = Array.from(skeletonElements).filter((el) => {
		const style = window.getComputedStyle(el)
		return style.display !== 'none' && style.visibility !== 'hidden'
	})
	console.log(`   Total de skeletons: ${skeletonElements.length}`)
	console.log(`   Skeletons visíveis: ${visibleSkeletons.length}`)

	// Teste 6: Verificar data-no-ads
	console.log('\n6️⃣ TESTE: Marcação data-no-ads')
	const noAdsElement = document.querySelector('[data-no-ads="true"]')
	console.log(
		`   Elemento com data-no-ads: ${noAdsElement ? '❌ ENCONTRADO' : '✅ NÃO ENCONTRADO'}`,
	)

	// Teste 7: Simular função hasValidContent
	console.log('\n7️⃣ TESTE: Simulação hasValidContent')

	let isValid = true
	let reasons = []

	// Verificar main
	if (!mainContent) {
		isValid = false
		reasons.push('Elemento main não encontrado')
	}

	// Verificar data-no-ads
	if (noAdsElement) {
		isValid = false
		reasons.push('Elemento com data-no-ads encontrado')
	}

	// Verificar skeletons
	if (visibleSkeletons.length > 0) {
		const pageLoadTime = performance.now()
		if (pageLoadTime <= 15000) {
			// Só bloquear se ainda em tempo de carregamento
			reasons.push(`${visibleSkeletons.length} skeletons visíveis encontrados`)
		}
	}

	// Verificar conteúdo
	const minContentRequired = isFunctionalPage ? 50 : 300
	if (contentLength < minContentRequired) {
		if (interactiveElements.length > 0 && contentLength >= 50) {
			// OK - página interativa com conteúdo mínimo
		} else if (interactiveElements.length > 3 || isFunctionalPage) {
			// OK - página altamente interativa ou funcional
		} else {
			isValid = false
			reasons.push(
				`Conteúdo insuficiente: ${contentLength}/${minContentRequired} caracteres`,
			)
		}
	}

	console.log(`   Status final: ${isValid ? '✅ VÁLIDA' : '❌ INVÁLIDA'}`)
	if (!isValid) {
		console.log(`   Razões da invalidação:`)
		reasons.forEach((reason) => console.log(`     - ${reason}`))
	}

	// Teste 8: Verificar anúncios presentes
	console.log('\n8️⃣ TESTE: Elementos de Anúncios')
	const adElements = document.querySelectorAll('.adsbygoogle, .ad-container')
	console.log(`   Elementos de anúncios encontrados: ${adElements.length}`)

	adElements.forEach((ad, index) => {
		const style = window.getComputedStyle(ad)
		const isVisible = style.display !== 'none' && style.visibility !== 'hidden'
		console.log(
			`     Anúncio ${index + 1}: ${isVisible ? '👁️ VISÍVEL' : '🙈 OCULTO'}`,
		)
	})

	// Resumo
	console.log('\n📊 RESUMO')
	console.log('='.repeat(30))
	if (isValid) {
		console.log('✅ A página NENPT deveria passar na validação AdSense')
	} else {
		console.log('❌ A página NENPT tem problemas na validação AdSense')
		console.log('🔧 Problemas encontrados:', reasons)
	}

	return {
		isValid,
		reasons,
		stats: {
			contentLength,
			interactiveElements: interactiveElements.length,
			skeletons: visibleSkeletons.length,
		},
	}
}

// Executar automaticamente
console.log('🔧 Script de teste NENPT carregado!')
console.log('Execute testNenptValidation() para testar a validação')

// Tornar disponível globalmente
window.testNenptValidation = testNenptValidation

export { testNenptValidation }

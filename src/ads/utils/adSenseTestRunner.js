// Script de teste para verificar se as correções do AdSense estão funcionando
// Para executar no console do navegador

const testAdSenseFixes = () => {
	console.log('🧪 INICIANDO TESTE DAS CORREÇÕES ADSENSE')
	console.log('=' * 50)

	// Teste 1: Verificar se skeletons estão sendo detectados corretamente
	console.log('\n1️⃣ TESTE: Detecção de Skeletons')
	const skeletonElements = document.querySelectorAll(
		'.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton'
	)
	const visibleSkeletons = Array.from(skeletonElements).filter(el => {
		const style = window.getComputedStyle(el)
		return style.display !== 'none' && style.visibility !== 'hidden'
	})
	
	console.log(`   Total de skeletons: ${skeletonElements.length}`)
	console.log(`   Skeletons visíveis: ${visibleSkeletons.length}`)
	console.log(`   Status: ${visibleSkeletons.length === 0 ? '✅ OK' : '⚠️ PROBLEMA'}`)

	// Teste 2: Verificar conteúdo da página
	console.log('\n2️⃣ TESTE: Conteúdo da Página')
	const mainContent = document.querySelector('main')
	const textContent = mainContent?.innerText || ''
	const contentLength = textContent.replace(/\s+/g, ' ').trim().length
	
	console.log(`   Elemento main: ${mainContent ? '✅ Encontrado' : '❌ Não encontrado'}`)
	console.log(`   Caracteres de conteúdo: ${contentLength}`)
	console.log(`   Mínimo requerido: 300`)
	console.log(`   Status: ${contentLength >= 300 ? '✅ OK' : '❌ INSUFICIENTE'}`)

	// Teste 3: Verificar elementos interativos
	console.log('\n3️⃣ TESTE: Elementos Interativos')
	const interactiveElements = mainContent?.querySelectorAll(
		'form, input, button, select, textarea, .calculator, .interactive'
	) || []
	
	console.log(`   Elementos interativos: ${interactiveElements.length}`)
	console.log(`   Status: ${interactiveElements.length > 0 ? '✅ OK' : '⚠️ POUCOS'}`)

	// Teste 4: Verificar se hasValidContent funciona
	console.log('\n4️⃣ TESTE: Função hasValidContent')
	try {
		// Tentar importar a função (pode não funcionar dependendo do bundler)
		const hasValidContent = window.hasValidContent || (() => {
			console.log('   ⚠️ Função não disponível no escopo global')
			return 'Não testável'
		})
		
		const contentValid = hasValidContent()
		console.log(`   Resultado: ${contentValid}`)
		console.log(`   Status: ${contentValid === true ? '✅ VÁLIDO' : '❌ INVÁLIDO'}`)
	} catch (error) {
		console.log(`   ❌ Erro ao testar: ${error.message}`)
	}

	// Teste 5: Verificar AdSense Manager
	console.log('\n5️⃣ TESTE: AdSense Manager')
	if (window.adsbygoogle) {
		console.log('   ✅ adsbygoogle disponível')
		console.log(`   Array length: ${window.adsbygoogle.length}`)
	} else {
		console.log('   ⚠️ adsbygoogle não disponível')
	}

	// Teste 6: Verificar Policy Guard
	console.log('\n6️⃣ TESTE: Policy Guard')
	if (window.policyGuard) {
		console.log('   ✅ policyGuard disponível')
		const status = window.policyGuard.getStatus()
		console.log(`   Monitorando: ${status.isMonitoring ? '✅ SIM' : '❌ NÃO'}`)
		console.log(`   Anúncios bloqueados: ${status.adsBlocked ? '❌ SIM' : '✅ NÃO'}`)
	} else {
		console.log('   ⚠️ policyGuard não disponível')
	}

	// Teste 7: Verificar se há elementos com data-no-ads
	console.log('\n7️⃣ TESTE: Marcação data-no-ads')
	const noAdsElements = document.querySelectorAll('[data-no-ads="true"]')
	console.log(`   Elementos com data-no-ads: ${noAdsElements.length}`)
	console.log(`   Status: ${noAdsElements.length === 0 ? '✅ OK' : '⚠️ BLOQUEADO'}`)

	// Teste 8: Verificar tempo de carregamento da página
	console.log('\n8️⃣ TESTE: Performance')
	const pageLoadTime = Math.round(performance.now())
	console.log(`   Tempo desde carregamento: ${pageLoadTime}ms`)
	console.log(`   Status: ${pageLoadTime < 15000 ? '✅ RÁPIDO' : '⚠️ LENTO'}`)

	// Resumo final
	console.log('\n📊 RESUMO DO TESTE')
	console.log('=' * 30)
	console.log('Se todos os testes estão ✅, os anúncios devem funcionar')
	console.log('Se há ❌ ou ⚠️, pode haver problemas com anúncios')
	console.log('\nPara testar novamente, execute: testAdSenseFixes()')
}

// Tornar disponível globalmente
window.testAdSenseFixes = testAdSenseFixes

// Executar automaticamente se em desenvolvimento
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
	console.log('🔧 Script de teste AdSense carregado!')
	console.log('Execute testAdSenseFixes() no console para testar')
}

export { testAdSenseFixes }

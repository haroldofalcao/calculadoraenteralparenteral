// Script de teste para verificar compliance AdSense
// Execute no console do navegador

import { policyGuard } from '../utils/adSensePolicyGuard.js';
import { adSensePolicyValidator } from '../utils/adSensePolicyValidator.js';

// Testes de compliance
const runComplianceTests = () => {
  console.log('🧪 Iniciando testes de compliance AdSense...\n');

  // Teste 1: Verificar se policy guard está funcionando
  console.log('1️⃣ Testando Policy Guard...');
  try {
    const status = policyGuard.getStatus();
    console.log('✅ Policy Guard:', status);
  } catch (error) {
    console.error('❌ Erro no Policy Guard:', error);
  }

  // Teste 2: Verificar validação de página atual
  console.log('\n2️⃣ Testando validação da página atual...');
  try {
    const validation = adSensePolicyValidator.validateCurrentPage();
    console.log(validation.isValid ? '✅' : '❌', 'Página válida:', validation.isValid);
    if (validation.issues.length > 0) {
      console.log('🚨 Issues encontradas:', validation.issues);
    }
    if (validation.warnings.length > 0) {
      console.log('⚠️ Warnings encontrados:', validation.warnings);
    }
  } catch (error) {
    console.error('❌ Erro na validação:', error);
  }

  // Teste 3: Verificar elementos de anúncio
  console.log('\n3️⃣ Testando elementos de anúncio...');
  const adElements = document.querySelectorAll('.adsbygoogle');
  console.log(`📊 ${adElements.length} elementos de anúncio encontrados`);

  adElements.forEach((ad, index) => {
    const slot = ad.getAttribute('data-ad-slot');
    const status = ad.getAttribute('data-ad-status');
    const hasIframe = !!ad.querySelector('iframe');

    console.log(
      `  ${index + 1}. Slot: ${slot || 'N/A'}, Status: ${status || 'N/A'}, Iframe: ${hasIframe ? '✅' : '❌'}`
    );
  });

  // Teste 4: Verificar conteúdo da página
  console.log('\n4️⃣ Testando conteúdo da página...');
  const mainContent = document.querySelector('main');
  if (mainContent) {
    const textContent = mainContent.innerText || '';
    const contentLength = textContent.replace(/\s+/g, ' ').trim().length;
    console.log(`📝 Conteúdo: ${contentLength} caracteres`);
    console.log(contentLength >= 500 ? '✅' : '❌', `Mínimo 500 chars: ${contentLength >= 500}`);
  } else {
    console.log('❌ Elemento <main> não encontrado');
  }

  // Teste 5: Verificar elementos problemáticos
  console.log('\n5️⃣ Testando elementos problemáticos...');

  const skeletons = document.querySelectorAll(
    '.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton'
  );
  console.log(skeletons.length === 0 ? '✅' : '❌', `Skeletons: ${skeletons.length}`);

  const noAds = document.querySelector('[data-no-ads="true"]');
  console.log(!noAds ? '✅' : '❌', `data-no-ads: ${!!noAds}`);

  const modals = document.querySelectorAll('.modal.show, .overlay:not([style*="none"])');
  console.log(modals.length === 0 ? '✅' : '❌', `Modals ativos: ${modals.length}`);

  // Teste 6: Verificar URL
  console.log('\n6️⃣ Testando URL...');
  const pathname = window.location.pathname.toLowerCase();
  const invalidPaths = ['/404', '/error', '/skeleton', '/loading', '/maintenance'];
  const isValidPath = !invalidPaths.some((path) => pathname.includes(path));
  console.log(isValidPath ? '✅' : '❌', `URL válida: ${pathname}`);

  console.log('\n🏁 Testes concluídos!');

  // Resumo final
  const finalValidation = policyGuard.forceValidation();
  console.log('\n📋 RESUMO FINAL:');
  console.log(finalValidation.isValid ? '🟢 PÁGINA EM COMPLIANCE' : '🔴 PÁGINA COM VIOLAÇÕES');

  if (!finalValidation.isValid) {
    console.log('\n🚨 AÇÕES NECESSÁRIAS:');
    finalValidation.issues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue}`);
    });
  }

  return finalValidation;
};

// Teste de navegação SPA
const testSPANavigation = (urls = ['/', '/gids', '/nenpt']) => {
  console.log('\n🔄 Testando navegação SPA...');

  let currentIndex = 0;

  const testNextUrl = () => {
    if (currentIndex >= urls.length) {
      console.log('✅ Teste de navegação concluído!');
      return;
    }

    const url = urls[currentIndex];
    console.log(`\n📍 Navegando para: ${url}`);

    // Simular navegação
    history.pushState({}, '', url);

    // Aguardar um pouco para simular carregamento
    setTimeout(() => {
      const validation = policyGuard.forceValidation();
      console.log(
        validation.isValid ? '✅' : '❌',
        `${url}: ${validation.isValid ? 'OK' : 'Violação'}`
      );

      if (!validation.isValid) {
        console.log('   Issues:', validation.issues);
      }

      currentIndex++;
      testNextUrl();
    }, 2000);
  };

  testNextUrl();
};

// Função para simular cenários de violação
const simulateViolations = () => {
  console.log('\n🧨 Simulando violações para teste...');

  // Simular skeleton
  const skeleton = document.createElement('div');
  skeleton.className = 'content-skeleton';
  skeleton.textContent = 'Loading...';
  document.body.appendChild(skeleton);

  console.log('1. Skeleton adicionado');

  setTimeout(() => {
    const validation1 = policyGuard.forceValidation();
    console.log(validation1.isValid ? '❌ Falhou' : '✅ Detectou', 'violação de skeleton');

    // Remover skeleton
    skeleton.remove();

    // Simular data-no-ads
    document.body.setAttribute('data-no-ads', 'true');
    console.log('2. data-no-ads adicionado');

    setTimeout(() => {
      const validation2 = policyGuard.forceValidation();
      console.log(validation2.isValid ? '❌ Falhou' : '✅ Detectou', 'violação de data-no-ads');

      // Limpar
      document.body.removeAttribute('data-no-ads');
      console.log('3. Testes de violação concluídos');
    }, 1000);
  }, 1000);
};

// Exportar funções para uso global
if (typeof window !== 'undefined') {
  window.runComplianceTests = runComplianceTests;
  window.testSPANavigation = testSPANavigation;
  window.simulateViolations = simulateViolations;

  console.log('🛠️ Funções de teste disponíveis:');
  console.log('  - runComplianceTests()');
  console.log('  - testSPANavigation()');
  console.log('  - simulateViolations()');
}

export { runComplianceTests, testSPANavigation, simulateViolations };

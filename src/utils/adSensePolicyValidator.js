// Utilitário para testar compliance com políticas do AdSense
export const adSensePolicyValidator = {
  
  // Verificar se a página atual é adequada para anúncios
  validateCurrentPage() {
    const results = {
      isValid: true,
      issues: [],
      warnings: [],
      info: []
    };

    // 1. Verificar se há marcação de no-ads
    const noAdsElement = document.querySelector('[data-no-ads="true"]');
    if (noAdsElement) {
      results.isValid = false;
      results.issues.push('Página marcada como data-no-ads="true"');
    }

    // 2. Verificar conteúdo skeleton
    const skeletonElements = document.querySelectorAll('.placeholder, .spinner-border, .content-skeleton');
    if (skeletonElements.length > 0) {
      results.isValid = false;
      results.issues.push(`${skeletonElements.length} elementos skeleton/loading encontrados`);
    }

    // 3. Verificar quantidade de conteúdo
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const textContent = mainContent.innerText || '';
      const contentLength = textContent.replace(/\s+/g, ' ').trim().length;
      
      if (contentLength < 300) {
        results.isValid = false;
        results.issues.push(`Conteúdo insuficiente: ${contentLength} caracteres (mínimo: 300)`);
      } else {
        results.info.push(`Conteúdo adequado: ${contentLength} caracteres`);
      }
    } else {
      results.isValid = false;
      results.issues.push('Elemento <main> não encontrado');
    }

    // 4. Verificar URL
    const pathname = window.location.pathname;
    const invalidPaths = ['/404', '/error', '/skeleton'];
    const hasInvalidPath = invalidPaths.some(path => pathname.includes(path));
    
    if (hasInvalidPath) {
      results.isValid = false;
      results.issues.push(`URL inadequada para anúncios: ${pathname}`);
    }

    // 5. Verificar elementos de anúncio existentes
    const adElements = document.querySelectorAll('.adsbygoogle');
    results.info.push(`${adElements.length} elementos de anúncio encontrados`);

    // 6. Verificar se há iframes de anúncio carregados
    const adIframes = document.querySelectorAll('iframe[id*="google_ads"]');
    results.info.push(`${adIframes.length} anúncios carregados`);

    return results;
  },

  // Gerar relatório detalhado
  generateReport() {
    const validation = this.validateCurrentPage();
    
    console.log('=== ADSENSE POLICY VALIDATION REPORT ===');
    console.log(`Página: ${window.location.pathname}`);
    console.log(`Status: ${validation.isValid ? '✅ VÁLIDA' : '❌ INVÁLIDA'}`);
    console.log('');
    
    if (validation.issues.length > 0) {
      console.log('🚨 PROBLEMAS ENCONTRADOS:');
      validation.issues.forEach(issue => console.log(`  - ${issue}`));
      console.log('');
    }
    
    if (validation.warnings.length > 0) {
      console.log('⚠️  AVISOS:');
      validation.warnings.forEach(warning => console.log(`  - ${warning}`));
      console.log('');
    }
    
    if (validation.info.length > 0) {
      console.log('ℹ️  INFORMAÇÕES:');
      validation.info.forEach(info => console.log(`  - ${info}`));
      console.log('');
    }
    
    if (validation.isValid) {
      console.log('✅ Esta página está em compliance com as políticas do AdSense');
    } else {
      console.log('❌ Esta página NÃO está em compliance. Corrija os problemas antes de exibir anúncios.');
    }
    
    console.log('==========================================');
    
    return validation;
  },

  // Monitorar mudanças na página
  startMonitoring(interval = 5000) {
    const monitor = () => {
      const validation = this.validateCurrentPage();
      if (!validation.isValid) {
        console.warn('⚠️ Página não adequada para anúncios detectada!');
        console.warn('Issues:', validation.issues);
      }
    };

    // Monitorar periodicamente
    const intervalId = setInterval(monitor, interval);
    
    // Monitorar mudanças no DOM
    const observer = new MutationObserver(monitor);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-no-ads', 'class']
    });

    return {
      stop: () => {
        clearInterval(intervalId);
        observer.disconnect();
      }
    };
  },

  // Verificar status dos anúncios carregados
  checkLoadedAds() {
    const adElements = document.querySelectorAll('.adsbygoogle');
    const results = [];

    adElements.forEach((el, index) => {
      const result = {
        index: index + 1,
        slot: el.getAttribute('data-ad-slot'),
        status: el.getAttribute('data-ad-status'),
        hasIframe: !!el.querySelector('iframe'),
        isEmpty: el.innerHTML.trim() === '',
        isVisible: el.offsetWidth > 0 && el.offsetHeight > 0
      };
      results.push(result);
    });

    console.table(results);
    return results;
  }
};

// Adicionar ao window para uso no console
if (typeof window !== 'undefined') {
  window.adSensePolicyValidator = adSensePolicyValidator;
  
  // Comandos de conveniência
  window.validateAds = () => adSensePolicyValidator.generateReport();
  window.checkAds = () => adSensePolicyValidator.checkLoadedAds();
  window.monitorAds = (interval) => adSensePolicyValidator.startMonitoring(interval);
}

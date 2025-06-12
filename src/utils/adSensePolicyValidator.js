// Utilitário para testar compliance com políticas do AdSense
export const adSensePolicyValidator = {
  // Verificar se a página atual é adequada para anúncios
  validateCurrentPage() {
    const results = {
      isValid: true,
      issues: [],
      warnings: [],
      info: [],
    };

    // 1. Verificar se há marcação de no-ads
    const noAdsElement = document.querySelector('[data-no-ads="true"]');
    if (noAdsElement) {
      results.isValid = false;
      results.issues.push('Página marcada como data-no-ads="true"');
    }

    // 2. Verificar conteúdo skeleton/loading
    const skeletonElements = document.querySelectorAll(
      '.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton'
    );
    if (skeletonElements.length > 0) {
      results.isValid = false;
      results.issues.push(
        `${skeletonElements.length} elementos skeleton/loading encontrados - página em carregamento`
      );
    }

    // 3. Verificar páginas "em construção"
    const constructionKeywords = [
      'construção',
      'desenvolvimento',
      'coming soon',
      'em breve',
      'maintenance',
      'manutenção',
    ];
    const pageTitle = document.title.toLowerCase();
    const hasConstructionKeywords = constructionKeywords.some((keyword) =>
      pageTitle.includes(keyword)
    );

    if (hasConstructionKeywords) {
      results.isValid = false;
      results.issues.push('Página parece estar em construção baseada no título');
    }

    // 4. Verificar elementos de alerta/modal/overlay
    const alertElements = document.querySelectorAll(
      '.alert, .modal, .overlay, .popup, [role="alert"], .notification'
    );
    const visibleAlerts = Array.from(alertElements).filter(
      (el) =>
        el.style.display !== 'none' &&
        !el.classList.contains('d-none') &&
        el.offsetWidth > 0 &&
        el.offsetHeight > 0
    );

    if (visibleAlerts.length > 0) {
      results.warnings.push(
        `${visibleAlerts.length} elementos de alerta/modal visíveis - podem interferir com anúncios`
      );
    }

    // 5. Verificar quantidade de conteúdo
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const textContent = mainContent.innerText || '';
      const contentLength = textContent.replace(/\s+/g, ' ').trim().length;

      // Verificar conteúdo mínimo mais rigoroso
      if (contentLength < 500) {
        results.isValid = false;
        results.issues.push(
          `Conteúdo insuficiente: ${contentLength} caracteres (mínimo recomendado: 500)`
        );
      } else if (contentLength < 1000) {
        results.warnings.push(
          `Conteúdo adequado mas limitado: ${contentLength} caracteres (ideal: 1000+)`
        );
      } else {
        results.info.push(`Conteúdo adequado: ${contentLength} caracteres`);
      }

      // Verificar se o conteúdo é substancial (não apenas texto de preenchimento)
      const lowValueKeywords = [
        'lorem ipsum',
        'texto de exemplo',
        'placeholder',
        'exemplo de texto',
        'content here',
      ];
      const hasLowValueContent = lowValueKeywords.some((keyword) =>
        textContent.toLowerCase().includes(keyword)
      );

      if (hasLowValueContent) {
        results.isValid = false;
        results.issues.push('Conteúdo de baixo valor detectado (texto placeholder/exemplo)');
      }
    } else {
      results.isValid = false;
      results.issues.push('Elemento <main> não encontrado - estrutura inadequada');
    }

    // 6. Verificar URL inadequadas
    const pathname = window.location.pathname.toLowerCase();
    const invalidPaths = [
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
    ];

    const hasInvalidPath = invalidPaths.some((path) => pathname.includes(path));
    if (hasInvalidPath) {
      results.isValid = false;
      results.issues.push(`URL inadequada para anúncios: ${pathname}`);
    }

    // 7. Verificar páginas de navegação pura
    const navigationOnlySelectors = [
      'nav:only-child',
      '.navigation-only',
      '.menu-page',
      '.sitemap-only',
    ];

    const isNavigationOnly = navigationOnlySelectors.some((selector) =>
      document.querySelector(selector)
    );

    if (isNavigationOnly) {
      results.isValid = false;
      results.issues.push('Página apenas de navegação detectada');
    }

    // 8. Verificar se é página de erro/resultado vazio
    const emptyStateElements = document.querySelectorAll('.empty-state, .no-results, .not-found');
    if (emptyStateElements.length > 0) {
      results.warnings.push('Estados vazios detectados - verificar se conteúdo é suficiente');
    }

    // 9. Verificar elementos de anúncio existentes
    const adElements = document.querySelectorAll('.adsbygoogle');
    results.info.push(`${adElements.length} elementos de anúncio encontrados`);

    // 10. Verificar se há iframes de anúncio carregados
    const adIframes = document.querySelectorAll('iframe[id*="google_ads"]');
    results.info.push(`${adIframes.length} anúncios carregados`);

    // 11. Verificar densidade de anúncios vs conteúdo
    if (adElements.length > 0 && mainContent) {
      const adDensity = adElements.length / (mainContent.innerText.length / 1000);
      if (adDensity > 2) {
        results.warnings.push(
          `Alta densidade de anúncios detectada: ${adDensity.toFixed(2)} anúncios por 1000 caracteres`
        );
      }
    }

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
      validation.issues.forEach((issue) => console.log(`  - ${issue}`));
      console.log('');
    }

    if (validation.warnings.length > 0) {
      console.log('⚠️  AVISOS:');
      validation.warnings.forEach((warning) => console.log(`  - ${warning}`));
      console.log('');
    }

    if (validation.info.length > 0) {
      console.log('ℹ️  INFORMAÇÕES:');
      validation.info.forEach((info) => console.log(`  - ${info}`));
      console.log('');
    }

    if (validation.isValid) {
      console.log('✅ Esta página está em compliance com as políticas do AdSense');
    } else {
      console.log(
        '❌ Esta página NÃO está em compliance. Corrija os problemas antes de exibir anúncios.'
      );
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
      attributeFilter: ['data-no-ads', 'class'],
    });

    return {
      stop: () => {
        clearInterval(intervalId);
        observer.disconnect();
      },
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
        isVisible: el.offsetWidth > 0 && el.offsetHeight > 0,
      };
      results.push(result);
    });

    console.table(results);
    return results;
  },
};

// Adicionar ao window para uso no console
if (typeof window !== 'undefined') {
  window.adSensePolicyValidator = adSensePolicyValidator;

  // Comandos de conveniência
  window.validateAds = () => adSensePolicyValidator.generateReport();
  window.checkAds = () => adSensePolicyValidator.checkLoadedAds();
  window.monitorAds = (interval) => adSensePolicyValidator.startMonitoring(interval);
}

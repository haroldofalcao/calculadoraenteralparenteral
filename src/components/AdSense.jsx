import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { adSenseManager } from '../utils/adSenseManager.js';
import { policyGuard } from '../utils/adSensePolicyGuard.js';

// Função para verificar se a página tem conteúdo suficiente
const hasValidContent = () => {
  // Verificar se existe conteúdo principal real na página
  const mainContent = document.querySelector('main');
  if (!mainContent) return false;

  // Verificar se a página está marcada como sem anúncios
  const noAdsElement = document.querySelector('[data-no-ads="true"]');
  if (noAdsElement) return false;

  // Verificar se há placeholders ou skeletons ativos
  const hasSkeletons =
    document.querySelectorAll(
      '.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton'
    ).length > 0;
  if (hasSkeletons) return false;

  // Verificar páginas "em construção" ou "coming soon"
  const pageTitle = document.title.toLowerCase();
  const constructionKeywords = [
    'construção',
    'desenvolvimento',
    'coming soon',
    'em breve',
    'maintenance',
    'manutenção',
  ];
  if (constructionKeywords.some((keyword) => pageTitle.includes(keyword))) return false;

  // Verificar se há alertas/modais visíveis que possam interferir
  const alertElements = document.querySelectorAll(
    '.alert:not(.d-none), .modal.show, .overlay:not([style*="none"])'
  );
  if (alertElements.length > 0) return false;

  // Verificar se há texto suficiente (mínimo de 500 caracteres de conteúdo real)
  const textContent = mainContent.innerText || '';
  const contentLength = textContent.replace(/\s+/g, ' ').trim().length;

  if (contentLength < 500) return false;

  // Verificar se não é conteúdo de baixo valor
  const lowValueKeywords = [
    'lorem ipsum',
    'texto de exemplo',
    'placeholder',
    'exemplo de texto',
    'content here',
  ];
  if (lowValueKeywords.some((keyword) => textContent.toLowerCase().includes(keyword))) return false;

  // Verificar se há elementos vazios dominando a página
  const emptyStateElements = document.querySelectorAll('.empty-state, .no-results, .not-found');
  if (emptyStateElements.length > 0) {
    // Se há estados vazios, verificar se ainda há conteúdo suficiente
    const visibleEmptyStates = Array.from(emptyStateElements).filter(
      (el) => el.style.display !== 'none' && !el.classList.contains('d-none')
    );
    if (visibleEmptyStates.length > 0 && contentLength < 800) return false;
  }

  return true;
};

// Verificar se a URL atual é adequada para anúncios
const isValidPageForAds = (pathname) => {
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
  ];

  return !invalidPages.some((page) => pathname.toLowerCase().includes(page.toLowerCase()));
};

// Placeholder para desenvolvimento
const AdPlaceholder = ({ adStyle, adFormat, children }) => {
  const isDev = import.meta.env.DEV;

  if (!isDev) return children;

  const getPlaceholderStyle = () => {
    const baseStyle = {
      backgroundColor: '#f0f0f0',
      border: '2px dashed #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      maxWidth: '100%',
      width: '100%',
      ...adStyle,
    };

    // Ajustar altura baseado no formato do anúncio
    if (adFormat === 'rectangle') {
      baseStyle.minHeight = '250px';
      baseStyle.maxWidth = '300px';
      baseStyle.margin = '0 auto';
    } else if (adStyle?.height) {
      baseStyle.minHeight = adStyle.height;
    } else {
      baseStyle.minHeight = '90px';
    }

    return baseStyle;
  };

  return (
    <div style={getPlaceholderStyle()}>
      📢 AdSense Preview
      <br />
      <small style={{ opacity: 0.7, marginTop: '5px', display: 'block' }}>
        {adFormat || 'auto'} format
      </small>
    </div>
  );
};

const AdSense = ({
  adClient = 'ca-pub-2235031118321497',
  adSlot,
  adStyle = { display: 'block' },
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = 'adsbygoogle',
  requireContent = true, // Nova prop para controlar se deve verificar conteúdo
}) => {
  const adRef = useRef(null);
  const location = useLocation();
  const [contentReady, setContentReady] = useState(false);
  const [policyCompliant, setPolicyCompliant] = useState(false);

  // Verificar se a página é válida para anúncios
  const pageValidForAds = isValidPageForAds(location.pathname);

  useEffect(() => {
    // Só carregar em produção e em páginas válidas
    if (import.meta.env.DEV || !pageValidForAds) return;

    // Integrar com o policy guard
    const handlePolicyChange = (validation) => {
      setPolicyCompliant(validation.isValid);
      if (!validation.isValid) {
        console.log('🚫 Anúncio bloqueado por violação de política:', validation.issues);
      }
    };

    // Registrar callback
    policyGuard.onViolation(handlePolicyChange);

    // Verificar status atual
    const currentStatus = policyGuard.getStatus();
    if (currentStatus.lastValidation) {
      setPolicyCompliant(currentStatus.lastValidation.isValid);
    }

    if (requireContent) {
      // Aguardar o conteúdo estar pronto
      const checkContent = () => {
        const hasContent = hasValidContent();
        const policyCheck = policyGuard.forceValidation();

        if (hasContent && policyCheck.isValid) {
          setContentReady(true);
          setPolicyCompliant(true);
        } else {
          // Verificar novamente após um tempo
          setTimeout(checkContent, 2000);
        }
      };

      // Aguardar um pouco antes de começar a verificar
      const initialDelay = setTimeout(checkContent, 3000);
      return () => clearTimeout(initialDelay);
    } else {
      // Se não requer verificação de conteúdo, ainda verificar políticas
      const policyCheck = policyGuard.forceValidation();
      setContentReady(true);
      setPolicyCompliant(policyCheck.isValid);
    }
  }, [location.pathname, requireContent, pageValidForAds]);

  useEffect(() => {
    // Só carregar anúncio quando estiver pronto, em compliance e em produção
    if (import.meta.env.DEV || !pageValidForAds || !contentReady || !policyCompliant) return;

    // Verificar se a página está bloqueada
    if (document.body.hasAttribute('data-ads-blocked')) {
      console.log('🚫 Anúncios bloqueados pela política');
      return;
    }

    const timer = setTimeout(() => {
      if (adRef.current && adSlot) {
        // Verificação final antes de carregar
        const finalCheck = policyGuard.forceValidation();
        if (finalCheck.isValid) {
          adSenseManager.loadAd(adRef.current, adSlot);
        } else {
          console.log('🚫 Verificação final falhou:', finalCheck.issues);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [adSlot, contentReady, policyCompliant, pageValidForAds]);

  // Não renderizar se não for uma página válida para anúncios ou não estiver em compliance
  if (!pageValidForAds || (import.meta.env.PROD && !policyCompliant)) {
    return null;
  }

  const adElement = (
    <ins
      ref={adRef}
      className={className}
      style={adStyle}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  );

  return (
    <AdPlaceholder adStyle={adStyle} adFormat={adFormat}>
      {adElement}
    </AdPlaceholder>
  );
};

// Componente para banner responsivo
export const ResponsiveBanner = ({ adSlot, style = {}, requireContent = true }) => {
  const location = useLocation();

  // Não exibir em páginas inadequadas
  if (!isValidPageForAds(location.pathname)) {
    return null;
  }

  return (
    <div
      className="ad-container"
      style={{
        textAlign: 'center',
        margin: '20px 0',
        ...style,
      }}
    >
      <AdSense
        adSlot={adSlot}
        requireContent={requireContent}
        adStyle={{
          display: 'block',
          width: '100%',
          maxWidth: '100%',
          height: 'auto',
          minHeight: '90px',
        }}
      />
    </div>
  );
};

// Componente para anúncio lateral
export const SidebarAd = ({ adSlot, style = {}, requireContent = true }) => {
  const location = useLocation();

  if (!isValidPageForAds(location.pathname)) {
    return null;
  }

  return (
    <div className="ad-container" style={{ margin: '20px 0', ...style }}>
      <AdSense
        adSlot={adSlot}
        requireContent={requireContent}
        adStyle={{
          display: 'block',
          maxWidth: '100%',
          width: '100%',
          minHeight: '250px',
        }}
        adFormat="rectangle"
      />
    </div>
  );
};

// Componente para anúncio in-feed
export const InFeedAd = ({
  adSlot,
  style = {},
  showLabel = true,
  variant = 'default',
  requireContent = true,
}) => {
  const location = useLocation();

  if (!isValidPageForAds(location.pathname)) {
    return null;
  }

  const getContainerStyle = () => {
    const baseStyle = {
      margin: '40px auto',
      maxWidth: '100%',
      width: '100%',
      textAlign: 'center',
      position: 'relative',
      boxSizing: 'border-box',
      ...style,
    };

    switch (variant) {
      case 'minimal':
        return {
          ...baseStyle,
          padding: '15px',
          backgroundColor: 'transparent',
        };
      case 'bordered':
        return {
          ...baseStyle,
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '2px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        };
      case 'seamless':
        return {
          ...baseStyle,
          padding: '30px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
        };
      default:
        return {
          ...baseStyle,
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
        };
    }
  };

  return (
    <div style={getContainerStyle()} className="ad-container">
      {/* Label de compliance */}
      {showLabel && (
        <div
          style={{
            fontSize: '12px',
            color: '#6c757d',
            marginBottom: '10px',
            fontFamily: 'Arial, sans-serif',
            opacity: 0.8,
          }}
        >
          Publicidade
        </div>
      )}

      <AdSense
        adSlot={adSlot}
        requireContent={requireContent}
        adStyle={{
          display: 'block',
          minHeight: '120px',
          width: '100%',
          maxWidth: '100%',
        }}
        adFormat="fluid"
      />
    </div>
  );
};

// Componente especializado para anúncio após resultados
export const ResultsAd = ({ adSlot, style = {} }) => {
  const location = useLocation();

  if (!isValidPageForAds(location.pathname)) {
    return null;
  }

  return (
    <InFeedAd
      adSlot={adSlot}
      variant="bordered"
      requireContent={true} // Sempre requer conteúdo para anúncios de resultado
      style={{
        marginTop: '50px',
        marginBottom: '30px',
        ...style,
      }}
    />
  );
};

export default AdSense;

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { adSenseManager } from '../utils/adSenseManager.js';

// Função para verificar se a página tem conteúdo suficiente
const hasValidContent = () => {
  // Verificar se existe conteúdo principal real na página
  const mainContent = document.querySelector('main');
  if (!mainContent) return false;
  
  // Verificar se a página está marcada como sem anúncios
  const noAdsElement = document.querySelector('[data-no-ads="true"]');
  if (noAdsElement) return false;
  
  // Verificar se há placeholders ou skeletons ativos
  const hasSkeletons = document.querySelectorAll('.placeholder, .spinner-border, .content-skeleton').length > 0;
  if (hasSkeletons) return false;
  
  // Verificar se há texto suficiente (mínimo de 300 caracteres de conteúdo real)
  const textContent = mainContent.innerText || '';
  const contentLength = textContent.replace(/\s+/g, ' ').trim().length;
  
  return contentLength >= 300;
};

// Verificar se a URL atual é adequada para anúncios
const isValidPageForAds = (pathname) => {
  const invalidPages = [
    '/404',
    '/error',
    '/skeleton'
  ];
  
  return !invalidPages.some(page => pathname.includes(page));
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
      ...adStyle
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
  adClient = "ca-pub-2235031118321497",
  adSlot,
  adStyle = { display: 'block' },
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "adsbygoogle",
  requireContent = true // Nova prop para controlar se deve verificar conteúdo
}) => {
  const adRef = useRef(null);
  const location = useLocation();
  const [contentReady, setContentReady] = useState(false);

  // Verificar se a página é válida para anúncios
  const pageValidForAds = isValidPageForAds(location.pathname);

  useEffect(() => {
    // Só carregar em produção e em páginas válidas
    if (import.meta.env.DEV || !pageValidForAds) return;

    if (requireContent) {
      // Aguardar o conteúdo estar pronto
      const checkContent = () => {
        if (hasValidContent()) {
          setContentReady(true);
        } else {
          // Verificar novamente após um tempo
          setTimeout(checkContent, 1000);
        }
      };

      // Aguardar um pouco antes de começar a verificar
      const initialDelay = setTimeout(checkContent, 2000);
      
      return () => clearTimeout(initialDelay);
    } else {
      // Se não requer verificação de conteúdo, marcar como pronto imediatamente
      setContentReady(true);
    }
  }, [location.pathname, requireContent, pageValidForAds]);

  useEffect(() => {
    // Só carregar anúncio quando estiver pronto e em produção
    if (import.meta.env.DEV || !pageValidForAds || !contentReady) return;

    const timer = setTimeout(() => {
      if (adRef.current && adSlot) {
        adSenseManager.loadAd(adRef.current, adSlot);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [adSlot, contentReady, pageValidForAds]);

  // Não renderizar se não for uma página válida para anúncios
  if (!pageValidForAds) {
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
    <div className="ad-container" style={{ 
      textAlign: 'center', 
      margin: '20px 0', 
      ...style 
    }}>
      <AdSense
        adSlot={adSlot}
        requireContent={requireContent}
        adStyle={{
          display: 'block',
          width: '100%',
          maxWidth: '100%',
          height: 'auto',
          minHeight: '90px'
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
          minHeight: '250px'
        }}
        adFormat="rectangle"
      />
    </div>
  );
};

// Componente para anúncio in-feed
export const InFeedAd = ({ adSlot, style = {}, showLabel = true, variant = 'default', requireContent = true }) => {
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
      ...style
    };

    switch (variant) {
      case 'minimal':
        return {
          ...baseStyle,
          padding: '15px',
          backgroundColor: 'transparent'
        };
      case 'bordered':
        return {
          ...baseStyle,
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '2px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        };
      case 'seamless':
        return {
          ...baseStyle,
          padding: '30px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        };
      default:
        return {
          ...baseStyle,
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        };
    }
  };

  return (
    <div style={getContainerStyle()} className="ad-container">
      {/* Label de compliance */}
      {showLabel && (
        <div style={{
          fontSize: '12px',
          color: '#6c757d',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif',
          opacity: 0.8
        }}>
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
          maxWidth: '100%'
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
        ...style
      }}
    />
  );
};

export default AdSense;

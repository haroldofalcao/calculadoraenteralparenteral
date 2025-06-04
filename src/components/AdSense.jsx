import React, { useEffect } from 'react';

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
      ...adStyle
    };

    // Ajustar altura baseado no formato do anúncio
    if (adFormat === 'rectangle') {
      baseStyle.minHeight = '250px';
      baseStyle.width = '300px';
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
  className = "adsbygoogle"
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const adElement = (
    <ins
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
export const ResponsiveBanner = ({ adSlot, style = {} }) => (
  <div style={{ textAlign: 'center', margin: '20px 0', ...style }}>
    <AdSense
      adSlot={adSlot}
      adStyle={{
        display: 'block',
        width: '100%',
        height: 'auto',
        minHeight: '90px'
      }}
    />
  </div>
);

// Componente para anúncio lateral
export const SidebarAd = ({ adSlot, style = {} }) => (
  <div style={{ margin: '20px 0', ...style }}>
    <AdSense
      adSlot={adSlot}
      adStyle={{
        display: 'block',
        width: '300px',
        height: '250px'
      }}
      adFormat="rectangle"
    />
  </div>
);

// Componente para anúncio in-feed
export const InFeedAd = ({ adSlot, style = {} }) => (
  <div style={{ margin: '20px auto', maxWidth: '728px', ...style }}>
    <AdSense
      adSlot={adSlot}
      adStyle={{
        display: 'block',
        minHeight: '100px'
      }}
      adFormat="fluid"
    />
  </div>
);

export default AdSense;

// Script de teste para verificar o AdSense Manager
import { adSenseManager } from './adSenseManager.js';

// Função para testar o status do AdSense
export const testAdSense = () => {
  console.log('=== AdSense Manager Test ===');
  
  // Verificar status atual
  const status = adSenseManager.getStatus();
  console.log('Status atual:', status);
  
  // Verificar se window.adsbygoogle existe
  if (typeof window !== 'undefined') {
    console.log('window.adsbygoogle existe?', !!window.adsbygoogle);
    console.log('window.adsbygoogle length:', window.adsbygoogle?.length || 0);
    
    // Verificar se há elementos com classe adsbygoogle
    const adElements = document.querySelectorAll('.adsbygoogle');
    console.log('Elementos .adsbygoogle encontrados:', adElements.length);
    
    adElements.forEach((el, index) => {
      console.log(`Elemento ${index}:`, {
        'data-ad-slot': el.getAttribute('data-ad-slot'),
        'data-ad-status': el.getAttribute('data-ad-status'),
        'hasIframe': !!el.querySelector('iframe'),
        'innerHTML': el.innerHTML.substring(0, 100)
      });
    });
  }
  
  console.log('=== Fim do teste ===');
};

// Função para resetar AdSense (útil para desenvolvimento)
export const resetAdSense = () => {
  adSenseManager.reset();
  console.log('AdSense manager resetado');
};

// Adicionar funções ao window para teste no console
if (typeof window !== 'undefined') {
  window.testAdSense = testAdSense;
  window.resetAdSense = resetAdSense;
  window.adSenseManager = adSenseManager;
}

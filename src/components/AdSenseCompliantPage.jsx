import React, { useEffect, useState } from 'react';
import { policyGuard } from '../utils/adSensePolicyGuard.js';

/**
 * Wrapper que garante compliance com políticas AdSense
 * Só renderiza children quando a página está em compliance total
 */
const AdSenseCompliantPage = ({
  children,
  fallback = null,
  minContentLength = 500,
  requireMainElement = true,
  allowSkeletons = false,
}) => {
  const [isCompliant, setIsCompliant] = useState(false);
  const [validation, setValidation] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkCompliance = () => {
      if (!mounted) return;

      const result = policyGuard.forceValidation();

      // Verificações adicionais específicas
      if (result.isValid) {
        // Verificar comprimento mínimo de conteúdo
        const mainContent = document.querySelector('main');
        if (requireMainElement && mainContent) {
          const textLength = (mainContent.innerText || '').replace(/\s+/g, ' ').trim().length;
          if (textLength < minContentLength) {
            result.isValid = false;
            result.issues.push(
              `Conteúdo insuficiente: ${textLength}/${minContentLength} caracteres`
            );
          }
        }

        // Verificar skeletons se não permitidos
        if (!allowSkeletons) {
          const skeletonElements = document.querySelectorAll(
            '.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton'
          );
          if (skeletonElements.length > 0) {
            result.isValid = false;
            result.issues.push(`${skeletonElements.length} elementos de carregamento encontrados`);
          }
        }
      }

      setValidation(result);
      setIsCompliant(result.isValid);
      setIsChecking(false);

      if (!result.isValid) {
        console.warn('🚨 Página não está em compliance com AdSense:', result.issues);
      } else {
        console.log('✅ Página em compliance com AdSense');
      }
    };

    // Verificação inicial com delay
    const initialDelay = setTimeout(() => {
      checkCompliance();
    }, 1000);

    // Registrar callback para mudanças de política
    const handlePolicyChange = (policyValidation) => {
      if (mounted) {
        setValidation(policyValidation);
        setIsCompliant(policyValidation.isValid);
      }
    };

    policyGuard.onViolation(handlePolicyChange);

    // Observer para mudanças no conteúdo
    const observer = new MutationObserver(() => {
      if (mounted) {
        // Debounce para evitar muitas verificações
        clearTimeout(observer.timeout);
        observer.timeout = setTimeout(checkCompliance, 1500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'data-no-ads'],
    });

    // Cleanup
    return () => {
      mounted = false;
      clearTimeout(initialDelay);
      clearTimeout(observer.timeout);
      observer.disconnect();
    };
  }, [minContentLength, requireMainElement, allowSkeletons]);

  // Mostrar fallback enquanto verifica ou se não está em compliance
  if (isChecking || !isCompliant) {
    if (fallback) {
      return fallback;
    }

    // Fallback padrão para desenvolvimento
    if (import.meta.env.DEV) {
      return (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            margin: '20px 0',
          }}
        >
          <h4 style={{ color: '#856404', marginBottom: '10px' }}>🛡️ AdSense Policy Check</h4>
          {isChecking ? (
            <p style={{ color: '#856404', margin: 0 }}>Verificando compliance com políticas...</p>
          ) : (
            <div>
              <p style={{ color: '#721c24', margin: '0 0 10px 0' }}>
                ❌ Página não está em compliance
              </p>
              {validation?.issues && (
                <ul style={{ color: '#721c24', margin: 0, paddingLeft: '20px' }}>
                  {validation.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      );
    }

    return null;
  }

  // Renderizar children apenas quando em compliance
  return children;
};

/**
 * Hook para verificar compliance em tempo real
 */
export const useAdSenseCompliance = () => {
  const [isCompliant, setIsCompliant] = useState(false);
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    let mounted = true;

    const checkCompliance = () => {
      if (!mounted) return;

      const result = policyGuard.forceValidation();
      setValidation(result);
      setIsCompliant(result.isValid);
    };

    // Verificação inicial
    checkCompliance();

    // Registrar callback
    const handlePolicyChange = (policyValidation) => {
      if (mounted) {
        setValidation(policyValidation);
        setIsCompliant(policyValidation.isValid);
      }
    };

    policyGuard.onViolation(handlePolicyChange);

    return () => {
      mounted = false;
    };
  }, []);

  return {
    isCompliant,
    validation,
    forceCheck: () => policyGuard.forceValidation(),
  };
};

/**
 * Componente para exibir status de compliance (debug)
 */
export const AdSenseComplianceIndicator = () => {
  const { isCompliant, validation } = useAdSenseCompliance();

  if (import.meta.env.PROD) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '100px',
        right: '10px',
        padding: '8px 12px',
        backgroundColor: isCompliant ? '#d4edda' : '#f8d7da',
        border: `1px solid ${isCompliant ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px',
      }}
    >
      <div
        style={{
          color: isCompliant ? '#155724' : '#721c24',
          fontWeight: 'bold',
        }}
      >
        {isCompliant ? '✅ AdSense OK' : '❌ AdSense Blocked'}
      </div>
      {validation?.issues && validation.issues.length > 0 && (
        <div
          style={{
            marginTop: '4px',
            fontSize: '11px',
            color: '#721c24',
          }}
        >
          {validation.issues.slice(0, 2).map((issue, index) => (
            <div key={index}>• {issue}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdSenseCompliantPage;

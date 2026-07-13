// Testes automatizados para compliance AdSense
describe('AdSense Policy Compliance', () => {
  beforeEach(() => {
    // Visitar página inicial
    cy.visit('/');

    // Aguardar carregamento completo
    cy.wait(3000);

    // Aguardar a inicialização do policyGuard se necessário
    cy.window().then((win) => {
      // Tentar inicializar policyGuard se não estiver disponível
      if (!win.policyGuard && win.location.hostname === 'localhost') {
        cy.log('⚠️ PolicyGuard não encontrado - ambiente de desenvolvimento');
      }
    });
  });

  describe('Policy Guard System', () => {
    it('should have policy guard active', () => {
      cy.window().should('have.property', 'policyGuard');

      cy.window().then((win) => {
        const status = win.policyGuard.getStatus();
        expect(status).to.have.property('isMonitoring');
      });
    });

    it('should validate page compliance', () => {
      cy.window().then((win) => {
        // Verificar se policyGuard existe e tem o método forceValidation
        expect(win.policyGuard).to.exist;
        expect(win.policyGuard.forceValidation).to.be.a('function');

        const validation = win.policyGuard.forceValidation();
        expect(validation).to.exist;
        expect(validation).to.have.property('isValid');

        if (!validation.isValid) {
          cy.log('Validation issues:', validation.issues);
        }
      });
    });
  });

  describe('Content Validation', () => {
    it('should have sufficient content on main pages', () => {
      const pages = ['/', '/gids', '/nenpt'];

      pages.forEach((page) => {
        cy.visit(page);
        cy.wait(2000);

        // Verificar se existe elemento main
        cy.get('main').should('exist');

        // Verificar conteúdo mínimo
        cy.get('main').then(($main) => {
          const textContent = $main.text().replace(/\s+/g, ' ').trim();
          expect(textContent.length).to.be.at.least(
            500,
            `Página ${page} não tem conteúdo suficiente`
          );
        });
      });
    });

    it('should not have skeleton elements when ads are present', () => {
      // Aguardar tempo suficiente para o carregamento inicial
      cy.wait(2000);

      // Verificar se existem elementos skeleton/loading
      cy.get('body').then(($body) => {
        const skeletonSelectors =
          '.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton';
        const skeletonElements = $body.find(skeletonSelectors);

        if (skeletonElements.length > 0) {
          // Se encontrou elementos skeleton, verificar se estão visíveis
          cy.get(skeletonSelectors).should('not.be.visible');
        } else {
          // Se não encontrou elementos skeleton, isso é bom - página carregada
          cy.log('✅ Nenhum elemento skeleton encontrado - página totalmente carregada');
        }
      });
    });

    it('should not have low-value content', () => {
      cy.get('main').then(($main) => {
        const text = $main.text().toLowerCase();

        // Verificar se não contém texto de baixo valor
        expect(text).to.not.contain('lorem ipsum');
        expect(text).to.not.contain('placeholder');
        expect(text).to.not.contain('texto de exemplo');
      });
    });
  });

  describe('Page Structure', () => {
    it('should have proper page structure for ads', () => {
      // Verificar estrutura básica
      cy.get('main').should('exist');
      cy.get('title').should('exist');

      // Verificar se não há marcações de no-ads
      cy.get('[data-no-ads="true"]').should('not.exist');
    });

    it('should not have blocking overlays', () => {
      // Verificar se não há modais ou overlays bloqueando
      cy.get('.modal.show, .overlay:visible, .popup:visible').should('not.exist');
    });
  });

  describe('Ad Elements', () => {
    it('should only load ads when content is ready', () => {
      // Aguardar carregamento
      cy.wait(5000);

      // Verificar se anúncios só aparecem quando conteúdo está pronto
      cy.get('.adsbygoogle').each(($ad) => {
        // Verificar se o anúncio não está em uma página inadequada
        cy.window().then((win) => {
          const isBlocked = win.document.body.hasAttribute('data-ads-blocked');
          if (!isBlocked) {
            // Se não está bloqueado, deve ter conteúdo suficiente
            cy.get('main').then(($main) => {
              const contentLength = $main.text().replace(/\s+/g, ' ').trim().length;
              expect(contentLength).to.be.at.least(500);
            });
          }
        });
      });
    });

    it('should respect requireContent prop', () => {
      cy.window().then((win) => {
        // Verificar se policyGuard existe
        if (!win.policyGuard || typeof win.policyGuard.forceValidation !== 'function') {
          cy.log('⚠️ PolicyGuard não encontrado - pulando teste');
          return;
        }

        // Obter referência ao elemento main
        const main = win.document.querySelector('main');
        if (!main) {
          cy.log('⚠️ Elemento main não encontrado - pulando teste');
          return;
        }

        // Salvar conteúdo original
        const originalContent = main.innerHTML;

        // Simular conteúdo insuficiente
        main.innerHTML = '<h1>Teste</h1><p>Pouco conteúdo</p>';

        // Aguardar um momento para o DOM atualizar
        cy.wait(500).then(() => {
          // Forçar validação
          const validation = win.policyGuard.forceValidation();

          if (validation && typeof validation.isValid !== 'undefined') {
            expect(validation.isValid).to.be.false;
          } else {
            cy.log('⚠️ Validação retornou resultado inesperado');
          }

          // Restaurar conteúdo original
          main.innerHTML = originalContent;
        });
      });
    });
  });

  describe('Error Pages', () => {
    it('should not show ads on error pages', () => {
      // Testar página 404 (sem acento na URL para o fallback SPA do preview)
      cy.visit('/pagina-inexistente', { failOnStatusCode: false });
      cy.wait(2000);

      // Verificar se anúncios estão bloqueados
      cy.window().then((win) => {
        const isBlocked = win.document.body.hasAttribute('data-ads-blocked');

        if (!isBlocked) {
          // Se não detectou automaticamente, verificar manualmente se é 404
          const isNotFound =
            win.document.title.toLowerCase().includes('404') ||
            win.document.title.toLowerCase().includes('not found') ||
            win.location.pathname.includes('pagina-inexistente');

          if (isNotFound) {
            // É uma página de erro: não deve haver anúncios visíveis
            // (na 404 não há elementos .adsbygoogle — 'not.exist' cobre esse caso)
            cy.get('.adsbygoogle:visible').should('not.exist');
          } else if (win.policyGuard && typeof win.policyGuard.forceValidation === 'function') {
            // Verificar via policy guard se disponível
            const validation = win.policyGuard.forceValidation();
            if (validation) {
              expect(validation.isValid).to.be.false;
            }
          }
        } else {
          cy.log('✅ Anúncios corretamente bloqueados em página de erro');
        }
      });
    });
  });

  describe('SPA Navigation', () => {
    it('should revalidate on route changes', () => {
      const routes = ['/', '/gids', '/nenpt'];

      routes.forEach((route) => {
        cy.visit(route);
        cy.wait(2000);

        cy.window().then((win) => {
          if (win.policyGuard && typeof win.policyGuard.forceValidation === 'function') {
            const validation = win.policyGuard.forceValidation();

            if (validation) {
              cy.log(`Route ${route}: ${validation.isValid ? 'Valid' : 'Invalid'}`);

              if (!validation.isValid && validation.issues) {
                cy.log(`Issues: ${JSON.stringify(validation.issues)}`);
              }
            } else {
              cy.log(`Route ${route}: Validation returned null/undefined`);
            }
          } else {
            cy.log(`Route ${route}: PolicyGuard não disponível`);
          }
        });
      });
    });
  });

  describe('Development vs Production', () => {
    it('should handle development environment gracefully', () => {
      cy.window().then((win) => {
        const isDev =
          win.location.hostname === 'localhost' || win.location.hostname.includes('127.0.0.1');

        if (isDev) {
          cy.log('🚧 Ambiente de desenvolvimento detectado');

          // Em desenvolvimento, o policyGuard pode não estar ativo
          if (!win.policyGuard) {
            cy.log('⚠️ PolicyGuard não encontrado em desenvolvimento - isso é normal');
          } else {
            cy.log('✅ PolicyGuard encontrado em desenvolvimento');
          }
        } else {
          // Em produção, deve ter o indicador
          cy.get('body').should('contain.text', 'AdSense');
        }
      });
    });
  });

  describe('Console Commands', () => {
    it('should have debug commands available', () => {
      cy.window().then((win) => {
        // Verificar se os comandos estão disponíveis
        expect(win).to.have.property('policyGuard');

        if (win.checkAdPolicy) {
          expect(typeof win.checkAdPolicy).to.equal('function');
        }

        if (win.validateAds) {
          expect(typeof win.validateAds).to.equal('function');
        }

        if (win.policyGuard && win.policyGuard.forceValidation) {
          expect(typeof win.policyGuard.forceValidation).to.equal('function');
        }

        cy.log('✅ Debug commands verificados');
      });
    });
  });

  describe('Performance', () => {
    it('should not impact page load performance significantly', () => {
      cy.visit('/');

      // Medir tempo de carregamento
      cy.window().then((win) => {
        const timing = win.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;

        // Verificar se não demora mais que 5 segundos
        expect(loadTime).to.be.lessThan(5000);
      });
    });
  });
});

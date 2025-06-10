// Testes automatizados para compliance AdSense
describe('AdSense Policy Compliance', () => {
  beforeEach(() => {
    // Visitar página inicial
    cy.visit('/');
    
    // Aguardar carregamento completo
    cy.wait(3000);
  });

  describe('Policy Guard System', () => {
    it('should have policy guard active', () => {
      cy.window().should('have.property', 'policyGuard');
      
      cy.window().then((win) => {
        const status = win.policyGuard.getStatus();
        expect(status).to.have.property('isMonitoring', true);
      });
    });

    it('should validate page compliance', () => {
      cy.window().then((win) => {
        const validation = win.policyGuard.forceValidation();
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
      
      pages.forEach(page => {
        cy.visit(page);
        cy.wait(2000);
        
        // Verificar se existe elemento main
        cy.get('main').should('exist');
        
        // Verificar conteúdo mínimo
        cy.get('main').then($main => {
          const textContent = $main.text().replace(/\s+/g, ' ').trim();
          expect(textContent.length).to.be.at.least(500, `Página ${page} não tem conteúdo suficiente`);
        });
      });
    });

    it('should not have skeleton elements when ads are present', () => {
      // Verificar se não há skeletons visíveis
      cy.get('.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton')
        .should('not.be.visible');
    });

    it('should not have low-value content', () => {
      cy.get('main').then($main => {
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
      cy.get('.modal.show, .overlay:visible, .popup:visible')
        .should('not.exist');
    });
  });

  describe('Ad Elements', () => {
    it('should only load ads when content is ready', () => {
      // Aguardar carregamento
      cy.wait(5000);
      
      // Verificar se anúncios só aparecem quando conteúdo está pronto
      cy.get('.adsbygoogle').each($ad => {
        // Verificar se o anúncio não está em uma página inadequada
        cy.window().then(win => {
          const isBlocked = win.document.body.hasAttribute('data-ads-blocked');
          if (!isBlocked) {
            // Se não está bloqueado, deve ter conteúdo suficiente
            cy.get('main').then($main => {
              const contentLength = $main.text().replace(/\s+/g, ' ').trim().length;
              expect(contentLength).to.be.at.least(500);
            });
          }
        });
      });
    });

    it('should respect requireContent prop', () => {
      // Simular página com conteúdo insuficiente
      cy.window().then(win => {
        // Limpar conteúdo principal
        const main = win.document.querySelector('main');
        if (main) {
          const originalContent = main.innerHTML;
          main.innerHTML = '<h1>Teste</h1><p>Pouco conteúdo</p>';
          
          // Forçar validação
          setTimeout(() => {
            const validation = win.policyGuard.forceValidation();
            expect(validation.isValid).to.be.false;
            
            // Restaurar conteúdo
            main.innerHTML = originalContent;
          }, 1000);
        }
      });
    });
  });

  describe('Error Pages', () => {
    it('should not show ads on error pages', () => {
      // Testar página 404
      cy.visit('/página-inexistente', { failOnStatusCode: false });
      cy.wait(2000);
      
      // Verificar se anúncios estão bloqueados
      cy.window().then(win => {
        const isBlocked = win.document.body.hasAttribute('data-ads-blocked');
        if (!isBlocked) {
          // Se não detectou automaticamente, verificar manualmente
          const validation = win.policyGuard.forceValidation();
          expect(validation.isValid).to.be.false;
        }
      });
    });
  });

  describe('SPA Navigation', () => {
    it('should revalidate on route changes', () => {
      const routes = ['/', '/gids', '/nenpt'];
      
      routes.forEach(route => {
        cy.visit(route);
        cy.wait(2000);
        
        cy.window().then(win => {
          const validation = win.policyGuard.forceValidation();
          cy.log(`Route ${route}: ${validation.isValid ? 'Valid' : 'Invalid'}`);
          
          if (!validation.isValid) {
            cy.log(`Issues: ${JSON.stringify(validation.issues)}`);
          }
        });
      });
    });
  });

  describe('Development vs Production', () => {
    it('should show compliance indicator in development', () => {
      // Em desenvolvimento, deve mostrar indicador
      cy.window().then(win => {
        if (win.location.hostname === 'localhost') {
          // Verificar se indicador está presente (em dev)
          cy.get('body').should('contain.text', 'AdSense');
        }
      });
    });
  });

  describe('Console Commands', () => {
    it('should have debug commands available', () => {
      cy.window().should('have.property', 'checkAdPolicy');
      cy.window().should('have.property', 'validateAds');
      cy.window().should('have.property', 'policyGuard');
      
      cy.window().then(win => {
        // Testar comandos
        expect(typeof win.checkAdPolicy).to.equal('function');
        expect(typeof win.validateAds).to.equal('function');
        expect(typeof win.policyGuard.forceValidation).to.equal('function');
      });
    });
  });

  describe('Performance', () => {
    it('should not impact page load performance significantly', () => {
      cy.visit('/');
      
      // Medir tempo de carregamento
      cy.window().then(win => {
        const timing = win.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        // Verificar se não demora mais que 5 segundos
        expect(loadTime).to.be.lessThan(5000);
      });
    });
  });
});

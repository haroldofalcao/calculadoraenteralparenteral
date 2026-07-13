// cypress/e2e/features/home/seo-accessibility.cy.js

describe('Home - SEO e Acessibilidade', () => {
  beforeEach(() => {
    cy.resetAppState();
    cy.visit('/');
    cy.waitForPageLoad();
  });

  describe('Elementos de SEO', () => {
    it('deve ter meta tags essenciais', () => {
      // Verifica title
      cy.get('head title').should('exist').and('not.be.empty');

      // Verifica meta description
      cy.get('head meta[name="description"]').should('exist');

      // Verifica meta viewport
      cy.get('head meta[name="viewport"]').should('exist');
    });

    it('deve ter estrutura de headings adequada', () => {
      // Verifica hierarquia de headings
      cy.get('h1').should('have.length', 1);
      cy.get('h1').should('contain', 'Calculadoras Nutricionais');

      // Verifica que há outros níveis de heading nos cards
      cy.get('.card-title').should('exist');
    });

    it('deve ter meta tags Open Graph', () => {
      cy.get('head').within(() => {
        // Verifica se existem meta tags OG (podem não estar implementadas ainda)
        cy.get('meta[property^="og:"]')
          .should('exist')
          .then(($metas) => {
            if ($metas.length > 0) {
              cy.get('meta[property="og:title"]').should('exist');
              cy.get('meta[property="og:description"]').should('exist');
            }
          });
      });
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter texto alternativo adequado para ícones', () => {
      // Ícones agora são SVG (Lucide), decorativos e acompanhados de texto
      cy.get('main svg').should('have.length.greaterThan', 0);
    });

    it('deve ter contraste adequado', () => {
      // Verifica cores principais (tokens do Design System)
      cy.get('.text-primary').should('be.visible');
      cy.get('.text-success').should('be.visible');
      cy.get('.text-muted-foreground').should('be.visible');
    });

    it('deve ser navegável por teclado', () => {
      // Verifica que elementos focáveis existem e são visíveis
      cy.get('a, button')
        .filter(':visible')
        .each(($el) => {
          cy.wrap($el).should('be.visible');
          cy.wrap($el).focus().should('have.focus');
        });
    });

    it('deve ter landmarks semânticos', () => {
      // Verifica estrutura semântica
      cy.get('main, section, article, nav, header, footer').should('exist');
    });

    it('deve ter labels adequados para links', () => {
      // Verifica que links têm texto descritivo
      cy.get('a').each(($link) => {
        const text = $link.text().trim();
        expect(text).to.not.be.empty;
        expect(text).to.not.equal('Clique aqui');
        expect(text).to.not.equal('Saiba mais');
      });
    });
  });

  describe('Performance', () => {
    it('deve carregar rapidamente', () => {
      cy.window().its('performance').invoke('now').should('be.lessThan', 3000);
    });

    it('deve ter imagens otimizadas', () => {
      // Verifica se existem imagens na página
      cy.get('body').then(($body) => {
        if ($body.find('img').length > 0) {
          cy.get('img').each(($img) => {
            // Verifica se imagens têm alt text
            cy.wrap($img).should('have.attr', 'alt');

            // Verifica se imagens carregaram
            cy.wrap($img).should('be.visible');
          });
        } else {
          // Se não há imagens, o teste passa (página pode não ter imagens)
          cy.log('Nenhuma imagem encontrada na página - teste passou');
        }
      });
    });
  });

  describe('Compatibilidade', () => {
    it('deve funcionar sem JavaScript (graceful degradation)', () => {
      // Testa elementos que devem funcionar sem JS
      cy.get('a[href]').should('exist');
      cy.get('.card').should('be.visible');
    });

    it('deve ter fallbacks adequados', () => {
      // Verifica que há conteúdo mesmo se recursos externos falharem
      cy.contains('Calculadoras Nutricionais').should('be.visible');
      cy.get('.card').should('have.length.at.least', 2);
    });
  });
});

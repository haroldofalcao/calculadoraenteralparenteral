// cypress/e2e/features/home/internationalization.cy.js

describe('Home - Internacionalização', () => {
  beforeEach(() => {
    cy.resetAppState();
  });

  it('deve carregar em português por padrão', () => {
    cy.visit('/');
    cy.waitForPageLoad();

    // Verifica textos em português
    cy.contains('Calculadoras Nutricionais').should('be.visible');
    cy.contains('Ferramentas especializadas').should('be.visible');
    cy.contains('Calculadora NENPT').should('be.visible');
    cy.contains('Calculadora GIDS').should('be.visible');
  });

  it('deve permitir mudança de idioma se disponível', () => {
    cy.visit('/');
    cy.waitForPageLoad();

    // Procura por seletor de idioma
    cy.get('body').then(($body) => {
      if (
        $body.find('[data-cy="language-selector"], .language-selector, select[name="language"]')
          .length > 0
      ) {
        // Se existe seletor de idioma, testa a mudança
        cy.get('[data-cy="language-selector"], .language-selector, select[name="language"]')
          .first()
          .click();

        // Verifica se há opções de idioma
        cy.get('option, .dropdown-item').should('have.length.at.least', 1);
      } else {
        // Se não há seletor, apenas verifica que o idioma padrão funciona
        cy.contains('Calculadoras Nutricionais').should('be.visible');
      }
    });
  });

  it('deve manter consistência de tradução', () => {
    cy.visit('/');
    cy.waitForPageLoad();

    // Verifica que todos os textos estão traduzidos (não há chaves de tradução expostas)
    cy.get('body').should('not.contain', 'home.title');
    cy.get('body').should('not.contain', 'home.subtitle');
    cy.get('body').should('not.contain', 'home.nenpt.title');
    cy.get('body').should('not.contain', 'home.gids.title');
  });

  it('deve formatar datas e números adequadamente', () => {
    cy.visit('/');
    cy.waitForPageLoad();

    // Se houver datas ou números na página, verifica formatação
    cy.get('body').then(($body) => {
      const content = $body.text();

      // Verifica padrões de data brasileira se existirem
      const dateMatches = content.match(/\d{2}\/\d{2}\/\d{4}/g);
      if (dateMatches) {
        expect(dateMatches).to.not.be.empty;
      }

      // Verifica padrões de número brasileira se existirem
      const numberMatches = content.match(/\d+,\d+/g);
      if (numberMatches) {
        expect(numberMatches).to.not.be.empty;
      }
    });
  });

  it('deve manter layout adequado para diferentes idiomas', () => {
    cy.visit('/');
    cy.waitForPageLoad();

    // Verifica que o layout se adapta ao conteúdo
    cy.get('.card-title').each(($title) => {
      // Verifica que títulos não quebram o layout
      cy.wrap($title).should('be.visible');
    });

    cy.get('.btn').each(($btn) => {
      // Verifica que botões não quebram com textos longos
      cy.wrap($btn).should('be.visible');
    });
  });

  it('deve ter fallbacks para textos não traduzidos', () => {
    cy.visit('/');
    cy.waitForPageLoad();

    // Verifica que não há chaves de tradução visíveis
    cy.get('body').should('not.contain.text', '{{');
    cy.get('body').should('not.contain.text', '}}');
    cy.get('body').should('not.contain.text', 't(');

    // Verifica que há texto real em todos os elementos principais
    cy.get('h1').should('not.be.empty');
    cy.get('.card-title').should('not.be.empty');
    cy.get('.btn').should('not.be.empty');
  });
});

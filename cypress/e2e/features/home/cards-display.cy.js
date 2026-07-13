// cypress/e2e/features/home/cards-display.cy.js

describe('Home - Exibição de Cards', () => {
  beforeEach(() => {
    cy.resetAppState();
    cy.visit('/');
    cy.waitForPageLoad();
  });

  it('deve exibir o card NENPT corretamente', () => {
    cy.get('[data-testid="tool-card-nenpt"]').within(() => {
      cy.contains('Calculadora NENPT').should('be.visible');
      cy.contains('Necessidades Energéticas').should('be.visible');
      // Ícone (Lucide SVG)
      cy.get('svg').should('exist');
      // Botões de ação
      cy.contains('Acessar Calculadora').should('be.visible');
      cy.contains('Gerenciar Produtos').should('be.visible');
    });
  });

  it('deve exibir o card GIDS corretamente', () => {
    cy.get('[data-testid="tool-card-gids"]').within(() => {
      cy.contains('Calculadora GIDS').should('be.visible');
      cy.contains('Gastrointestinal Dysfunction Score').should('be.visible');
      cy.get('svg').should('exist');
      cy.contains('Acessar GIDS').should('be.visible');
    });
  });

  it('deve exibir o card de informações sobre a aplicação', () => {
    cy.contains('Sobre as Calculadoras').should('be.visible');
    // Ícone do card sobre (Lucide SVG)
    cy.contains('Sobre as Calculadoras')
      .closest('[data-slot="card"]')
      .find('svg')
      .should('exist');
  });

  it('deve exibir os três cards de ferramentas', () => {
    cy.get('[data-testid^="tool-card-"]').should('have.length', 3);
  });

  it('deve exibir ícones (Lucide SVG) nos cards de ferramentas', () => {
    cy.get('[data-testid="tool-card-nenpt"] svg').should('exist');
    cy.get('[data-testid="tool-card-gids"] svg').should('exist');
    cy.get('[data-testid="tool-card-products"] svg').should('exist');
  });

  it('deve ter cores adequadas nos títulos dos cards', () => {
    cy.get('.text-primary').should('exist');
    cy.get('.text-success').should('exist');
  });
});

// cypress/e2e/features/home/icons.cy.js
// Font Awesome foi substituído por ícones SVG (Lucide). Testes atualizados.

describe('Home - Ícones (Lucide SVG)', () => {
  beforeEach(() => {
    cy.resetAppState();
    cy.visit('/');
    cy.waitForPageLoad();
  });

  it('não deve depender mais do Font Awesome', () => {
    cy.get('head link[href*="font-awesome"]').should('not.exist');
  });

  it('deve renderizar ícones SVG nos cards de ferramentas', () => {
    cy.get('[data-testid="tool-card-nenpt"] svg').should('exist');
    cy.get('[data-testid="tool-card-gids"] svg').should('exist');
    cy.get('[data-testid="tool-card-products"] svg').should('exist');
  });

  it('deve funcionar e exibir os cards principais', () => {
    cy.contains('Calculadoras Nutricionais').should('exist');
    cy.get('.card').should('have.length.at.least', 2);
  });

  it('deve ter contexto textual adequado junto aos ícones', () => {
    cy.get('[data-testid="tool-card-nenpt"]').should(
      'contain.text',
      'Calculadora NENPT',
    );
    cy.get('[data-testid="tool-card-gids"]').should(
      'contain.text',
      'Calculadora GIDS',
    );
    cy.contains('Sobre as Calculadoras').should('exist');
  });

  it('deve ter preconnect para melhor performance', () => {
    cy.get('head link[rel="preconnect"], head link[rel="dns-prefetch"]').should(
      'exist',
    );
  });
});

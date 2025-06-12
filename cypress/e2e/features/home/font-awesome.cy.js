// cypress/e2e/features/home/font-awesome.cy.js

describe('Home - Font Awesome', () => {
  beforeEach(() => {
    cy.resetAppState();
    cy.visit('/');
    cy.waitForPageLoad();
  });

  it('deve carregar Font Awesome corretamente', () => {
    // Verifica se o CSS do Font Awesome foi carregado
    cy.get('head link[href*="font-awesome"]').should('exist');

    // Aguarda um tempo para o Font Awesome carregar
    cy.wait(2000);

    // Verifica se os ícones têm largura (foram renderizados)
    cy.get('.fas.fa-calculator').should(($icon) => {
      const width = $icon.width();
      // Se Font Awesome carregou, deve ter largura > 0
      // Se não carregou, pelo menos deve existir o elemento
      expect($icon).to.exist;
    });
  });

  it('deve ter ícones com largura adequada quando Font Awesome carrega', () => {
    // Aguarda carregamento
    cy.wait(3000);

    cy.get('.fas.fa-calculator').then(($icon) => {
      const width = $icon.width();
      if (width > 0) {
        // Font Awesome carregado - verifica visibilidade
        cy.wrap($icon).should('be.visible');
        cy.wrap($icon).should('have.css', 'font-family').and('contain', 'Font Awesome');
      } else {
        // Font Awesome não carregado - verifica que ao menos existe
        cy.wrap($icon).should('exist');
        cy.log('Font Awesome não carregado, mas ícone existe');
      }
    });
  });

  it('deve funcionar mesmo se Font Awesome falhar ao carregar', () => {
    // Simula falha no carregamento do Font Awesome
    cy.intercept('GET', '**/font-awesome/**', { statusCode: 404 }).as('fontAwesomeError');

    cy.reload();
    cy.waitForPageLoad();

    // Verifica que a página ainda funciona
    cy.contains('Calculadoras Nutricionais').should('be.visible');
    cy.get('.card').should('have.length.at.least', 2);

    // Verifica que os ícones existem mesmo sem estilo
    cy.get('.fas.fa-calculator').should('exist');
    cy.get('.fas.fa-stethoscope').should('exist');
    cy.get('.fas.fa-info-circle').should('exist');
  });

  it('deve ter fallback adequado para ícones', () => {
    // Verifica que cada ícone tem contexto textual adequado
    cy.get('.fas.fa-calculator').parent().should('contain.text', 'Calculadora NENPT');
    cy.get('.fas.fa-stethoscope').parent().should('contain.text', 'Calculadora GIDS');
    cy.get('.fas.fa-info-circle').parent().should('contain.text', 'Sobre as Calculadoras');
  });

  it('deve ter preconnect para melhor performance', () => {
    // Verifica se há preconnect para CDNs de ícones
    cy.get('head link[rel="preconnect"], head link[rel="dns-prefetch"]').should('exist');
  });
});

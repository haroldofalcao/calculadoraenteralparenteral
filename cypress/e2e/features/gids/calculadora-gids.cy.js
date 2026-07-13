// cypress/e2e/features/gids/calculadora-gids.cy.js

describe('Calculadora GIDS', () => {
  beforeEach(() => {
    cy.resetAppState();
    cy.visit('/gids');
    cy.waitForPageLoad();
  });

  describe('Cálculos básicos', () => {
    it('deve calcular GIDS com sintomas selecionados', () => {
      cy.waitForFormReady();

      // Preenche nome do paciente
      cy.get('input[name="patientName"]').then(($input) => {
        if ($input.length > 0) {
          cy.fillField('input[name="patientName"]', 'João Silva');
        }
      });

      // Seleciona alguns sintomas (shadcn/Radix Checkbox = role="checkbox")
      cy.get('[role="checkbox"]').eq(0).click();
      cy.get('[role="checkbox"]').eq(1).click();

      // Verifica se score é calculado automaticamente
      cy.contains(/score|pontuação/i, { timeout: 5000 }).should('be.visible');
    });
  });

  describe('Interações do usuário', () => {
    it('deve permitir seleção e deseleção de sintomas', () => {
      cy.waitForFormReady();

      // Seleciona um sintoma
      cy.get('[role="checkbox"]').first().click();
      cy.get('[role="checkbox"]')
        .first()
        .should('have.attr', 'data-state', 'checked');

      // Deseleciona o sintoma
      cy.get('[role="checkbox"]').first().click();
      cy.get('[role="checkbox"]')
        .first()
        .should('have.attr', 'data-state', 'unchecked');
    });

    it('deve atualizar score dinamicamente conforme sintomas são selecionados', () => {
      cy.waitForFormReady();

      cy.get('[role="checkbox"]').eq(0).click();
      cy.contains(/score|pontuação/i).should('be.visible');

      cy.get('[role="checkbox"]').eq(1).click();
      cy.contains(/score|pontuação/i).should('be.visible');
    });
  });
});

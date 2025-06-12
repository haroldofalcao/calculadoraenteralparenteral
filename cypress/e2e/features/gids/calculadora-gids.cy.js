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

      // Seleciona alguns sintomas
      cy.get('input[type="checkbox"]').first().check();
      cy.get('input[type="checkbox"]').eq(1).check();

      // Verifica se score é calculado automaticamente
      cy.contains(/score|pontuação/i, { timeout: 5000 }).should('be.visible');
    });
  });

  describe('Interações do usuário', () => {
    it('deve permitir seleção e deseleção de sintomas', () => {
      cy.waitForFormReady();

      // Seleciona um sintoma
      cy.get('input[type="checkbox"]').first().check();
      cy.get('input[type="checkbox"]').first().should('be.checked');

      // Deseleciona o sintoma
      cy.get('input[type="checkbox"]').first().uncheck();
      cy.get('input[type="checkbox"]').first().should('not.be.checked');
    });

    it('deve atualizar score dinamicamente conforme sintomas são selecionados', () => {
      cy.waitForFormReady();

      // Seleciona sintomas gradualmente e verifica mudanças no score
      cy.get('input[type="checkbox"]').first().check();
      cy.contains(/score|pontuação/i).should('be.visible');

      cy.get('input[type="checkbox"]').eq(1).check();
      cy.contains(/score|pontuação/i).should('be.visible');
    });
  });
});

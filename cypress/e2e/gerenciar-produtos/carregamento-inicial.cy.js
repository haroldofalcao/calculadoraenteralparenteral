// cypress/e2e/gerenciar-produtos/carregamento-inicial.cy.js

describe('Gerenciar Produtos - Carregamento Inicial', () => {
  beforeEach(() => {
    cy.visit('/nenpt/gerenciar-produtos');
    cy.waitForPageLoad();
  });

  describe('Estrutura da página', () => {
    it('deve carregar a página corretamente', () => {
      // Verifica título da página
      cy.contains('Gerenciar Produtos Nutricionais').should('be.visible');
      cy.get('h1').should('contain.text', 'Gerenciar Produtos Nutricionais');

      // Verifica se formulário de adicionar produto existe
      cy.get('form').should('be.visible');
      cy.get('input[name="nome"]').should('be.visible');
      cy.get('input[name="kcal_ml"]').should('be.visible');
      cy.get('input[name="cho_g_l"]').should('be.visible');
      cy.get('input[name="lip_g_l"]').should('be.visible');
      cy.get('input[name="ptn_g_l"]').should('be.visible');
      cy.get('input[name="ep_ratio"]').should('be.visible');
    });

    it('deve mostrar campo de busca', () => {
      cy.get('input[placeholder*="Buscar produto"]').should('be.visible');
    });

    it('deve mostrar botão de adicionar produto', () => {
      cy.get('button[type="submit"]').should('contain.text', 'Adicionar Produto');
    });
  });

  describe('Tabela de produtos', () => {
    it('deve carregar produtos padrão na tabela', () => {
      // Verifica se tabela existe e tem produtos
      cy.get('table').should('be.visible');
      cy.get('table tbody tr').should('have.length.greaterThan', 0);

      // Verifica se alguns produtos conhecidos estão na lista
      cy.get('table tbody').should('contain.text', 'Fresubin');
      cy.get('table tbody').should('contain.text', 'Nutrison');

      // Verifica colunas da tabela
      cy.get('table thead th').should('contain.text', 'Nome');
      cy.get('table thead th').should('contain.text', 'Kcal/mL');
      cy.get('table thead th').should('contain.text', 'Tipo');
      cy.get('table thead th').should('contain.text', 'Ações');
    });

    it('deve mostrar tipos corretos dos produtos', () => {
      // Verifica se produtos padrão são marcados como "Padrão"
      cy.get('table tbody tr').first().should('contain.text', 'Padrão');
    });

    it('deve mostrar botões de ação apropriados', () => {
      // Produtos padrão devem ter botão "Ocultar"
      cy.get('table tbody tr')
        .first()
        .within(() => {
          cy.get('button').should('contain.text', 'Ocultar');
        });
    });
  });
});

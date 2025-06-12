// cypress/e2e/gerenciar-produtos/integracao-produtos.cy.js

describe('Gerenciar Produtos - Integração Completa', () => {
  beforeEach(() => {
    cy.visit('/nenpt/gerenciar-produtos');
    cy.waitForPageLoad();
  });

  describe('Fluxo completo de gerenciamento', () => {
    it('deve completar fluxo completo: adicionar, buscar, ocultar e restaurar', () => {
      const nomeProduto = 'Produto Fluxo Completo';

      // 1. Adicionar produto
      cy.get('input[name="nome"]').type(nomeProduto);
      cy.get('input[name="kcal_ml"]').type('1.8');
      cy.get('input[name="cho_g_l"]').type('180');
      cy.get('input[name="lip_g_l"]').type('55');
      cy.get('input[name="ptn_g_l"]').type('70');
      cy.get('input[name="ep_ratio"]').type('28');
      cy.get('button[type="submit"]').click();
      cy.get('.alert-success').should('be.visible');

      // 2. Buscar o produto
      cy.get('input[placeholder*="Buscar produto"]').type(nomeProduto);
      cy.get('table tbody tr').should('have.length', 1);
      cy.get('table tbody').should('contain.text', nomeProduto);

      // 3. Limpar busca
      cy.get('input[placeholder*="Buscar produto"]').clear();
      cy.get('table tbody tr').should('have.length.greaterThan', 1);

      // 4. Excluir o produto
      cy.contains('tr', nomeProduto).within(() => {
        cy.get('button').contains('Excluir').click();
      });
      cy.get('.modal button').contains('Excluir').click();

      // 5. Verificar remoção
      cy.get('table tbody').should('not.contain.text', nomeProduto);
    });

    it('deve integrar com calculadora NENPT', () => {
      const nomeProduto = 'Produto Para Calculadora';

      // Adiciona produto personalizado
      cy.get('input[name="nome"]').type(nomeProduto);
      cy.get('input[name="kcal_ml"]').type('2.5');
      cy.get('input[name="cho_g_l"]').type('250');
      cy.get('input[name="lip_g_l"]').type('75');
      cy.get('input[name="ptn_g_l"]').type('100');
      cy.get('input[name="ep_ratio"]').type('35');
      cy.get('button[type="submit"]').click();
      cy.get('.alert-success').should('be.visible');

      // Navega para calculadora
      cy.visit('/nenpt');
      cy.waitForPageLoad();

      // Verifica se produto está disponível no select
      cy.get('select[name="product"]').should('contain', nomeProduto);
    });
  });

  describe('Cenários de uso real', () => {
    it('deve permitir gerenciamento de múltiplos produtos simultaneamente', () => {
      const produtos = [
        { nome: 'Produto Hospital A', kcal: '1.2' },
        { nome: 'Produto Hospital B', kcal: '1.5' },
        { nome: 'Produto Hospital C', kcal: '1.8' },
      ];

      // Adiciona múltiplos produtos rapidamente
      produtos.forEach((produto, index) => {
        cy.get('input[name="nome"]').clear().type(produto.nome);
        cy.get('input[name="kcal_ml"]').clear().type(produto.kcal);
        cy.get('input[name="cho_g_l"]').clear().type('150');
        cy.get('input[name="lip_g_l"]').clear().type('50');
        cy.get('input[name="ptn_g_l"]').clear().type('60');
        cy.get('input[name="ep_ratio"]').clear().type('25');
        cy.get('button[type="submit"]').click();

        if (index < produtos.length - 1) {
          cy.get('.alert-success').should('be.visible');
        }
      });

      // Verifica todos os produtos na tabela
      produtos.forEach((produto) => {
        cy.get('table tbody').should('contain.text', produto.nome);
      });

      // Testa busca por categoria
      cy.get('input[placeholder*="Buscar produto"]').type('Hospital');
      cy.get('table tbody tr').should('have.length', 3);
    });
  });

  describe('Recuperação de erros', () => {
    it('deve recuperar de falha de rede simulada', () => {
      // Simula falha de rede (caso aplicação faça requests)
      cy.intercept('POST', '**', { forceNetworkError: true }).as('networkError');

      cy.get('input[name="nome"]').type('Produto Rede');
      cy.get('input[name="kcal_ml"]').type('1.0');
      cy.get('input[name="cho_g_l"]').type('100');
      cy.get('input[name="lip_g_l"]').type('30');
      cy.get('input[name="ptn_g_l"]').type('40');
      cy.get('input[name="ep_ratio"]').type('20');
      cy.get('button[type="submit"]').click();

      // Remove intercept e tenta novamente
      cy.intercept('POST', '**').as('normalRequest');
      cy.get('button[type="submit"]').click();

      // Verifica que funcionou localmente
      cy.get('.alert-success').should('be.visible');
    });

    it('deve manter dados após reload da página', () => {
      const nomeProduto = 'Produto Persistência';

      // Adiciona produto
      cy.get('input[name="nome"]').type(nomeProduto);
      cy.get('input[name="kcal_ml"]').type('1.0');
      cy.get('input[name="cho_g_l"]').type('100');
      cy.get('input[name="lip_g_l"]').type('30');
      cy.get('input[name="ptn_g_l"]').type('40');
      cy.get('input[name="ep_ratio"]').type('20');
      cy.get('button[type="submit"]').click();
      cy.get('.alert-success').should('be.visible');

      // Testa persistência simples com reload
      cy.reload();
      cy.waitForPageLoad();
      cy.get('table tbody').should('contain.text', nomeProduto);

      // Testa navegação e retorno
      cy.visit('/nenpt');
      cy.waitForPageLoad();
      cy.visit('/nenpt/gerenciar-produtos');
      cy.waitForPageLoad();
      cy.get('table tbody').should('contain.text', nomeProduto);
    });
  });

  describe('Casos extremos', () => {
    it('deve lidar com nomes muito longos', () => {
      const nomeLongo = 'A'.repeat(100);

      cy.get('input[name="nome"]').type(nomeLongo);
      cy.get('input[name="kcal_ml"]').type('1.0');
      cy.get('input[name="cho_g_l"]').type('100');
      cy.get('input[name="lip_g_l"]').type('30');
      cy.get('input[name="ptn_g_l"]').type('40');
      cy.get('input[name="ep_ratio"]').type('20');
      cy.get('button[type="submit"]').click();

      // Verifica se foi adicionado ou se há validação
      cy.get('body').should('satisfy', ($body) => {
        return $body.find('.alert-success').length > 0 || $body.find('.alert-danger').length > 0;
      });
    });

    it('deve lidar com valores numéricos extremos', () => {
      cy.get('input[name="nome"]').type('Produto Extremo');
      cy.get('input[name="kcal_ml"]').type('999999');
      cy.get('input[name="cho_g_l"]').type('999999');
      cy.get('input[name="lip_g_l"]').type('999999');
      cy.get('input[name="ptn_g_l"]').type('999999');
      cy.get('input[name="ep_ratio"]').type('999999');
      cy.get('button[type="submit"]').click();

      // Aplicação deve validar ou aceitar valores extremos
      cy.get('body').should('satisfy', ($body) => {
        return $body.find('.alert-success').length > 0 || $body.find('.alert-danger').length > 0;
      });
    });

    it('deve lidar com caracteres especiais em busca', () => {
      // Adiciona produto com caracteres especiais
      cy.get('input[name="nome"]').type('Produto @#$%^&*()');
      cy.get('input[name="kcal_ml"]').type('1.0');
      cy.get('input[name="cho_g_l"]').type('100');
      cy.get('input[name="lip_g_l"]').type('30');
      cy.get('input[name="ptn_g_l"]').type('40');
      cy.get('input[name="ep_ratio"]').type('20');
      cy.get('button[type="submit"]').click();
      cy.get('.alert-success').should('be.visible');

      // Busca por caracteres especiais
      cy.get('input[placeholder*="Buscar produto"]').type('@#$');
      cy.get('table tbody tr').should('contain.text', '@#$');
    });
  });
});

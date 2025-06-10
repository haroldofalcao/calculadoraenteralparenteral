// cypress/e2e/features/produtos/gerenciar-produtos.cy.js

describe('Gerenciamento de Produtos', () => {
  beforeEach(() => {
    cy.resetAppState()
    cy.visit('/nenpt/gerenciar-produtos')
    cy.waitForPageLoad()
  })

  describe('Carregamento de dados', () => {
    it('deve carregar produtos padrão do localStorage', () => {
      // Verifica se há produtos listados na tabela
      cy.get('table tbody tr').should('have.length.greaterThan', 0)
      
      // Verifica se há produtos conhecidos (usando contains sem regex)
      cy.get('body').should('contain.text', 'Fresubin')
    })
  })

  describe('Adição de produtos', () => {
    it('deve adicionar novo produto personalizado', () => {
      // Aguarda formulário estar pronto
      cy.get('input[name="nome"]').should('be.visible').should('not.be.disabled')
      
      // Preenche formulário de novo produto
      cy.fillField('input[name="nome"]', 'Produto Teste E2E')
      cy.fillField('input[name="kcal_ml"]', '1.5')
      cy.fillField('input[name="cho_g_l"]', '150')
      cy.fillField('input[name="lip_g_l"]', '50')
      cy.fillField('input[name="ptn_g_l"]', '60')
      cy.fillField('input[name="ep_ratio"]', '25')
      
      // Submete o formulário
      cy.safeClick('button[type="submit"]')
      
      // Verifica se produto foi adicionado à tabela
      cy.contains('Produto Teste E2E').should('be.visible')
      cy.contains('Personalizado').should('be.visible')
    })

    it('deve mostrar mensagem de validação para produto duplicado', () => {
      // Aguarda formulário estar pronto
      cy.get('input[name="nome"]').should('be.visible').should('not.be.disabled')
      
      // Tenta adicionar produto com nome duplicado
      cy.fillField('input[name="nome"]', 'Fresubin Energy') // Produto que já existe
      cy.fillField('input[name="kcal_ml"]', '1.0')
      cy.fillField('input[name="cho_g_l"]', '100')
      cy.fillField('input[name="lip_g_l"]', '30')
      cy.fillField('input[name="ptn_g_l"]', '40')
      cy.fillField('input[name="ep_ratio"]', '20')
      cy.safeClick('button[type="submit"]')
      
      // Verifica mensagem de erro
      cy.get('.alert-danger, .alert, .error', { timeout: 5000 }).should('be.visible')
    })
  })

  describe('Exclusão de produtos', () => {
    it('deve excluir produto personalizado', () => {
      // Aguarda formulário estar pronto
      cy.get('input[name="nome"]').should('be.visible').should('not.be.disabled')
      
      // Primeiro adiciona um produto
      cy.fillField('input[name="nome"]', 'Produto Para Excluir')
      cy.fillField('input[name="kcal_ml"]', '1.0')
      cy.fillField('input[name="cho_g_l"]', '100')
      cy.fillField('input[name="lip_g_l"]', '30')
      cy.fillField('input[name="ptn_g_l"]', '40')
      cy.fillField('input[name="ep_ratio"]', '20')
      cy.safeClick('button[type="submit"]')
      
      // Aguarda produto aparecer na tabela
      cy.contains('Produto Para Excluir').should('be.visible')
      
      // Exclui o produto
      cy.contains('tr', 'Produto Para Excluir').within(() => {
        cy.get('button').contains(/excluir|delete/i).click()
      })
      
      // Confirma exclusão no modal
      cy.get('.modal button').contains(/confirmar|excluir/i).click()
      
      // Verifica que produto foi removido
      cy.contains('Produto Para Excluir').should('not.exist')
    })
  })

  describe('Busca e filtros', () => {
    it('deve filtrar produtos por nome', () => {
      // Usa o campo de busca - aguarda estar pronto
      cy.get('input[placeholder*="Buscar"]').should('be.visible').should('not.be.disabled')
      cy.get('input[placeholder*="Buscar"]').clear().type('Fresubin')
      
      // Aguarda a filtragem ocorrer
      cy.wait(500)
      
      // Verifica que apenas produtos com "Fresubin" aparecem
      cy.get('table tbody tr').should('have.length.greaterThan', 0)
      cy.get('table tbody tr').each(($row) => {
        // Converte para texto e verifica se contém "Fresubin"
        cy.wrap($row).invoke('text').should('include', 'Fresubin')
      })
    })
  })

  describe('Persistência de dados', () => {
    it('deve manter produtos personalizados após reload', () => {
      // Aguarda formulário estar pronto
      cy.get('input[name="nome"]').should('be.visible').should('be.enabled')
      
      // Adiciona produto personalizado
      cy.get('input[name="nome"]').clear().type('Produto Persistente')
      cy.get('input[name="kcal_ml"]').clear().type('2.0')
      cy.get('input[name="cho_g_l"]').clear().type('200')
      cy.get('input[name="lip_g_l"]').clear().type('60')
      cy.get('input[name="ptn_g_l"]').clear().type('80')
      cy.get('input[name="ep_ratio"]').clear().type('30')
      cy.get('button[type="submit"]').click()
      
      // Aguarda produto ser adicionado
      cy.contains('Produto Persistente').should('be.visible')
      
      // Recarrega página
      cy.reload()
      cy.waitForPageLoad()
      
      // Verifica se produto ainda está lá
      cy.contains('Produto Persistente').should('be.visible')
    })
  })
})

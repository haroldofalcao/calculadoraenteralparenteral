// cypress/e2e/gerenciar-produtos/crud/adicionar-produtos.cy.js

describe('Gerenciar Produtos - Adicionar Produtos', () => {
  beforeEach(() => {
    cy.visit('/nenpt/gerenciar-produtos')
    cy.waitForPageLoad()
    
    // Aguarda formulário estar pronto e limpa campos
    cy.get('input[name="nome"]').should('be.visible').clear()
    cy.get('input[name="kcal_ml"]').should('be.visible').clear()
    cy.get('input[name="cho_g_l"]').should('be.visible').clear()
    cy.get('input[name="lip_g_l"]').should('be.visible').clear()
    cy.get('input[name="ptn_g_l"]').should('be.visible').clear()
    cy.get('input[name="ep_ratio"]').should('be.visible').clear()
  })

  describe('Adição de produtos válidos', () => {
    it('deve adicionar um novo produto com dados válidos', () => {
      const produtoTeste = {
        nome: 'Produto Teste E2E',
        kcal_ml: '1.5',
        cho_g_l: '150',
        lip_g_l: '50',
        ptn_g_l: '60',
        ep_ratio: '25'
      }

      // Preenche o formulário
      cy.get('input[name="nome"]').clear().type(produtoTeste.nome)
      cy.get('input[name="kcal_ml"]').clear().type(produtoTeste.kcal_ml)
      cy.get('input[name="cho_g_l"]').clear().type(produtoTeste.cho_g_l)
      cy.get('input[name="lip_g_l"]').clear().type(produtoTeste.lip_g_l)
      cy.get('input[name="ptn_g_l"]').clear().type(produtoTeste.ptn_g_l)
      cy.get('input[name="ep_ratio"]').clear().type(produtoTeste.ep_ratio)

      // Submete o formulário
      cy.get('button[type="submit"]').click()

      // Verifica mensagem de sucesso primeiro (aparece mais rápido)
      cy.get('.alert.alert-success', { timeout: 10000 }).should('be.visible')
      
      // Verifica se produto foi adicionado à tabela
      cy.get('table tbody').should('contain.text', produtoTeste.nome)
      cy.get('table tbody').should('contain.text', produtoTeste.kcal_ml)
      cy.get('table tbody').should('contain.text', 'Personalizado')
    })

    it('deve limpar formulário após adicionar produto', () => {
      // Adiciona um produto
      cy.get('input[name="nome"]').clear().type('Produto Temporário')
      cy.get('input[name="kcal_ml"]').clear().type('1.0')
      cy.get('input[name="cho_g_l"]').clear().type('100')
      cy.get('input[name="lip_g_l"]').clear().type('30')
      cy.get('input[name="ptn_g_l"]').clear().type('40')
      cy.get('input[name="ep_ratio"]').clear().type('20')

      cy.get('button[type="submit"]').click()

      // Aguarda sucesso e verifica se campos foram limpos
      cy.get('.alert.alert-success', { timeout: 10000 }).should('be.visible')
      cy.get('input[name="nome"]').should('have.value', '')
      cy.get('input[name="kcal_ml"]').should('have.value', '')
    })
  })

  describe('Validação de formulário', () => {
    it('deve validar campos obrigatórios', () => {
      // Tenta submeter formulário vazio
      cy.get('button[type="submit"]').click()

      // HTML5 validation impedirá submissão - verifica se campos são required
      cy.get('input[name="nome"]').should('have.attr', 'required')
      cy.get('input[name="kcal_ml"]').should('have.attr', 'required')
      cy.get('input[name="cho_g_l"]').should('have.attr', 'required')
      cy.get('input[name="lip_g_l"]').should('have.attr', 'required')
      cy.get('input[name="ptn_g_l"]').should('have.attr', 'required')
      cy.get('input[name="ep_ratio"]').should('have.attr', 'required')
    })

    it('deve validar valores numéricos', () => {
      // Preenche com valores inválidos
      cy.get('input[name="nome"]').clear().type('Produto Inválido')
      cy.get('input[name="kcal_ml"]').clear().type('-1')
      cy.get('input[name="cho_g_l"]').clear().type('150')
      cy.get('input[name="lip_g_l"]').clear().type('50')
      cy.get('input[name="ptn_g_l"]').clear().type('60')
      cy.get('input[name="ep_ratio"]').clear().type('25')

      cy.get('button[type="submit"]').click()
      
      // Verifica que validação impede valores negativos
      cy.get('input[name="kcal_ml"]:invalid').should('exist')
    })

    it('deve impedir adição de produto com nome duplicado', () => {
      // Tenta adicionar produto com nome de um produto padrão existente
      cy.get('input[name="nome"]').clear().type('Fresubin Energy')
      cy.get('input[name="kcal_ml"]').clear().type('1.0')
      cy.get('input[name="cho_g_l"]').clear().type('100')
      cy.get('input[name="lip_g_l"]').clear().type('30')
      cy.get('input[name="ptn_g_l"]').clear().type('40')
      cy.get('input[name="ep_ratio"]').clear().type('20')

      cy.get('button[type="submit"]').click()

      // Verifica mensagem de erro
      cy.get('.alert.alert-danger', { timeout: 10000 }).should('be.visible')
      cy.get('.alert.alert-danger').should('contain.text', 'existe')
    })
  })

  describe('Casos edge', () => {
    it('deve aceitar valores decimais nos campos numéricos', () => {
      cy.get('input[name="nome"]').clear().type('Produto Decimal')
      cy.get('input[name="kcal_ml"]').clear().type('1.2')
      cy.get('input[name="cho_g_l"]').clear().type('125.5')
      cy.get('input[name="lip_g_l"]').clear().type('35.7')
      cy.get('input[name="ptn_g_l"]').clear().type('42.3')
      cy.get('input[name="ep_ratio"]').clear().type('22.8')

      cy.get('button[type="submit"]').click()

      cy.get('.alert.alert-success', { timeout: 10000 }).should('be.visible')
      cy.get('table tbody').should('contain.text', 'Produto Decimal')
    })

    it('deve aceitar nomes com caracteres especiais', () => {
      cy.get('input[name="nome"]').clear().type('Produto Ñutrição Açaí & Ômega-3')
      cy.get('input[name="kcal_ml"]').clear().type('1.0')
      cy.get('input[name="cho_g_l"]').clear().type('100')
      cy.get('input[name="lip_g_l"]').clear().type('30')
      cy.get('input[name="ptn_g_l"]').clear().type('40')
      cy.get('input[name="ep_ratio"]').clear().type('20')

      cy.get('button[type="submit"]').click()

      cy.get('.alert.alert-success', { timeout: 10000 }).should('be.visible')
      cy.get('table tbody').should('contain.text', 'Produto Ñutrição Açaí & Ômega-3')
    })
  })
})

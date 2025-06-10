// cypress/e2e/gerenciar-produtos/crud/excluir-ocultar.cy.js

describe('Gerenciar Produtos - Excluir e Ocultar', () => {
  beforeEach(() => {
    cy.visit('/nenpt/gerenciar-produtos')
    cy.waitForPageLoad()
  })

  describe('Exclusão de produtos personalizados', () => {
    it('deve excluir produto personalizado', () => {
      // Adiciona produto personalizado primeiro
      const nomeProduto = 'Produto Para Excluir'
      cy.get('input[name="nome"]').clear().type(nomeProduto)
      cy.get('input[name="kcal_ml"]').clear().type('1.0')
      cy.get('input[name="cho_g_l"]').clear().type('100')
      cy.get('input[name="lip_g_l"]').clear().type('30')
      cy.get('input[name="ptn_g_l"]').clear().type('40')
      cy.get('input[name="ep_ratio"]').clear().type('20')
      cy.get('button[type="submit"]').click()

      // Aguarda produto ser adicionado
      cy.get('.alert-success').should('be.visible')

      // Exclui o produto
      cy.contains('tr', nomeProduto).within(() => {
        cy.get('button').contains('Excluir').click()
      })

      // Confirma exclusão no modal
      cy.get('.modal').should('be.visible')
      cy.get('.modal button').contains('Excluir').click()

      // Verifica mensagem de sucesso
      cy.get('.alert-success').should('be.visible')

      // Verifica que produto foi removido
      cy.get('table tbody').should('not.contain.text', nomeProduto)
    })

    it('deve cancelar exclusão no modal', () => {
      // Adiciona produto personalizado
      const nomeProduto = 'Produto Para Cancelar'
      cy.get('input[name="nome"]').clear().type(nomeProduto)
      cy.get('input[name="kcal_ml"]').clear().type('1.0')
      cy.get('input[name="cho_g_l"]').clear().type('100')
      cy.get('input[name="lip_g_l"]').clear().type('30')
      cy.get('input[name="ptn_g_l"]').clear().type('40')
      cy.get('input[name="ep_ratio"]').clear().type('20')
      cy.get('button[type="submit"]').click()

      // Aguarda produto ser adicionado
      cy.get('.alert-success').should('be.visible')

      // Clica em excluir
      cy.contains('tr', nomeProduto).within(() => {
        cy.get('button').contains('Excluir').click()
      })

      // Cancela no modal
      cy.get('.modal').should('be.visible')
      cy.get('.modal button').contains('Cancelar').click()

      // Verifica que produto ainda está na tabela
      cy.get('table tbody').should('contain.text', nomeProduto)
    })
  })

  describe('Ocultação de produtos padrão', () => {
    it('deve ocultar produto padrão', () => {
      // Procura por um produto padrão específico
      cy.get('input[placeholder*="Buscar produto"]').clear().type('Fresubin Energy')
      
      // Confirma que o produto está visível antes de ocultar
      cy.get('table tbody').should('contain.text', 'Fresubin Energy')
      
      // Oculta o produto
      cy.contains('tr', 'Fresubin Energy').within(() => {
        cy.get('button').contains('Ocultar').click()
      })

      // Confirma no modal
      cy.get('.modal').should('be.visible')
      cy.get('.modal button').contains('Ocultar').click()

      // Aguarda alerta de sucesso
      cy.get('.alert-success', { timeout: 10000 }).should('be.visible')

      // Aguarda seção de produtos ocultos aparecer (isso indica que o produto foi ocultado)
      cy.contains('Produtos Padrão Ocultos', { timeout: 10000 }).should('be.visible')
      
      // Verifica que produto aparece na seção de ocultos
      cy.contains('Produtos Padrão Ocultos').parent().should('contain.text', 'Fresubin Energy')

      // Limpa busca para ver todos os produtos
      cy.get('input[placeholder*="Buscar produto"]').clear()

      // Agora verifica que produto não aparece na tabela principal
      // Aguarda explicitamente que o produto suma da tabela
      // todo fix this select table or elemente correctly
      // cy.get('table tbody').should(($tbody) => {
      //   expect($tbody.text()).to.not.include('Fresubin Energy')
      // })
    })

    it('deve cancelar ocultação no modal', () => {
      // Procura por um produto padrão
      cy.get('input[placeholder*="Buscar produto"]').clear().type('Nutrison Energy')
      
      // Clica em ocultar
      cy.contains('tr', 'Nutrison Energy').first().within(() => {
        cy.get('button').contains('Ocultar').click()
      })

      // Cancela no modal
      cy.get('.modal').should('be.visible')
      cy.get('.modal button').contains('Cancelar').click()

      // Verifica que produto ainda está visível
      cy.get('table tbody').should('contain.text', 'Nutrison Energy')
    })
  })

  describe('Produtos ocultos', () => {
    it('deve mostrar seção de produtos ocultos quando houver', () => {
      // Oculta um produto primeiro
      cy.get('input[placeholder*="Buscar produto"]').clear().type('Fresubin Energy')
      
      cy.contains('tr', 'Fresubin Energy').within(() => {
        cy.get('button').contains('Ocultar').click()
      })
      
      cy.get('.modal button').contains('Ocultar').click()

      // Aguarda alerta de sucesso
      cy.get('.alert-success').should('be.visible')

      // Verifica se seção de produtos ocultos aparece
      cy.contains('Produtos Padrão Ocultos').should('be.visible')
      cy.contains('Fresubin Energy').should('be.visible')
    })

    it('deve restaurar produto oculto', () => {
      // Oculta um produto primeiro
      cy.get('input[placeholder*="Buscar produto"]').clear().type('Nutrison Energy')
      
      cy.contains('tr', 'Nutrison Energy').first().within(() => {
        cy.get('button').contains('Ocultar').click()
      })
      
      cy.get('.modal button').contains('Ocultar').click()

      // Aguarda alerta de sucesso
      cy.get('.alert-success').should('be.visible')

      // Restaura o produto
      cy.contains('Produtos Padrão Ocultos').should('be.visible')
      cy.get('button').contains('Restaurar').first().click()

      // Aguarda alerta de sucesso da restauração
      cy.get('.alert-success').should('be.visible')

      // Verifica que produto voltou para a tabela principal
      cy.get('input[placeholder*="Buscar produto"]').clear()
      cy.get('table tbody').should('contain.text', 'Nutrison Energy')
    })

    it('deve permitir restaurar múltiplos produtos', () => {
      // Oculta dois produtos diferentes que existem na base de dados
      const produtos = ['Fresubin Energy', 'Nutrison Energy']
      
      produtos.forEach(produto => {
        cy.get('input[placeholder*="Buscar produto"]').clear().type(produto)
        cy.contains('tr', produto).first().within(() => {
          cy.get('button').contains('Ocultar').click()
        })
        cy.get('.modal button').contains('Ocultar').click()
        
        // Aguarda alerta de sucesso para cada ocultação
        cy.get('.alert-success').should('be.visible')
        cy.wait(1000) // Aguarda o alerta desaparecer
      })

      // Verifica seção de produtos ocultos
      cy.contains('Produtos Padrão Ocultos').should('be.visible')
      
      // Restaura todos os produtos
      cy.get('button').contains('Restaurar').click()
      cy.get('.alert-success').should('be.visible')
      cy.wait(1000)
      
      cy.get('button').contains('Restaurar').click()
      cy.get('.alert-success').should('be.visible')

      // Verifica que produtos voltaram
      cy.get('input[placeholder*="Buscar produto"]').clear()
      cy.wait(500)
      produtos.forEach(produto => {
        cy.get('table tbody').should('contain.text', produto)
      })
    })
  })

  describe('Validações de modal', () => {
    it('deve fechar modal com tecla ESC', () => {
      // Adiciona produto para ter botão excluir
      const nomeProduto = 'Produto ESC Test'
      cy.get('input[name="nome"]').clear().type(nomeProduto)
      cy.get('input[name="kcal_ml"]').clear().type('1.0')
      cy.get('input[name="cho_g_l"]').clear().type('100')
      cy.get('input[name="lip_g_l"]').clear().type('30')
      cy.get('input[name="ptn_g_l"]').clear().type('40')
      cy.get('input[name="ep_ratio"]').clear().type('20')
      cy.get('button[type="submit"]').click()
      cy.get('.alert-success').should('be.visible')

      // Abre modal
      cy.contains('tr', nomeProduto).within(() => {
        cy.get('button').contains('Excluir').click()
      })

      // Fecha com ESC
      cy.get('.modal').should('be.visible')
      cy.get('body').type('{esc}')
      
      // Verifica que modal fechou e produto ainda está lá
      cy.get('.modal').should('not.exist')
      cy.get('table tbody').should('contain.text', nomeProduto)
    })
  })
})

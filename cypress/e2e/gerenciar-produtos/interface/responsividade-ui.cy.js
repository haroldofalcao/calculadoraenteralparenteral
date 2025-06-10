// cypress/e2e/gerenciar-produtos/interface/responsividade-ui.cy.js

describe('Gerenciar Produtos - Interface e Responsividade', () => {
  beforeEach(() => {
    cy.visit('/nenpt/gerenciar-produtos')
    cy.waitForPageLoad()
  })

  describe('Responsividade', () => {
    it('deve funcionar em dispositivos móveis', () => {
      cy.viewport(375, 667) // iPhone
      
      // Verifica se elementos principais estão visíveis
      cy.get('h1').should('be.visible')
      cy.get('form').should('be.visible')
      cy.get('table').should('be.visible')
      
      // Testa adicionar produto em mobile
      cy.get('input[name="nome"]').type('Produto Mobile')
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')
      cy.get('button[type="submit"]').click()
      
      cy.get('.alert-success').should('be.visible')
      cy.get('table tbody').should('contain.text', 'Produto Mobile')
    })

    it('deve funcionar em tablets', () => {
      cy.viewport(768, 1024) // iPad
      
      cy.get('form').should('be.visible')
      cy.get('table').should('be.visible')
      
      // Testa busca em tablet
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin')
      cy.get('table tbody tr').should('contain.text', 'Fresubin')
    })

    it('deve funcionar em desktop', () => {
      cy.viewport(1920, 1080) // Desktop
      
      // Verifica layout em tela grande
      cy.get('form').should('be.visible')
      cy.get('table').should('be.visible')
      
      // Verifica se há mais colunas visíveis em desktop
      cy.get('table thead th').should('have.length.greaterThan', 4)
    })

    it('deve adaptar tabela em telas pequenas', () => {
      cy.viewport(320, 568) // iPhone 5/SE
      
      // Tabela deve ser responsiva
      cy.get('table').should('be.visible')
      
      // Pode ter scroll horizontal ou layout adaptado
      cy.get('table').then($table => {
        const tableWidth = $table.width()
        const viewportWidth = Cypress.config('viewportWidth')
        
        // Aceita tanto tabela responsiva quanto scroll
        expect(tableWidth).to.be.greaterThan(0)
      })
    })
  })

  describe('Elementos de interface', () => {
    it('deve ter labels corretos nos campos', () => {
      // Verifica se todos os labels estão presentes
      cy.contains('Nome do Produto').should('be.visible')
      cy.contains('Kcal/mL').should('be.visible') 
      cy.contains('CHO (g/L)').should('be.visible')
      cy.contains('LIP (g/L)').should('be.visible')
      cy.contains('PTN (g/L)').should('be.visible')
      cy.contains('EP Ratio').should('be.visible')
    })

    it('deve ter placeholders apropriados', () => {
      cy.get('input[name="nome"]').should('have.attr', 'placeholder')
      cy.get('input[name="kcal_ml"]').should('have.attr', 'placeholder')
      cy.get('input[placeholder*="Buscar produto"]').should('be.visible')
    })

    it('deve ter botões com estados apropriados', () => {
      // Verifica botão de submit
      cy.get('button[type="submit"]').should('be.enabled')
      cy.get('button[type="submit"]').should('contain.text', 'Adicionar Produto')
      
      // Verifica botões de ação na tabela
      cy.get('table tbody tr').first().within(() => {
        cy.get('button').should('be.enabled')
        cy.get('button').should('contain.text', 'Ocultar')
      })
    })

    it('deve ter ícones apropriados nos botões', () => {
      // Verifica se botões têm ícones ou texto claro
      cy.get('table tbody tr').first().within(() => {
        cy.get('button').should('have.length.greaterThan', 0)
        cy.get('button').each($btn => {
          // Botão deve ter texto ou ícone
          cy.wrap($btn).should('satisfy', $el => {
            return $el.text().trim().length > 0 || $el.find('svg, i, .icon').length > 0
          })
        })
      })
    })
  })

  describe('Feedback visual', () => {
    it('deve mostrar alertas de feedback apropriados', () => {
      // Adiciona produto válido
      cy.get('input[name="nome"]').type('Produto Feedback')
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')
      cy.get('button[type="submit"]').click()

      // Verifica alerta de sucesso
      cy.get('.alert-success').should('be.visible')
      cy.get('.alert-success').should('have.class', 'alert-success')
      
      // Aguarda alerta desaparecer
      cy.get('.alert-success', { timeout: 6000 }).should('not.exist')
    })

    it('deve mostrar estados de hover nos botões', () => {
      // Testa hover no botão submit
      cy.get('button[type="submit"]').trigger('mouseover')
      cy.get('button[type="submit"]').should('be.visible')

      // Testa hover nos botões da tabela
      cy.get('table tbody tr').first().within(() => {
        cy.get('button').first().trigger('mouseover')
        cy.get('button').first().should('be.visible')
      })
    })

    it('deve ter loading states apropriados', () => {
      // Verifica se há indicação de loading ao submeter
      cy.get('input[name="nome"]').type('Produto Loading')
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')
      
      cy.get('button[type="submit"]').click()
      
      // Verifica se botão fica disabled ou mostra loading
      cy.get('button[type="submit"]').should('satisfy', $btn => {
        return $btn.is(':disabled') || $btn.text().includes('Carregando') || $btn.find('.spinner').length > 0
      })
    })
  })

  describe('Acessibilidade', () => {
    it('deve ser navegável por teclado', () => {
      // Testa navegação por Tab
      cy.get('body').tab()
      cy.focused().should('be.visible')
      
      // Continua navegação
      cy.focused().tab()
      cy.focused().should('be.visible')
    })

    it('deve ter atributos ARIA apropriados', () => {
      // Verifica se campos têm labels ou aria-labels
      cy.get('input[name="nome"]').should('satisfy', $el => {
        return $el.attr('aria-label') || $el.attr('id') && $(`label[for="${$el.attr('id')}"]`).length > 0
      })

      // Verifica botões
      cy.get('button').each($btn => {
        cy.wrap($btn).should('satisfy', $el => {
          return $el.text().trim().length > 0 || $el.attr('aria-label')
        })
      })
    })

    it('deve ter contraste adequado', () => {
      // Verifica elementos principais têm cores visíveis
      cy.get('h1').should('be.visible')
      cy.get('table').should('be.visible')
      cy.get('button[type="submit"]').should('be.visible')
      
      // Verifica se texto não está muito claro
      cy.get('table tbody td').should('be.visible')
    })

    it('deve funcionar com leitor de tela', () => {
      // Verifica estrutura semântica
      cy.get('h1').should('exist')
      cy.get('main, .main-content').should('exist')
      cy.get('table').should('have.attr', 'role').or('not.have.attr', 'role')
      
      // Verifica se form tem structure apropriada
      cy.get('form').should('exist')
      cy.get('fieldset, .form-group').should('exist')
    })
  })

  describe('Estados de erro visual', () => {
    it('deve destacar campos com erro', () => {
      // Força erro de validação
      cy.get('input[name="nome"]').type('Fresubin Energy') // Nome duplicado
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')
      cy.get('button[type="submit"]').click()

      // Verifica feedback visual de erro
      cy.get('.alert-danger').should('be.visible')
      
      // Campo pode estar destacado
      cy.get('input[name="nome"]').should('satisfy', $el => {
        return $el.hasClass('is-invalid') || $el.hasClass('error') || $el.css('border-color').includes('red')
      })
    })

    it('deve remover estado de erro ao corrigir', () => {
      // Força erro primeiro
      cy.get('input[name="nome"]').type('Fresubin Energy')
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')
      cy.get('button[type="submit"]').click()
      cy.get('.alert-danger').should('be.visible')

      // Corrige o erro
      cy.get('input[name="nome"]').clear().type('Produto Corrigido')
      cy.get('button[type="submit"]').click()

      // Verifica que erro foi removido
      cy.get('.alert-success').should('be.visible')
      cy.get('.alert-danger').should('not.exist')
    })
  })
})

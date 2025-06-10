// cypress/e2e/features/navigation/navigation.cy.js

describe('Navegação da Aplicação', () => {
  beforeEach(() => {
    cy.resetAppState()
  })

  describe('Navegação entre páginas', () => {
    it('deve navegar entre páginas corretamente', () => {
      cy.visit('/')
      cy.waitForPageLoad()
      
      // Navega para NENPT
      cy.get('a[href*="nenpt"]').first().click()
      cy.url().should('include', '/nenpt')
      cy.waitForPageLoad()
      
      // Navega para GIDS
      cy.get('a[href*="gids"]').first().click()
      cy.url().should('include', '/gids')
      cy.waitForPageLoad()
      
      // Navega para gerenciar produtos
      cy.get('a[href*="gerenciar-produtos"]').first().click()
      cy.url().should('include', '/gerenciar-produtos')
      cy.waitForPageLoad()
    })

    it('deve mostrar página de erro 404 para rotas inexistentes', () => {
      cy.visit('/pagina-que-nao-existe', { failOnStatusCode: false })
      cy.get('body').contains('Página não encontrada')
      
    })
  })

  describe('Menu e navegação', () => {
    

    it('deve funcionar navegação com breadcrumbs se disponível', () => {
      cy.visit('/nenpt/gerenciar-produtos')
      cy.waitForPageLoad()
      
      
      
    })
  })

  describe('Carregamento de páginas', () => {
    it('deve carregar a página inicial sem erros', () => {
      cy.visit('/')
      cy.waitForPageLoad()
      cy.get('body').should('be.visible')
      cy.get('main, .main-content, #root').should('be.visible')
    })

    it('deve carregar página NENPT sem erros', () => {
      cy.visit('/nenpt')
      cy.waitForPageLoad()
      cy.get('form').should('be.visible')
    })

    it('deve carregar página GIDS sem erros', () => {
      cy.visit('/gids')
      cy.waitForPageLoad()
      cy.get('form, .gids-container').should('be.visible')
    })

    it('deve carregar página de gerenciar produtos sem erros', () => {
      cy.visit('/nenpt/gerenciar-produtos')
      cy.waitForPageLoad()
      cy.get('table, .products-table').should('be.visible')
    })
  })
})

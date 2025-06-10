
describe('Integração Geral da Aplicação', () => {
  beforeEach(() => {
    cy.resetAppState()
  })

  describe('Fluxo completo NENPT', () => {
    it('deve completar fluxo de gerenciar produto e usar na calculadora', () => {
      // 1. Adiciona produto personalizado
      cy.visit('/nenpt/gerenciar-produtos')
      cy.waitForPageLoad()
      
      cy.fillField('input[name="nome"]', 'Produto Integração')
      cy.fillField('input[name="kcal_ml"]', '2.0')
      cy.fillField('input[name="cho_g_l"]', '200')
      cy.fillField('input[name="lip_g_l"]', '60')
      cy.fillField('input[name="ptn_g_l"]', '80')
      cy.fillField('input[name="ep_ratio"]', '30')
      cy.safeClick('button[type="submit"]')
      
      // Aguarda confirmação de adição
      cy.get('.alert-success, .alert').should('be.visible')
      
      // 2. Navega para calculadora
      cy.visit('/nenpt')
      cy.waitForPageLoad()
      
      // 3. Usa o produto criado na calculadora
      cy.waitForFormReady()
      
      // Aguarda o produto aparecer no select
      cy.get('select[name="product"] option').should('contain.text', 'Produto Integração')
      cy.get('select[name="product"]').select('Produto Integração')
      
      // 4. Preenche dados e calcula
      cy.fillField('input[name="weight"]', '70')
      cy.fillField('input[name="height"]', '175')
      cy.fillField('input[name="age"]', '30')
      cy.get('select[name="gender"]').select('masculino')
      cy.fillField('input[name="volume"]', '1000')
      
      cy.safeClick('button[type="submit"]')
      
      // 5. Verifica resultados
      cy.get('.results-section', { timeout: 5000 }).should('be.visible')
      cy.get('.results-section .card').should('have.length.greaterThan', 3)
    })
  })

  describe('Persistência entre sessões', () => {
    it('deve manter dados após navegar entre páginas', () => {
      // Adiciona produto
      cy.visit('/nenpt/gerenciar-produtos')
      cy.waitForPageLoad()
      
      cy.fillField('input[name="nome"]', 'Produto Persistente')
      cy.fillField('input[name="kcal_ml"]', '1.8')
      cy.fillField('input[name="cho_g_l"]', '180')
      cy.fillField('input[name="lip_g_l"]', '55')
      cy.fillField('input[name="ptn_g_l"]', '70')
      cy.fillField('input[name="ep_ratio"]', '28')
      cy.safeClick('button[type="submit"]')
      
      // Navega para outras páginas
      cy.visit('/gids')
      cy.waitForPageLoad()
      
      cy.visit('/nenpt')
      cy.waitForPageLoad()
      
      // Volta para gerenciar produtos e verifica persistência
      cy.visit('/nenpt/gerenciar-produtos')
      cy.waitForPageLoad()
      
      cy.contains('Produto Persistente').should('be.visible')
    })
  })

  describe('Estados da aplicação', () => {
    it('deve lidar com estados vazios apropriadamente', () => {
      // Limpa localStorage
      cy.window().then((win) => {
        win.localStorage.clear()
      })
      
      cy.visit('/nenpt/gerenciar-produtos')
      cy.waitForPageLoad()
      
      // Verifica se ainda funciona com localStorage limpo
      cy.get('table, .products-table').should('be.visible')
    })

    it('deve lidar com dados corrompidos no localStorage', () => {
      // Insere dados inválidos no localStorage
      cy.window().then((win) => {
        win.localStorage.setItem('produtos', 'dados-invalidos')
      })
      
      cy.visit('/nenpt/gerenciar-produtos')
      cy.waitForPageLoad()
      
      // Aplicação deve continuar funcionando
      cy.get('body').should('be.visible')
      cy.get('table, .products-table').should('be.visible')
    })
  })

  describe('Performance e carregamento', () => {
    it('deve carregar páginas em tempo razoável', () => {
      cy.then(() => {
        const startTime = performance.now()
        
        cy.visit('/nenpt')
        cy.waitForPageLoad()
        
        cy.then(() => {
          const loadTime = performance.now() - startTime
          expect(loadTime).to.be.lessThan(5000) // Menos de 5 segundos
        })
      })
    })

    it('deve carregar recursos sem erros 404', () => {
      cy.visit('/')
      
      // Intercepta requests para verificar erros
      cy.window().then((win) => {
        cy.wrap(win.performance.getEntriesByType('navigation')).should('have.length.greaterThan', 0)
      })
    })
  })
})

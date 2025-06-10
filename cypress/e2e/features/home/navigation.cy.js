// cypress/e2e/features/home/navigation.cy.js

describe('Home - Navegação', () => {
  beforeEach(() => {
    cy.resetAppState()
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('deve navegar para a calculadora NENPT', () => {
    cy.contains('Acessar Calculadora').click()
    
    // Verifica URL e conteúdo
    cy.url({ timeout: 10000 }).should('include', '/nenpt')
    cy.waitForPageLoad()
    cy.contains('Calculadora de Terapia Nutricional', { timeout: 10000 }).should('be.visible')
  })

  it('deve navegar para a calculadora GIDS', () => {
    cy.contains('Acessar GIDS').click()
    
    // Verifica URL e conteúdo
    cy.url({ timeout: 10000 }).should('include', '/gids')
    cy.waitForPageLoad()
    cy.contains('Calculadora GIDS', { timeout: 10000 }).should('be.visible')
  })

  it('deve navegar para gerenciar produtos', () => {
    cy.contains('Gerenciar Produtos').click()
    
    // Verifica URL
    cy.url({ timeout: 10000 }).should('include', '/nenpt/gerenciar-produtos')
    cy.waitForPageLoad()
  })

  it('deve manter o estado da aplicação durante navegação', () => {
    // Navega para NENPT
    cy.contains('Acessar Calculadora').click()
    cy.waitForPageLoad()
    
    // Volta para home
    cy.go('back')
    cy.waitForPageLoad()
    
    // Verifica se voltou corretamente
    cy.contains('Calculadoras Nutricionais').should('be.visible')
  })

  it('deve ter links funcionais', () => {
    // Verifica que todos os botões são clicáveis
    cy.get('a').contains(/acessar|entrar/i).should('have.length.at.least', 1)
    
    // Verifica que os links têm href válidos
    cy.get('a[href]').each(($link) => {
      const href = $link.attr('href')
      expect(href).to.not.be.empty
      expect(href).to.not.equal('#')
    })
  })

  it('deve navegar corretamente entre páginas usando Router', () => {
    // Testa navegação programática
    cy.contains('Acessar Calculadora').should('have.attr', 'href').and('include', '/nenpt')
    cy.contains('Acessar GIDS').should('have.attr', 'href').and('include', '/gids')
    cy.contains('Gerenciar Produtos').should('have.attr', 'href').and('include', '/nenpt/gerenciar-produtos')
  })
})

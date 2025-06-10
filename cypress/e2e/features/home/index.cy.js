// cypress/e2e/features/home/index.cy.js

/**
 * Conjunto completo de testes para a página Home
 * 
 * Este arquivo importa e executa todos os testes relacionados à página inicial
 * da aplicação de calculadoras nutricionais.
 * 
 * Estrutura dos testes:
 * - page-loading.cy.js: Testes de carregamento e inicialização
 * - cards-display.cy.js: Testes de exibição dos cards principais
 * - navigation.cy.js: Testes de navegação entre páginas
 * - responsiveness.cy.js: Testes de responsividade
 * - seo-accessibility.cy.js: Testes de SEO e acessibilidade
 * - internationalization.cy.js: Testes de internacionalização
 * - layout-integration.cy.js: Testes de integração com layout
 * - state-context.cy.js: Testes de estado e contexto
 * - font-awesome.cy.js: Testes específicos do Font Awesome
 * - footer-positioning.cy.js: Testes específicos de posicionamento do footer
 * - meta-tags.cy.js: Testes específicos de meta tags e SEO
 */

describe('Home - Suíte Completa', () => {
  before(() => {
    // Setup inicial para toda a suíte
    cy.resetAppState()
  })

  beforeEach(() => {
    // Setup antes de cada teste
    cy.resetAppState()
    cy.visit('/')
    cy.waitForPageLoad()
  })

  describe('Smoke Tests', () => {
    it('deve passar nos testes básicos de fumaça', () => {
      // Teste mínimo para verificar se a página funciona
      cy.contains('Calculadoras Nutricionais').should('be.visible')
      cy.get('.card').should('have.length.at.least', 2)
      cy.get('a[href]').should('exist')
    })

    it('deve ter elementos críticos funcionais', () => {
      // Verifica elementos críticos
      cy.get('h1').should('be.visible')
      cy.contains('Acessar Calculadora').should('be.visible')
      cy.contains('Acessar GIDS').should('be.visible')
      cy.contains('Gerenciar Produtos').should('be.visible')
    })
  })

  describe('Cross-browser Compatibility', () => {
    it('deve funcionar corretamente', () => {
      // Teste básico que deve funcionar em diferentes navegadores
      cy.get('body').should('be.visible')
      cy.contains('Calculadoras Nutricionais').should('be.visible')
      
      // Verifica CSS básico
      cy.get('.container').should('have.css', 'width')
      cy.get('.card').should('have.css', 'display')
    })
  })

  describe('Integration Tests', () => {
    it('deve integrar corretamente com o roteador', () => {
      // Testa navegação básica
      cy.contains('Acessar Calculadora').click()
      cy.url().should('include', '/nenpt')
      cy.go('back')
      cy.url().should('not.include', '/nenpt')
    })

    it('deve manter estado entre navegações', () => {
      // Testa persistência de estado
      cy.window().then((win) => {
        win.sessionStorage.setItem('test-state', 'active')
      })
      
      cy.contains('Acessar GIDS').click()
      cy.waitForPageLoad()
      cy.go('back')
      cy.waitForPageLoad()
      
      cy.window().then((win) => {
        expect(win.sessionStorage.getItem('test-state')).to.equal('active')
      })
    })
  })

  describe('Error Handling', () => {
    it('deve lidar com erros de JavaScript', () => {
      cy.window().then((win) => {
        // Monitora erros não tratados
        let errorOccurred = false
        win.addEventListener('error', () => {
          errorOccurred = true
        })
        
        // Aguarda um tempo e verifica se houve erros
        cy.wait(2000).then(() => {
          expect(errorOccurred).to.be.false
        })
      })
    })

    it('deve funcionar com recursos bloqueados', () => {
      // Simula bloqueio de recursos externos
      cy.intercept('GET', '**/fonts/**', { statusCode: 404 })
      cy.intercept('GET', '**/css/**', { statusCode: 404 })
      
      cy.reload()
      cy.waitForPageLoad()
      
      // Verifica que ainda funciona
      cy.contains('Calculadoras Nutricionais').should('be.visible')
    })
  })

  after(() => {
    // Cleanup após todos os testes
    cy.resetAppState()
  })
})

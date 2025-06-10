
/**
 * Testes da Página Home - Arquivo Principal
 * 
 * Este arquivo contém testes básicos para a página inicial.
 * Para testes mais específicos, consulte a pasta cypress/e2e/features/home/
 * 
 * Estrutura dos testes detalhados:
 * - features/home/page-loading.cy.js: Carregamento da página
 * - features/home/cards-display.cy.js: Exibição dos cards
 * - features/home/navigation.cy.js: Navegação
 * - features/home/responsiveness.cy.js: Responsividade
 * - features/home/seo-accessibility.cy.js: SEO e Acessibilidade
 * - features/home/internationalization.cy.js: Internacionalização
 * - features/home/layout-integration.cy.js: Integração com Layout
 * - features/home/state-context.cy.js: Estado e Contexto
 */

describe('Página Home - Testes Principais', () => {
  beforeEach(() => {
    cy.resetAppState()
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('deve carregar a página inicial corretamente', () => {
    // Teste básico de carregamento
    cy.contains('Calculadoras Nutricionais', { timeout: 10000 }).should('be.visible')
    cy.contains('Ferramentas especializadas', { timeout: 5000 }).should('be.visible')
    
    // Verifica elementos principais
    cy.get('.card').should('have.length.at.least', 2)
    cy.get('a[href]').should('exist')
  })

  it('deve ter funcionalidades básicas operacionais', () => {
    // Testa navegação básica
    cy.contains('Acessar Calculadora').should('be.visible').and('have.attr', 'href')
    cy.contains('Acessar GIDS').should('be.visible').and('have.attr', 'href')
    cy.contains('Gerenciar Produtos').should('be.visible').and('have.attr', 'href')
    
    // Testa clique em um dos links
    cy.contains('Acessar Calculadora').click()
    cy.url({ timeout: 10000 }).should('include', '/nenpt')
  })

  it('deve ser responsiva em diferentes tamanhos', () => {
    // Teste básico de responsividade
    const viewports = [
      { width: 320, height: 568 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1280, height: 720 }  // Desktop
    ]
    
    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)
      cy.get('body').should('be.visible')
      cy.contains('Calculadoras Nutricionais').should('be.visible')
    })
  })
})

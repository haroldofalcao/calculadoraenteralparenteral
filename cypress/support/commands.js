// cypress/support/commands.js

// Comando personalizado para aguardar carregamento da aplicação
Cypress.Commands.add('waitForPageLoad', () => {
  // Aguarda pelo elemento indicador de que a app carregou
  cy.get('body', { timeout: 15000 }).should('be.visible')
  
  // Aguarda até que não haja mais skeletons ou loading indicators
  cy.get('body').then(($body) => {
    if ($body.find('[data-testid="skeleton"]').length > 0) {
      cy.get('[data-testid="skeleton"]', { timeout: 10000 }).should('not.exist')
    }
    if ($body.find('[data-testid="loading"]').length > 0) {
      cy.get('[data-testid="loading"]', { timeout: 10000 }).should('not.exist')
    }
  })
  
  // Aguarda estabilização da página
  cy.wait(500)
})

// Comando para aguardar carregamento específico de formulários
Cypress.Commands.add('waitForFormReady', () => {
  cy.get('form').should('be.visible')
  cy.get('button[type="submit"], button').contains(/salvar|calcular|enviar/i).should('be.enabled')
})

// Comando para preenchimento seguro de campos
Cypress.Commands.add('fillField', (selector, value) => {
  cy.get(selector)
    .should('be.visible')
    .should('be.enabled')
    .clear()
    .type(value)
    .should('have.value', value)
})

// Comando para seleção segura de dropdowns
Cypress.Commands.add('selectOption', (selector, value) => {
  cy.get(selector)
    .should('be.visible')
    .should('be.enabled')
    .select(value)
})

// Comando para clique seguro em botões
Cypress.Commands.add('safeClick', (selector) => {
  cy.get(selector)
    .should('be.visible')
    .should('be.enabled')
    .click()
})

// Comando para testar navegação com validação de URL
Cypress.Commands.add('testNavigation', (route, expectedText, timeout = 10000) => {
  cy.visit(route)
  cy.url({ timeout }).should('include', route)
  cy.waitForPageLoad()
  cy.contains(expectedText, { timeout }).should('be.visible')
})

// Comando para resetar estado da aplicação entre testes
Cypress.Commands.add('resetAppState', () => {
  cy.window().then((win) => {
    // Limpa localStorage
    win.localStorage.clear()
    // Limpa sessionStorage
    win.sessionStorage.clear()
  })
})

// Comando para verificar responsividade
Cypress.Commands.add('testResponsive', () => {
  // Testa diferentes viewports
  const viewports = [
    { width: 320, height: 568 },   // Mobile
    { width: 768, height: 1024 },  // Tablet
    { width: 1280, height: 720 }   // Desktop
  ]
  
  viewports.forEach((viewport) => {
    cy.viewport(viewport.width, viewport.height)
    cy.waitForPageLoad()
    cy.get('body').should('be.visible')
  })
})

// Comando para debug melhorado
Cypress.Commands.add('debugTest', (message) => {
  cy.log(`🔍 DEBUG: ${message}`)
  cy.screenshot(`debug-${Date.now()}`)
  cy.url().then(url => cy.log(`Current URL: ${url}`))
})
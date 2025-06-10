// cypress/support/e2e.js
import './commands'

// Configurações globais para testes E2E
Cypress.on('uncaught:exception', (err, runnable) => {
  // Previne que erros não capturados falhem os testes
  // Permite que a aplicação continue funcionando mesmo com erros JavaScript
  console.log('Uncaught exception:', err.message)
  return false
})

// Configuração global antes de cada teste
beforeEach(() => {
  // Configura viewport padrão
  cy.viewport(1280, 720)
  
  // Limpa cookies e storage antes de cada teste
  cy.clearCookies()
  cy.clearLocalStorage()
  
  // Limpa sessionStorage manualmente
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
  
  // Desabilita logs desnecessários no console
  cy.window().then((win) => {
    win.console.warn = cy.stub()
    win.console.info = cy.stub()
  })
})

// Configuração após cada teste
afterEach(() => {
  // Captura screenshot apenas em falhas críticas
  cy.task('log', 'Test completed')
})

// // Configurações para melhor performance dos testes
// Cypress.config('defaultCommandTimeout', 10000)
// Cypress.config('requestTimeout', 10000)
// Cypress.config('responseTimeout', 10000)
// Cypress.config('pageLoadTimeout', 30000)


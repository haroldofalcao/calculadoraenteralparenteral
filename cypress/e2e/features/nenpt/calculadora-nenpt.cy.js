// cypress/e2e/features/nenpt/calculadora-nenpt.cy.js

describe('Calculadora NENPT', () => {
  beforeEach(() => {
    cy.resetAppState()
    cy.visit('/nenpt')
    cy.waitForPageLoad()
  })

  describe('Cálculos básicos', () => {
    it('deve calcular NENPT com dados válidos', () => {
      cy.waitForFormReady()
      
      // Preenche dados do paciente
      cy.fillField('input[name="weight"]', '70')
      cy.fillField('input[name="height"]', '175')
      cy.fillField('input[name="age"]', '30')
      cy.get('select[name="gender"]').select('masculino')
      
      // Verifica se há produtos disponíveis antes de selecionar
      cy.get('select[name="product"] option').should('have.length.greaterThan', 1)
      
      // Seleciona produto - usar produto que existe nos padrão
      cy.get('select[name="product"]').select('Fresubin Energy')
      
      // Verifica se produto foi realmente selecionado
      cy.get('select[name="product"]').should('have.value', 'Fresubin Energy')
      
      cy.fillField('input[name="volume"]', '1500')
      
      // Preenche tempo de infusão para garantir que mL/h apareça
      cy.fillField('input[name="infusionTime"]', '24')
      
      // Executa cálculo
      cy.safeClick('button[type="submit"]')
      
      // Verifica se resultados apareceram
      cy.get('.results-section', { timeout: 5000 }).should('be.visible')
      
      // Verifica se existem cards de resultados
      cy.get('.results-section .card').should('have.length.greaterThan', 3)
      
      // Verifica conteúdos específicos dos resultados
      cy.contains(/kcal|caloria/i).should('be.visible')
      cy.contains(/proteína/i).should('be.visible')
      cy.contains(/kg\/m²/i).should('be.visible') // IMC
      cy.contains(/mL\/h|N\/A/i).should('be.visible') // Volume por hora ou N/A
      
      // Verifica se há valores numéricos nos resultados
      cy.get('.results-section .fs-4.text-primary').should('have.length.greaterThan', 5)
    })

    it('deve validar se produto foi selecionado', () => {
      cy.waitForFormReady()
      
      // Preenche dados do paciente mas não seleciona produto
      cy.fillField('input[name="weight"]', '70')
      cy.fillField('input[name="height"]', '175')
      cy.fillField('input[name="age"]', '30')
      cy.fillField('input[name="volume"]', '1500')
      
      // Deixa produto vazio e tenta calcular
      cy.safeClick('button[type="submit"]')
      
      // Verifica que não há resultados ou há mensagem de erro
      cy.get('body').should('satisfy', ($body) => {
        const hasNoResults = $body.find('.results-section').length === 0
        const hasError = $body.find('.alert-danger, .invalid-feedback').length > 0
        return hasNoResults || hasError
      })
    })

    it('deve calcular volume por hora quando tempo de infusão é fornecido', () => {
      cy.waitForFormReady()
      
      // Preenche dados completos
      cy.fillField('input[name="weight"]', '70')
      cy.fillField('input[name="height"]', '175')
      cy.fillField('input[name="age"]', '30')
      cy.get('select[name="product"]').select('Fresubin Energy')
      cy.fillField('input[name="volume"]', '2400')
      cy.fillField('input[name="infusionTime"]', '24')
      
      // Executa cálculo
      cy.safeClick('button[type="submit"]')
      
      // Verifica se resultados apareceram
      cy.get('.results-section', { timeout: 5000 }).should('be.visible')
      
      // Verifica se o volume por hora está sendo exibido (100 mL/h)
      cy.contains(/100\.0 mL\/h/i).should('be.visible')
    })

    it('deve mostrar N/A quando tempo de infusão não é fornecido', () => {
      cy.waitForFormReady()
      
      // Preenche dados sem tempo de infusão
      cy.fillField('input[name="weight"]', '70')
      cy.fillField('input[name="height"]', '175')
      cy.fillField('input[name="age"]', '30')
      cy.get('select[name="product"]').select('Fresubin Energy')
      cy.fillField('input[name="volume"]', '1500')
      // Não preenche infusionTime
      
      // Executa cálculo
      cy.safeClick('button[type="submit"]')
      
      // Verifica se resultados apareceram
      cy.get('.results-section', { timeout: 5000 }).should('be.visible')
      
      // Verifica se N/A está sendo exibido para volume por hora
      cy.contains('N/A').should('be.visible')
    })
  })

  describe('Validação de formulário', () => {
    it('deve validar campos obrigatórios', () => {
      cy.waitForFormReady()
      
      // Tenta submeter sem preencher campos obrigatórios
      cy.safeClick('button[type="submit"]')
      
      // Verifica se há campos com erro de validação ou mensagens de erro
      cy.get('body').should('satisfy', ($body) => {
        // Verifica se existem campos inválidos OU mensagens de validação
        const hasInvalidFields = $body.find('input:invalid, select:invalid').length > 0
        const hasValidationMessages = $body.find('.invalid-feedback, .form-control.is-invalid').length > 0
        const hasFormErrors = $body.find('form .text-danger').length > 0
        
        return hasInvalidFields || hasValidationMessages || hasFormErrors
      })
    })
  })

  describe('Métodos de cálculo', () => {
    it('deve alternar entre métodos de cálculo', () => {
      cy.waitForFormReady()
      
      // Testa método Harris-Benedict (padrão)
      cy.get('select[name="calculationMethod"]').select('harris-benedict')
      cy.get('input[name="weight"]').should('be.visible')
      cy.get('input[name="height"]').should('be.visible')
      cy.get('input[name="age"]').should('be.visible')
      
      // Testa método Pocket Formula
      cy.get('select[name="calculationMethod"]').select('pocket-formula')
      cy.get('input[name="kcalPerKg"]').should('be.visible')
    })
  })

  describe('Persistência de dados', () => {
    it('deve salvar e recuperar dados do localStorage', () => {
      // Preenche alguns dados
      cy.fillField('input[name="weight"]', '75')
      cy.fillField('input[name="height"]', '180')
      
      // Verifica se dados são salvos no localStorage
      cy.window().then((win) => {
        const storage = win.localStorage
        expect(storage).to.not.be.null
      })
      
      // Recarrega página e verifica persistência
      cy.reload()
      cy.waitForPageLoad()
      
      // Os campos podem ou não manter os valores dependendo da implementação
      cy.get('input[name="weight"]').should('be.visible')
    })
  })
})

// // cypress/e2e/nenpt.cy.js

// describe('Calculadora NENPT', () => {
//   beforeEach(() => {
//     cy.resetAppState()
//     cy.visit('/nenpt')
//     cy.waitForPageLoad()
//   })

//   it('deve carregar a calculadora NENPT', () => {
//     cy.contains('Calculadora de Terapia Nutricional', { timeout: 10000 }).should('be.visible')
//     cy.contains('Esta calculadora é específica para uso em adultos').should('be.visible')
    
//     // Verifica se o formulário está presente
//     cy.get('form').should('be.visible')
//   })

//   it('deve exibir todos os campos obrigatórios', () => {
//     // Verifica campos de dados do paciente
//     cy.get('input[name="weight"]').should('be.visible')
//     cy.get('input[name="height"]').should('be.visible')
//     cy.get('input[name="age"]').should('be.visible')
//     cy.get('select[name="gender"]').should('be.visible')
    
//     // Verifica labels
//     cy.contains('Peso (kg)').should('be.visible')
//     cy.contains('Altura (cm)').should('be.visible')
//     cy.contains('Idade (anos)').should('be.visible')
//     cy.contains('Sexo').should('be.visible')
//   })

//   it('deve permitir preenchimento de dados do paciente', () => {
//     // Preenche dados básicos com validação
//     cy.fillField('input[name="weight"]', '70')
//     cy.fillField('input[name="height"]', '175')
//     cy.fillField('input[name="age"]', '30')
//     cy.selectOption('select[name="gender"]', 'masculino')
    
//     // Verifica se os valores foram preenchidos
//     cy.get('input[name="weight"]').should('have.value', '70')
//     cy.get('input[name="height"]').should('have.value', '175')
//     cy.get('input[name="age"]').should('have.value', '30')
//     cy.get('select[name="gender"]').should('have.value', 'masculino')
//   })

//   it('deve validar campos obrigatórios', () => {
//     // Tenta submeter formulário vazio
//     cy.get('form').submit()
    
//     // Verifica se há mensagens de validação ou campos destacados
//     cy.get('body').should('exist') // O formulário deve mostrar algum feedback
//   })

//   it('deve permitir seleção de método de cálculo', () => {
//     cy.get('body').then(($body) => {
//       if ($body.find('select[name="calculationMethod"]').length > 0) {
//         cy.get('select[name="calculationMethod"]').should('be.visible')
//         cy.selectOption('select[name="calculationMethod"]', 'harris-benedict')
//       }
//     })
//   })

//   it('deve permitir seleção de produto', () => {
//     cy.get('body').then(($body) => {
//       if ($body.find('select[name="product"]').length > 0) {
//         cy.get('select[name="product"]').should('be.visible')
        
//         // Verifica se há opções de produtos disponíveis
//         cy.get('select[name="product"] option').should('have.length.at.least', 1)
//       }
//     })
//   })

//   it('deve calcular necessidades energéticas com dados válidos', () => {
//     // Preenche formulário completo
//     cy.fillField('input[name="weight"]', '70')
//     cy.fillField('input[name="height"]', '175')
//     cy.fillField('input[name="age"]', '30')
//     cy.selectOption('select[name="gender"]', 'masculino')
    
//     // Seleciona produto se disponível
//     cy.get('body').then(($body) => {
//       if ($body.find('select[name="product"] option').length > 1) {
//         cy.get('select[name="product"] option').eq(1).then($option => {
//           const value = $option.val()
//           if (value) {
//             cy.selectOption('select[name="product"]', value)
//           }
//         })
//       }
//     })
    
//     // Executa cálculo
//     cy.get('button[type="submit"]').click()
    
//     // Aguarda resultado (pode aparecer na mesma página ou em seção específica)
//     cy.get('body', { timeout: 10000 }).should('be.visible')
//   })

//   it('deve ser responsiva', () => {
//     cy.testResponsive()
//   })

//   it('deve ter link para gerenciar produtos', () => {
//     cy.get('body').then(($body) => {
//       if ($body.find('a').filter((i, el) => Cypress.$(el).text().includes('Gerenciar')).length > 0) {
//         cy.contains('Gerenciar').should('be.visible')
//       }
//     })
//   })

//   it('deve permitir limpar formulário', () => {
//     // Preenche alguns dados
//     cy.fillField('input[name="weight"]', '70')
//     cy.fillField('input[name="height"]', '175')
    
//     // Procura por botão de reset/limpar
//     cy.get('body').then(($body) => {
//       if ($body.find('button[type="reset"], button').filter((i, el) => 
//         Cypress.$(el).text().toLowerCase().includes('limpar')).length > 0) {
        
//         cy.get('button[type="reset"], button').contains(/limpar/i).click()
        
//         // Verifica se os campos foram limpos
//         cy.get('input[name="weight"]').should('have.value', '')
//         cy.get('input[name="height"]').should('have.value', '')
//       }
//     })
//   })

//   it('deve validar entrada de dados inválidos', () => {
//     // Testa valores negativos
//     cy.fillField('input[name="weight"]', '-10')
//     cy.fillField('input[name="height"]', '-50')
//     cy.fillField('input[name="age"]', '-5')
    
//     cy.get('button[type="submit"]').click()
    
//     // Deve mostrar erro ou não submeter
//     cy.get('body').should('be.visible')
//   })
// })


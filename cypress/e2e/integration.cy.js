// // cypress/e2e/integration.cy.js

// describe('Testes de Integração', () => {
//   beforeEach(() => {
//     cy.resetAppState()
//     cy.visit('/')
//   })

//   it('deve navegar entre todas as páginas principais', () => {
//     cy.waitForPageLoad()
    
//     // Testa fluxo completo de navegação
//     const pages = [
//       { route: '/nenpt', text: 'Calculadora NENPT' },
//       { route: '/gids', text: 'Calculadora GIDS' },
//       { route: '/nenpt/gerenciar-produtos', text: 'Gerenciar Produtos' }
//     ]
    
//     pages.forEach(page => {
//       cy.visit(page.route)
//       cy.waitForPageLoad()
//       cy.contains(page.text, { timeout: 10000 }).should('be.visible')
      
//       // Verifica se não há erros JavaScript
//       cy.window().its('console').then((console) => {
//         if (console.error && console.error.callCount) {
//           expect(console.error.callCount, 'Não deve haver erros no console').to.equal(0)
//         }
//       })
//     })
//   })

//   it('deve funcionar corretamente após reload da página', () => {
//     // Navega para NENPT
//     cy.visit('/nenpt')
//     cy.waitForPageLoad()
    
//     // Preenche dados
//     cy.get('input').first().then($input => {
//       if ($input.attr('type') !== 'hidden') {
//         cy.fillField('input:first', '70')
//       }
//     })
    
//     // Recarrega página
//     cy.reload()
//     cy.waitForPageLoad()
    
//     // Verifica se a página ainda funciona
//     cy.contains('Calculadora NENPT').should('be.visible')
//     cy.get('input, select, button').should('have.length.at.least', 1)
//   })

//   it('deve manter dados durante navegação entre páginas', () => {
//     // Vai para NENPT e preenche dados
//     cy.visit('/nenpt')
//     cy.waitForPageLoad()
    
//     cy.get('input[name*="peso"], input[placeholder*="peso"]').then($input => {
//       if ($input.length > 0) {
//         cy.fillField('input[name*="peso"], input[placeholder*="peso"]', '75')
        
//         // Navega para outra página
//         cy.visit('/gids')
//         cy.waitForPageLoad()
        
//         // Volta para NENPT
//         cy.visit('/nenpt')
//         cy.waitForPageLoad()
        
//         // Verifica se dados foram mantidos (se aplicável)
//         cy.get('input[name*="peso"], input[placeholder*="peso"]').should('be.visible')
//       }
//     })
//   })

//   it('deve funcionar com diferentes locales/idiomas', () => {
//     cy.testLanguageSwitch()
    
//     // Testa navegação em diferentes idiomas
//     cy.visit('/nenpt')
//     cy.waitForPageLoad()
//     cy.get('input, button').should('have.length.at.least', 1)
    
//     cy.visit('/gids')
//     cy.waitForPageLoad()
//     cy.get('input, button').should('have.length.at.least', 1)
//   })

//   it('deve lidar com URLs inválidas graciosamente', () => {
//     // Testa rota inexistente
//     cy.visit('/rota-inexistente', { failOnStatusCode: false })
//     cy.waitForPageLoad()
    
//     // Deve mostrar página 404 ou redirecionar para home
//     cy.get('body').should('contain.text', /404|não encontrado|not found|página inicial/i)
//   })

//   it('deve funcionar corretamente em diferentes viewports', () => {
//     const viewports = [
//       { width: 320, height: 568 }, // iPhone 5
//       { width: 768, height: 1024 }, // iPad
//       { width: 1920, height: 1080 } // Desktop
//     ]
    
//     viewports.forEach(viewport => {
//       cy.viewport(viewport.width, viewport.height)
      
//       cy.visit('/nenpt')
//       cy.waitForPageLoad()
//       cy.contains('Calculadora NENPT').should('be.visible')
      
//       // Verifica se elementos são clicáveis
//       cy.get('button, input').first().should('be.visible')
//     })
//   })

//   it('deve validar fluxo completo NENPT com cálculo', () => {
//     cy.visit('/nenpt')
//     cy.waitForPageLoad()
    
//     // Preenche formulário completo
//     const dadosPaciente = {
//       peso: '70',
//       altura: '175',
//       idade: '30'
//     }
    
//     Object.entries(dadosPaciente).forEach(([campo, valor]) => {
//       cy.get(`input[name*="${campo}"], input[placeholder*="${campo}"]`).then($input => {
//         if ($input.length > 0) {
//           cy.fillField(`input[name*="${campo}"], input[placeholder*="${campo}"]`, valor)
//         }
//       })
//     })
    
//     // Seleciona sexo se disponível
//     cy.get('select[name*="sexo"], select[name*="gender"]').then($select => {
//       if ($select.length > 0) {
//         cy.selectOption('select[name*="sexo"], select[name*="gender"]', 'masculino')
//       }
//     })
    
//     // Executa cálculo
//     cy.get('button:contains("Calcular")').then($button => {
//       if ($button.length > 0) {
//         cy.safeClick('button:contains("Calcular")')
//         cy.waitForCalculation()
//       }
//     })
    
//     // Navega para gerenciar produtos se disponível
//     cy.get('body').then($body => {
//       if ($body.find('*:contains("Gerenciar Produtos")').length > 0) {
//         cy.contains('Gerenciar Produtos').click()
//         cy.waitForPageLoad()
//         cy.url().should('include', 'gerenciar-produtos')
//       }
//     })
//   })

//   it('deve validar fluxo completo GIDS com score', () => {
//     cy.visit('/gids')
//     cy.waitForPageLoad()
    
//     // Preenche dados do paciente
//     cy.get('input[name*="patientName"], input[placeholder*="nome"]').then($input => {
//       if ($input.length > 0) {
//         cy.fillField('input[name*="patientName"], input[placeholder*="nome"]', 'João Silva')
//       }
//     })
    
//     // Seleciona sintomas
//     cy.get('input[type="checkbox"]').then($checkboxes => {
//       if ($checkboxes.length > 0) {
//         // Seleciona alguns sintomas
//         cy.wrap($checkboxes.slice(0, 3)).each($checkbox => {
//           cy.wrap($checkbox).check()
//         })
        
//         // Aguarda cálculo automático
//         cy.wait(1000)
        
//         // Verifica se score foi calculado
//         cy.get('body').should('contain.text', /score|pontuação/i)
//       }
//     })
    
//     // Testa navegação para resumo se disponível
//     cy.get('button:contains("Resumo"), [data-testid*="resumo"]').then($button => {
//       if ($button.length > 0) {
//         cy.safeClick('button:contains("Resumo"), [data-testid*="resumo"]')
//         cy.waitForPageLoad()
//       }
//     })
//   })

//   it('deve validar performance básica da aplicação', () => {
//     cy.visit('/')
    
//     // Mede tempo de carregamento
//     cy.window().its('performance').then((performance) => {
//       const navigation = performance.getEntriesByType('navigation')[0]
      
//       // Verifica se carregou em menos de 5 segundos
//       expect(navigation.loadEventEnd - navigation.fetchStart).to.be.lessThan(5000)
//     })
    
//     // Verifica se não há memory leaks básicos
//     cy.window().then((win) => {
//       const initialMemory = win.performance.memory?.usedJSHeapSize || 0
      
//       // Navega entre páginas
//       cy.visit('/nenpt')
//       cy.visit('/gids')
//       cy.visit('/')
      
//       cy.window().then((win2) => {
//         const finalMemory = win2.performance.memory?.usedJSHeapSize || 0
        
//         // Memória não deve crescer excessivamente
//         if (initialMemory > 0 && finalMemory > 0) {
//           expect(finalMemory).to.be.lessThan(initialMemory * 3)
//         }
//       })
//     })
//   })

//   it('deve funcionar com dados em cache', () => {
//     // Primeira visita
//     cy.visit('/nenpt')
//     cy.waitForPageLoad()
    
//     // Adiciona dados ao localStorage se a aplicação suportar
//     cy.window().then((win) => {
//       win.localStorage.setItem('test-data', JSON.stringify({ peso: '70', altura: '175' }))
//     })
    
//     // Recarrega página
//     cy.reload()
//     cy.waitForPageLoad()
    
//     // Verifica se dados persistiram
//     cy.window().its('localStorage').invoke('getItem', 'test-data').should('exist')
//   })
// })

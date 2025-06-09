// // cypress/e2e/home.cy.js

// describe('Página Home', () => {
//   beforeEach(() => {
//     cy.resetAppState()
//     cy.visit('/')
//     cy.waitForPageLoad()
//   })

//   it('deve carregar a página inicial corretamente', () => {
//     // Verifica elementos principais da página baseados nas traduções
//     cy.contains('Calculadoras Nutricionais', { timeout: 10000 }).should('be.visible')
//     cy.contains('Ferramentas especializadas', { timeout: 5000 }).should('be.visible')
    
//     // Verifica se a página não tem erros JavaScript
//     cy.window().then((win) => {
//       // Só verifica se console.error foi chamado se existir
//       if (win.console.error && typeof win.console.error.getCalls === 'function') {
//         expect(win.console.error).to.not.have.been.called
//       }
//     })
//   })

//   it('deve exibir os cards das calculadoras', () => {
//     // Verifica card NENPT
//     cy.contains('Calculadora NENPT', { timeout: 10000 }).should('be.visible')
//     cy.contains('Necessidades Energéticas', { timeout: 5000 }).should('be.visible')
    
//     // Verifica card GIDS
//     cy.contains('Calculadora GIDS', { timeout: 5000 }).should('be.visible')
//     cy.contains('Gastrointestinal Dysfunction Score', { timeout: 5000 }).should('be.visible')
    
//     // Verifica se os botões de ação estão presentes
//     cy.get('a').contains(/acessar|entrar/i).should('have.length.at.least', 1)
//   })

//   it('deve navegar para a calculadora NENPT', () => {
//     cy.contains('Acessar Calculadora').click()
    
//     // Verifica URL e conteúdo
//     cy.url({ timeout: 10000 }).should('include', '/nenpt')
//     cy.waitForPageLoad()
//     cy.contains('Calculadora de Terapia Nutricional', { timeout: 10000 }).should('be.visible')
//   })

//   it('deve navegar para a calculadora GIDS', () => {
//     cy.contains('Acessar GIDS').click()
    
//     // Verifica URL e conteúdo
//     cy.url({ timeout: 10000 }).should('include', '/gids')
//     cy.waitForPageLoad()
//     cy.contains('Calculadora GIDS', { timeout: 10000 }).should('be.visible')
//   })

//   it('deve navegar para gerenciar produtos', () => {
//     cy.contains('Gerenciar Produtos').click()
    
//     // Verifica URL
//     cy.url({ timeout: 10000 }).should('include', '/nenpt/gerenciar-produtos')
//     cy.waitForPageLoad()
//   })

//   // it('deve permitir mudança de idioma', () => {
//   //   cy.testLanguageSwitch()
//   // })

//   it('deve ser responsiva', () => {
//     // Testa diferentes viewports com configuração correta
//     const viewports = [
//       { width: 320, height: 568 }, // Mobile
//       { width: 768, height: 1024 }, // Tablet
//       { width: 1280, height: 720 }  // Desktop
//     ]
    
//     viewports.forEach((viewport) => {
//       cy.viewport(viewport.width, viewport.height)
//       cy.waitForPageLoad()
//       cy.get('body').should('be.visible')
//       cy.contains('Calculadoras Nutricionais').should('be.visible')
//     })
//   })

//   it('deve ter elementos de SEO básicos', () => {
//     // Verifica meta tags essenciais
//     cy.get('head title').should('exist').and('not.be.empty')
//     cy.get('head meta[name="description"]').should('exist')
//     cy.get('head meta[name="viewport"]').should('exist')
//   })

//   it('deve ter navegação funcional no header/footer', () => {
//     cy.get('body').then(($body) => {
//       // Testa navegação se existir menu
//       if ($body.find('nav, header').length > 0) {
//         cy.get('nav a, header a').first().then(($link) => {
//           const href = $link.attr('href')
//           if (href && href !== '#' && !href.startsWith('http')) {
//             cy.get($link).click()
//             cy.waitForPageLoad()
//             cy.go('back')
//             cy.waitForPageLoad()
//           }
//         })
//       }
//     })
//   })
// })


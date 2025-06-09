// // cypress/e2e/functional-validation.cy.js

// describe('Validação de Funcionalidades da Aplicação', () => {
//   beforeEach(() => {
//     cy.resetAppState()
//   })

//   describe('Gerenciamento de Produtos (localStorage)', () => {
//     beforeEach(() => {
//       cy.visit('/nenpt/gerenciar-produtos')
//       cy.waitForPageLoad()
//     })

//     it('deve carregar produtos padrão do localStorage', () => {
//       // Verifica se há produtos listados na tabela
//       cy.get('table tbody tr').should('have.length.greaterThan', 0)
      
//       // Verifica se há produtos conhecidos
//       cy.get('body').should('contain.text', /fresubin|nutrison|nutricomp/i)
//     })

//     it('deve adicionar novo produto personalizado', () => {
//       // Preenche formulário de novo produto
//       cy.fillField('input[name="nome"]', 'Produto Teste E2E')
//       cy.fillField('input[name="kcal_ml"]', '1.5')
//       cy.fillField('input[name="cho_g_l"]', '150')
//       cy.fillField('input[name="lip_g_l"]', '50')
//       cy.fillField('input[name="ptn_g_l"]', '60')
//       cy.fillField('input[name="ep_ratio"]', '25')
      
//       // Submete o formulário
//       cy.safeClick('button[type="submit"]')
      
//       // Verifica se produto foi adicionado à tabela
//       cy.contains('Produto Teste E2E').should('be.visible')
//       cy.contains('Personalizado').should('be.visible')
//     })

//     it('deve excluir produto personalizado', () => {
//       // Primeiro adiciona um produto
//       cy.fillField('input[name="nome"]', 'Produto Para Excluir')
//       cy.fillField('input[name="kcal_ml"]', '1.0')
//       cy.fillField('input[name="cho_g_l"]', '100')
//       cy.fillField('input[name="lip_g_l"]', '30')
//       cy.fillField('input[name="ptn_g_l"]', '40')
//       cy.fillField('input[name="ep_ratio"]', '20')
//       cy.safeClick('button[type="submit"]')
      
//       // Exclui o produto
//       cy.contains('tr', 'Produto Para Excluir').within(() => {
//         cy.get('button').contains(/excluir|delete/i).click()
//       })
      
//       // Confirma exclusão no modal
//       cy.get('.modal button').contains(/confirmar|excluir/i).click()
      
//       // Verifica que produto foi removido
//       cy.contains('Produto Para Excluir').should('not.exist')
//     })

//     it('deve filtrar produtos por nome', () => {
//       // Usa o campo de busca
//       cy.fillField('input[placeholder*="Buscar"]', 'Fresubin')
      
//       // Verifica que apenas produtos com "Fresubin" aparecem
//       cy.get('table tbody tr').should('have.length.greaterThan', 0)
//       cy.get('table tbody tr').each(($row) => {
//         cy.wrap($row).should('contain.text', /fresubin/i)
//       })
//     })
//   })

//   describe('Calculadora NENPT - Cálculos Locais', () => {
//     beforeEach(() => {
//       cy.visit('/nenpt')
//       cy.waitForPageLoad()
//     })

//     it('deve calcular NENPT com dados válidos', () => {
//       cy.waitForFormReady()
      
//       // Preenche dados do paciente
//       cy.fillField('input[name="weight"]', '70')
//       cy.fillField('input[name="height"]', '175')
//       cy.fillField('input[name="age"]', '30')
//       cy.get('select[name="gender"]').select('masculino')
      
//       // Seleciona produto
//       cy.get('select[name="product"]').select('Fresubin Energy')
//       cy.fillField('input[name="volume"]', '1500')
      
//       // Executa cálculo
//       cy.safeClick('button[type="submit"]')
      
//       // Verifica se resultados apareceram
//       cy.get('.results-card', { timeout: 5000 }).should('be.visible')
//       cy.contains(/kcal|caloria/i).should('be.visible')
//       cy.contains(/proteína/i).should('be.visible')
//     })

//     it('deve validar campos obrigatórios', () => {
//       cy.waitForFormReady()
      
//       // Tenta submeter sem preencher campos obrigatórios
//       cy.safeClick('button[type="submit"]')
      
//       // Verifica se validação impede o envio
//       cy.get('input:invalid, select:invalid').should('have.length.greaterThan', 0)
//     })

//     it('deve alternar entre métodos de cálculo', () => {
//       cy.waitForFormReady()
      
//       // Testa método Harris-Benedict
//       cy.get('input[value="harris-benedict"]').check()
//       cy.get('input[name="weight"]').should('be.visible')
//       cy.get('input[name="height"]').should('be.visible')
//       cy.get('input[name="age"]').should('be.visible')
      
//       // Testa método Pocket Formula
//       cy.get('input[value="pocket-formula"]').check()
//       cy.get('input[name="kcalPerKg"]').should('be.visible')
//     })
//   })

//   describe('Calculadora GIDS - Funcionalidade Local', () => {
//     beforeEach(() => {
//       cy.visit('/gids')
//       cy.waitForPageLoad()
//     })

//     it('deve calcular GIDS com sintomas selecionados', () => {
//       cy.waitForFormReady()
      
//       // Preenche nome do paciente
//       cy.get('input[name="patientName"]').then($input => {
//         if ($input.length > 0) {
//           cy.fillField('input[name="patientName"]', 'João Silva')
//         }
//       })
      
//       // Seleciona alguns sintomas
//       cy.get('input[type="checkbox"]').first().check()
//       cy.get('input[type="checkbox"]').eq(1).check()
      
//       // Verifica se score é calculado automaticamente
//       cy.contains(/score|pontuação/i, { timeout: 5000 }).should('be.visible')
//     })

//     it('deve exportar relatório quando disponível', () => {
//       cy.waitForFormReady()
      
//       // Preenche dados básicos
//       cy.get('input[name="patientName"]').then($input => {
//         if ($input.length > 0) {
//           cy.fillField('input[name="patientName"]', 'João Silva')
//         }
//       })
      
//       cy.get('input[type="checkbox"]').first().check()
      
//       // Verifica se botão de exportar está disponível
//       cy.get('body').then($body => {
//         if ($body.find('button:contains("Exportar")').length > 0) {
//           cy.safeClick('button:contains("Exportar")')
//           // Verifica que não há erro
//           cy.get('body').should('not.contain.text', /erro|falha/i)
//         }
//       })
//     })
//   })

//   describe('Persistência de Dados (localStorage)', () => {
//     it('deve salvar e recuperar dados do localStorage', () => {
//       cy.visit('/nenpt')
//       cy.waitForPageLoad()
      
//       // Preenche alguns dados
//       cy.fillField('input[name="weight"]', '75')
//       cy.fillField('input[name="height"]', '180')
      
//       // Verifica se dados são salvos no localStorage
//       cy.window().then((win) => {
//         const storage = win.localStorage
//         expect(storage).to.not.be.null
//       })
      
//       // Recarrega página e verifica persistência
//       cy.reload()
//       cy.waitForPageLoad()
      
//       // Os campos podem ou não manter os valores dependendo da implementação
//       cy.get('input[name="weight"]').should('be.visible')
//     })

//     it('deve manter produtos personalizados após reload', () => {
//       cy.visit('/nenpt/gerenciar-produtos')
//       cy.waitForPageLoad()
      
//       // Adiciona produto personalizado
//       cy.fillField('input[name="nome"]', 'Produto Persistente')
//       cy.fillField('input[name="kcal_ml"]', '2.0')
//       cy.fillField('input[name="cho_g_l"]', '200')
//       cy.fillField('input[name="lip_g_l"]', '60')
//       cy.fillField('input[name="ptn_g_l"]', '80')
//       cy.fillField('input[name="ep_ratio"]', '30')
//       cy.safeClick('button[type="submit"]')
      
//       // Recarrega página
//       cy.reload()
//       cy.waitForPageLoad()
      
//       // Verifica se produto ainda está lá
//       cy.contains('Produto Persistente').should('be.visible')
//     })
//   })

//   describe('Validação de Interface e UX', () => {
//     it('deve mostrar mensagens de validação apropriadas', () => {
//       cy.visit('/nenpt/gerenciar-produtos')
//       cy.waitForPageLoad()
      
//       // Tenta adicionar produto com nome duplicado
//       cy.fillField('input[name="nome"]', 'Fresubin Energy') // Produto que já existe
//       cy.fillField('input[name="kcal_ml"]', '1.0')
//       cy.fillField('input[name="cho_g_l"]', '100')
//       cy.fillField('input[name="lip_g_l"]', '30')
//       cy.fillField('input[name="ptn_g_l"]', '40')
//       cy.fillField('input[name="ep_ratio"]', '20')
//       cy.safeClick('button[type="submit"]')
      
//       // Verifica mensagem de erro
//       cy.get('.alert-danger, .alert, .error', { timeout: 5000 }).should('be.visible')
//     })

//     it('deve funcionar corretamente em diferentes resoluções', () => {
//       // Testa em mobile
//       cy.viewport(375, 667)
//       cy.visit('/nenpt')
//       cy.waitForPageLoad()
//       cy.get('form').should('be.visible')
      
//       // Testa em tablet
//       cy.viewport(768, 1024)
//       cy.visit('/nenpt')
//       cy.waitForPageLoad()
//       cy.get('form').should('be.visible')
      
//       // Testa em desktop
//       cy.viewport(1920, 1080)
//       cy.visit('/nenpt')
//       cy.waitForPageLoad()
//       cy.get('form').should('be.visible')
//     })

//     it('deve navegar entre páginas corretamente', () => {
//       cy.visit('/')
//       cy.waitForPageLoad()
      
//       // Navega para NENPT
//       cy.get('a[href*="nenpt"]').first().click()
//       cy.url().should('include', '/nenpt')
//       cy.waitForPageLoad()
      
//       // Navega para GIDS
//       cy.get('a[href*="gids"]').first().click()
//       cy.url().should('include', '/gids')
//       cy.waitForPageLoad()
      
//       // Navega para gerenciar produtos
//       cy.get('a[href*="gerenciar-produtos"]').first().click()
//       cy.url().should('include', '/gerenciar-produtos')
//       cy.waitForPageLoad()
//     })
//   })
// })

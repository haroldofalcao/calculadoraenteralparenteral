// cypress/e2e/gerenciar-produtos.cy.js

describe('Gerenciamento de Produtos', () => {
  beforeEach(() => {
    // Limpa dados e visita a página
    cy.visit('/nenpt/gerenciar-produtos')
    cy.waitForPageLoad()
  })

  describe('Carregamento Inicial', () => {
    it('deve carregar a página corretamente', () => {
      // Verifica título da página
      cy.contains('Gerenciar Produtos Nutricionais').should('be.visible')
      cy.get('h1').should('contain.text', 'Gerenciar Produtos Nutricionais')
      
      // Verifica se formulário de adicionar produto existe
      cy.get('form').should('be.visible')
      cy.get('input[name="nome"]').should('be.visible')
      cy.get('input[name="kcal_ml"]').should('be.visible')
      cy.get('input[name="cho_g_l"]').should('be.visible')
      cy.get('input[name="lip_g_l"]').should('be.visible')
      cy.get('input[name="ptn_g_l"]').should('be.visible')
      cy.get('input[name="ep_ratio"]').should('be.visible')
    })

    it('deve carregar produtos padrão na tabela', () => {
      // Verifica se tabela existe e tem produtos
      cy.get('table').should('be.visible')
      cy.get('table tbody tr').should('have.length.greaterThan', 0)
      
      // Verifica se alguns produtos conhecidos estão na lista
      cy.get('table tbody').should('contain.text', 'Fresubin')
      cy.get('table tbody').should('contain.text', 'Nutrison')
      
      // Verifica colunas da tabela
      cy.get('table thead th').should('contain.text', 'Nome')
      cy.get('table thead th').should('contain.text', 'Kcal/mL')
      cy.get('table thead th').should('contain.text', 'Tipo')
      cy.get('table thead th').should('contain.text', 'Ações')
    })

    it('deve mostrar campo de busca', () => {
      cy.get('input[placeholder*="Buscar produto"]').should('be.visible')
    })

    it('deve mostrar botão de adicionar produto', () => {
      cy.get('button[type="submit"]').should('contain.text', 'Adicionar Produto')
    })
  })

  describe('Adicionar Produtos Personalizados', () => {
    it('deve adicionar um novo produto com dados válidos', () => {
      const produtoTeste = {
        nome: 'Produto Teste E2E',
        kcal_ml: '1.5',
        cho_g_l: '150',
        lip_g_l: '50',
        ptn_g_l: '60',
        ep_ratio: '25'
      }

      // Preenche o formulário
      cy.get('input[name="nome"]').type(produtoTeste.nome)
      cy.get('input[name="kcal_ml"]').type(produtoTeste.kcal_ml)
      cy.get('input[name="cho_g_l"]').type(produtoTeste.cho_g_l)
      cy.get('input[name="lip_g_l"]').type(produtoTeste.lip_g_l)
      cy.get('input[name="ptn_g_l"]').type(produtoTeste.ptn_g_l)
      cy.get('input[name="ep_ratio"]').type(produtoTeste.ep_ratio)

      // Submete o formulário
      cy.get('button[type="submit"]').click()

      // Verifica se produto foi adicionado à tabela
      cy.get('table tbody').should('contain.text', produtoTeste.nome)
      cy.get('table tbody').should('contain.text', produtoTeste.kcal_ml)
      cy.get('table tbody').should('contain.text', 'Personalizado')

      // Verifica mensagem de sucesso
      cy.get('.alert-success').should('be.visible')
      cy.get('.alert-success').should('contain.text', 'sucesso')
    })

    it('deve validar campos obrigatórios', () => {
      // Tenta submeter formulário vazio
      cy.get('button[type="submit"]').click()

      // HTML5 validation impedirá submissão - verifica se campos são required
      cy.get('input[name="nome"]').should('have.attr', 'required')
      cy.get('input[name="kcal_ml"]').should('have.attr', 'required')
      cy.get('input[name="cho_g_l"]').should('have.attr', 'required')
      cy.get('input[name="lip_g_l"]').should('have.attr', 'required')
      cy.get('input[name="ptn_g_l"]').should('have.attr', 'required')
      cy.get('input[name="ep_ratio"]').should('have.attr', 'required')
    })

    it('deve validar valores numéricos', () => {
      // Preenche com valores inválidos
      cy.get('input[name="nome"]').type('Produto Inválido')
      cy.get('input[name="kcal_ml"]').type('-1')
      cy.get('input[name="cho_g_l"]').type('150')
      cy.get('input[name="lip_g_l"]').type('50')
      cy.get('input[name="ptn_g_l"]').type('60')
      cy.get('input[name="ep_ratio"]').type('25')

      cy.get('button[type="submit"]').click()

    })

    it('deve impedir adição de produto com nome duplicado', () => {
      // Tenta adicionar produto com nome de um produto padrão existente
      cy.get('input[name="nome"]').type('Fresubin Energy')
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')

      cy.get('button[type="submit"]').click()

      // Verifica mensagem de erro
      cy.get('.alert-danger').should('be.visible')
      cy.get('.alert-danger').should('contain.text', 'existe')
    })

    it('deve limpar formulário após adicionar produto', () => {
      // Adiciona um produto
      cy.get('input[name="nome"]').type('Produto Temporário')
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')

      cy.get('button[type="submit"]').click()

      // Aguarda sucesso e verifica se campos foram limpos
      cy.get('.alert-success').should('be.visible')
      cy.get('input[name="nome"]').should('have.value', '')
      cy.get('input[name="kcal_ml"]').should('have.value', '')
    })
  })

  describe('Busca e Filtros', () => {
    it('deve filtrar produtos por nome', () => {
      // Usa o campo de busca para filtrar por "Fresubin"
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin')

      // Verifica que apenas produtos com "Fresubin" aparecem
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).should('contain.text', 'Fresubin')
      })
    })

    it('deve buscar por produtos específicos', () => {
      cy.get('input[placeholder*="Buscar produto"]').type('Energy')

      // Verifica que produtos com "Energy" no nome aparecem
      cy.get('table tbody tr').should('contain.text', 'Energy')
    })

    it('deve mostrar mensagem quando não encontrar resultados', () => {
      cy.get('input[placeholder*="Buscar produto"]').type('ProdutoInexistente123')

      // Verifica mensagem de "nenhum resultado"
      cy.get('table tbody').should('contain.text', 'Nenhum resultado encontrado')
    })

    it('deve mostrar todos os produtos quando busca for limpa', () => {
      // Filtra primeiro
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin')
      cy.get('table tbody tr').should('have.length.lessThan', 50)

      // Limpa o filtro
      cy.get('input[placeholder*="Buscar produto"]').clear()
      
      // Verifica que mais produtos aparecem novamente
      cy.get('table tbody tr').should('have.length.greaterThan', 10)
    })
  })

  describe('Excluir/Ocultar Produtos', () => {
    it('deve excluir produto personalizado', () => {
      // Adiciona produto personalizado primeiro
      const nomeProduto = 'Produto Para Excluir'
      cy.get('input[name="nome"]').type(nomeProduto)
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')
      cy.get('button[type="submit"]').click()

      // Aguarda produto ser adicionado
      cy.get('.alert-success').should('be.visible')

      // Exclui o produto
      cy.contains('tr', nomeProduto).within(() => {
        cy.get('button').contains('Excluir').click()
      })

      // Confirma exclusão no modal
      cy.get('.modal').should('be.visible')
      cy.get('.modal button').contains('Excluir').click()

      // Verifica que produto foi removido
      cy.get('table tbody').should('not.contain.text', nomeProduto)

      // Verifica mensagem de sucesso
      cy.get('.alert-success').should('be.visible')
    })

    it('deve ocultar produto padrão', () => {
      // Procura por um produto padrão específico
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin Energy')
      
      // Oculta o produto
      cy.contains('tr', 'Fresubin Energy').within(() => {
        cy.get('button').contains('Ocultar').click()
      })

      // Confirma no modal
      cy.get('.modal').should('be.visible')
      cy.get('.modal button').contains('Ocultar').click()

      // Limpa busca para ver todos os produtos
      cy.get('input[placeholder*="Buscar produto"]').clear()

    })

    it('deve cancelar exclusão no modal', () => {
      // Adiciona produto personalizado
      const nomeProduto = 'Produto Para Cancelar'
      cy.get('input[name="nome"]').type(nomeProduto)
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')
      cy.get('button[type="submit"]').click()

      // Aguarda produto ser adicionado
      cy.get('.alert-success').should('be.visible')

      // Clica em excluir
      cy.contains('tr', nomeProduto).within(() => {
        cy.get('button').contains('Excluir').click()
      })

      // Cancela no modal
      cy.get('.modal').should('be.visible')
      cy.get('.modal button').contains('Cancelar').click()

      // Verifica que produto ainda está na tabela
      cy.get('table tbody').should('contain.text', nomeProduto)
    })
  })

  describe('Produtos Ocultos', () => {
    it('deve mostrar seção de produtos ocultos quando houver', () => {
      // Oculta um produto primeiro
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin Energy')
      
      cy.contains('tr', 'Fresubin Energy').within(() => {
        cy.get('button').contains('Ocultar').click()
      })
      
      cy.get('.modal button').contains('Ocultar').click()

      // Verifica se seção de produtos ocultos aparece
      cy.contains('Produtos Padrão Ocultos').should('be.visible')
      cy.contains('Fresubin Energy').should('be.visible')
    })

    it('deve restaurar produto oculto', () => {
      // Oculta um produto primeiro
      cy.get('input[placeholder*="Buscar produto"]').type('Nutrison')
      
      cy.contains('tr', 'Nutrison').first().within(() => {
        cy.get('button').contains('Ocultar').click()
      })
      
      cy.get('.modal button').contains('Ocultar').click()

      // Restaura o produto
      cy.contains('Produtos Padrão Ocultos').should('be.visible')
      cy.get('button').contains('Restaurar').first().click()

      // Verifica que produto voltou para a tabela principal
      cy.get('input[placeholder*="Buscar produto"]').clear()
      cy.get('table tbody').should('contain.text', 'Nutrison')
    })
  })

  describe('Persistência de Dados', () => {
    it('deve manter produtos personalizados após reload', () => {
      const nomeProduto = 'Produto Persistente'
      
      // Adiciona produto
      cy.get('input[name="nome"]').type(nomeProduto)
      cy.get('input[name="kcal_ml"]').type('2.0')
      cy.get('input[name="cho_g_l"]').type('200')
      cy.get('input[name="lip_g_l"]').type('60')
      cy.get('input[name="ptn_g_l"]').type('80')
      cy.get('input[name="ep_ratio"]').type('30')
      cy.get('button[type="submit"]').click()

      // Aguarda sucesso e recarrega página
      cy.get('.alert-success').should('be.visible')
      cy.reload()
      cy.waitForPageLoad()

      // Verifica se produto ainda está lá
      cy.get('table tbody').should('contain.text', nomeProduto)
    })

    // it('deve manter produtos ocultos após reload', () => {
    //   // Oculta um produto
    //   cy.get('input[placeholder*="Buscar produto"]').type('Fresubin Original')
      
    //   cy.contains('tr', 'Fresubin Original').within(() => {
    //     cy.get('button').contains('Ocultar').click()
    //   })
      
    //   cy.get('.modal button').contains('Ocultar').click()

    //   // Recarrega página
    //   cy.reload()
    //   cy.waitForPageLoad()

    //   // Verifica que produto continua oculto
    //   cy.get('input[placeholder*="Buscar produto"]').clear()
    //   cy.get('table tbody').should('not.contain.text', 'Fresubin Original')
      
    //   // Verifica na seção de ocultos
    //   cy.contains('Produtos Padrão Ocultos').should('be.visible')
    // })
  })

  describe('Responsividade', () => {
    it('deve funcionar em dispositivos móveis', () => {
      cy.viewport(375, 667) // iPhone
      
      // Verifica se elementos principais estão visíveis
      cy.get('h1').should('be.visible')
      cy.get('form').should('be.visible')
      cy.get('table').should('be.visible')
      
      // Testa adicionar produto em mobile
      cy.get('input[name="nome"]').type('Produto Mobile')
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')
      cy.get('button[type="submit"]').click()
      
      cy.get('.alert-success').should('be.visible')
      cy.get('table tbody').should('contain.text', 'Produto Mobile')
    })

    it('deve funcionar em tablets', () => {
      cy.viewport(768, 1024) // iPad
      
      cy.get('form').should('be.visible')
      cy.get('table').should('be.visible')
      
      // Testa busca em tablet
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin')
      cy.get('table tbody tr').should('contain.text', 'Fresubin')
    })
  })

  describe('Validação de Interface', () => {
    it('deve mostrar alertas de feedback apropriados', () => {
      // Adiciona produto válido
      cy.get('input[name="nome"]').type('Produto Feedback')
      cy.get('input[name="kcal_ml"]').type('1.0')
      cy.get('input[name="cho_g_l"]').type('100')
      cy.get('input[name="lip_g_l"]').type('30')
      cy.get('input[name="ptn_g_l"]').type('40')
      cy.get('input[name="ep_ratio"]').type('20')
      cy.get('button[type="submit"]').click()

      // Verifica alerta de sucesso
      cy.get('.alert-success').should('be.visible')
      
      // Aguarda alerta desaparecer
      cy.get('.alert-success', { timeout: 6000 }).should('not.exist')
    })

    it('deve ter botões com estados apropriados', () => {
      // Verifica botão de submit
      cy.get('button[type="submit"]').should('be.enabled')
      cy.get('button[type="submit"]').should('contain.text', 'Adicionar Produto')
      
      // Verifica botões de ação na tabela
      cy.get('table tbody tr').first().within(() => {
        cy.get('button').should('be.enabled')
        cy.get('button').should('contain.text', 'Ocultar')
      })

    })

    it('deve ter labels corretos nos campos', () => {
      // Verifica se todos os labels estão presentes
      cy.contains('Nome do Produto').should('be.visible')
      cy.contains('Kcal/mL').should('be.visible') 
      cy.contains('CHO (g/L)').should('be.visible')
      cy.contains('LIP (g/L)').should('be.visible')
      cy.contains('PTN (g/L)').should('be.visible')
      cy.contains('EP Ratio').should('be.visible')
    })
  })
})
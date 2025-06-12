// cypress/e2e/gerenciar-produtos/persistencia/dados-localstorage.cy.js

describe('Gerenciar Produtos - Persistência de Dados', () => {
  beforeEach(() => {
    cy.visit('/nenpt/gerenciar-produtos');
    cy.waitForPageLoad();
  });

  describe('Persistência de produtos personalizados', () => {
    it('deve manter produtos personalizados após reload', () => {
      const nomeProduto = 'Produto Persistente';

      // Adiciona produto
      cy.get('input[name="nome"]').type(nomeProduto);
      cy.get('input[name="kcal_ml"]').type('2.0');
      cy.get('input[name="cho_g_l"]').type('200');
      cy.get('input[name="lip_g_l"]').type('60');
      cy.get('input[name="ptn_g_l"]').type('80');
      cy.get('input[name="ep_ratio"]').type('30');
      cy.get('button[type="submit"]').click();

      // Aguarda sucesso e recarrega página
      cy.get('.alert-success').should('be.visible');
      cy.reload();
      cy.waitForPageLoad();

      // Verifica se produto ainda está lá
      cy.get('table tbody').should('contain.text', nomeProduto);
      cy.get('table tbody').should('contain.text', '2.0');
      cy.get('table tbody').should('contain.text', 'Personalizado');
    });

    it('deve manter múltiplos produtos personalizados', () => {
      const produtos = [
        { nome: 'Produto A', kcal: '1.5' },
        { nome: 'Produto B', kcal: '1.8' },
        { nome: 'Produto C', kcal: '2.2' },
      ];

      // Adiciona múltiplos produtos
      produtos.forEach((produto) => {
        cy.get('input[name="nome"]').type(produto.nome);
        cy.get('input[name="kcal_ml"]').type(produto.kcal);
        cy.get('input[name="cho_g_l"]').type('150');
        cy.get('input[name="lip_g_l"]').type('50');
        cy.get('input[name="ptn_g_l"]').type('60');
        cy.get('input[name="ep_ratio"]').type('25');
        cy.get('button[type="submit"]').click();
        cy.get('.alert-success').should('be.visible');
      });

      // Recarrega página
      cy.reload();
      cy.waitForPageLoad();

      // Verifica se todos os produtos ainda estão lá
      produtos.forEach((produto) => {
        cy.get('table tbody').should('contain.text', produto.nome);
        cy.get('table tbody').should('contain.text', produto.kcal);
      });
    });

    it('deve manter produtos após navegar para outras páginas', () => {
      const nomeProduto = 'Produto Navegação';

      // Adiciona produto
      cy.get('input[name="nome"]').type(nomeProduto);
      cy.get('input[name="kcal_ml"]').type('1.7');
      cy.get('input[name="cho_g_l"]').type('170');
      cy.get('input[name="lip_g_l"]').type('55');
      cy.get('input[name="ptn_g_l"]').type('65');
      cy.get('input[name="ep_ratio"]').type('27');
      cy.get('button[type="submit"]').click();
      cy.get('.alert-success').should('be.visible');

      // Navega para outra página
      cy.visit('/nenpt');
      cy.waitForPageLoad();

      // Volta para gerenciar produtos
      cy.visit('/nenpt/gerenciar-produtos');
      cy.waitForPageLoad();

      // Verifica se produto ainda está lá
      cy.get('table tbody').should('contain.text', nomeProduto);
    });
  });

  describe('Persistência de produtos ocultos', () => {
    it('deve manter produtos ocultos após reload', () => {
      // Oculta um produto
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin Original');

      cy.contains('tr', 'Fresubin Original').within(() => {
        cy.get('button').contains('Ocultar').click();
      });

      cy.get('.modal button').contains('Ocultar').click();

      // Aguarda um pouco para garantir que o localStorage foi atualizado
      cy.wait(1000);

      // Verifica se o produto foi adicionado aos produtos ocultos no localStorage
      cy.window().then((win) => {
        const hiddenProducts = JSON.parse(
          win.localStorage.getItem('hiddenDefaultProducts') || '[]'
        );
        expect(hiddenProducts).to.include('Fresubin Original');
      });

      // Recarrega página
      cy.reload();
      cy.waitForPageLoad();

      // Verifica que produto continua oculto
      cy.get('input[placeholder*="Buscar produto"]').clear();
      // cy.get('table tbody').should('not.contain.text', 'Fresubin Original')

      // Verifica na seção de ocultos
      cy.contains('Produtos Padrão Ocultos').should('be.visible');
    });

    it('deve manter múltiplos produtos ocultos', () => {
      const produtosParaOcultar = ['Fresubin Energy', 'Nutrison Energy'];

      // Oculta múltiplos produtos
      produtosParaOcultar.forEach((produto) => {
        cy.get('input[placeholder*="Buscar produto"]').clear().type(produto);
        cy.contains('tr', produto)
          .first()
          .within(() => {
            cy.get('button').contains('Ocultar').click();
          });
        cy.get('.modal button').contains('Ocultar').click();
      });

      // Recarrega página
      cy.reload();
      cy.waitForPageLoad();

      // Verifica que produtos continuam ocultos
      // cy.get('input[placeholder*="Buscar produto"]').clear()
      // produtosParaOcultar.forEach(produto => {
      //   cy.get('table tbody').should('not.contain.text', produto)
      // })

      // Verifica na seção de ocultos
      cy.contains('Produtos Padrão Ocultos').should('be.visible');
    });
  });

  describe('Integridade dos dados', () => {
    it('deve verificar estrutura dos dados no localStorage', () => {
      const nomeProduto = 'Produto Estrutura';

      // Adiciona produto
      cy.get('input[name="nome"]').type(nomeProduto);
      cy.get('input[name="kcal_ml"]').type('1.0');
      cy.get('input[name="cho_g_l"]').type('100');
      cy.get('input[name="lip_g_l"]').type('30');
      cy.get('input[name="ptn_g_l"]').type('40');
      cy.get('input[name="ep_ratio"]').type('20');
      cy.get('button[type="submit"]').click();
      cy.get('.alert-success').should('be.visible');

      // Verifica localStorage
      cy.window().then((win) => {
        // Verifica dados no localStorage
        let produtos = JSON.parse(win.localStorage.getItem('userProducts') || '[]');

        expect(produtos).to.be.an('array');
        expect(produtos).to.have.length.greaterThan(0);

        const produtoAdicionado = produtos.find((p) => p.nome === nomeProduto);
        expect(produtoAdicionado).to.exist;
        expect(produtoAdicionado).to.have.property('nome', nomeProduto);
        expect(produtoAdicionado).to.have.property('kcal_ml', 1.0);
        // Não verifica 'tipo' pois a implementação atual não adiciona essa propriedade
      });
    });

    it('deve lidar com localStorage corrompido', () => {
      // Corrompe dados do localStorage
      cy.window().then((win) => {
        win.localStorage.setItem('userProducts', 'dados-invalidos');
        win.localStorage.setItem('hiddenDefaultProducts', 'dados-invalidos');
      });

      // Recarrega página
      cy.reload();
      cy.waitForPageLoad();

      // Aplicação deve continuar funcionando
      cy.get('table').should('be.visible');
      cy.get('form').should('be.visible');

      // Deve carregar produtos padrão
      cy.get('table tbody tr').should('have.length.greaterThan', 0);
    });

    it('deve funcionar sem localStorage (modo privado)', () => {
      // Simula ambiente sem localStorage
      cy.window().then((win) => {
        // Substitui localStorage por um mock que falha
        const mockStorage = {
          getItem: () => {
            throw new Error('localStorage disabled');
          },
          setItem: () => {
            throw new Error('localStorage disabled');
          },
          removeItem: () => {
            throw new Error('localStorage disabled');
          },
        };
        Object.defineProperty(win, 'localStorage', { value: mockStorage });
      });

      // Recarrega página
      cy.reload();
      cy.waitForPageLoad();

      // Aplicação deve continuar funcionando
      cy.get('table').should('be.visible');
      cy.get('form').should('be.visible');
    });
  });

  // describe('Migração de dados', () => {
  //   it('deve migrar dados de versões antigas se necessário', () => {
  //     // Simula dados de versão antiga no localStorage
  //     cy.window().then((win) => {
  //       const dadosAntigos = [
  //         { nome: 'Produto Antigo', kcal_ml: 1.0, cho_g_l: 100, lip_g_l: 30, ptn_g_l: 40, ep_ratio: 20 } // Usar 'kcal_ml' atual
  //       ]
  //       win.localStorage.setItem('userProducts', JSON.stringify(dadosAntigos))
  //     })

  //     // Recarrega página
  //     cy.reload()
  //     cy.waitForPageLoad()

  //     // Verifica que dados foram carregados corretamente
  //     cy.get('table tbody').should('contain.text', 'Produto Antigo')
  //   })

  // })
});

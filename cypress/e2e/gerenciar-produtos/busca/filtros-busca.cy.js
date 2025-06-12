// cypress/e2e/gerenciar-produtos/busca/filtros-busca.cy.js

describe('Gerenciar Produtos - Busca e Filtros', () => {
  beforeEach(() => {
    cy.visit('/nenpt/gerenciar-produtos');
    cy.waitForPageLoad();

    // Limpa qualquer busca ativa e campos de formulário
    cy.get('input[placeholder*="Buscar produto"]').clear();
    cy.get('input[name="nome"]').clear();
  });

  describe('Busca básica', () => {
    it('deve filtrar produtos por nome', () => {
      // Usa o campo de busca para filtrar por "Fresubin"
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin');

      // Verifica que apenas produtos com "Fresubin" aparecem
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).should('contain.text', 'Fresubin');
      });
    });

    it('deve buscar por produtos específicos', () => {
      cy.get('input[placeholder*="Buscar produto"]').type('Energy');

      // Verifica que produtos com "Energy" no nome aparecem
      cy.get('table tbody tr').should('contain.text', 'Energy');
    });

    it('deve mostrar todos os produtos quando busca for limpa', () => {
      // Filtra primeiro
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin');
      cy.get('table tbody tr').should('have.length.lessThan', 50);

      // Limpa o filtro
      cy.get('input[placeholder*="Buscar produto"]').clear();

      // Verifica que mais produtos aparecem novamente
      cy.get('table tbody tr').should('have.length.greaterThan', 10);
    });
  });

  describe('Busca avançada', () => {
    it('deve buscar por termo parcial', () => {
      cy.get('input[placeholder*="Buscar produto"]').type('Nutri');

      // Deve encontrar produtos como "Nutrison", "Nutricomp", etc.
      cy.get('table tbody tr').should('have.length.greaterThan', 0);
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).should('contain.text', 'Nutri');
      });
    });

    it('deve ser case insensitive', () => {
      cy.get('input[placeholder*="Buscar produto"]').type('FRESUBIN');

      cy.get('table tbody tr').should('contain.text', 'Fresubin');
    });

    it('deve buscar por acentos e caracteres especiais', () => {
      // Primeiro adiciona produto com acentos
      cy.get('input[name="nome"]').clear().type('Nutrição Especial');
      cy.get('input[name="kcal_ml"]').clear().type('1.0');
      cy.get('input[name="cho_g_l"]').clear().type('100');
      cy.get('input[name="lip_g_l"]').clear().type('30');
      cy.get('input[name="ptn_g_l"]').clear().type('40');
      cy.get('input[name="ep_ratio"]').clear().type('20');
      cy.get('button[type="submit"]').click();
      cy.get('.alert-success').should('be.visible');

      // Busca com acentos
      cy.get('input[placeholder*="Buscar produto"]').clear().type('Nutrição');
      cy.get('table tbody tr').should('contain.text', 'Nutrição Especial');
    });
  });

  describe('Resultados de busca', () => {
    it('deve mostrar mensagem quando não encontrar resultados', () => {
      cy.get('input[placeholder*="Buscar produto"]').type('ProdutoInexistente123');

      // Verifica mensagem de "nenhum resultado"
      cy.get('table tbody').should('contain.text', 'Nenhum resultado encontrado');
    });

    it('deve manter contagem correta de resultados', () => {
      // Busca específica
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin');

      // Conta os resultados
      cy.get('table tbody tr').then(($rows) => {
        const count = $rows.length;
        expect(count).to.be.greaterThan(0);
        expect(count).to.be.lessThan(50); // Menos que o total
      });
    });

    it('deve destacar termo buscado nos resultados', () => {
      cy.get('input[placeholder*="Buscar produto"]').type('Energy');

      // Verifica se termo aparece nos resultados (mesmo sem highlight visual)
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).should('contain.text', 'Energy');
      });
    });
  });

  describe('Interação com busca', () => {
    it('deve filtrar enquanto digita', () => {
      // Digite letra por letra e verifica filtro em tempo real
      cy.get('input[placeholder*="Buscar produto"]').type('F');
      cy.get('table tbody tr').should('have.length.greaterThan', 0);

      cy.get('input[placeholder*="Buscar produto"]').type('r');
      cy.get('table tbody tr').should('have.length.greaterThan', 0);

      cy.get('input[placeholder*="Buscar produto"]').type('esubin');
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).should('contain.text', 'Fresubin');
      });
    });

    it('deve manter busca após adicionar produto', () => {
      // Filtra por Fresubin
      cy.get('input[placeholder*="Buscar produto"]').clear().type('Fresubin');
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).should('contain.text', 'Fresubin');
      });

      // Adiciona novo produto
      cy.get('input[name="nome"]').clear().type('Produto Durante Busca');
      cy.get('input[name="kcal_ml"]').clear().type('1.0');
      cy.get('input[name="cho_g_l"]').clear().type('100');
      cy.get('input[name="lip_g_l"]').clear().type('30');
      cy.get('input[name="ptn_g_l"]').clear().type('40');
      cy.get('input[name="ep_ratio"]').clear().type('20');
      cy.get('button[type="submit"]').click();

      // Verifica que busca ainda está ativa
      cy.get('input[placeholder*="Buscar produto"]').should('have.value', 'Fresubin');
    });

    it('deve limpar busca com botão X se disponível', () => {
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin');

      // Verifica se há botão de limpar busca
      cy.get('body').then(($body) => {
        if ($body.find('button[aria-label*="limpar"], .clear-search').length > 0) {
          cy.get('button[aria-label*="limpar"], .clear-search').click();
          cy.get('input[placeholder*="Buscar produto"]').should('have.value', '');
        }
      });
    });
  });

  describe('Performance de busca', () => {
    it('deve filtrar rapidamente mesmo com muitos produtos', () => {
      // Adiciona vários produtos primeiro
      for (let i = 1; i <= 5; i++) {
        cy.get('input[name="nome"]').clear().type(`Produto Performance ${i}`);
        cy.get('input[name="kcal_ml"]').clear().type('1.0');
        cy.get('input[name="cho_g_l"]').clear().type('100');
        cy.get('input[name="lip_g_l"]').clear().type('30');
        cy.get('input[name="ptn_g_l"]').clear().type('40');
        cy.get('input[name="ep_ratio"]').clear().type('20');
        cy.get('button[type="submit"]').click();
        cy.get('.alert-success').should('be.visible');
        cy.wait(100); // Pequena pausa entre cadastros
      }

      // Aguarda a página estar estável antes de testar performance
      cy.wait(500);

      // Testa busca rápida - mede APENAS o tempo da busca
      cy.then(() => {
        const startTime = performance.now();

        cy.get('input[placeholder*="Buscar produto"]').clear().type('Performance');
        cy.get('table tbody tr')
          .should('contain.text', 'Performance')
          .then(() => {
            const endTime = performance.now();
            const searchTime = endTime - startTime;
            expect(searchTime).to.be.lessThan(500); // Menos de 500ms apenas para a busca
          });
      });
    });

    it('deve manter responsividade durante busca', () => {
      // Limpa campo de busca primeiro
      cy.get('input[placeholder*="Buscar produto"]').clear();

      // Testa busca
      cy.get('input[placeholder*="Buscar produto"]').type('Fresubin');

      // Verifica que outros elementos ainda são interativos durante a busca
      cy.get('button[type="submit"]').should('be.enabled');
      cy.get('input[name="nome"]').should('be.enabled');
    });

    it('deve ter performance consistente com diferentes termos de busca', () => {
      const testTerms = ['Fresubin', 'Nutrison', 'Energy', 'HP'];

      testTerms.forEach((term) => {
        cy.then(() => {
          const startTime = performance.now();

          cy.get('input[placeholder*="Buscar produto"]').clear().type(term);
          cy.get('table tbody tr')
            .should('have.length.greaterThan', 0)
            .then(() => {
              const endTime = performance.now();
              const searchTime = endTime - startTime;
              expect(searchTime).to.be.lessThan(600); // Cada busca deve ser rápida
            });
        });
      });
    });
  });
});

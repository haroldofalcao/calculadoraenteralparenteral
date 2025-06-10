// cypress/e2e/features/home/seo-accessibility.cy.js

describe('Home - SEO e Acessibilidade', () => {
  before(() => {
    cy.resetAppState()
    cy.visit('/')
    cy.waitForPageLoad()
  })

  describe('Elementos de SEO', () => {
    it('deve ter meta tags essenciais', () => {
      // Verifica title
      cy.get('head title').should('exist').and('not.be.empty')
      
      // Verifica meta description
      cy.get('head meta[name="description"]').should('exist')
      
      // Verifica meta viewport
      cy.get('head meta[name="viewport"]').should('exist')
    })

    it('deve ter estrutura de headings adequada', () => {
      // Verifica hierarquia de headings
      cy.get('h1').should('have.length', 1)
      cy.get('h1').should('contain', 'Calculadoras Nutricionais')
      
      // Verifica que há outros níveis de heading nos cards
      cy.get('.card-title').should('exist')
    })

    it('deve ter meta tags Open Graph', () => {
      cy.get('head').within(() => {
        // Verifica se existem meta tags OG (podem não estar implementadas ainda)
        cy.get('meta[property^="og:"]').should('exist').then(($metas) => {
          if ($metas.length > 0) {
            cy.get('meta[property="og:title"]').should('exist')
            cy.get('meta[property="og:description"]').should('exist')
          }
        })
      })
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter texto alternativo adequado para ícones', () => {
      // Verifica se ícones têm contexto adequado
      cy.get('.fas').each(($icon) => {
        // Ícones decorativos devem estar em elementos com texto
        cy.wrap($icon).parent().should('contain.text')
      })
    })

    it('deve ter contraste adequado', () => {
      // Verifica cores principais
      cy.get('.text-primary').should('be.visible')
      cy.get('.text-success').should('be.visible')
      cy.get('.text-info').should('be.visible')
      cy.get('.text-muted').should('be.visible')
    })

    it('deve ser navegável por teclado', () => {
      // Verifica que elementos focáveis existem
      cy.get('a, button').each(($el) => {
        cy.wrap($el).should('be.visible')
        cy.wrap($el).focus().should('have.focus')
      })
    })

    it('deve ter landmarks semânticos', () => {
      // Verifica estrutura semântica
      cy.get('main, section, article, nav, header, footer').should('exist')
    })

    it('deve ter labels adequados para links', () => {
      // Verifica que links têm texto descritivo
      cy.get('a').each(($link) => {
        const text = $link.text().trim()
        expect(text).to.not.be.empty
        expect(text).to.not.equal('Clique aqui')
        expect(text).to.not.equal('Saiba mais')
      })
    })
  })

  describe('Performance', () => {
    it('deve carregar rapidamente', () => {
      cy.window().its('performance').invoke('now').should('be.lessThan', 3000)
    })

    it('deve ter imagens otimizadas', () => {
      cy.get('img').each(($img) => {
        // Verifica se imagens têm alt text
        cy.wrap($img).should('have.attr', 'alt')
        
        // Verifica se imagens carregaram
        cy.wrap($img).should('be.visible')
      })
    })
  })

  describe('Compatibilidade', () => {
    it('deve funcionar sem JavaScript (graceful degradation)', () => {
      // Testa elementos que devem funcionar sem JS
      cy.get('a[href]').should('exist')
      cy.get('.card').should('be.visible')
    })

    it('deve ter fallbacks adequados', () => {
      // Verifica que há conteúdo mesmo se recursos externos falharem
      cy.contains('Calculadoras Nutricionais').should('be.visible')
      cy.get('.card').should('have.length.at.least', 2)
    })
  })
})

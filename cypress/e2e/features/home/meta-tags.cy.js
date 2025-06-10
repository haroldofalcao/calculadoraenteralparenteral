// cypress/e2e/features/home/meta-tags.cy.js

describe('Home - Meta Tags e SEO', () => {
  beforeEach(() => {
    cy.resetAppState()
    cy.visit('/')
    cy.waitForPageLoad()
  })

  describe('Meta Tags Básicas', () => {
    it('deve ter title adequado', () => {
      cy.title().should('not.be.empty')
      cy.title().should('contain', 'NutriCalc')
    })

    it('deve ter meta description', () => {
      cy.get('head meta[name="description"]').should('exist')
      cy.get('head meta[name="description"]').should('have.attr', 'content').and('not.be.empty')
    })

    it('deve ter meta viewport para responsividade', () => {
      cy.get('head meta[name="viewport"]').should('exist')
      cy.get('head meta[name="viewport"]').should('have.attr', 'content').and('contain', 'width=device-width')
    })

    it('deve ter meta keywords', () => {
      cy.get('head meta[name="keywords"]').should('exist')
      cy.get('head meta[name="keywords"]').should('have.attr', 'content').and('not.be.empty')
    })
  })

  describe('Canonical URL', () => {
    it('deve ter canonical URL definida', () => {
      cy.get('head link[rel="canonical"]').should('exist')
    })

    it('deve ter canonical URL válida', () => {
      cy.get('head link[rel="canonical"]').then(($canonical) => {
        const href = $canonical.attr('href')
        
        // Verifica que é uma URL válida
        expect(href).to.match(/^https?:\/\//)
        expect(href).to.not.be.empty
        
        // Verifica que aponta para um domínio conhecido
        const isValidDomain = href.includes('nutricalc.online') || 
                             href.includes('localhost') ||
                             href.includes('127.0.0.1')
        
        expect(isValidDomain).to.be.true
      })
    })

    it('deve ter canonical URL apropriada para ambiente', () => {
      cy.get('head link[rel="canonical"]').then(($canonical) => {
        const href = $canonical.attr('href')
        
        // Se estamos em localhost, canonical pode apontar para produção (normal)
        // Se estamos em produção, deve apontar para produção
        cy.url().then((currentUrl) => {
          if (currentUrl.includes('localhost')) {
            // Em desenvolvimento, aceita qualquer canonical válido
            expect(href).to.be.a('string').and.not.be.empty
          } else {
            // Em produção, deve ser consistente
            expect(href).to.include(new URL(currentUrl).origin)
          }
        })
      })
    })
  })

  describe('Open Graph Tags', () => {
    it('deve ter Open Graph básico', () => {
      cy.get('head meta[property="og:title"]').should('exist')
      cy.get('head meta[property="og:description"]').should('exist')
      cy.get('head meta[property="og:type"]').should('exist')
      cy.get('head meta[property="og:url"]').should('exist')
    })

    it('deve ter Open Graph com conteúdo adequado', () => {
      cy.get('head meta[property="og:title"]').should('have.attr', 'content').and('not.be.empty')
      cy.get('head meta[property="og:description"]').should('have.attr', 'content').and('not.be.empty')
      cy.get('head meta[property="og:type"]').should('have.attr', 'content').and('contain', 'website')
    })
  })

  describe('Twitter Cards', () => {
    it('deve ter Twitter Card meta tags', () => {
      cy.get('head meta[name="twitter:card"]').should('exist')
      cy.get('head meta[name="twitter:title"]').should('exist')
      cy.get('head meta[name="twitter:description"]').should('exist')
    })
  })

  describe('Outras Meta Tags', () => {
    it('deve ter meta robots', () => {
      cy.get('head meta[name="robots"]').should('exist')
      cy.get('head meta[name="robots"]').should('have.attr', 'content').and('contain', 'index')
    })

    it('deve ter meta author', () => {
      cy.get('head meta[name="author"]').should('exist')
      cy.get('head meta[name="author"]').should('have.attr', 'content').and('not.be.empty')
    })

    it('deve ter theme-color para PWA', () => {
      cy.get('head meta[name="theme-color"]').should('exist')
      cy.get('head meta[name="theme-color"]').should('have.attr', 'content').and('match', /^#[0-9a-fA-F]{6}$/)
    })
  })

  describe('Estrutura de Links', () => {
    it('deve ter favicon', () => {
      cy.get('head link[rel="icon"]').should('exist')
      cy.get('head link[rel="icon"]').should('have.attr', 'href').and('not.be.empty')
    })

    it('deve ter manifest para PWA', () => {
      cy.get('head link[rel="manifest"]').should('exist')
      cy.get('head link[rel="manifest"]').should('have.attr', 'href').and('contain', 'manifest')
    })

    it('deve ter apple-touch-icon', () => {
      cy.get('head link[rel="apple-touch-icon"]').should('exist')
      cy.get('head link[rel="apple-touch-icon"]').should('have.attr', 'href').and('not.be.empty')
    })
  })

  describe('Performance e Preconnect', () => {
    it('deve ter preconnect para recursos externos', () => {
      cy.get('head link[rel="preconnect"]').should('exist')
    })

    it('deve ter Font Awesome carregado', () => {
      // Verifica se Font Awesome foi adicionado
      cy.get('head link[href*="font-awesome"]').should('exist')
    })
  })
})

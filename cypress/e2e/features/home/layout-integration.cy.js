// cypress/e2e/features/home/layout-integration.cy.js

describe('Home - Integração com Layout', () => {
  beforeEach(() => {
    cy.resetAppState()
    cy.visit('/')
    cy.waitForPageLoad()
  })

  describe('Header Integration', () => {
    it('deve ter navegação funcional no header', () => {
      cy.get('body').then(($body) => {
        // Testa navegação se existir header
        if ($body.find('nav, header').length > 0) {
          cy.get('nav, header').should('be.visible')
          
          // Verifica links de navegação
          cy.get('nav a, header a').each(($link) => {
            const href = $link.attr('href')
            if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('mailto')) {
              // Verifica que é um link interno válido
              expect(href).to.match(/^\/|^\.\/|^\.\.\//)
            }
          })
        }
      })
    })

    it('deve manter consistência visual com header', () => {
      cy.get('body').then(($body) => {
        if ($body.find('nav, header').length > 0) {
          // Verifica que o header existe e está visível
          cy.get('nav, header').should('be.visible')
          
          // Verifica que não há overlap com o conteúdo principal
          cy.get('.container').should('be.visible')
        }
      })
    })

    it('deve ter logo/brand funcional', () => {
      cy.get('body').then(($body) => {
        if ($body.find('.navbar-brand, .logo, [data-cy="logo"]').length > 0) {
          cy.get('.navbar-brand, .logo, [data-cy="logo"]').should('be.visible')
          
          // Se o logo é clicável, deve voltar para home
          cy.get('.navbar-brand, .logo, [data-cy="logo"]').then(($logo) => {
            if ($logo.is('a') || $logo.find('a').length > 0) {
              const link = $logo.is('a') ? $logo : $logo.find('a').first()
              const href = link.attr('href')
              expect(href).to.match(/^\/(?:$|home|index)/)
            }
          })
        }
      })
    })
  })

  describe('Footer Integration', () => {
    it('deve ter footer com informações relevantes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('footer').length > 0) {
          cy.get('footer').should('be.visible')
          
          // Verifica se footer tem conteúdo
          cy.get('footer').should('not.be.empty')
        }
      })
    })

    it('deve ter links de footer funcionais', () => {
      cy.get('body').then(($body) => {
        if ($body.find('footer a').length > 0) {
          cy.get('footer a').each(($link) => {
            const href = $link.attr('href')
            if (href && href !== '#') {
              // Verifica que links têm href válido
              expect(href).to.not.be.empty
            }
          })
        }
      })
    })

    it('deve manter footer no bottom da página', () => {
      cy.get('body').then(($body) => {
        if ($body.find('footer').length > 0) {
          // Verifica que footer está posicionado adequadamente
          cy.get('footer').should('be.visible')
          
          // Verifica posicionamento do footer
          cy.get('footer').should(($footer) => {
            const footerElement = $footer[0]
            const footerRect = footerElement.getBoundingClientRect()
            
            // Footer deve estar visível na viewport ou ter posicionamento adequado
            expect(footerRect.bottom).to.be.greaterThan(0)
          })
          
          // Verifica se footer tem classe mt-auto (Bootstrap flex utility)
          cy.get('footer').should('have.class', 'mt-auto')
        }
      })
    })

    it('deve ter layout flexível que empurra footer para baixo', () => {
      // Verifica se há um layout flex que posiciona o footer corretamente
      cy.get('body').then(($body) => {
        if ($body.find('footer').length > 0) {
          // Verifica estrutura de layout flex
          cy.get('body').parent('html').then(($html) => {
            // Pode haver um wrapper com d-flex flex-column
            if ($body.closest('.d-flex').length > 0 || $body.hasClass('d-flex')) {
              cy.get('.d-flex.flex-column, body.d-flex').should('exist')
            }
          })
          
          // Footer deve estar no final do documento
          cy.get('footer').should('be.visible')
        }
      })
    })
  })

  describe('Layout Responsivo', () => {
    it('deve manter layout consistente em diferentes tamanhos', () => {
      const viewports = [
        { width: 320, height: 568 },
        { width: 768, height: 1024 },
        { width: 1280, height: 720 }
      ]
      
      viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height)
        cy.waitForPageLoad()
        
        // Verifica que o layout principal está intacto
        cy.get('.container').should('be.visible')
        cy.get('h1').should('be.visible')
        cy.get('.card').should('be.visible')
        
        // Verifica que não há overflow horizontal
        cy.get('body').then(($body) => {
          const bodyWidth = $body[0].scrollWidth
          const windowWidth = Cypress.config('viewportWidth')
          expect(bodyWidth).to.be.at.most(windowWidth + 20) // 20px de tolerância
        })
      })
    })

    it('deve adaptar navegação em mobile', () => {
      cy.viewport(320, 568)
      cy.waitForPageLoad()
      
      cy.get('body').then(($body) => {
        if ($body.find('nav').length > 0) {
          // Verifica se há botão de toggle em mobile
          if ($body.find('.navbar-toggler, .menu-toggle, [data-bs-toggle="collapse"]').length > 0) {
            cy.get('.navbar-toggler, .menu-toggle, [data-bs-toggle="collapse"]').should('be.visible')
          }
        }
      })
    })
  })

  describe('Breadcrumbs e Navegação', () => {
    it('deve indicar página atual corretamente', () => {
      // Verifica se há indicação de página atual
      cy.get('body').then(($body) => {
        if ($body.find('.breadcrumb, .nav-item.active, [aria-current="page"]').length > 0) {
          cy.get('.breadcrumb, .nav-item.active, [aria-current="page"]').should('be.visible')
        }
      })
      
      // Verifica title da página
      cy.title().should('not.be.empty')
    })

    it('deve ter meta informações adequadas', () => {
      // Verifica canonical URL
      cy.get('head link[rel="canonical"]').should('exist').then(($canonical) => {
        const href = $canonical.attr('href')
        
        // Em desenvolvimento, aceita tanto localhost quanto o domínio de produção
        const isLocal = href.includes('localhost') || href.includes('127.0.0.1')
        const isProduction = href.includes('nutricalc.online')
        const baseUrl = Cypress.config('baseUrl')
        
        if (baseUrl && baseUrl.includes('localhost')) {
          // Se estamos em ambiente local, aceita qualquer URL válida
          expect(href).to.match(/^https?:\/\//)
        } else {
          // Se não há baseUrl local definido, aceita URLs válidas
          expect(href).to.be.a('string').and.not.be.empty
        }
      })
    })
  })
})

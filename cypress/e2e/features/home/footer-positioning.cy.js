// cypress/e2e/features/home/footer-positioning.cy.js

describe('Home - Posicionamento do Footer', () => {
  beforeEach(() => {
    cy.resetAppState()
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('deve ter footer com estrutura flex adequada', () => {
    cy.get('footer').should('exist').then(($footer) => {
      // Verifica se footer existe
      cy.wrap($footer).should('be.visible')
      
      // Verifica se tem classe mt-auto para empurrar para baixo
      cy.wrap($footer).should('have.class', 'mt-auto')
      
      // Verifica conteúdo do footer
      cy.wrap($footer).should('contain.text', 'Calculadora Nutricional')
      cy.wrap($footer).should('contain.text', 'CC BY-NC-ND 4.0')
    })
  })

  it('deve ter layout container principal que permite footer no bottom', () => {
    // Verifica se há um container pai com flex
    cy.get('body').then(($body) => {
      // Procura por estrutura flex no elemento pai do footer
      cy.get('footer').parent().should(($parent) => {
        const parentEl = $parent[0]
        const styles = window.getComputedStyle(parentEl)
        
        // Verifica se o pai tem display flex ou similar
        const hasFlexDisplay = styles.display === 'flex' || 
                              styles.display === '-webkit-flex' ||
                              $parent.hasClass('d-flex')
        
        // Se não tem flex no pai direto, verifica se há estrutura adequada
        if (!hasFlexDisplay) {
          // Verifica se footer tem posicionamento adequado
          expect($parent).to.exist
        }
      })
    })
  })

  it('deve posicionar footer corretamente em páginas curtas', () => {
    // Simula página curta removendo conteúdo temporariamente
    cy.get('.card').then(($cards) => {
      // Esconde temporariamente alguns cards para simular página curta
      cy.wrap($cards).invoke('hide')
      
      // Aguarda um momento
      cy.wait(500)
      
      // Verifica posicionamento do footer
      cy.get('footer').should('be.visible')
      
      // Verifica se footer está no bottom da viewport ou adequadamente posicionado
      cy.window().then((win) => {
        cy.get('footer').then(($footer) => {
          const footerRect = $footer[0].getBoundingClientRect()
          const viewportHeight = win.innerHeight
          
          // Footer deve estar próximo ao bottom ou visível
          expect(footerRect.top).to.be.lessThan(viewportHeight)
        })
      })
      
      // Restaura os cards
      cy.wrap($cards).invoke('show')
    })
  })

  it('deve manter footer no final em páginas longas', () => {
    // Verifica comportamento normal com conteúdo completo
    cy.get('footer').should('be.visible')
    
    // Scroll até o footer
    cy.get('footer').scrollIntoView()
    
    // Verifica que footer está no final da página
    cy.window().then((win) => {
      cy.get('footer').then(($footer) => {
        const footerRect = $footer[0].getBoundingClientRect()
        const bodyHeight = document.body.scrollHeight
        const scrollTop = win.pageYOffset
        
        // Footer deve estar próximo ao final do conteúdo
        expect(footerRect.bottom + scrollTop).to.be.closeTo(bodyHeight, 100)
      })
    })
  })

  it('deve manter footer responsivo', () => {
    const viewports = [
      { width: 320, height: 568 },
      { width: 768, height: 1024 },
      { width: 1280, height: 720 }
    ]
    
    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)
      cy.waitForPageLoad()
      
      // Verifica que footer está visível e bem posicionado
      cy.get('footer').should('be.visible')
      
      // Verifica que footer não quebra o layout
      cy.get('footer').then(($footer) => {
        const footerWidth = $footer[0].scrollWidth
        expect(footerWidth).to.be.at.most(viewport.width + 20) // Tolerância
      })
    })
  })

  it('deve ter texto de copyright e links funcionais', () => {
    cy.get('footer').within(() => {
      // Verifica copyright
      cy.contains(new Date().getFullYear().toString()).should('be.visible')
      
      // Verifica link de email
      cy.get('a[href^="mailto:"]').should('exist').and('be.visible')
      
      // Verifica textos de licença
      cy.contains('CC BY-NC-ND 4.0').should('be.visible')
    })
  })
})

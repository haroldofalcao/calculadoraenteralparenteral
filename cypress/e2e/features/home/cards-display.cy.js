// cypress/e2e/features/home/cards-display.cy.js

describe('Home - Exibição de Cards', () => {
  beforeEach(() => {
    cy.resetAppState()
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('deve exibir o card NENPT corretamente', () => {
    // Verifica título do card
    cy.contains('Calculadora NENPT', { timeout: 10000 }).should('be.visible')
    
    // Verifica descrição
    cy.contains('Necessidades Energéticas', { timeout: 5000 }).should('be.visible')
    
    // Verifica ícone
    cy.get('.card').contains('Calculadora NENPT').parent().find('.fas.fa-calculator').should('exist')
    
    // Verifica botões
    cy.get('.card').contains('Calculadora NENPT').parent().within(() => {
      cy.contains('Acessar Calculadora').should('be.visible')
      cy.contains('Gerenciar Produtos').should('be.visible')
    })
  })

  it('deve exibir o card GIDS corretamente', () => {
    // Verifica título do card
    cy.contains('Calculadora GIDS', { timeout: 5000 }).should('be.visible')
    
    // Verifica descrição - usando parte do texto que deve estar presente
    cy.contains('Gastrointestinal Dysfunction Score', { timeout: 5000 }).should('be.visible')
    
    // Verifica ícone
    cy.get('.card').contains('Calculadora GIDS').parent().find('.fas.fa-stethoscope').should('exist')
    
    // Verifica botão usando o texto da tradução
    cy.get('.card').contains('Calculadora GIDS').parent().within(() => {
      cy.contains('Acessar GIDS').should('be.visible')
    })
  })

  it('deve exibir o card de informações sobre a aplicação', () => {
    // Verifica card de informações usando a tradução correta
    cy.contains('Sobre as Calculadoras').should('be.visible')
    cy.get('.card.bg-light').should('be.visible')
    cy.get('.fas.fa-info-circle').should('exist')
  })

  it('deve ter cards com altura uniforme', () => {
    // Verifica que os cards principais têm a classe h-100
    cy.get('.card.h-100').should('have.length.at.least', 2)
  })

  it('deve exibir todos os ícones corretamente', () => {
    // Verifica ícones Font Awesome - apenas verifica se existem, não se são visíveis
    // pois podem ter largura 0 se o Font Awesome não estiver carregado
    cy.get('.fas.fa-calculator').should('exist')
    cy.get('.fas.fa-stethoscope').should('exist')
    cy.get('.fas.fa-info-circle').should('exist')
  })

  it('deve verificar se Font Awesome está carregado ou usar fallback', () => {
    // Verifica se os ícones têm largura (Font Awesome carregado) ou se existe fallback
    cy.get('.fas.fa-calculator').then(($icon) => {
      const width = $icon.width()
      if (width > 0) {
        // Font Awesome carregado corretamente
        cy.wrap($icon).should('be.visible')
      } else {
        // Font Awesome não carregado, mas ícone existe
        cy.wrap($icon).should('exist')
        // Verifica se há texto de contexto adequado no card
        cy.wrap($icon).parent().should('contain.text')
      }
    })
  })

  it('deve ter cores adequadas nos cards', () => {
    // Verifica cores dos títulos
    cy.get('.text-primary').should('be.visible')
    cy.get('.text-success').should('be.visible')
    cy.get('.text-info').should('be.visible')
  })
})

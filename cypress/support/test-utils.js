// cypress/support/test-utils.js

// Utilitários para facilitar os testes

export const testData = {
  pacientes: {
    adultoSaudavel: {
      nome: 'João Silva',
      peso: '70',
      altura: '175',
      idade: '30',
      sexo: 'masculino'
    },
    idoso: {
      nome: 'Maria Santos',
      peso: '60',
      altura: '160',
      idade: '75',
      sexo: 'feminino'
    },
    obeso: {
      nome: 'Carlos Oliveira',
      peso: '120',
      altura: '180',
      idade: '45',
      sexo: 'masculino'
    }
  },
  produtos: {
    basico: {
      nome: 'Produto Teste',
      calorias: '100',
      proteinas: '10',
      carboidratos: '15',
      gorduras: '5'
    },
    hiperproteico: {
      nome: 'Produto Hiperproteico',
      calorias: '150',
      proteinas: '25',
      carboidratos: '10',
      gorduras: '3'
    }
  },
  gids: {
    leve: ['vomiting'],
    moderado: ['vomiting', 'diarrhea'],
    severo: ['vomiting', 'diarrhea', 'abdominalDistension', 'gastricResidue']
  }
}

// Função para preencher formulário NENPT
export const preencherFormularioNenpt = (dadosPaciente = testData.pacientes.adultoSaudavel) => {
  Object.entries(dadosPaciente).forEach(([campo, valor]) => {
    if (campo === 'sexo') {
      cy.get(`select[name*="${campo}"], select[name*="gender"]`).then($select => {
        if ($select.length > 0) {
          cy.selectOption(`select[name*="${campo}"], select[name*="gender"]`, valor)
        }
      })
    } else {
      cy.get(`input[name*="${campo}"], input[placeholder*="${campo}"]`).then($input => {
        if ($input.length > 0) {
          cy.fillField(`input[name*="${campo}"], input[placeholder*="${campo}"]`, valor)
        }
      })
    }
  })
}

// Função para preencher formulário de produto
export const preencherFormularioProduto = (dadosProduto = testData.produtos.basico) => {
  Object.entries(dadosProduto).forEach(([campo, valor]) => {
    cy.get(`input[name*="${campo}"], input[placeholder*="${campo}"]`).then($input => {
      if ($input.length > 0) {
        cy.fillField(`input[name*="${campo}"], input[placeholder*="${campo}"]`, valor)
      }
    })
  })
}

// Função para selecionar sintomas GIDS
export const selecionarSintomasGids = (sintomas = testData.gids.leve) => {
  sintomas.forEach(sintoma => {
    cy.get(`input[name*="${sintoma}"], input[value*="${sintoma}"]`).then($checkbox => {
      if ($checkbox.length > 0) {
        cy.wrap($checkbox).check()
      }
    })
  })
}

// Função para aguardar carregamento específico
export const aguardarCarregamento = (seletor, timeout = 10000) => {
  cy.get(seletor, { timeout }).should('be.visible')
}

// Função para validar resultado de cálculo
export const validarResultadoCalculo = () => {
  cy.get('[data-testid="calculation-result"], .resultado, .result', { timeout: 10000 })
    .should('be.visible')
    .invoke('text')
    .should('match', /\d+/)
}

// Função para testar fluxo completo
export const testarFluxoCompleto = (pagina, acao) => {
  cy.visit(pagina)
  cy.waitForPageLoad()
  acao()
  cy.waitForCalculation()
}

// Função para gerar dados aleatórios
export const gerarDadosAleatorios = () => {
  return {
    nome: `Paciente ${Math.floor(Math.random() * 1000)}`,
    peso: (Math.random() * 50 + 50).toFixed(0), // 50-100kg
    altura: (Math.random() * 30 + 150).toFixed(0), // 150-180cm
    idade: (Math.random() * 50 + 20).toFixed(0), // 20-70 anos
    calorias: (Math.random() * 200 + 100).toFixed(0), // 100-300 kcal
    proteinas: (Math.random() * 20 + 5).toFixed(0) // 5-25g
  }
}

// Função para validar estrutura de dados
export const validarEstruturaDados = (objeto, camposObrigatorios) => {
  camposObrigatorios.forEach(campo => {
    expect(objeto).to.have.property(campo)
    expect(objeto[campo]).to.not.be.undefined
  })
}

// Função para simular interação de usuário real
export const simularUsuarioReal = () => {
  // Adiciona delays aleatórios para simular usuário real
  const delay = Math.floor(Math.random() * 1000) + 500
  cy.wait(delay)
}

// Função para verificar performance
export const verificarPerformance = (limiteMs = 3000) => {
  cy.window().then((win) => {
    const navigation = win.performance.getEntriesByType('navigation')[0]
    const loadTime = navigation.loadEventEnd - navigation.fetchStart
    expect(loadTime).to.be.lessThan(limiteMs)
  })
}

// Função para testar em múltiplos browsers
export const testarMultiplosBrowsers = (teste) => {
  const browsers = ['chrome', 'firefox', 'edge']
  browsers.forEach(browser => {
    cy.log(`Testando no ${browser}`)
    teste()
  })
}

// Função para capturar métricas
export const capturarMetricas = () => {
  cy.window().then((win) => {
    const metrics = {
      loadTime: win.performance.timing.loadEventEnd - win.performance.timing.navigationStart,
      domReady: win.performance.timing.domContentLoadedEventEnd - win.performance.timing.navigationStart,
      firstPaint: win.performance.getEntriesByType('paint')[0]?.startTime || 0
    }
    cy.log('Métricas de performance:', metrics)
    return metrics
  })
}

// Função para backup de dados de teste
export const backupDadosTeste = () => {
  cy.window().then((win) => {
    const backup = {
      localStorage: { ...win.localStorage },
      sessionStorage: { ...win.sessionStorage },
      timestamp: new Date().toISOString()
    }
    cy.writeFile('cypress/fixtures/test-backup.json', backup)
  })
}

// Função para restaurar dados de teste
export const restaurarDadosTeste = () => {
  cy.readFile('cypress/fixtures/test-backup.json').then((backup) => {
    cy.window().then((win) => {
      Object.entries(backup.localStorage).forEach(([key, value]) => {
        win.localStorage.setItem(key, value)
      })
      Object.entries(backup.sessionStorage).forEach(([key, value]) => {
        win.sessionStorage.setItem(key, value)
      })
    })
  })
}

// Função para validar acessibilidade básica
export const validarAcessibilidadeBasica = () => {
  // Verifica se há elementos focáveis
  cy.get('button, input, select, textarea, a[href]').should('have.length.at.least', 1)
  
  // Verifica se há headings
  cy.get('h1, h2, h3, h4, h5, h6').should('have.length.at.least', 1)
  
  // Verifica se há alt text em imagens
  cy.get('img').each($img => {
    expect($img.attr('alt')).to.not.be.undefined
  })
}

// Função para testar com dados inválidos
export const testarDadosInvalidos = (seletor, valoresInvalidos = ['-1', '0', 'abc', '']) => {
  valoresInvalidos.forEach(valor => {
    cy.get(seletor).clear().type(valor)
    cy.get('button:contains("Calcular"), button[type="submit"]').click()
    // Deve mostrar erro ou não permitir
    cy.get('body').should('contain.text', /erro|inválido|obrigatório/i)
  })
}

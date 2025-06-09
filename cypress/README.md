# Testes E2E - Calculadora Nutricional

Este documento descreve a estrutura e configuração dos testes end-to-end (E2E) da aplicação.

## 📋 Estrutura dos Testes

```
cypress/
├── e2e/                          # Testes E2E
│   ├── home.cy.js               # Testes da página inicial
│   ├── nenpt.cy.js              # Testes da calculadora NENPT
│   ├── gids.cy.js               # Testes da calculadora GIDS
│   ├── gerenciar-produtos.cy.js # Testes de gerenciamento de produtos
│   ├── integration.cy.js        # Testes de integração
│   ├── api-validation.cy.js     # Testes de validação de API
│   └── accessibility.cy.js      # Testes de acessibilidade
├── support/                      # Arquivos de suporte
│   ├── commands.js              # Comandos personalizados
│   ├── e2e.js                   # Configurações globais
│   ├── api-mocks.js             # Mocks para APIs
│   └── test-utils.js            # Utilitários para testes
└── fixtures/                     # Dados de teste estáticos
```

## 🚀 Executando os Testes

### Comandos Disponíveis

```bash
# Executar todos os testes em modo headless
npm run test:e2e

# Abrir interface gráfica do Cypress
npm run test:e2e:open

# Executar testes específicos
npm run test:e2e:smoke         # Testes básicos (home, nenpt, gids)
npm run test:e2e:integration   # Testes de integração
npm run test:e2e:api           # Testes de API
npm run test:e2e:accessibility # Testes de acessibilidade

# Executar em browsers específicos
npm run test:e2e:chrome
npm run test:e2e:firefox

# Executar todos os testes
npm run test:e2e:full
```

### Pré-requisitos

1. Aplicação rodando em `http://localhost:3000`
2. Node.js versão 16 ou superior
3. Dependências instaladas (`npm install`)

```bash
# Iniciar aplicação para testes
npm run dev

# Em outro terminal, executar testes
npm run test:e2e:open
```

## 🧪 Tipos de Testes

### 1. Testes Funcionais

- **home.cy.js**: Navegação, carregamento de componentes, mudança de idioma
- **nenpt.cy.js**: Cálculos nutricionais, validação de formulários
- **gids.cy.js**: Score GIDS, seleção de sintomas, relatórios
- **gerenciar-produtos.cy.js**: CRUD de produtos, validações

### 2. Testes de Integração

- **integration.cy.js**: Fluxos completos, navegação entre páginas, persistência de dados

### 3. Testes de API

- **api-validation.cy.js**: Interceptação de requisições, mocks, tratamento de erros

### 4. Testes de Acessibilidade

- **accessibility.cy.js**: Navegação por teclado, ARIA, contraste, leitores de tela

## 🛠️ Comandos Personalizados

### Navegação e Carregamento
```javascript
cy.waitForPageLoad()           // Aguarda carregamento completo
cy.waitForFormReady()          // Aguarda formulário estar pronto
cy.safeClick(selector)         // Clique seguro com validações
```

### Preenchimento de Formulários
```javascript
cy.fillField(selector, value)  // Preenche campo com validação
cy.selectOption(selector, value) // Seleciona opção em dropdown
cy.preencherNenpt(dados)       // Preenche formulário NENPT completo
cy.preencherProduto(dados)     // Preenche formulário de produto
```

### Validações
```javascript
cy.waitForCalculation()        // Aguarda resultado de cálculo
cy.validarA11y()              // Valida acessibilidade básica
cy.testarInvalidos(selector)   // Testa dados inválidos
```

### Utilitários
```javascript
cy.resetAppState()             // Limpa estado da aplicação
cy.testResponsive()            // Testa responsividade
cy.debugTest(message)          // Debug melhorado
```

## 📊 Dados de Teste

### Pacientes de Exemplo
```javascript
// Adulto saudável
{
  nome: 'João Silva',
  peso: '70',
  altura: '175',
  idade: '30',
  sexo: 'masculino'
}

// Idoso
{
  nome: 'Maria Santos',
  peso: '60',
  altura: '160',
  idade: '75',
  sexo: 'feminino'
}
```

### Produtos de Exemplo
```javascript
// Produto básico
{
  nome: 'Produto Teste',
  calorias: '100',
  proteinas: '10',
  carboidratos: '15',
  gorduras: '5'
}
```

## 🔧 Configuração

### cypress.config.js
```javascript
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    retries: { runMode: 2, openMode: 1 }
  }
})
```

### Interceptação de APIs
Os testes incluem mocks para APIs inexistentes, permitindo:
- Testes sem dependência de backend
- Simulação de diferentes cenários (sucesso, erro, timeout)
- Testes de performance e robustez

## 📈 Melhores Práticas

### 1. Seletores
```javascript
// ✅ Bom - Usa data-testid
cy.get('[data-testid="product-list"]')

// ✅ Bom - Usa seletores semânticos
cy.contains('Calcular')

// ❌ Evitar - Classes CSS específicas
cy.get('.btn-primary-large')
```

### 2. Aguardar Elementos
```javascript
// ✅ Bom - Aguarda elemento estar visível e habilitado
cy.get('button').should('be.visible').and('be.enabled').click()

// ❌ Evitar - Wait fixo
cy.wait(5000)
```

### 3. Dados de Teste
```javascript
// ✅ Bom - Usa dados dinâmicos
const dados = cy.dadosAleatorios()
cy.preencherNenpt(dados)

// ❌ Evitar - Dados fixos que podem conflitar
cy.fillField('input[name="nome"]', 'João')
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Teste falha por timeout**
   - Aumentar `defaultCommandTimeout` no config
   - Usar `cy.waitForPageLoad()` antes de interações

2. **Elemento não encontrado**
   - Verificar se seletor está correto
   - Aguardar carregamento com `cy.waitForPageLoad()`

3. **Teste instável**
   - Adicionar `cy.wait()` entre ações
   - Usar comandos mais robustos (`cy.safeClick`)

### Debug
```javascript
// Adicionar debug points
cy.debugTest('Antes de preencher formulário')
cy.screenshot('debug-estado-atual')
cy.pause() // Para em modo interativo
```

## 📊 Relatórios

### Screenshots
- Capturados automaticamente em falhas
- Salvos em `cypress/screenshots/`

### Vídeos
- Gravados em modo headless
- Salvos em `cypress/videos/`

### Métricas
- Performance da aplicação
- Cobertura de funcionalidades
- Taxa de sucesso dos testes

## 🔄 CI/CD

Os testes estão configurados para executar automaticamente:

- **Pull Requests**: Testes de smoke
- **Push para main**: Testes completos
- **Agendado**: Testes diários

Veja `.github/workflows/cypress-ci.yml` para configuração completa.

## 📚 Recursos Adicionais

- [Documentação do Cypress](https://docs.cypress.io/)
- [Melhores Práticas](https://docs.cypress.io/guides/references/best-practices)
- [Testes de Acessibilidade](https://github.com/component-driven/cypress-axe)

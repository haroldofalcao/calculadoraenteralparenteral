# Calculadora Nutricional - Enteral e Parenteral v5.0

Uma aplicação web moderna para cálculos nutricionais, incluindo calculadoras NENPT (Necessidades Energéticas Nutricionais Parenterais e Enterais) e GIDS (Gastrointestinal Dysfunction Score).

## 🚀 Funcionalidades

### ✨ Calculadora NENPT
- Cálculo de necessidades energéticas baseado em parâmetros antropométricos
- Gerenciamento de produtos nutricionais
- Persistência de dados no localStorage
- Interface responsiva e intuitiva

### 🆕 Calculadora GIDS
- Avaliação de disfunção gastrointestinal
- Sistema de pontuação automático
- Classificação de risco baseada no score
- Geração de relatórios em texto
- Persistência de medidas e histórico

### 🌐 Internacionalização
- Suporte completo para Português e Inglês
- Troca de idioma em tempo real
- Persistência da preferência de idioma

## 🏗️ Arquitetura Moderna

### React Router v6.4+
- `createBrowserRouter` para roteamento moderno
- Lazy loading com `React.lazy()` e `Suspense`
- Layout modular com `Outlet`
- Skeletons personalizados para cada página

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
├── layouts/            # Layouts da aplicação
│   └── AppLayout.tsx   # Layout principal com Outlet
├── pages/              # Páginas da aplicação
│   ├── Home/           # Página inicial
│   ├── Nenpt/          # Calculadora NENPT
│   ├── Gids/           # Calculadora GIDS
│   └── NotFound/       # Página 404
├── router/             # Configuração de rotas
├── i18n/               # Internacionalização
│   └── locales/        # Arquivos de tradução
└── App.jsx             # Componente raiz
```

### Tecnologias Utilizadas
- **React 18** - Framework principal
- **React Router v6.4+** - Roteamento moderno
- **React Hook Form + Zod** - Formulários e validação
- **Jotai** - Gerenciamento de estado
- **Bootstrap 5.3** - Estilização
- **React i18next** - Internacionalização
- **Vite** - Build tool moderna

## 🧪 Testes E2E

### Cypress
Testes end-to-end completos cobrindo:
- Navegação entre páginas
- Funcionalidades das calculadoras
- Mudança de idioma
- Persistência de dados
- Responsividade

### Comandos de Teste
```bash
# Executar testes em modo headless
npm run test:e2e

# Abrir interface do Cypress
npm run test:e2e:open
```

## 🔄 CI/CD com GitHub Actions

### Workflows Configurados

#### 1. E2E Tests (`e2e.yml`)
- Executa em Node.js 18.x e 20.x
- Testes automatizados em Chrome
- Upload de screenshots/vídeos em caso de falha

#### 2. Build and Deploy (`deploy.yml`)
- Build automático na branch main
- Deploy para GitHub Pages
- Execução de testes antes do deploy

#### 3. Quality Checks (`quality.yml`)
- Verificação de linting (ESLint)
- Auditoria de segurança
- Verificação de tamanho do bundle

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone https://github.com/haroldofalcao/calculadoraenteralparenteral.git

# Instalar dependências
cd calculadoraenteralparenteral
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build
npm run lint         # Verificação de código
npm run test:e2e     # Testes E2E (headless)
npm run test:e2e:open # Interface do Cypress
```

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- 📱 Dispositivos móveis (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

## 🌟 Melhorias Implementadas

### v5.0 - Refatoração Completa
- ✅ Migração para React Router v6.4+ com createBrowserRouter
- ✅ Implementação de lazy loading e Suspense
- ✅ Sistema de internacionalização completo (PT/EN)
- ✅ Nova calculadora GIDS totalmente funcional
- ✅ Testes E2E abrangentes com Cypress
- ✅ CI/CD automatizado com GitHub Actions
- ✅ Layout modular e componentes reutilizáveis
- ✅ Skeletons personalizados para melhor UX
- ✅ Persistência de dados aprimorada

### Calculadora GIDS
- ✅ Interface moderna e intuitiva
- ✅ Cálculo automático do score
- ✅ Sistema de classificação de risco
- ✅ Persistência de medidas
- ✅ Geração de relatórios
- ✅ Totalmente integrada com i18n

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Haroldo Falcão Ramos da Cunha**
- GitHub: [@haroldofalcao](https://github.com/haroldofalcao)

---

## 📋 Changelog

### v5.0.0 (2025-06-09)
- **BREAKING CHANGES**: Refatoração completa da arquitetura
- **NEW**: Calculadora GIDS implementada
- **NEW**: Sistema de internacionalização (PT/EN)
- **NEW**: Testes E2E com Cypress
- **NEW**: CI/CD com GitHub Actions
- **IMPROVED**: React Router v6.4+ com lazy loading
- **IMPROVED**: Layout modular e responsivo
- **IMPROVED**: Performance e UX geral

### v4.x
- Versões anteriores com arquitetura legada

---

*Desenvolvido com ❤️ para profissionais da saúde*


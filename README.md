# Calculadora Nutricional v.4 - Manual do Usuário

## Introdução

A Calculadora Nutricional v.4 é uma aplicação web desenvolvida em React que permite realizar cálculos de terapia nutricional, mantendo todas as funcionalidades da versão original em Excel e adicionando a capacidade de atualizar o banco de dados de produtos nutricionais de forma simples e intuitiva.

Esta versão utiliza localStorage para armazenar os dados dos produtos diretamente no navegador do usuário, eliminando a necessidade de um servidor backend.

## Funcionalidades

1. **Calculadora Nutricional**
   - Cálculo de necessidades nutricionais baseado em peso, altura, idade e sexo
   - Seleção de produtos/fórmulas do banco de dados local
   - Cálculo de distribuição de macronutrientes
   - Resultados detalhados por kg de peso corporal

2. **Gerenciamento de Produtos**
   - Visualização de todos os produtos disponíveis
   - Adição de novos produtos ao banco de dados local
   - Exclusão de produtos/fórmulas descontinuados
   - Busca de produtos por nome

## Como Usar

### Calculadora Nutricional

1. Na página inicial, preencha os dados do paciente:
   - Peso (kg)
   - Altura (cm)
   - Idade (anos)
   - Sexo (masculino/feminino)

2. Selecione a fórmula/produto desejado no menu suspenso

3. Informe o volume prescrito (mL)

4. Opcionalmente, informe:
   - Tempo de infusão (h) - para calcular mL/hora
   - Módulo de proteína (g) - para adicionar proteína extra
   - Outro módulo (Kcal) - para adicionar calorias extras

5. Clique no botão "Calcular"

6. Os resultados serão exibidos abaixo, organizados em seções:
   - Dados Antropométricos (IMC)
   - Gasto Energético (GEB)
   - Informações do Produto
   - Prescrição
   - Cálculos Nutricionais
   - Distribuição Calórica
   - Outros Indicadores

### Adição de Novos Produtos

1. Clique em "Gerenciar Produtos" no menu superior

2. Preencha todos os campos do formulário:
   - Nome do Produto
   - Kcal/mL
   - CHO (g/L)
   - LIP (g/L)
   - PTN (g/L)
   - EP Ratio

3. Clique em "Adicionar Produto"

4. Uma mensagem de confirmação será exibida se o produto for adicionado com sucesso

5. O novo produto estará imediatamente disponível para seleção na calculadora

### Exclusão de Produtos

1. Clique em "Gerenciar Produtos" no menu superior

2. Localize o produto que deseja excluir na tabela (use a caixa de busca para filtrar produtos)

3. Clique no botão "Excluir" ao lado do produto desejado

4. Confirme a exclusão na janela de diálogo que aparecerá

5. Uma mensagem de confirmação será exibida se o produto for excluído com sucesso

## Instalação e Execução

### Método 1: Executar localmente (sem servidor)

1. Descompacte o arquivo ZIP em qualquer pasta do seu computador

2. Abra o arquivo `index.html` na pasta `build` diretamente no seu navegador

3. A aplicação funcionará imediatamente, sem necessidade de servidor web

### Método 2: Executar com servidor web simples

1. Descompacte o arquivo ZIP em qualquer pasta do seu computador

2. Se você tem Node.js instalado, pode usar o pacote `serve`:
   ```
   npx serve -s build
   ```

3. Ou use qualquer servidor web de sua preferência apontando para a pasta `build`

### Método 3: Hospedar online

1. Faça upload da pasta `build` completa para qualquer serviço de hospedagem web:
   - GitHub Pages
   - Netlify
   - Vercel
   - Amazon S3
   - Ou qualquer outro serviço de hospedagem estática

2. A aplicação funcionará sem necessidade de configuração adicional

## Persistência de Dados

Todos os produtos adicionados ou excluídos são armazenados no localStorage do navegador. Isso significa que:

- Os dados persistem mesmo após fechar e reabrir o navegador
- Os dados são específicos para cada navegador e dispositivo
- Limpar os dados de navegação do navegador também apagará os produtos cadastrados

## Licença e Autoria

Calculadora Nutricional v.4 (CC BY-NC-ND 4.0)
Desenvolvido por Haroldo Falcão Ramos da Cunha

## Requisitos Técnicos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Não requer conexão com internet após o carregamento inicial

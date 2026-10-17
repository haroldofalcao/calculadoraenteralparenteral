# lessons.md — Aprendizados do projeto

## 2026-10-16 — Propofol: lipídio corrigido para 0,1 g/mL
**Decisão (aprovada pelo Haroldo):** o propofol 1% é uma emulsão lipídica a 10% (10 g de gordura/100 mL, cerca de 1,1 kcal/mL).
O cálculo usava 0,2 g/mL (20 g/100 mL, que é uma emulsão a 20%), o que dobrava o lipídio. O valor passou a ser 0,1 g/mL em `calculateNonNutritionalCalories` (`calculationUtils.js`), e `nenpt.propofolHelp` (PT/EN) agora diz "10g lip/100mL". As kcal (1,1/mL) não mudaram.
**Verificação:** 240 mL → 264 kcal e 24 g de lipídio; `biome lint` e `npm run build` sem erros.
**Regra:** kcal/mL e g/mL de lipídio de uma mesma emulsão precisam ser coerentes (10% ≈ 1,1 kcal e 0,1 g/mL; 20% ≈ 2 kcal e 0,2 g/mL).

## 2026-10-16 — v6: resposta ao AdSense "Conteúdo de baixo valor"
**Contexto:** o AdSense recusou a aprovação do site (etapa "Seu site não está pronto para exibir anúncios").
Diagnóstico: páginas quase só de formulário, sem Privacidade e Sobre, anúncios em telas de ferramenta.

**Decisões:**
- Trabalho feito numa cópia (`calculadoraenteralparenteral-v6`, ramo `v6-adsense`). O original fica intocado.
- Conteúdo novo **só em PT**, escrito direto em `src/content/*.js`, sem passar pelo i18n. Foi decisão do Haroldo, para reduzir o volume de revisão. Com o site em inglês, esses textos continuam em português.
- Página Sobre com marcadores (`[CRM-UF nº]` etc.), em vez de dados inventados.
- Anúncios removidos de: Gerenciar Produtos (tela de cadastro), meio do formulário NENPT (risco de clique acidental), topo de NENPT/GIDS e topo da Home. Ficam: barra lateral NENPT, após resultados (NENPT/GIDS), 2 na Home e 1 no fim de cada artigo.
- `src/ads/` (cerca de 2.000 linhas de "verificador de política" no navegador) mantido como está: o Google não enxerga esse código. Remover fica para outra decisão.

**Regra:** a instalação usa **pnpm** (`npx pnpm@9 install --frozen-lockfile`), como a Vercel. O `package-lock.json` está desatualizado e o `npm ci` falha com ERESOLVE (vite 5 × vite-react-ssg 0.9.2).

**Dúvida em aberto:** o propofol conta 1,1 kcal/mL, mas 0,2 g de lipídio/mL (`calculationUtils.js`), o que é inconsistente. Não corrigido; aguarda decisão.

## 2026-07-11 — Ferramenta de edição corrompeu o arquivo (bytes nulos + CRLF)
**O que aconteceu:** ao usar Edit no `src/pages/Gids/index.jsx`, o arquivo saiu com
um bloco de bytes nulos (00) anexado no fim e com quebras de linha convertidas de
LF para CRLF. Isso gerou um diff gigante (arquivo inteiro) e quebrou o parse.

**Como detectei:** o parser acusou "Unexpected character" no fim; `xxd` mostrou os
bytes 00; `git diff` mostrou o arquivo todo trocado.

**Como resolvi:** reconstruí o arquivo a partir da versão limpa do git
(`git show HEAD:...`) e reapliquei só as mudanças por casamento de linha (Python,
`newline="\n"`), validando com contagem de bytes NUL/CR = 0 e parse do Babel.

**Regra para o futuro:** depois de editar arquivos de código neste projeto, sempre
verificar o resultado com `git diff` (diff deve ser mínimo) e checar ausência de
bytes nulos / CRLF antes de dar a tarefa como pronta.

## 2026-07-11 — Ambiente Linux só tem binários nativos de Windows
Biome e esbuild instalados em `node_modules` são de win32-x64 e não rodam no
sandbox Linux. Para validar sintaxe de JSX aqui, usar `@babel/parser` (JS puro)
instalado à parte, em vez de tentar rodar o lint/build do projeto.

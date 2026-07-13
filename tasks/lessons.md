# lessons.md — Aprendizados do projeto

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

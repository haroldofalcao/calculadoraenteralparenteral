# CLAUDE.md — Calculadora Enteral/Parenteral (regras deste projeto)

## Ambiente (Windows)
- O `node_modules` deste repositório tem binários NATIVOS de Windows (rollup, esbuild, biome).
  Por isso `vite build`, `biome` e `npm install` NÃO funcionam no sandbox Linux do Cowork —
  precisam rodar na máquina Windows do Haroldo.
- NÃO rodar `npm install` dentro do sandbox: isso sobrescreveria os binários do Windows
  na pasta real e quebraria o ambiente local de desenvolvimento.
- Para só validar sintaxe de JSX no sandbox, usar `@babel/parser` (JS puro), não o build/lint.

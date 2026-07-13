# todo.md — Calculadora Enteral/Parenteral

## Feito
- [x] **2026-07-11** — Corrigir GIDS: "não via oral" sozinho não pode mais acusar risco.
  Arquivo: `src/pages/Gids/index.jsx`, função `calculateGIDS`.
  Regra do GIDS 1 passou de `((noOral && basicSymptoms === 1) || basicSymptoms >= 2)`
  para apenas `basicSymptoms >= 2` (risco só com 2+ critérios básicos marcados).
  Também removido o ramo de texto explicativo `gids1NoOral` na tela, para bater com o cálculo.
  Verificado: 9/9 cenários de teste OK; arquivo faz parse sem erro; diff mínimo.

## Em andamento
- (nada)

## Feito (cont.)
- [x] **2026-07-11** — Build rodado na máquina Windows (`npm run build`): `✓ built in 9.23s`.
  Pasta `dist/` regenerada com a correção do GIDS. Avisos de chunk >500kB e de comentário
  em biblioteca são inofensivos (não são erros).

## Feito (cont.)
- [x] **2026-07-11** — Deploy: commit só do arquivo do GIDS (`git add` só desse arquivo) e
  `git push` para `main` (`5cc0981..7d0c39c`). Vercel (ligado ao GitHub) publica sozinho.
  Antes disso: removida trava fantasma `.git/index.lock` (de 27/jun) que travava o Git.

## Pendente (assunto separado, quando quiser)
- [ ] Working tree com ~100 arquivos "modificados" só por conversão LF→CRLF (Git com autocrlf).
  Não é urgente e não afeta o site. Organizar depois com calma se incomodar.

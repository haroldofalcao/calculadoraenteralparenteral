# Graph Report - calculadora-nenpt  (2026-07-13)

## Corpus Check
- 105 files · ~40,807 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 590 nodes · 700 edges · 62 communities (52 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7fc8d05b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 38|Community 38]]

## God Nodes (most connected - your core abstractions)
1. `correctness` - 27 edges
2. `suspicious` - 27 edges
3. `scripts` - 19 edges
4. `compilerOptions` - 17 edges
5. `AdSenseManager` - 13 edges
6. `AdSensePolicyGuard` - 13 edges
7. `Calculadora Nutricional - Enteral e Parenteral v5.0` - 12 edges
8. `Testes E2E - Calculadora Nutricional` - 12 edges
9. `calculateResults()` - 10 edges
10. `formatter` - 9 edges

## Surprising Connections (you probably didn't know these)
- `testAdSenseFixes()` --calls--> `hasValidContent()`  [INFERRED]
  src/ads/utils/adSenseTestRunner.js → src/ads/utils/adSenseHelpers.js
- `DialogHeader()` --calls--> `cn()`  [INFERRED]
  src/components/ui/dialog.jsx → src/lib/utils.js
- `DialogFooter()` --calls--> `cn()`  [INFERRED]
  src/components/ui/dialog.jsx → src/lib/utils.js
- `DropdownMenuShortcut()` --calls--> `cn()`  [INFERRED]
  src/components/ui/dropdown-menu.jsx → src/lib/utils.js
- `navItemClass()` --calls--> `cn()`  [INFERRED]
  src/layouts/AppLayout.jsx → src/lib/utils.js

## Import Cycles
- None detected.

## Communities (62 total, 10 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (23): AdSense(), autoAdsEnabled, AdSenseComplianceIndicator(), useAdSenseCompliance(), AdSenseDebugPanel(), autoAdsEnabled, InFeedAd(), ResponsiveBanner() (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.04
Nodes (44): dependencies, class-variance-authority, clsx, firebase, framer-motion, @hookform/resolvers, i18next, i18next-browser-languagedetector (+36 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (27): AdSenseCompliantPage(), Calculator(), emptyProduct, numericFields, ProductManager(), SEO(), StructuredData(), VisitCounter() (+19 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (39): noBannedTypes, noExtraBooleanCast, noMultipleSpacesInRegularExpressionLiterals, noUselessCatch, noUselessTypeConstraint, noWith, noConstantCondition, noConstAssign (+31 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (34): 1. Seletores, 1. Testes Funcionais, 2. Aguardar Elementos, 2. Testes de Integração, 3. Dados de Teste, 3. Testes de API, 4. Testes de Acessibilidade, 🔄 CI/CD (+26 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (31): files, ignore, include, formatter, arrowParentheses, attributePosition, bracketSameLine, bracketSpacing (+23 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (31): 1. E2E Tests (`e2e.yml`), 2. Build and Deploy (`deploy.yml`), 3. Quality Checks (`quality.yml`), 🏗️ Arquitetura Moderna, 👨‍💻 Autor, 🆕 Calculadora GIDS, Calculadora GIDS, ✨ Calculadora NENPT (+23 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (15): ErrorBoundary, Footer(), RouteErrorPage(), usePageTracking(), resources, AppLayout(), AppProvider(), GerenciarProdutos (+7 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (27): suspicious, noAsyncPromiseExecutor, noCatchAssign, noClassAssign, noCompareNegZero, noControlCharactersInRegex, noDebugger, noDuplicateCase (+19 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx (+12 more)

### Community 10 - "Community 10"
Cohesion: 0.16
Nodes (7): gerarDadosAleatorios(), preencherFormularioNenpt(), preencherFormularioProduto(), selecionarSintomasGids(), testarDadosInvalidos(), testData, validarAcessibilidadeBasica()

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (15): navItemClass(), cn(), Badge(), badgeVariants, DialogContent, DialogDescription, DialogFooter(), DialogHeader() (+7 more)

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (19): scripts, build, check, dev, format, lint, preview, test:e2e (+11 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 15 - "Community 15"
Cohesion: 0.18
Nodes (10): 1. Princípios de Design, 2. Paleta de Cores (Tokens CSS / Tailwind), 3. Tipografia, 4.1 Cabeçalho da Página (Substituição do Banner Azul Atual), 4.2 Triagem de Sintomas (Abas de Medida Atual & Resumo), 4.3 Tabela de Produtos Cadastrados, 4.4 Formulários de Entrada (Calculadora NENPT / Dados Opcionais), 4. Mapeamento e Redesenho de Componentes (Padrão shadcn/ui) (+2 more)

### Community 16 - "Community 16"
Cohesion: 0.18
Nodes (10): buildCommand, devCommand, framework, headers, installCommand, outputDirectory, redirects, rewrites (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.20
Nodes (7): FormControl, FormDescription, FormFieldContext, FormItem, FormItemContext, FormLabel, FormMessage

### Community 18 - "Community 18"
Cohesion: 0.22
Nodes (8): background_color, description, display, icons, name, short_name, start_url, theme_color

### Community 19 - "Community 19"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 20 - "Community 20"
Cohesion: 0.42
Nodes (8): calculateFormulaMetrics(), calculateGEB(), calculateIMC(), calculateNonNutritionalCalories(), calculatePocketGEB(), calculateResults(), createEmptyFormulaResults(), mergeResults()

### Community 21 - "Community 21"
Cohesion: 0.48
Nodes (6): easeOut, FadeIn(), resolveTag(), Reveal(), Stagger(), StaggerItem()

### Community 24 - "Community 24"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 25 - "Community 25"
Cohesion: 0.29
Nodes (6): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger

### Community 26 - "Community 26"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 27 - "Community 27"
Cohesion: 0.40
Nodes (4): Tabs, TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **322 isolated node(s):** `$schema`, `ignore`, `include`, `enabled`, `formatWithErrors` (+317 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `rules` connect `Community 3` to `Community 8`, `Community 5`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 11` to `Community 0`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `$schema`, `ignore`, `include` to the rest of the system?**
  _322 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09013605442176871 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08710801393728224 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
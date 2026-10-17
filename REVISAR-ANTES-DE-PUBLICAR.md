# Revisar antes de publicar — NutriCalc v6

Esta versão (ramo `v6-adsense`) responde à recusa do AdSense por **"Conteúdo de baixo valor"**.
Nada foi publicado. Siga esta lista na ordem.

## 1. Preencher os marcadores ✅ feito em 16/10/2026

- CRM 5268628-0 na página Sobre. Instituição e foto foram retiradas, a seu pedido.
- Guias, artigos e Política de Privacidade datados de 16/10/2026.
- Quando revisar um texto de novo, atualize o `revisadoEm` dele em `src/content/`.

## 2. Conferir o conteúdo clínico (o mais importante)

- [ ] **Guia NE/NPT** (`src/content/guias.js`, bloco `nenpt`): equações, exemplo resolvido, metas citadas da ESPEN e da ASPEN.
- [ ] **Guia GIDS** (`guias.js`, bloco `gids`): a regra descrita é a **implementada na calculadora** (incluindo sua correção de 11/07/2026: "não via oral" sozinho não gera risco). Confira se ela bate com o artigo original de 2021.
- [ ] **Artigo 1, meta calórica e proteica**: números da ESPEN, da ASPEN e do EFFORT Protein.
- [ ] **Artigo 2, enteral ou parenteral**: lista de contraindicações e o resumo do EPaNIC, do CALORIES e do NUTRIREA-2.
- [ ] **Artigo 3, GIDS**: critérios e o caso passo a passo.
- [ ] **Artigo 4, realimentação**: critérios do NICE, doses e frequência de monitorização da ASPEN, e o resumo do estudo de Doig 2015.
- [ ] **Página Sobre**: a frase "nasceu de uma planilha usada na rotina da UTI" foi **suposição minha** (o código cita a planilha "Calculadora de Fórmulas v3.xlsx"). Ajuste para a sua história real.
- [ ] **Referências**: confira volume e páginas de cada uma. Eu citei de memória obras conhecidas, sem inventar nenhuma, mas a conferência é sua.

Os textos estão em `src/content/guias.js` e `src/content/artigos.js`. Cada parágrafo é um texto entre aspas simples e pode ser editado direto.

## 3. Achado à parte, que NÃO corrigi

Em `src/utils/calculationUtils.js`, o propofol é contado como **1,1 kcal/mL** (correto para a emulsão a 10%), mas como **0,2 g de lipídio/mL** (que corresponderia a uma emulsão a 20%, com cerca de 2 kcal/mL). O total de calorias está certo. Já os gramas e o percentual de lipídios ficam superestimados quando há propofol. O texto de ajuda da tela repete isso ("1.1 kcal/mL + 20g lip/100mL"). Decida se quer corrigir; fica como tarefa separada.

## 4. Publicar

1. Veja no navegador: `npm run dev` na pasta v6 e abra http://localhost:3000.
2. Quando estiver satisfeito, faça o commit e envie o ramo `v6-adsense` ao GitHub. Depois junte-o ao `main` (a Vercel publica sozinha a partir do `main`).

## 5. No painel do AdSense (depois de publicar)

1. Em **Anúncios → Por site**, confira se os **anúncios automáticos** estão desligados ou com exclusões. Eles podem pôr anúncios em telas de formulário por conta própria.
2. Confira se o site cadastrado é `nutricalc.online` (sem "www"), igual ao endereço do site.
3. **Espere de 1 a 2 semanas** para o Google reler o site. Se puder, acompanhe no Google Search Console se as páginas novas foram indexadas.
4. Só então marque **"Confirmo que corrigi os problemas"** e clique em **"Pedir revisão"**. Cada pedido recusado pode bloquear o botão por um tempo.

## 6. Próximos passos que fortalecem a aprovação

- Publicar um artigo novo por mês ou a cada dois meses. O Google pede "curadoria e manutenção contínuas".
- Divulgar os artigos (aulas, redes, grupos de colegas) para gerar visitas recorrentes.

# Design System: NutriCalc Clínico
**Baseado em padrões modernos de UI e princípios do shadcn/ui**

Este documento estabelece as diretrizes visuais e de componentes para a modernização da interface do **NutriCalc**, transformando-o em uma ferramenta médica de alta confiabilidade, limpa e com excelente legibilidade para ambientes de terapia intensiva e acompanhamento clínico.

---

## 1. Princípios de Design

1. **Clareza Absoluta:** O erro humano em ambientes de UTI deve ser mitigado através de tipografia nítida, agrupamentos lógicos e alto contraste.
2. **Densidade Eficiente:** Médicos precisam visualizar múltiplos dados simultaneamente sem sofrer com poluição visual. O uso de espaçamentos precisos e bordas finas substitui blocos pesados de cor.
3. **Foco no Paciente:** Elementos puramente decorativos devem ser eliminados para destacar as métricas clínicas, fórmulas e alertas.

---

## 2. Paleta de Cores (Tokens CSS / Tailwind)

Substituiremos o azul saturado (`#0000FF`) por uma paleta médica sofisticada, equilibrada e em total conformidade com os tokens do `shadcn/ui`.

```css
:root {
  /* Cores de Fundo e Texto Principais */
  --background: 0 0% 100%;       /* #ffffff - Fundo limpo */
  --foreground: 222.2 84% 4.9%;  /* #020817 - Texto principal quase preto */

  /* Componentes de Superfície (Cards, Modais) */
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;

  /* Paleta Primária (Azul Clínico/Cirúrgico Suave) */
  --primary: 221.2 83.2% 53.3%; /* #1d4ed8 - Azul profissional de alta confiança */
  --primary-foreground: 210 40% 98%;

  /* Paleta Secundária e Elementos Neutros */
  --secondary: 210 40% 96.1%;   /* Cinza azulado muito claro para fundos alternos */
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  /* Estados Clínicos e Alertas (Crítico, Atenção, Sucesso) */
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;

  /* Condições Ameaçadoras / Ações Destrutivas (Excluir) */
  --destructive: 0 84.2% 60.2%; /* #ef4444 - Vermelho clínico para emergência/exclusão */
  --destructive-foreground: 210 40% 98%;

  /* Sintomas Graves / Alertas de Atenção */
  --warning: 38 92% 50%;         /* #f59e0b - Âmbar para atenção secundária */
  --warning-foreground: 210 40% 98%;

  /* Score GIDS Sem Risco / Sucesso */
  --success: 142.1 76.2% 36.3%;  /* #16a34a - Verde esmeralda para estabilidade */
  --success-foreground: 210 40% 98%;

  /* Bordas e Inputs (Substituindo divisores grossos) */
  --border: 214.3 31.8% 91.4%;   /* #e2e8f0 - Linhas extremamente finas e discretas */
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  
  --radius: 0.5rem;              /* Arredondamento suave e moderno */
}

```

---

## 3. Tipografia

Para garantir legibilidade cirúrgica em telas de alta densidade, adotamos a fonte **Inter** ou **Geist Sans**.

| Elemento | Tamanho (pt/rem) | Peso (Weight) | Aplicação no NutriCalc |
| --- | --- | --- | --- |
| **H1** | `1.875rem` (30px) | Bold (700) | Títulos das Páginas (ex: Gerenciar Produtos) |
| **H2** | `1.5rem` (24px) | Semibold (600) | Títulos de Seções Principais (ex: Dados do Paciente) |
| **H3** | `1.125rem` (18px) | Semibold (600) | Subseções (ex: Sintomas Básicos) |
| **Body** | `0.875rem` (14px) | Regular (400) | Valores de inputs, tabelas e textos informativos |
| **Muted / Sub** | `0.75rem` (12px) | Regular (400) | Legendas de cálculo, rodapés e copyright |

---

## 4. Mapeamento e Redesenho de Componentes (Padrão shadcn/ui)

### 4.1 Cabeçalho da Página (Substituição do Banner Azul Atual)

Em vez do bloco maciço de azul cobalto com texto centralizado, utilizaremos uma estrutura limpa e alinhada à esquerda:

* **Título Principal:** `h1` com cor `--foreground`.
* **Subtítulo Descritivo:** Texto menor com cor `--muted-foreground` posicionado logo abaixo, eliminando a caixa isolada.

### 4.2 Triagem de Sintomas (Abas de Medida Atual & Resumo)

* **Componente shadcn:** `Tabs` e `Card`
* As seções de check-boxes serão envelopadas em componentes `Card` individuais com bordas finas (`--border`) e sem fundo colorido pesado.
* **Substituição Visual:** Os grupos (Sintomas Básicos, Sintomas Graves, Condições Ameaçadoras) utilizarão o componente `Badge` do shadcn para destacar as categorias, aplicando os tokens correspondentes:
* *Sintomas Básicos:* Badge neutro (`--secondary`).
* *Sintomas Graves:* Badge de atenção (`--warning`).
* *Condições Ameaçadoras:* Badge de perigo (`--destructive`).



### 4.3 Tabela de Produtos Cadastrados

* **Componente shadcn:** `DataTable` (baseado em TanStack Table)
* **Ajuste de UI:** Remoção total dos botões amarelos repetitivos de "Ocultar". Em seu lugar, será utilizada uma coluna lateral discreta de "Ações" com um componente `DropdownMenu` (três pontinhos `...`), que abre as opções ocultas de "Editar", "Ocultar" e "Excluir". Isso reduz a carga cognitiva da tela drasticamente.
* O botão "Excluir" do usuário personalizado passará a usar a variante `buttonVariants({ variant: "destructive" })` de forma compacta e refinada.

### 4.4 Formulários de Entrada (Calculadora NENPT / Dados Opcionais)

* **Componente shadcn:** `Form` + `Input` + `Select`
* **Mudança de Layout:** Disposição dos campos em uma malha (Grid) responsiva de 3 ou 4 colunas para campos pequenos (Peso, Altura, Idade, Sexo), aproveitando o espaço horizontal da tela de maneira profissional.

---

## 5. Exemplo Prático de Código (Estrutura shadcn/ui)

Aqui está um exemplo de como a seção de **Dados do Paciente** é estruturada no código utilizando os padrões propostos:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DadosPaciente() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Dados do Paciente
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do Paciente</Label>
          <Input id="nome" placeholder="Digite o nome" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="registro">Registro Clínico</Label>
          <Input id="registro" placeholder="000000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="idade">Idade (Anos)</Label>
          <Input id="idade" type="number" placeholder="Ex: 45" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="data">Data da Medida</Label>
          <Input id="data" type="date" />
        </div>
      </CardContent>
    </Card>
  )
}

```

---

Este guia consolida a transição do NutriCalc para uma interface contemporânea, estéril no sentido de poluição visual, e extremamente focada no que mais importa: o suporte à decisão clínica.
"""



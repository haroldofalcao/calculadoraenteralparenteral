// Guias clínicos exibidos abaixo de cada calculadora (conteúdo só em português).
// Estrutura: { titulo, resumo, revisadoEm, secoes: [{ titulo, paragrafos, itens? }], referencias }

export const guias = {
	nenpt: {
		titulo: 'Guia clínico da calculadora NE/NPT',
		resumo:
			'Como a calculadora estima a meta energética, como soma o que o paciente efetivamente recebe e como interpretar a cobertura da prescrição de nutrição enteral (NE) e parenteral (NPT) em adultos.',
		revisadoEm: '16/10/2026',
		secoes: [
			{
				titulo: 'O que esta calculadora faz',
				paragrafos: [
					'A calculadora NE/NPT responde a duas perguntas que se repetem em toda visita ao paciente em terapia nutricional: qual é a meta de energia e proteína, e quanto da meta a prescrição atual realmente entrega. Para isso, ela combina os dados antropométricos do paciente com a composição das fórmulas cadastradas (kcal/mL e gramas de carboidrato, lipídio e proteína por litro) e com fontes de calorias que costumam passar despercebidas, como propofol, soro glicosado e citrato.',
					'O resultado mostra o total de calorias e de cada macronutriente, os valores por quilo de peso (kcal/kg e g de proteína/kg), a distribuição percentual dos macronutrientes e, quando o tempo de infusão é informado, a vazão em mL/h. A ferramenta é destinada a adultos e não deve ser usada em pediatria.',
				],
			},
			{
				titulo: 'Como a meta energética é estimada',
				paragrafos: [
					'A calculadora oferece dois métodos. O primeiro é a equação de Harris-Benedict, publicada em 1918 a partir de medidas de calorimetria em voluntários saudáveis. Ela estima o gasto energético basal (GEB) a partir de peso, altura, idade e sexo:',
				],
				itens: [
					'Homens: GEB = 66,5 + (13,75 × peso em kg) + (5,003 × altura em cm) − (6,775 × idade em anos)',
					'Mulheres: GEB = 655,1 + (9,563 × peso em kg) + (1,850 × altura em cm) − (4,676 × idade em anos)',
				],
			},
			{
				titulo: 'Fórmula de bolso (kcal/kg/dia)',
				paragrafos: [
					'O segundo método é a chamada fórmula de bolso: a meta é o peso multiplicado por um valor de kcal/kg/dia escolhido pelo profissional (25 kcal/kg é o valor padrão da calculadora). É a abordagem mais usada à beira do leito pela simplicidade, e as diretrizes da ASPEN e da BRASPEN admitem seu uso quando a calorimetria indireta não está disponível.',
					'Nenhuma equação substitui a calorimetria indireta, que as diretrizes da ESPEN recomendam como padrão no paciente crítico em ventilação mecânica. Equações preditivas erram com frequência nesse grupo, tanto para mais quanto para menos, porque não captam o efeito da inflamação, da sedação, da febre e da composição corporal. Use o número calculado como ponto de partida e reavalie diariamente.',
				],
			},
			{
				titulo: 'O que entra no cálculo do que o paciente recebe',
				paragrafos: [
					'Para cada fórmula, a calculadora multiplica o volume prescrito pela densidade calórica (kcal/mL) e pelas concentrações de macronutrientes informadas no cadastro do produto. É possível somar uma segunda fórmula, módulos de proteína (em gramas) e outros módulos calóricos (em kcal). Em seguida, ela acrescenta as calorias não nutricionais:',
				],
				itens: [
					'Propofol: 1,1 kcal por mL infundido (emulsão lipídica a 10%, como no propofol 1%).',
					'Soro glicosado a 5%: 0,2 kcal por mL (50 g de glicose por litro × 4 kcal/g).',
					'Citrato (anticoagulação regional em terapia renal substitutiva): valor fixo estimado de 300 kcal/dia adotado pela calculadora; o aporte real varia com o protocolo e a dose.',
				],
			},
			{
				titulo: 'Como interpretar o resultado',
				paragrafos: [
					'Compare o total de kcal/kg e de g de proteína/kg com a meta definida para a fase da doença. As diretrizes atuais convergem em alguns pontos: na fase aguda do paciente crítico, evitar oferta plena precoce e progredir a meta ao longo dos primeiros dias; a ESPEN sugere não ultrapassar 70% do gasto energético estimado no início e chegar a 80–100% após o terceiro dia, e a ASPEN (2022) propõe 12–25 kcal/kg/dia nos primeiros 7 a 10 dias. Para proteína, a ESPEN recomenda progressão até 1,3 g/kg/dia, e a ASPEN, 1,2–2,0 g/kg/dia.',
					'A distribuição percentual de macronutrientes ajuda a detectar desequilíbrios, por exemplo uma oferta lipídica alta quando o paciente recebe propofol em dose elevada além de NPT com lipídios. A vazão em mL/h permite conferir se o que está prescrito é compatível com o que a bomba de infusão está entregando.',
				],
			},
			{
				titulo: 'Exemplo resolvido',
				paragrafos: [
					'Homem de 60 anos, 70 kg, 175 cm (IMC 22,9 kg/m²). Pela equação de Harris-Benedict: 66,5 + (13,75 × 70) + (5,003 × 175) − (6,775 × 60) = 66,5 + 962,5 + 875,5 − 406,5 ≈ 1.498 kcal/dia. Pela fórmula de bolso com 25 kcal/kg: 70 × 25 = 1.750 kcal/dia.',
					'Suponha uma fórmula hipotética de 1,5 kcal/mL com 60 g de proteína por litro, prescrita em 1.000 mL/dia, e propofol 1% a 10 mL/h (240 mL/dia). A fórmula entrega 1.500 kcal e 60 g de proteína; o propofol acrescenta 240 × 1,1 = 264 kcal. Total: 1.764 kcal/dia, ou cerca de 25,2 kcal/kg, mas apenas 0,86 g de proteína/kg. A leitura clínica é que a meta calórica foi atingida enquanto a proteica não: o caminho seria um módulo proteico ou uma fórmula hiperproteica, e não mais volume.',
				],
			},
			{
				titulo: 'Limitações e cuidados',
				paragrafos: [
					'O peso usado na conta deve ser escolhido com critério. Em obesos, as diretrizes recomendam peso ideal ou ajustado em vez do peso atual; em pacientes com edema ou anasarca, o peso atual superestima a necessidade. A calculadora usa o peso digitado, então a escolha é do profissional.',
					'Os valores de composição dos produtos vêm do cadastro e devem ser conferidos com a ficha técnica do fabricante, que pode mudar. A ferramenta calcula o que está prescrito, não o que foi efetivamente infundido: pausas para exames, procedimentos e intolerância reduzem o volume real. Por fim, ela é um apoio à decisão e não substitui avaliação nutricional completa, exames laboratoriais e julgamento clínico.',
				],
			},
		],
		referencias: [
			'Harris JA, Benedict FG. A biometric study of human basal metabolism. Proc Natl Acad Sci USA. 1918;4(12):370-373.',
			'Singer P, Blaser AR, Berger MM, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019;38(1):48-79.',
			'Singer P, Blaser AR, Berger MM, et al. ESPEN practical and partially revised guideline: clinical nutrition in the intensive care unit. Clin Nutr. 2023;42(9):1671-1689.',
			'Compher C, Bingham AL, McCall M, et al. Guidelines for the provision of nutrition support therapy in the adult critically ill patient: the American Society for Parenteral and Enteral Nutrition. JPEN J Parenter Enteral Nutr. 2022;46(1):12-41.',
			'Castro MG, Ribeiro PC, Souza IAO, et al. Diretriz brasileira de terapia nutricional no paciente grave. BRASPEN J. 2018;33(Supl 1):2-36.',
		],
	},

	gids: {
		titulo: 'Guia clínico da calculadora GIDS',
		resumo:
			'O que é o Gastrointestinal Dysfunction Score, quais achados entram em cada nível e como a pontuação pode orientar a conduta nutricional no paciente crítico.',
		revisadoEm: '16/10/2026',
		secoes: [
			{
				titulo: 'O que é o GIDS',
				paragrafos: [
					'O Gastrointestinal Dysfunction Score (GIDS) foi desenvolvido por Reintam Blaser e colaboradores e publicado em 2021, a partir de um estudo prospectivo multicêntrico em unidades de terapia intensiva. Ele dá continuidade à classificação de lesão gastrointestinal aguda (AGI) proposta pelo grupo de trabalho de problemas abdominais da ESICM em 2012, com uma diferença importante: usa apenas critérios objetivos, registrados de rotina, para graduar a disfunção do trato gastrointestinal em cinco níveis, de 0 a 4.',
					'A ideia é preencher uma lacuna dos escores de gravidade. O SOFA, por exemplo, não inclui o intestino, embora a disfunção gastrointestinal seja frequente na UTI e se associe a pior prognóstico. Uma pontuação padronizada facilita a comunicação entre equipes, o registro em prontuário e a pesquisa.',
				],
			},
			{
				titulo: 'Os achados avaliados',
				paragrafos: [
					'A calculadora agrupa os achados em três blocos. Os sintomas básicos são: ausência de ingestão oral, ausência de ruídos intestinais, vômitos, volume residual gástrico acima de 200 mL, íleo paralítico ou dinâmico, distensão abdominal, diarreia não grave, sangramento gastrointestinal sem necessidade de transfusão e pressão intra-abdominal entre 12 e 20 mmHg.',
					'Os sinais de disfunção mais grave são: diarreia grave, sangramento gastrointestinal com transfusão, uso de procinéticos e pressão intra-abdominal acima de 20 mmHg. As condições com risco de vida são: sangramento gastrointestinal com choque hemorrágico, isquemia mesentérica e síndrome compartimental abdominal.',
				],
			},
			{
				titulo: 'Como a pontuação é atribuída nesta calculadora',
				paragrafos: [
					'A classificação segue uma ordem hierárquica: o nível mais grave que se aplica é o resultado.',
				],
				itens: [
					'GIDS 4 (risco de vida): qualquer uma das condições com risco de vida.',
					'GIDS 3 (falência gastrointestinal): três ou mais achados entre os sinais de disfunção grave, íleo paralítico/dinâmico e distensão abdominal.',
					'GIDS 2 (disfunção gastrointestinal): pelo menos um sinal de disfunção grave, ou três ou mais sintomas básicos.',
					'GIDS 1 (risco aumentado): dois sintomas básicos.',
					'GIDS 0 (sem risco): nenhum ou apenas um sintoma básico.',
				],
			},
			{
				titulo: 'Como interpretar',
				paragrafos: [
					'No estudo de desenvolvimento, pontuações mais altas se associaram a maior mortalidade. O GIDS não é um protocolo de tratamento, mas ajuda a organizar o raciocínio. Em GIDS 0 e 1, a nutrição enteral em geral pode ser iniciada ou mantida com progressão habitual, observando a tolerância. Em GIDS 2, vale investigar causas tratáveis (medicamentos, distúrbios eletrolíticos, constipação, hiperglicemia), considerar procinéticos e ajustar a progressão da dieta.',
					'Em GIDS 3, a oferta enteral plena costuma não ser tolerada; a dieta trófica e a avaliação de nutrição parenteral suplementar entram na discussão, conforme o tempo de jejum e o estado nutricional prévio. Em GIDS 4, a prioridade é o tratamento da condição que ameaça a vida, e a nutrição enteral geralmente é suspensa até a estabilização.',
				],
			},
			{
				titulo: 'Exemplo de aplicação',
				paragrafos: [
					'Paciente no terceiro dia de UTI, em ventilação mecânica, sem ingestão oral, com distensão abdominal e volume residual gástrico de 350 mL. São três sintomas básicos, sem sinais de disfunção grave nem condições com risco de vida: GIDS 2. Se no dia seguinte surgirem uso de procinético e pressão intra-abdominal de 22 mmHg, somados à distensão já presente, o paciente passa a ter três achados do grupo de falência: GIDS 3.',
					'Registrar o escore diariamente, como permite a aba de histórico da calculadora, mostra a tendência, que costuma ser mais informativa do que um valor isolado.',
				],
			},
			{
				titulo: 'Limitações',
				paragrafos: [
					'O GIDS ainda é um escore recente, com validação externa em andamento, e não define por si só a conduta. Alguns achados dependem de prática local, como a aferição do volume residual gástrico, que muitos serviços deixaram de medir de rotina, e da pressão intra-abdominal, que nem sempre é monitorada. A ausência de um dado não equivale a um achado negativo. A ferramenta é um apoio à decisão e não substitui o exame clínico nem o julgamento da equipe.',
				],
			},
		],
		referencias: [
			'Reintam Blaser A, Padar M, Mändul M, et al. Development of the Gastrointestinal Dysfunction Score (GIDS) for critically ill patients: a prospective multicenter observational study (iSOFA study). Clin Nutr. 2021;40(8):4932-4940.',
			'Reintam Blaser A, Malbrain MLNG, Starkopf J, et al. Gastrointestinal function in intensive care patients: terminology, definitions and management. Recommendations of the ESICM Working Group on Abdominal Problems. Intensive Care Med. 2012;38(3):384-394.',
			'Singer P, Blaser AR, Berger MM, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019;38(1):48-79.',
		],
	},
}

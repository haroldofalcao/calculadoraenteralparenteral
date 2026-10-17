// Artigos educativos (conteúdo só em português).
// Mesma estrutura dos guias, com slug e descrição para SEO.

export const artigos = [
	{
		slug: 'meta-calorica-proteica-paciente-critico',
		titulo: 'Meta calórica e proteica no paciente crítico: o que dizem as diretrizes',
		descricao:
			'Quanto de energia e de proteína oferecer ao paciente de UTI, como progredir a meta nos primeiros dias e por que a calorimetria indireta continua sendo o padrão.',
		resumo:
			'Quanto oferecer, quando progredir e por que a fase da doença importa mais do que o número exato de kcal/kg.',
		revisadoEm: '16/10/2026',
		secoes: [
			{
				titulo: 'Por que a meta não é fixa',
				paragrafos: [
					'Durante muitos anos, a prescrição nutricional na UTI buscou cobrir 100% do gasto energético desde os primeiros dias. Os ensaios clínicos da última década mudaram essa visão. Na fase aguda da doença crítica, o organismo produz glicose endógena em grande quantidade, independentemente do que é oferecido, e a oferta plena precoce soma-se a essa produção. O resultado pode ser hiperalimentação, hiperglicemia, maior produção de CO2 e supressão da autofagia, um mecanismo celular de limpeza que parece importante na recuperação.',
					'Por isso, as diretrizes atuais tratam a meta como algo dinâmico: menor nos primeiros dias, progressivamente maior conforme o paciente se estabiliza e entra na fase de recuperação. A pergunta deixa de ser apenas quanto oferecer e passa a ser quanto oferecer neste momento da doença.',
				],
			},
			{
				titulo: 'Como estimar o gasto energético',
				paragrafos: [
					'A calorimetria indireta mede o consumo de oxigênio e a produção de gás carbônico e, a partir deles, calcula o gasto energético real. A ESPEN a recomenda como método de referência para pacientes em ventilação mecânica. Na sua ausência, o gasto pode ser estimado pelo VCO2 obtido do ventilador ou por equações preditivas.',
					'As equações, como Harris-Benedict, Mifflin-St Jeor ou Penn State, e a regra simples de kcal/kg/dia são práticas, mas imprecisas no paciente crítico. Estudos comparando equações com calorimetria mostram erros relevantes em ambas as direções, especialmente em obesos, idosos, desnutridos e pacientes com grandes queimaduras. O número calculado deve ser tratado como estimativa inicial, não como verdade.',
				],
			},
			{
				titulo: 'Quanto de energia oferecer',
				paragrafos: [
					'A diretriz da ESPEN (2019, revisada em 2023) sugere iniciar com oferta hipocalórica, não superior a 70% do gasto energético estimado, e progredir para 80–100% do gasto medido após o terceiro dia. Quando a calorimetria é usada, a oferta isocalórica pode ser alcançada de forma gradual após a fase inicial.',
					'A diretriz da ASPEN (2022) recomenda 12–25 kcal/kg/dia nos primeiros 7 a 10 dias de UTI, reconhecendo que os estudos não mostraram benefício de oferta mais alta nesse período. A diretriz brasileira da BRASPEN segue linha semelhante, com progressão gradual e atenção ao risco nutricional.',
				],
			},
			{
				titulo: 'Quanto de proteína oferecer',
				paragrafos: [
					'A proteína é o nutriente mais associado à preservação de massa muscular, e o paciente crítico perde músculo rapidamente. A ESPEN recomenda progressão até 1,3 g/kg/dia de proteína equivalente. A ASPEN admite 1,2–2,0 g/kg/dia.',
					'O ensaio EFFORT Protein, publicado em 2023, comparou dose alta (≥2,2 g/kg/dia) com dose usual (≤1,2 g/kg/dia) e não mostrou benefício da dose alta. Nos subgrupos com lesão renal aguda e maior gravidade, os resultados foram até piores com dose alta. A mensagem prática é atingir uma oferta proteica adequada de forma progressiva, sem buscar valores muito altos de rotina na fase aguda.',
				],
			},
			{
				titulo: 'Situações especiais',
				itens: [
					'Obesidade: a ASPEN sugere 11–14 kcal/kg de peso atual por dia para IMC de 30 a 50 e 22–25 kcal/kg de peso ideal para IMC acima de 50, com proteína de 2,0 g/kg de peso ideal (até 2,5 g/kg quando o IMC é 40 ou mais). A ESPEN sugere 1,3 g/kg de peso ajustado.',
					'Calorias não nutricionais: propofol, soro glicosado e citrato podem somar centenas de kcal por dia e devem entrar na conta para evitar hiperalimentação.',
					'Terapia renal substitutiva contínua: há perda de aminoácidos pelo filtro, o que costuma justificar oferta proteica maior.',
					'Fase de recuperação: depois da alta da UTI, a necessidade energética e proteica tende a aumentar, e a oferta muitas vezes fica aquém do necessário.',
				],
			},
			{
				titulo: 'Na prática',
				paragrafos: [
					'Um roteiro simples: estimar a meta (por calorimetria, quando disponível), definir a fase da doença, começar abaixo da meta plena nos primeiros dias, contabilizar todas as calorias não nutricionais, progredir conforme estabilidade e tolerância e reavaliar diariamente. A calculadora NE/NPT do NutriCalc ajuda nessa última etapa ao somar o que cada fórmula, módulo e infusão entrega e mostrar o resultado em kcal/kg e g de proteína/kg.',
				],
			},
		],
		referencias: [
			'Singer P, Blaser AR, Berger MM, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019;38(1):48-79.',
			'Singer P, Blaser AR, Berger MM, et al. ESPEN practical and partially revised guideline: clinical nutrition in the intensive care unit. Clin Nutr. 2023;42(9):1671-1689.',
			'Compher C, Bingham AL, McCall M, et al. Guidelines for the provision of nutrition support therapy in the adult critically ill patient: the American Society for Parenteral and Enteral Nutrition. JPEN J Parenter Enteral Nutr. 2022;46(1):12-41.',
			'McClave SA, Taylor BE, Martindale RG, et al. Guidelines for the provision and assessment of nutrition support therapy in the adult critically ill patient: SCCM and ASPEN. JPEN J Parenter Enteral Nutr. 2016;40(2):159-211.',
			'Heyland DK, Patel J, Compher C, et al. The effect of higher protein dosing in critically ill patients with high nutritional risk (EFFORT Protein): an international, multicentre, pragmatic, registry-based randomised trial. Lancet. 2023;401(10376):568-576.',
			'Castro MG, Ribeiro PC, Souza IAO, et al. Diretriz brasileira de terapia nutricional no paciente grave. BRASPEN J. 2018;33(Supl 1):2-36.',
		],
	},
	{
		slug: 'nutricao-enteral-ou-parenteral-quando-indicar',
		titulo: 'Nutrição enteral ou parenteral: quando indicar cada uma',
		descricao:
			'Critérios para escolher entre nutrição enteral e parenteral no adulto hospitalizado, quando iniciar, contraindicações da via enteral e o papel da parenteral suplementar.',
		resumo:
			'A via enteral é a preferida, mas não a única. Veja quando a parenteral entra e o que os grandes ensaios mostraram.',
		revisadoEm: '16/10/2026',
		secoes: [
			{
				titulo: 'O princípio geral',
				paragrafos: [
					'Se o intestino funciona, use-o. Essa máxima resume a preferência das diretrizes pela nutrição enteral (NE): ela é mais fisiológica, ajuda a manter a integridade da mucosa intestinal, custa menos e evita os riscos de um acesso venoso central dedicado. A nutrição parenteral (NPT), por outro lado, não depende da função do trato gastrointestinal e permite atingir a meta com precisão quando a via enteral não está disponível ou não é suficiente.',
					'A escolha não é ideológica. Os ensaios recentes mostraram que, administrada com controle glicêmico e sem excesso calórico, a NPT não é tão perigosa quanto se acreditava, e a NE também tem riscos próprios no paciente instável.',
				],
			},
			{
				titulo: 'Quando iniciar a nutrição enteral',
				paragrafos: [
					'A ESPEN e a ASPEN recomendam iniciar a NE precocemente, nas primeiras 24 a 48 horas, no paciente crítico que não consegue se alimentar por via oral, desde que esteja hemodinamicamente estável ou em estabilização. A progressão deve ser gradual, observando sinais de intolerância como distensão, vômitos e diarreia.',
					'A via gástrica é a padrão. A via pós-pilórica fica reservada para intolerância gástrica persistente apesar de procinéticos ou para pacientes com alto risco de aspiração.',
				],
			},
			{
				titulo: 'Quando adiar ou não usar a via enteral',
				paragrafos: [
					'A diretriz da ESPEN lista situações em que a NE deve ser adiada:',
				],
				itens: [
					'Choque não controlado, com metas hemodinâmicas e de perfusão não atingidas.',
					'Hipoxemia, hipercapnia ou acidose graves e não controladas.',
					'Sangramento ativo do trato gastrointestinal alto.',
					'Isquemia intestinal evidente.',
					'Fístula de alto débito sem acesso distal confiável para a dieta.',
					'Síndrome compartimental abdominal.',
					'Volume residual gástrico acima de 500 mL em 6 horas.',
				],
			},
			{
				titulo: 'Quando indicar a nutrição parenteral',
				paragrafos: [
					'A NPT está indicada quando a via enteral é contraindicada ou insuficiente. O momento de iniciar depende sobretudo do estado nutricional prévio. Em pacientes desnutridos ou com alto risco nutricional, a recomendação é iniciar NPT progressiva sem demora se a NE não for possível. Em pacientes bem nutridos e de baixo risco, é razoável aguardar: a ASPEN sugere esperar os primeiros 7 dias, e a ESPEN propõe iniciar entre o terceiro e o sétimo dia.',
					'A NPT suplementar, associada a uma NE que não atinge a meta, é avaliada caso a caso. Ela costuma ser considerada quando a NE persiste abaixo de cerca de 60% da meta após vários dias, mas sem pressa na fase aguda.',
				],
			},
			{
				titulo: 'Complicações de cada via e como reduzi-las',
				paragrafos: [
					'Na nutrição enteral, as complicações mais comuns são gastrointestinais: distensão, vômitos, diarreia e constipação. A aspiração é a mais temida. Medidas simples reduzem o risco: cabeceira elevada a 30–45 graus, conferência da posição da sonda, progressão gradual da vazão, revisão de medicamentos que reduzem a motilidade e uso de procinéticos quando há intolerância gástrica. A diarreia deve motivar a busca por causas como antibióticos, medicamentos com sorbitol e infecção por Clostridioides difficile antes de suspender a dieta.',
					'Na nutrição parenteral, os riscos principais são infecção de corrente sanguínea associada ao cateter, hiperglicemia, distúrbios eletrolíticos, hipertrigliceridemia e alterações hepáticas com o uso prolongado. A prevenção passa por técnica asséptica na inserção e no manuseio do cateter, via dedicada, controle glicêmico, monitorização laboratorial regular e cuidado para não exceder a meta calórica.',
				],
			},
			{
				titulo: 'O que os grandes ensaios mostraram',
				paragrafos: [
					'O EPaNIC (2011) comparou NPT suplementar precoce com tardia (a partir do oitavo dia) e encontrou menos infecções e recuperação mais rápida no grupo tardio. O CALORIES (2014) comparou NPT e NE precoces e não mostrou diferença de mortalidade em 30 dias nem de complicações infecciosas. O NUTRIREA-2 (2018), em pacientes ventilados e em choque, também não mostrou diferença de mortalidade, mas registrou mais complicações gastrointestinais graves, incluindo isquemia intestinal, no grupo enteral com oferta plena.',
					'Juntos, esses estudos sustentam três ideias: a via importa menos do que a dose; a oferta plena precoce não traz benefício na fase aguda; e no choque grave a NE deve ser iniciada com cautela, em dose baixa.',
				],
			},
			{
				titulo: 'Na prática',
				paragrafos: [
					'Antes de escolher a via, avalie risco nutricional, estabilidade hemodinâmica e função gastrointestinal. O escore GIDS, disponível no NutriCalc, ajuda a padronizar a avaliação da função intestinal. Escolhida a via, a calculadora NE/NPT mostra quanto a prescrição entrega em relação à meta.',
				],
			},
		],
		referencias: [
			'Singer P, Blaser AR, Berger MM, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019;38(1):48-79.',
			'McClave SA, Taylor BE, Martindale RG, et al. Guidelines for the provision and assessment of nutrition support therapy in the adult critically ill patient: SCCM and ASPEN. JPEN J Parenter Enteral Nutr. 2016;40(2):159-211.',
			'Casaer MP, Mesotten D, Hermans G, et al. Early versus late parenteral nutrition in critically ill adults. N Engl J Med. 2011;365(6):506-517.',
			'Harvey SE, Parrott F, Harrison DA, et al. Trial of the route of early nutritional support in critically ill adults. N Engl J Med. 2014;371(18):1673-1684.',
			'Reignier J, Boisramé-Helms J, Brisard L, et al. Enteral versus parenteral early nutrition in ventilated adults with shock: a randomised, controlled, multicentre, open-label, parallel-group study (NUTRIREA-2). Lancet. 2018;391(10116):133-143.',
		],
	},
	{
		slug: 'gids-como-interpretar-disfuncao-gastrointestinal',
		titulo: 'GIDS: como interpretar o escore de disfunção gastrointestinal',
		descricao:
			'Entenda o Gastrointestinal Dysfunction Score (GIDS): origem, critérios de cada nível, relação com a classificação AGI da ESICM e uso na decisão nutricional na UTI.',
		resumo:
			'Da classificação AGI da ESICM ao GIDS: o que cada nível significa e como usar o escore na rotina.',
		revisadoEm: '16/10/2026',
		secoes: [
			{
				titulo: 'O intestino como órgão esquecido',
				paragrafos: [
					'Os escores de disfunção orgânica usados na UTI avaliam pulmão, coração, rim, fígado, coagulação e sistema nervoso, mas deixam o intestino de fora. Isso não ocorre porque o intestino seja pouco importante: sintomas gastrointestinais são muito frequentes no paciente crítico e se associam a maior mortalidade. O problema sempre foi definir disfunção gastrointestinal de forma objetiva e reprodutível.',
				],
			},
			{
				titulo: 'Da classificação AGI ao GIDS',
				paragrafos: [
					'Em 2012, o grupo de trabalho de problemas abdominais da ESICM propôs a classificação de lesão gastrointestinal aguda (AGI), com quatro graus, do risco à falência com ameaça à vida. Foi um avanço na terminologia, mas alguns critérios eram subjetivos e a concordância entre avaliadores era limitada.',
					'O GIDS, publicado em 2021 por Reintam Blaser e colaboradores a partir do estudo multicêntrico iSOFA, foi construído para corrigir isso. Ele usa achados registrados de rotina e os organiza em cinco níveis, de 0 a 4, com regras explícitas de pontuação.',
				],
			},
			{
				titulo: 'Os níveis do GIDS',
				itens: [
					'GIDS 0, sem risco: nenhum ou apenas um sintoma básico (por exemplo, ausência de ingestão oral isolada).',
					'GIDS 1, risco aumentado: dois sintomas básicos, como ausência de ruídos intestinais, vômitos, volume residual gástrico acima de 200 mL, íleo, distensão, diarreia não grave, sangramento sem transfusão ou pressão intra-abdominal de 12 a 20 mmHg.',
					'GIDS 2, disfunção: três ou mais sintomas básicos, ou pelo menos um sinal de gravidade (diarreia grave, sangramento com transfusão, uso de procinéticos ou pressão intra-abdominal acima de 20 mmHg).',
					'GIDS 3, falência: três ou mais achados entre os sinais de gravidade, íleo e distensão abdominal.',
					'GIDS 4, risco de vida: sangramento gastrointestinal com choque hemorrágico, isquemia mesentérica ou síndrome compartimental abdominal.',
				],
			},
			{
				titulo: 'O que o escore informa',
				paragrafos: [
					'No estudo de desenvolvimento, níveis mais altos de GIDS se associaram a maior mortalidade. Como qualquer escore, ele descreve gravidade e risco; não prescreve tratamento. Seu valor está em padronizar a linguagem: dizer que o paciente está em GIDS 3 comunica, em poucas palavras, que há falência gastrointestinal e que a oferta enteral plena provavelmente não será tolerada.',
					'A medida diária é mais útil do que uma medida isolada. A evolução de GIDS 2 para GIDS 3 em 24 horas, por exemplo, sinaliza piora e deve motivar reavaliação clínica e da estratégia nutricional.',
				],
			},
			{
				titulo: 'Implicações para a terapia nutricional',
				paragrafos: [
					'Em GIDS 0 e 1, a nutrição enteral em geral pode ser iniciada ou progredida, com vigilância de tolerância. Em GIDS 2, a progressão deve ser mais cautelosa, e vale buscar causas reversíveis, como opioides em dose alta, hipocalemia, hiperglicemia e constipação. Em GIDS 3, a dieta trófica ou a suspensão temporária costumam ser necessárias, e a nutrição parenteral entra na discussão conforme o estado nutricional e o tempo previsto de jejum. Em GIDS 4, a prioridade é tratar a causa: cirurgia, controle do sangramento ou descompressão.',
				],
			},
			{
				titulo: 'Um caso passo a passo',
				paragrafos: [
					'Paciente de 58 anos no pós-operatório de laparotomia, em ventilação mecânica. No primeiro dia na UTI, não há ingestão oral e os ruídos intestinais estão ausentes: dois sintomas básicos, GIDS 1. A dieta enteral é iniciada em dose trófica.',
					'No segundo dia surgem distensão abdominal e vômitos. Agora são quatro sintomas básicos, GIDS 2. A equipe revisa a dose de opioide, corrige o potássio e inicia procinético. No terceiro dia, com procinético em uso, distensão persistente e pressão intra-abdominal de 23 mmHg, o paciente soma três achados do grupo de falência: GIDS 3. A dieta enteral é reduzida, a pressão intra-abdominal passa a ser monitorada de forma seriada e a nutrição parenteral começa a ser discutida, já que a previsão é de vários dias sem atingir a meta pela via enteral.',
					'O exemplo mostra o principal valor do escore: transformar uma impressão clínica de piora em uma informação objetiva, comparável de um dia para o outro e fácil de comunicar na passagem de plantão.',
				],
			},
			{
				titulo: 'Cuidados na aplicação',
				paragrafos: [
					'Alguns itens dependem da prática do serviço. O volume residual gástrico deixou de ser medido de rotina em muitas UTIs, e a pressão intra-abdominal só é aferida quando há suspeita clínica. Um item não avaliado não deve ser tratado como ausente sem reflexão. O GIDS ainda está em fase de validação externa, e seu uso deve complementar, não substituir, o exame abdominal e o julgamento clínico.',
				],
			},
		],
		referencias: [
			'Reintam Blaser A, Padar M, Mändul M, et al. Development of the Gastrointestinal Dysfunction Score (GIDS) for critically ill patients: a prospective multicenter observational study (iSOFA study). Clin Nutr. 2021;40(8):4932-4940.',
			'Reintam Blaser A, Malbrain MLNG, Starkopf J, et al. Gastrointestinal function in intensive care patients: terminology, definitions and management. Recommendations of the ESICM Working Group on Abdominal Problems. Intensive Care Med. 2012;38(3):384-394.',
			'Singer P, Blaser AR, Berger MM, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019;38(1):48-79.',
		],
	},
	{
		slug: 'sindrome-de-realimentacao-prevencao',
		titulo: 'Síndrome de realimentação: como reconhecer e prevenir',
		descricao:
			'Fisiopatologia, fatores de risco, critérios da ASPEN e do NICE, prevenção com início lento, tiamina e monitorização de fósforo, potássio e magnésio.',
		resumo:
			'Quem está em risco, como iniciar a dieta com segurança e o que monitorar nos primeiros dias.',
		revisadoEm: '16/10/2026',
		secoes: [
			{
				titulo: 'O que é',
				paragrafos: [
					'A síndrome de realimentação é o conjunto de alterações metabólicas e clínicas que surge quando um paciente com jejum prolongado ou desnutrição volta a receber nutrição, seja oral, enteral ou parenteral. Durante o jejum, o organismo reduz a secreção de insulina e passa a usar gordura e proteína como fonte de energia, enquanto os estoques intracelulares de fósforo, potássio e magnésio se esgotam, mesmo com níveis séricos ainda normais.',
					'Com a reintrodução de carboidratos, a insulina sobe e desloca esses íons para dentro das células, e o consumo de tiamina aumenta. O resultado pode ser hipofosfatemia, hipocalemia e hipomagnesemia, além de retenção de sódio e água e deficiência aguda de tiamina. As consequências vão de fraqueza e edema a arritmias, insuficiência respiratória, insuficiência cardíaca e encefalopatia de Wernicke.',
				],
			},
			{
				titulo: 'Quem está em risco',
				paragrafos: [
					'O critério do NICE, amplamente usado, considera alto risco o paciente que apresenta pelo menos um dos itens: IMC abaixo de 16 kg/m²; perda de peso não intencional acima de 15% em 3 a 6 meses; ingestão mínima ou nula por mais de 10 dias; ou níveis baixos de potássio, fósforo ou magnésio antes da realimentação.',
					'Também é alto risco quem apresenta dois ou mais destes: IMC abaixo de 18,5 kg/m²; perda de peso acima de 10% em 3 a 6 meses; ingestão mínima por mais de 5 dias; história de abuso de álcool ou uso de drogas como insulina, quimioterapia, antiácidos ou diuréticos. A ASPEN publicou em 2020 critérios semelhantes, graduando o risco em moderado e significativo.',
				],
			},
			{
				titulo: 'Como prevenir',
				itens: [
					'Identificar o risco antes de iniciar qualquer terapia nutricional.',
					'Dosar fósforo, potássio, magnésio e glicemia antes de começar e corrigir deficiências graves, sem atrasar indefinidamente o início da dieta.',
					'Iniciar devagar: a ASPEN sugere 100–150 g de glicose ou 10–20 kcal/kg nas primeiras 24 horas, progredindo cerca de 33% da meta a cada 1 a 2 dias. O NICE propõe até 10 kcal/kg/dia no alto risco e 5 kcal/kg/dia nos casos extremos (IMC abaixo de 14 ou ingestão nula por mais de 15 dias).',
					'Administrar tiamina (por exemplo, 100 mg) antes de iniciar a nutrição e mantê-la por 5 a 7 dias, ou mais no risco alto.',
					'Monitorar eletrólitos com frequência nos primeiros dias: a ASPEN sugere a cada 12 horas nos 3 primeiros dias nos pacientes de alto risco.',
					'Acompanhar sinais vitais, balanço hídrico e peso, atentos à sobrecarga de volume.',
				],
			},
			{
				titulo: 'Exemplo de início seguro',
				paragrafos: [
					'Paciente de 45 kg e 1,65 m (IMC 16,5 kg/m²), com ingestão mínima há 12 dias por disfagia e fósforo sérico no limite inferior antes do início da dieta. Pelo critério do NICE, ele é de alto risco: ingestão mínima por mais de 10 dias, além do baixo peso.',
					'A conduta inicial seria repor o fósforo, administrar tiamina antes da primeira infusão e começar a nutrição enteral com cerca de 10 kcal/kg/dia, ou 450 kcal no primeiro dia. Fósforo, potássio e magnésio são dosados a cada 12 horas nos primeiros três dias. Se os eletrólitos se mantiverem estáveis, a oferta é aumentada progressivamente, em etapas de um a dois dias, até a meta planejada ao fim de cerca de uma semana. Se o fósforo cair de forma significativa, a progressão é interrompida, a oferta é reduzida temporariamente e a reposição é intensificada.',
					'Ao conferir a oferta real nesses primeiros dias, vale lembrar das fontes de glicose fora da dieta, como o soro glicosado de manutenção, que podem acrescentar uma carga de carboidrato relevante justamente quando ela deve ser limitada.',
				],
			},
			{
				titulo: 'No paciente crítico',
				paragrafos: [
					'Na UTI, a hipofosfatemia de realimentação é frequente e muitas vezes passa despercebida. O ensaio de Doig e colaboradores (2015) incluiu pacientes críticos que desenvolveram hipofosfatemia nas primeiras 72 horas após o início da nutrição. Restringir a oferta calórica por 48 horas, com retorno gradual, associou-se a maior sobrevida em comparação com a manutenção da oferta padrão. A ESPEN incorporou esse achado: diante de hipofosfatemia de realimentação, reduzir temporariamente a oferta energética e repor fósforo.',
				],
			},
			{
				titulo: 'Na prática',
				paragrafos: [
					'O erro mais comum não é tratar mal a síndrome, mas deixar de pensar nela. Avaliar o risco na admissão, iniciar a dieta abaixo da meta nos pacientes de risco e dosar fósforo nos primeiros dias evitam a maior parte das complicações. A calculadora NE/NPT do NutriCalc ajuda a conferir a oferta calórica real em kcal/kg durante a progressão, incluindo as calorias do soro glicosado, que nesses pacientes também contam.',
				],
			},
		],
		referencias: [
			'da Silva JSV, Seres DS, Sabino K, et al. ASPEN consensus recommendations for refeeding syndrome. Nutr Clin Pract. 2020;35(2):178-195.',
			'National Institute for Health and Care Excellence (NICE). Nutrition support for adults: oral nutrition support, enteral tube feeding and parenteral nutrition. Clinical guideline CG32. 2006 (atualizado em 2017).',
			'Doig GS, Simpson F, Heighes PT, et al. Restricted versus continued standard caloric intake during the management of refeeding syndrome in critically ill adults: a randomised, parallel-group, multicentre, single-blind controlled trial. Lancet Respir Med. 2015;3(12):943-952.',
			'Singer P, Blaser AR, Berger MM, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019;38(1):48-79.',
		],
	},
]

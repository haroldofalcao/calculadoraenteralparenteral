/**
 * Utilitários para cálculos nutricionais
 * Baseado nas fórmulas extraídas do Excel "Calculadora de Fórmulas v3.xlsx"
 */

/**
 * Calcula o IMC (Índice de Massa Corporal)
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em cm
 * @returns {number} IMC em kg/m²
 */
export const calculateIMC = (weight, height) => {
  if (!weight || !height) return 0;
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

/**
 * Calcula o Gasto Energético Basal (GEB) usando a fórmula de Harris-Benedict
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em cm
 * @param {number} age - Idade em anos
 * @param {string} gender - Sexo ('masculino' ou 'feminino')
 * @returns {number} GEB em kcal
 */
export const calculateGEB = (weight, height, age, gender) => {
  if (!weight || !height || !age) return 0;

  if (gender === 'masculino') {
    return 66.5 + 13.75 * weight + 5.003 * height - 6.775 * age;
  } else {
    return 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  }
};

/**
 * Calcula o Gasto Energético Basal (GEB) usando a fórmula de bolso
 * @param {number} weight - Peso em kg
 * @param {number} kcalPerKg - Kcal por kg desejado
 * @returns {number} GEB em kcal
 */
export const calculatePocketGEB = (weight, kcalPerKg) => {
  if (!weight || !kcalPerKg) return 0;
  return weight * kcalPerKg;
};

/**
 * Calcula os macronutrientes de uma única fórmula
 * @param {Object} product - Produto nutricional
 * @param {number|string} volume - Volume em mL
 * @returns {Object} Métricas calculadas da fórmula
 */
const calculateFormulaMetrics = (product, volume) => {
  const vol = parseFloat(volume) || 0;

  const carbs = (product.cho_g_l * vol) / 1000;
  const lipids = (product.lip_g_l * vol) / 1000;
  const protein = (product.ptn_g_l * vol) / 1000;

  return {
    calories: product.kcal_ml * vol,
    carbs,
    lipids,
    protein,
    carbsCalories: carbs * 4,
    lipidsCalories: lipids * 9,
    proteinCalories: protein * 4,
  };
};

/**
 * Cria um objeto de resultados vazios para uma fórmula
 * @returns {Object} Resultados vazios
 */
const createEmptyFormulaResults = () => ({
  calories: 0,
  carbs: 0,
  lipids: 0,
  protein: 0,
  carbsCalories: 0,
  lipidsCalories: 0,
  proteinCalories: 0,
});

/**
 * Calcula calorias não-nutricionais e seus macronutrientes
 * @param {Object} nonNutritionalCals - Dados de calorias não-nutricionais
 * @returns {Object} Resultados das calorias não-nutricionais
 */
const calculateNonNutritionalCalories = ({ citrato = false, propofol_ml = 0, sg5_ml = 0 }) => {
  const citratoKcal = citrato ? 300 : 0;
  const propofolKcal = (parseFloat(propofol_ml) || 0) * 1.1;
  const sg5Kcal = (parseFloat(sg5_ml) || 0) * 0.2;

  // Propofol: 20g gordura / 100mL = 0.2g/mL
  const propofolLipids = (parseFloat(propofol_ml) || 0) * 0.2;

  // SG5%: 50g CHO / 1000mL = 0.05g/mL
  const sg5Carbs = (parseFloat(sg5_ml) || 0) * 0.05;

  return {
    totalCalories: citratoKcal + propofolKcal + sg5Kcal,
    calories: {
      citrato: citratoKcal,
      propofol: propofolKcal,
      sg5: sg5Kcal,
    },
    macros: {
      carbs: sg5Carbs,
      lipids: propofolLipids,
      protein: 0,
    },
  };
};

/**
 * Mescla resultados de múltiplas fórmulas e calorias não-nutricionais
 * @param {Object} f1 - Resultados da fórmula 1
 * @param {Object} f2 - Resultados da fórmula 2
 * @param {Object} nonNut - Resultados de calorias não-nutricionais
 * @param {number} proteinModule - Proteína adicional em gramas
 * @param {number} otherModule - Outras calorias adicionais
 * @returns {Object} Totais consolidados
 */
const mergeResults = (f1, f2, nonNut, proteinModule = 0, otherModule = 0) => {
  const totalCalories = f1.calories + f2.calories + nonNut.totalCalories + otherModule;
  const totalCarbs = f1.carbs + f2.carbs + nonNut.macros.carbs;
  const totalLipids = f1.lipids + f2.lipids + nonNut.macros.lipids;
  const totalProtein = f1.protein + f2.protein + nonNut.macros.protein + proteinModule;

  const carbsCalories = totalCarbs * 4;
  const lipidsCalories = totalLipids * 9;
  const proteinCalories = totalProtein * 4;

  return {
    totalCalories,
    totalCarbs,
    totalLipids,
    totalProtein,
    carbsCalories,
    lipidsCalories,
    proteinCalories,
    carbsPercentage: totalCalories > 0 ? (carbsCalories / totalCalories) * 100 : 0,
    lipidsPercentage: totalCalories > 0 ? (lipidsCalories / totalCalories) * 100 : 0,
    proteinPercentage: totalCalories > 0 ? (proteinCalories / totalCalories) * 100 : 0,
  };
};

/**
 * Calcula os resultados nutricionais com base nos dados do paciente e produto(s) selecionado(s)
 * @param {Object} patientData - Dados do paciente e prescrição
 * @param {Object} product1 - Produto nutricional principal (obrigatório)
 * @param {Object} product2 - Produto nutricional secundário (opcional)
 * @param {Object} nonNutritionalCals - Calorias não-nutricionais (opcional)
 * @returns {Object} Resultados calculados
 */
export const calculateResults = (patientData, product1, product2 = null, nonNutritionalCals = {}) => {
  // Converter strings para números
  const weight = parseFloat(patientData.weight) || 0;
  const height = parseFloat(patientData.height) || 0;
  const age = parseFloat(patientData.age) || 0;
  const volume = parseFloat(patientData.volume) || 0;
  const volume2 = parseFloat(patientData.volume2) || 0;
  const infusionTime = patientData.infusionTime ? parseFloat(patientData.infusionTime) : 0;
  const proteinModule = patientData.proteinModule ? parseFloat(patientData.proteinModule) : 0;
  const otherModule = patientData.otherModule ? parseFloat(patientData.otherModule) : 0;
  const kcalPerKg = parseFloat(patientData.kcalPerKg) || 25;

  // Calcular IMC (se peso e altura estiverem disponíveis)
  const imc = calculateIMC(weight, height);

  // Calcular GEB com base no método selecionado
  let geb = 0;
  if (patientData.calculationMethod === 'harris-benedict') {
    geb = calculateGEB(weight, height, age, patientData.gender);
  } else {
    geb = calculatePocketGEB(weight, kcalPerKg);
  }

  // Calcular resultados da fórmula 1
  const formula1Results = calculateFormulaMetrics(product1, volume);

  // Calcular resultados da fórmula 2 (se existir)
  const formula2Results = product2
    ? calculateFormulaMetrics(product2, volume2)
    : createEmptyFormulaResults();

  // Calcular calorias não-nutricionais
  const nonNutritionalResults = calculateNonNutritionalCalories(nonNutritionalCals);

  // Consolidar totais
  const totals = mergeResults(
    formula1Results,
    formula2Results,
    nonNutritionalResults,
    proteinModule,
    otherModule
  );

  // Calcular valores por kg de peso corporal
  const caloriesPerKg = weight > 0 ? totals.totalCalories / weight : 0;
  const proteinPerKg = weight > 0 ? totals.totalProtein / weight : 0;

  // Calcular volume por hora (soma dos volumes se houver segunda fórmula)
  const totalVolume = volume + volume2;
  const volumePerHour = infusionTime > 0 ? totalVolume / infusionTime : null;

  return {
    imc,
    geb,
    formula1: formula1Results,
    formula2: formula2Results,
    nonNutritional: nonNutritionalResults,
    totals,
    caloriesPerKg,
    proteinPerKg,
    volumePerHour,
    // Manter compatibilidade com código antigo (deprecated)
    totalCalories: totals.totalCalories,
    totalCarbs: totals.totalCarbs,
    totalLipids: totals.totalLipids,
    totalProtein: totals.totalProtein,
    carbsCalories: totals.carbsCalories,
    lipidsCalories: totals.lipidsCalories,
    proteinCalories: totals.proteinCalories,
    carbsPercentage: totals.carbsPercentage,
    lipidsPercentage: totals.lipidsPercentage,
    proteinPercentage: totals.proteinPercentage,
  };
};

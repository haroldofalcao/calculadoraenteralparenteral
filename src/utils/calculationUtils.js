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
    return 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
  } else {
    return 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
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
 * Calcula os resultados nutricionais com base nos dados do paciente e produto selecionado
 * @param {Object} patientData - Dados do paciente e prescrição
 * @param {Object} product - Produto nutricional selecionado
 * @returns {Object} Resultados calculados
 */
export const calculateResults = (patientData, product) => {
  // Converter strings para números
  const weight = parseFloat(patientData.weight) || 0;
  const height = parseFloat(patientData.height) || 0;
  const age = parseFloat(patientData.age) || 0;
  const volume = parseFloat(patientData.volume) || 0;
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
  
  // Calcular calorias da fórmula
  const formulaCalories = product.kcal_ml * volume;
  
  // Calcular calorias totais (fórmula + módulo adicional)
  const totalCalories = formulaCalories + otherModule;
  
  // Calcular macronutrientes
  const totalCarbs = (product.cho_g_l * volume) / 1000; // g/L para g
  const totalLipids = (product.lip_g_l * volume) / 1000; // g/L para g
  const formulaProtein = (product.ptn_g_l * volume) / 1000; // g/L para g
  const totalProtein = formulaProtein + proteinModule;
  
  // Calcular calorias por macronutriente
  const carbsCalories = totalCarbs * 4; // 4 kcal/g para CHO
  const lipidsCalories = totalLipids * 9; // 9 kcal/g para LIP
  const proteinCalories = totalProtein * 4; // 4 kcal/g para PTN
  
  // Calcular distribuição percentual de macronutrientes
  const carbsPercentage = totalCalories > 0 ? (carbsCalories / totalCalories) * 100 : 0;
  const lipidsPercentage = totalCalories > 0 ? (lipidsCalories / totalCalories) * 100 : 0;
  const proteinPercentage = totalCalories > 0 ? (proteinCalories / totalCalories) * 100 : 0;
  
  // Calcular valores por kg de peso corporal
  const caloriesPerKg = weight > 0 ? totalCalories / weight : 0;
  const proteinPerKg = weight > 0 ? totalProtein / weight : 0;
  
  // Calcular volume por hora (se tempo de infusão foi informado)
  const volumePerHour = infusionTime > 0 ? volume / infusionTime : null;
  
  return {
    imc,
    geb,
    totalCalories,
    totalCarbs,
    totalLipids,
    totalProtein,
    carbsCalories,
    lipidsCalories,
    proteinCalories,
    carbsPercentage,
    lipidsPercentage,
    proteinPercentage,
    caloriesPerKg,
    proteinPerKg,
    volumePerHour
  };
};

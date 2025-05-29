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
  if (gender === 'masculino') {
    return 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
  } else {
    return 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
  }
};

/**
 * Calcula os resultados nutricionais com base nos dados do paciente e produto selecionado
 * @param {Object} patientData - Dados do paciente e prescrição
 * @param {Object} product - Produto nutricional selecionado
 * @returns {Object} Resultados calculados
 */
export const calculateResults = (patientData, product) => {
  // Converter strings para números
  const weight = parseFloat(patientData.weight);
  const height = parseFloat(patientData.height);
  const age = parseFloat(patientData.age);
  const volume = parseFloat(patientData.volume);
  const infusionTime = patientData.infusionTime ? parseFloat(patientData.infusionTime) : 0;
  const proteinModule = patientData.proteinModule ? parseFloat(patientData.proteinModule) : 0;
  const otherModule = patientData.otherModule ? parseFloat(patientData.otherModule) : 0;
  
  // Calcular IMC
  const imc = calculateIMC(weight, height);
  
  // Calcular GEB
  const geb = calculateGEB(weight, height, age, patientData.gender);
  
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
  const carbsPercentage = (carbsCalories / totalCalories) * 100;
  const lipidsPercentage = (lipidsCalories / totalCalories) * 100;
  const proteinPercentage = (proteinCalories / totalCalories) * 100;
  
  // Calcular valores por kg de peso corporal
  const caloriesPerKg = totalCalories / weight;
  const proteinPerKg = totalProtein / weight;
  
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

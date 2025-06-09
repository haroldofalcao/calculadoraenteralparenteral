// cypress/support/data-helpers.js

// Dados de exemplo para testes
export const sampleProductData = {
  nome: 'Produto Teste E2E',
  kcal_ml: '1.5',
  cho_g_l: '150',
  lip_g_l: '50', 
  ptn_g_l: '60',
  ep_ratio: '25'
}

export const samplePatientData = {
  weight: '70',
  height: '175',
  age: '30',
  gender: 'masculino'
}

// Função para gerar dados aleatórios
export const generateRandomPatient = () => ({
  weight: (Math.random() * 50 + 50).toFixed(1), // 50-100kg
  height: (Math.random() * 30 + 150).toFixed(0), // 150-180cm
  age: (Math.random() * 60 + 18).toFixed(0), // 18-78 anos
  gender: Math.random() > 0.5 ? 'masculino' : 'feminino'
})

export const generateRandomProduct = () => ({
  nome: `Produto Test ${Math.random().toString(36).substr(2, 9)}`,
  kcal_ml: (Math.random() * 1.5 + 0.5).toFixed(1), // 0.5-2.0
  cho_g_l: (Math.random() * 100 + 50).toFixed(0), // 50-150
  lip_g_l: (Math.random() * 50 + 20).toFixed(0), // 20-70
  ptn_g_l: (Math.random() * 60 + 20).toFixed(0), // 20-80
  ep_ratio: (Math.random() * 20 + 15).toFixed(0) // 15-35
})

// Validadores para testes
export const validateProductData = (product) => {
  return product.nome && 
         product.kcal_ml > 0 && 
         product.cho_g_l >= 0 && 
         product.lip_g_l >= 0 && 
         product.ptn_g_l >= 0 && 
         product.ep_ratio >= 0
}

export const validatePatientData = (patient) => {
  return patient.weight > 0 && 
         patient.height > 0 && 
         patient.age > 0 && 
         ['masculino', 'feminino'].includes(patient.gender)
}

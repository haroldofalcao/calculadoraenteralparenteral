import React from 'react'
import Calculator from '../../components/Calculator.jsx'
import SEO from '../../components/SEO.jsx'

function Nenpt() {
	return (
		<>
			<SEO
				title="Calculadora NE/NPT - NutriCalc | Nutrição Enteral e Parenteral"
				description="Ferramenta profissional para cálculos de Nutrição Enteral e Parenteral (NE/NPT). Otimize suas prescrições nutricionais com nossa calculadora especializada."
				keywords="calculadora NE/NPT, nutrição enteral, nutrição parenteral, prescrição nutricional, cálculos nutricionais"
				canonical="/nenpt"
				structuredDataType="MedicalWebPage"
				structuredData={{
					audience: {
						'@type': 'MedicalAudience',
						audienceType: 'healthcare professionals',
					},
				}}
			/>
			<Calculator />
		</>
	)
}

export default Nenpt

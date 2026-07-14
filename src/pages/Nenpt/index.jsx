import React from 'react'
import { useTranslation } from 'react-i18next'
import Calculator from '../../components/Calculator.jsx'
import SEO from '../../components/SEO.jsx'

function Nenpt() {
	const { t } = useTranslation()

	const howTo = {
		name: t('nenpt.guide.title'),
		steps: [1, 2, 3, 4].map((n) => ({
			name: t(`nenpt.guide.step${n}.title`),
			text: t(`nenpt.guide.step${n}.desc`),
		})),
	}

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
				howTo={howTo}
			/>
			<Calculator />
		</>
	)
}

export default Nenpt

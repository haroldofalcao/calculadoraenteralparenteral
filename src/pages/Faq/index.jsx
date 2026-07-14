import React from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../../components/SEO.jsx'
import {
	Card,
	CardContent,
} from '@/components/ui/card'

function Faq() {
	const { t } = useTranslation()
	const items = t('faq.items', { returnObjects: true })

	return (
		<>
			<SEO
				title="Perguntas Frequentes - NutriCalc | GIDS e NE/NPT"
				description="Tire suas dúvidas sobre o escore GIDS, a calculadora NE/NPT e o uso do NutriCalc para cálculos nutricionais em pacientes críticos."
				keywords="perguntas frequentes nutricalc, o que é gids, dúvidas calculadora nenpt, faq nutrição enteral parenteral"
				canonical="/perguntas-frequentes"
				faq={items}
			/>

			<div className="mx-auto max-w-3xl px-4">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight text-foreground">
						{t('faq.title')}
					</h1>
					<p className="mt-2 text-muted-foreground">{t('faq.subtitle')}</p>
				</div>

				<div className="space-y-4">
					{items.map((item) => (
						<Card key={item.question}>
							<CardContent className="pt-6">
								<h2 className="mb-2 text-base font-semibold text-primary">
									{item.question}
								</h2>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{item.answer}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	)
}

export default Faq

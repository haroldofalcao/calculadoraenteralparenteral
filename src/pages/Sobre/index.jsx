import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO.jsx'
import { Card, CardContent } from '@/components/ui/card'

function Sobre() {
	return (
		<>
			<SEO
				title="Sobre - NutriCalc | Autoria e Metodologia"
				description="Quem desenvolve o NutriCalc, de onde vêm as fórmulas e referências usadas nas calculadoras de terapia nutricional e como entrar em contato."
				keywords="sobre nutricalc, autor, metodologia, calculadora nutricional, nutrologia, terapia intensiva"
				canonical="/sobre"
			/>

			<div className="mx-auto max-w-3xl space-y-6 px-4">
				<div className="text-center">
					<h1 className="text-3xl font-bold tracking-tight text-foreground">
						Sobre o NutriCalc
					</h1>
					<p className="mt-2 text-muted-foreground">
						Ferramentas de apoio à terapia nutricional, feitas por quem
						prescreve na beira do leito.
					</p>
				</div>

				<Card>
					<CardContent className="space-y-3 pt-6 text-sm leading-relaxed text-muted-foreground">
						<h2 className="text-lg font-semibold text-foreground">Autor</h2>
						<p>
							<strong className="text-foreground">
								Haroldo Falcão Ramos da Cunha
							</strong>{' '}
							— médico nutrólogo e intensivista, CRM 5268628-0. Também é
							professor de inteligência artificial aplicada à medicina.
						</p>
						<p>
							O NutriCalc nasceu de uma planilha usada na rotina da UTI para
							conferir se a prescrição de nutrição enteral e parenteral
							atingia a meta do paciente. A planilha virou ferramenta aberta
							para que outros profissionais pudessem fazer a mesma conta com
							rapidez e menos erro.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="space-y-3 pt-6 text-sm leading-relaxed text-muted-foreground">
						<h2 className="text-lg font-semibold text-foreground">
							Metodologia
						</h2>
						<p>
							As calculadoras usam fórmulas publicadas e citadas em cada página:
							a equação de Harris-Benedict (1918) e a estimativa por kcal/kg/dia
							para a meta energética, e o Gastrointestinal Dysfunction Score
							(Reintam Blaser e colaboradores, 2021) para a função
							gastrointestinal. As metas e interpretações seguem as diretrizes
							da ESPEN, da ASPEN e da BRASPEN.
						</p>
						<p>
							A composição das fórmulas nutricionais pré-cadastradas vem das
							fichas técnicas dos fabricantes e deve ser conferida, porque
							pode mudar. Os textos clínicos são revisados pelo autor e trazem a
							data da última revisão.
						</p>
						<p>
							O NutriCalc é um apoio à decisão para profissionais de saúde. Não
							substitui a avaliação individual do paciente nem o julgamento
							clínico, e não deve ser usado em pediatria.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="space-y-3 pt-6 text-sm leading-relaxed text-muted-foreground">
						<h2 className="text-lg font-semibold text-foreground">
							Independência e anúncios
						</h2>
						<p>
							O NutriCalc é gratuito e mantido com anúncios do Google AdSense. Os
							anúncios não influenciam o conteúdo, e nenhum fabricante de
							fórmula patrocina as calculadoras ou os textos. Veja como os dados
							são tratados na{' '}
							<Link to="/privacidade" className="text-primary hover:underline">
								Política de Privacidade
							</Link>
							.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="space-y-3 pt-6 text-sm leading-relaxed text-muted-foreground">
						<h2 className="text-lg font-semibold text-foreground">Contato</h2>
						<p>
							Sugestões, correções e dúvidas:{' '}
							<a
								href="mailto:haroldofalcao@gmail.com"
								className="text-primary hover:underline"
							>
								haroldofalcao@gmail.com
							</a>
							.
						</p>
						<p>
							O conteúdo está licenciado sob Creative Commons CC BY-NC-ND 4.0:
							pode ser compartilhado com atribuição, sem uso comercial e sem
							modificações.
						</p>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default Sobre

import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO.jsx'
import { artigos } from '../../content/artigos.js'
import { Card, CardContent } from '@/components/ui/card'

function Artigos() {
	return (
		<>
			<SEO
				title="Artigos - NutriCalc | Terapia Nutricional no Paciente Crítico"
				description="Artigos educativos sobre terapia nutricional enteral e parenteral, metas no paciente crítico, GIDS e síndrome de realimentação, com referências."
				keywords="artigos terapia nutricional, nutrição enteral, nutrição parenteral, paciente crítico, GIDS, síndrome de realimentação"
				canonical="/artigos"
			/>

			<div className="mx-auto max-w-3xl px-4">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight text-foreground">
						Artigos
					</h1>
					<p className="mt-2 text-muted-foreground">
						Textos de apoio sobre terapia nutricional no adulto hospitalizado,
						escritos e revisados por médico nutrólogo e intensivista.
					</p>
				</div>

				<div className="space-y-4">
					{artigos.map((artigo) => (
						<Card key={artigo.slug}>
							<CardContent className="pt-6">
								<h2 className="mb-2 text-lg font-semibold">
									<Link
										to={`/artigos/${artigo.slug}`}
										className="text-primary hover:underline"
									>
										{artigo.titulo}
									</Link>
								</h2>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{artigo.descricao}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	)
}

export default Artigos

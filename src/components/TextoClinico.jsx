import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

// Renderiza um guia ou artigo de src/content (título, seções, referências e aviso)
const TextoClinico = ({ conteudo, comoPagina = false }) => {
	const Titulo = comoPagina ? 'h1' : 'h2'

	return (
		<article className="mt-12">
			<header className="mb-6">
				<Titulo
					className={
						comoPagina
							? 'text-3xl font-bold tracking-tight text-foreground'
							: 'text-2xl font-bold tracking-tight text-foreground'
					}
				>
					{conteudo.titulo}
				</Titulo>
				<p className="mt-2 text-muted-foreground">{conteudo.resumo}</p>
				<p className="mt-2 text-xs text-muted-foreground">
					Por{' '}
					<Link to="/sobre" className="font-medium text-primary hover:underline">
						Haroldo Falcão Ramos da Cunha
					</Link>{' '}
					· Última revisão: {conteudo.revisadoEm}
				</p>
			</header>

			<Card>
				<CardContent className="space-y-8 pt-6">
					{conteudo.secoes.map((secao) => (
						<section key={secao.titulo}>
							<h3 className="mb-3 text-lg font-semibold text-foreground">
								{secao.titulo}
							</h3>
							<div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
								{secao.paragrafos?.map((p) => (
									<p key={p.slice(0, 40)}>{p}</p>
								))}
								{secao.itens && (
									<ul className="list-disc space-y-2 pl-5">
										{secao.itens.map((item) => (
											<li key={item.slice(0, 40)}>{item}</li>
										))}
									</ul>
								)}
							</div>
						</section>
					))}

					<section>
						<h3 className="mb-3 text-lg font-semibold text-foreground">
							Referências
						</h3>
						<ol className="list-decimal space-y-2 pl-5 text-xs leading-relaxed text-muted-foreground">
							{conteudo.referencias.map((ref) => (
								<li key={ref.slice(0, 40)}>{ref}</li>
							))}
						</ol>
					</section>

					<p className="rounded-md border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
						Conteúdo educativo destinado a profissionais de saúde. É um apoio à
						decisão e não substitui a avaliação individual do paciente nem o
						julgamento clínico.
					</p>
				</CardContent>
			</Card>
		</article>
	)
}

export default TextoClinico

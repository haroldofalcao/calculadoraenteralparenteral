import React from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveBanner } from '../../ads'
import SEO from '../../components/SEO.jsx'
import TextoClinico from '../../components/TextoClinico.jsx'

function Artigo({ artigo }) {
	return (
		<>
			<SEO
				title={`${artigo.titulo} - NutriCalc`}
				description={artigo.descricao}
				canonical={`/artigos/${artigo.slug}`}
				type="article"
				structuredDataType="MedicalWebPage"
				structuredData={{
					audience: {
						'@type': 'MedicalAudience',
						audienceType: 'healthcare professionals',
					},
				}}
			/>

			<div className="mx-auto max-w-3xl px-4">
				<Link to="/artigos" className="text-sm text-primary hover:underline">
					← Todos os artigos
				</Link>

				<TextoClinico conteudo={artigo} comoPagina />

				<ResponsiveBanner adSlot="9004267172" style={{ margin: '32px 0' }} />
			</div>
		</>
	)
}

export default Artigo

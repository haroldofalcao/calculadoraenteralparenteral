import React from 'react'
import { Helmet } from 'react-helmet-async'
import StructuredData from './StructuredData.jsx'

const SEO = ({
	title = 'NutriCalc - Calculadora Nutricional Profissional | Enteral e Parenteral',
	description = 'NutriCalc - Calculadora especializada para cálculos nutricionais enterais e parenterais. Ferramenta profissional para nutricionistas e profissionais da saúde.',
	keywords = 'nutricalc, calculadora nutricional, nutrição enteral, nutrição parenteral, nutricionista, profissionais saúde, cálculos nutricionais',
	canonical = '',
	image = '/logo512.png',
	type = 'website',
	structuredDataType = 'WebApplication',
	structuredData = {},
}) => {
	const baseUrl = 'https://www.nutricalc.online'
	const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl
	const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`

	return (
		<>
			<Helmet>
				{/* Título e descrição básicos */}
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />

				{/* Canonical URL */}
				<link rel="canonical" href={fullCanonical} />

				{/* Open Graph para redes sociais */}
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={fullImage} />
				<meta property="og:url" content={fullCanonical} />
				<meta property="og:type" content={type} />
				<meta property="og:site_name" content="NutriCalc" />
				<meta property="og:locale" content="pt_BR" />

				{/* Twitter Cards */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={fullImage} />

				{/* Meta tags adicionais para SEO */}
				<meta
					name="robots"
					content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
				/>
				<meta
					name="googlebot"
					content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
				/>
				<meta
					name="bingbot"
					content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
				/>
				<meta name="author" content="NutriCalc" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				{/* Meta tags específicas para saúde */}
				<meta name="medical-device" content="false" />
				<meta name="medical-purpose" content="educational" />

				{/* Geo tags (opcional) */}
				<meta name="geo.region" content="BR" />
				<meta name="geo.country" content="Brazil" />

				{/* Referrer policy */}
				<meta name="referrer" content="no-referrer-when-downgrade" />
			</Helmet>

			<StructuredData
				type={structuredDataType}
				data={{
					name: title,
					description: description,
					url: fullCanonical,
					...structuredData,
				}}
			/>
		</>
	)
}

export default SEO

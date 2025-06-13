// Variantes de anúncios para uso em diferentes situações
import React from 'react'
import { useLocation } from 'react-router-dom'
import { isValidPageForAds } from '../utils/adSenseHelpers.js'
import { adSenseManager } from '../utils/adSenseManager.js'
import AdSense from './AdSense.jsx'

// Verificar se está em modo de desenvolvimento
const isDev = import.meta.env.DEV
const autoAdsEnabled = adSenseManager.areAutoAdsEnabled()
const showManualAdsInfo = isDev && !autoAdsEnabled

// Componente para banner responsivo
export const ResponsiveBanner = ({
	adSlot,
	style = {},
	requireContent = true,
}) => {
	const location = useLocation()

	// Não exibir em páginas inadequadas
	if (!isValidPageForAds(location.pathname)) {
		return null
	}

	return (
		<div
			className="ad-container"
			style={{
				textAlign: 'center',
				margin: '20px 0',
				position: 'relative',
				...style,
			}}
		>
			{showManualAdsInfo && (
				<div
					style={{
						position: 'absolute',
						top: '-20px',
						left: '0',
						right: '0',
						fontSize: '10px',
						backgroundColor: '#ebf3ff',
						padding: '2px',
						color: '#0066cc',
						borderRadius: '2px',
					}}
				>
					Anúncios automáticos desativados - apenas manual
				</div>
			)}
			<AdSense
				adSlot={adSlot}
				requireContent={requireContent}
				adStyle={{
					display: 'block',
					width: '100%',
					maxWidth: '100%',
					height: 'auto',
					minHeight: '90px',
				}}
			/>
		</div>
	)
}

// Componente para anúncio lateral
export const SidebarAd = ({ adSlot, style = {}, requireContent = true }) => {
	const location = useLocation()

	if (!isValidPageForAds(location.pathname)) {
		return null
	}

	return (
		<div
			className="ad-container"
			style={{ margin: '20px 0', position: 'relative', ...style }}
		>
			{showManualAdsInfo && (
				<div
					style={{
						position: 'absolute',
						top: '-20px',
						left: '0',
						right: '0',
						fontSize: '10px',
						backgroundColor: '#ebf3ff',
						padding: '2px',
						color: '#0066cc',
						borderRadius: '2px',
					}}
				>
					Anúncios automáticos desativados - apenas manual
				</div>
			)}
			<AdSense
				adSlot={adSlot}
				requireContent={requireContent}
				adStyle={{
					display: 'block',
					maxWidth: '100%',
					width: '100%',
					minHeight: '250px',
				}}
				adFormat="rectangle"
			/>
		</div>
	)
}

// Componente para anúncio in-feed
export const InFeedAd = ({
	adSlot,
	style = {},
	showLabel = true,
	variant = 'default',
	requireContent = true,
}) => {
	const location = useLocation()

	if (!isValidPageForAds(location.pathname)) {
		return null
	}

	const getContainerStyle = () => {
		const baseStyle = {
			margin: '40px auto',
			maxWidth: '100%',
			width: '100%',
			textAlign: 'center',
			position: 'relative',
			boxSizing: 'border-box',
			...style,
		}

		switch (variant) {
			case 'minimal':
				return {
					...baseStyle,
					padding: '15px',
					backgroundColor: 'transparent',
				}
			case 'bordered':
				return {
					...baseStyle,
					padding: '20px',
					backgroundColor: '#ffffff',
					borderRadius: '12px',
					border: '2px solid #dee2e6',
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
				}
			case 'seamless':
				return {
					...baseStyle,
					padding: '30px 20px',
					backgroundColor: '#f8f9fa',
					borderRadius: '8px',
					border: '1px solid #e9ecef',
				}
			default:
				return {
					...baseStyle,
					padding: '20px',
					backgroundColor: '#f8f9fa',
					borderRadius: '8px',
					border: '1px solid #e9ecef',
				}
		}
	}

	return (
		<div style={getContainerStyle()} className="ad-container">
			{/* Label de compliance */}
			{showLabel && (
				<div
					style={{
						fontSize: '12px',
						color: '#6c757d',
						marginBottom: '10px',
						fontFamily: 'Arial, sans-serif',
						opacity: 0.8,
					}}
				>
					Publicidade
				</div>
			)}

			<AdSense
				adSlot={adSlot}
				requireContent={requireContent}
				adStyle={{
					display: 'block',
					minHeight: '120px',
					width: '100%',
					maxWidth: '100%',
				}}
				adFormat="fluid"
			/>

			{/* Indicação de anúncios manuais, visível apenas em desenvolvimento */}
			{showManualAdsInfo && (
				<div
					style={{
						marginTop: '10px',
						fontSize: '12px',
						color: '#dc3545',
						fontWeight: 'bold',
					}}
				>
					Atenção: Apenas anúncios manuais estão funcionando neste momento.
				</div>
			)}
		</div>
	)
}

// Componente especializado para anúncio após resultados
export const ResultsAd = ({ adSlot, style = {} }) => {
	const location = useLocation()

	if (!isValidPageForAds(location.pathname)) {
		return null
	}

	return (
		<InFeedAd
			adSlot={adSlot}
			variant="bordered"
			requireContent={true} // Sempre requer conteúdo para anúncios de resultado
			style={{
				marginTop: '50px',
				marginBottom: '30px',
				...style,
			}}
		/>
	)
}

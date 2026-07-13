// Componente principal para renderização de anúncios AdSense
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { hasValidContent, isValidPageForAds } from '../utils/adSenseHelpers.js'
import { adSenseManager } from '../utils/adSenseManager.js'
import { policyGuard } from '../utils/adSensePolicyGuard.js'

// Verificar se os anúncios automáticos estão desativados
const autoAdsEnabled = adSenseManager.areAutoAdsEnabled()
console.log(
	`Status de anúncios automáticos: ${autoAdsEnabled ? 'ATIVADOS' : 'DESATIVADOS'}`,
)

// Placeholder para desenvolvimento
const AdPlaceholder = ({ adStyle, adFormat, children }) => {
	const isDev = import.meta.env.DEV

	if (!isDev) return children

	const getPlaceholderStyle = () => {
		const baseStyle = {
			backgroundColor: '#f0f0f0',
			border: '2px dashed #ccc',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: '#666',
			fontFamily: 'Arial, sans-serif',
			fontSize: '14px',
			fontWeight: 'bold',
			textAlign: 'center',
			padding: '20px',
			boxSizing: 'border-box',
			maxWidth: '100%',
			width: '100%',
			...adStyle,
		}

		// Ajustar altura baseado no formato do anúncio
		if (adFormat === 'rectangle') {
			baseStyle.minHeight = '250px'
			baseStyle.maxWidth = '300px'
			baseStyle.margin = '0 auto'
		} else if (adStyle?.height) {
			baseStyle.minHeight = adStyle.height
		} else {
			baseStyle.minHeight = '90px'
		}

		return baseStyle
	}

	return (
		<div style={getPlaceholderStyle()}>
			📢 AdSense Preview
			<br />
			<small style={{ opacity: 0.7, marginTop: '5px', display: 'block' }}>
				{adFormat || 'auto'} format
			</small>
		</div>
	)
}

const AdSense = ({
	adClient = 'ca-pub-2235031118321497',
	adSlot,
	adStyle = { display: 'block' },
	adFormat = 'auto',
	fullWidthResponsive = true,
	adLayoutKey,
	className = 'adsbygoogle',
	requireContent = true, // Nova prop para controlar se deve verificar conteúdo
}) => {
	const adRef = useRef(null)
	const location = useLocation()
	const [contentReady, setContentReady] = useState(false)
	const [policyCompliant, setPolicyCompliant] = useState(false)

	// Verificar se a página é válida para anúncios
	const pageValidForAds = isValidPageForAds(location.pathname)

	useEffect(() => {
		// Só carregar em produção e em páginas válidas
		if (import.meta.env.DEV || !pageValidForAds) return

		// Integrar com o policy guard
		const handlePolicyChange = (validation) => {
			setPolicyCompliant(validation.isValid)
			if (!validation.isValid) {
				console.log(
					'🚫 Anúncio bloqueado por violação de política:',
					validation.issues,
				)
			}
		}

		// Registrar callback
		policyGuard.onViolation(handlePolicyChange)

		// Verificar status atual
		const currentStatus = policyGuard.getStatus()
		if (currentStatus.lastValidation) {
			setPolicyCompliant(currentStatus.lastValidation.isValid)
		}

		if (requireContent) {
			// Aguardar o conteúdo estar pronto com retry mais agressivo
			const checkContent = () => {
				const hasContent = hasValidContent()
				const policyCheck = policyGuard.forceValidation()

				if (hasContent && policyCheck.isValid) {
					setContentReady(true)
					setPolicyCompliant(true)
					console.log('✅ Conteúdo e política validados - liberando anúncios')
				} else {
					console.log(
						`⏳ Aguardando conteúdo: ${hasContent ? 'OK' : 'FALHA'} | Política: ${policyCheck.isValid ? 'OK' : 'FALHA'}`,
					)
					// Verificar novamente após um tempo menor
					setTimeout(checkContent, 1000)
				}
			}

			// Aguardar menos tempo antes de começar a verificar
			const initialDelay = setTimeout(checkContent, 1500)
			return () => clearTimeout(initialDelay)
		} else {
			// Se não requer verificação de conteúdo, ainda verificar políticas
			const policyCheck = policyGuard.forceValidation()
			setContentReady(true)
			setPolicyCompliant(policyCheck.isValid)
		}
	}, [location.pathname, requireContent, pageValidForAds])

	useEffect(() => {
		// Só carregar anúncio quando estiver pronto, em compliance e em produção
		if (
			import.meta.env.DEV ||
			!pageValidForAds ||
			!contentReady ||
			!policyCompliant
		)
			return

		// Verificar se a página está bloqueada
		if (document.body.hasAttribute('data-ads-blocked')) {
			console.log('🚫 Anúncios bloqueados pela política')
			return
		}

		const timer = setTimeout(() => {
			if (adRef.current && adSlot) {
				// Verificação final antes de carregar
				const finalCheck = policyGuard.forceValidation()
				if (finalCheck.isValid) {
					adSenseManager.loadAd(adRef.current, adSlot)
				} else {
					console.log('🚫 Verificação final falhou:', finalCheck.issues)
				}
			}
		}, 1000)

		return () => clearTimeout(timer)
	}, [adSlot, contentReady, policyCompliant, pageValidForAds])

	// Não renderizar se não for uma página válida para anúncios ou não estiver em compliance
	if (!pageValidForAds || (import.meta.env.PROD && !policyCompliant)) {
		return null
	}

	const adElement = (
		<ins
			ref={adRef}
			className={className}
			style={adStyle}
			data-ad-client={adClient}
			data-ad-slot={adSlot}
			data-ad-format={adFormat}
			data-ad-layout-key={adLayoutKey}
			{...(adFormat !== 'fluid'
				? { 'data-full-width-responsive': fullWidthResponsive }
				: {})}
		/>
	)

	return (
		<AdPlaceholder adStyle={adStyle} adFormat={adFormat}>
			{adElement}
		</AdPlaceholder>
	)
}

export default AdSense

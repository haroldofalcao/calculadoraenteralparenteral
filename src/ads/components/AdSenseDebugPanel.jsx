// Componente de debug para monitorar status dos anúncios AdSense
import React, { useEffect, useState } from 'react'
import { Badge, Card, Button } from 'react-bootstrap'
import { policyGuard } from '../utils/adSensePolicyGuard.js'
import { adSenseManager } from '../utils/adSenseManager.js'
import { hasValidContent } from '../utils/adSenseHelpers.js'

const AdSenseDebugPanel = ({ show = false }) => {
	const [status, setStatus] = useState({
		hasValidContent: false,
		policyStatus: null,
		adSenseStatus: null,
		skeletonCount: 0,
		pageLoadTime: 0,
		contentLength: 0,
	})

	const [showPanel, setShowPanel] = useState(show)

	useEffect(() => {
		if (!showPanel) return

		const updateStatus = () => {
			const mainContent = document.querySelector('main')
			const textContent = mainContent?.innerText || ''
			const contentLength = textContent.replace(/\s+/g, ' ').trim().length

			const skeletonElements = document.querySelectorAll(
				'.placeholder, .spinner-border, .content-skeleton, .loading, .skeleton',
			)

			const visibleSkeletons = Array.from(skeletonElements).filter(el => {
				const style = window.getComputedStyle(el)
				return style.display !== 'none' && style.visibility !== 'hidden'
			})

			setStatus({
				hasValidContent: hasValidContent(),
				policyStatus: policyGuard.getStatus(),
				adSenseStatus: adSenseManager.getStatus(),
				skeletonCount: visibleSkeletons.length,
				pageLoadTime: Math.round(performance.now()),
				contentLength,
			})
		}

		// Atualizar status imediatamente e a cada 2 segundos
		updateStatus()
		const interval = setInterval(updateStatus, 2000)

		return () => clearInterval(interval)
	}, [showPanel])

	// Só mostrar em desenvolvimento ou quando forçado
	if (!import.meta.env.DEV && !show) {
		return null
	}

	if (!showPanel) {
		return (
			<div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 9999 }}>
				<Button
					size="sm"
					variant="outline-primary"
					onClick={() => setShowPanel(true)}
				>
					📊 AdSense Debug
				</Button>
			</div>
		)
	}

	return (
		<div
			style={{
				position: 'fixed',
				top: '10px',
				right: '10px',
				width: '350px',
				zIndex: 9999,
				maxHeight: '80vh',
				overflowY: 'auto',
			}}
		>
			<Card className="shadow">
				<Card.Header className="d-flex justify-content-between align-items-center">
					<strong>🛡️ AdSense Debug Panel</strong>
					<Button
						size="sm"
						variant="outline-secondary"
						onClick={() => setShowPanel(false)}
					>
						✕
					</Button>
				</Card.Header>
				<Card.Body>
					<div className="mb-3">
						<strong>📄 Conteúdo:</strong>
						<br />
						<Badge bg={status.hasValidContent ? 'success' : 'danger'}>
							{status.hasValidContent ? 'VÁLIDO' : 'INVÁLIDO'}
						</Badge>
						<br />
						<small>
							{status.contentLength} caracteres | {status.pageLoadTime}ms carregado
						</small>
					</div>

					<div className="mb-3">
						<strong>🎭 Skeletons:</strong>
						<br />
						<Badge bg={status.skeletonCount === 0 ? 'success' : 'warning'}>
							{status.skeletonCount} visíveis
						</Badge>
					</div>

					<div className="mb-3">
						<strong>🛡️ Policy Guard:</strong>
						<br />
						<Badge
							bg={
								status.policyStatus?.lastValidation?.isValid
									? 'success'
									: 'danger'
							}
						>
							{status.policyStatus?.isMonitoring ? 'ATIVO' : 'INATIVO'}
						</Badge>
						<br />
						<small>
							Última validação:{' '}
							{status.policyStatus?.lastValidation?.isValid ? '✅' : '❌'}
						</small>
					</div>

					<div className="mb-3">
						<strong>📺 AdSense Manager:</strong>
						<br />
						<Badge
							bg={
								status.adSenseStatus?.autoAdsInitialized ? 'success' : 'warning'
							}
						>
							{status.adSenseStatus?.autoAdsInitialized
								? 'INICIALIZADO'
								: 'PENDENTE'}
						</Badge>
						<br />
						<small>
							Anúncios carregados: {status.adSenseStatus?.loadedAdsCount || 0}
						</small>
					</div>

					<div className="d-grid gap-2">
						<Button
							size="sm"
							variant="outline-primary"
							onClick={() => {
								const result = policyGuard.forceValidation()
								console.log('🔍 Validação forçada:', result)
							}}
						>
							🔄 Forçar Validação
						</Button>
						<Button
							size="sm"
							variant="outline-info"
							onClick={() => {
								console.log('📊 Status completo:', {
									contentValid: hasValidContent(),
									policyGuard: policyGuard.getStatus(),
									adSenseManager: adSenseManager.getStatus(),
								})
							}}
						>
							📋 Log Status
						</Button>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

export default AdSenseDebugPanel

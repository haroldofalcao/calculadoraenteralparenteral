// Componente de debug para monitorar status dos anúncios AdSense (apenas DEV)
import React, { useEffect, useState } from 'react'
import { policyGuard } from '../utils/adSensePolicyGuard.js'
import { adSenseManager } from '../utils/adSenseManager.js'
import { hasValidContent } from '../utils/adSenseHelpers.js'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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

			const visibleSkeletons = Array.from(skeletonElements).filter((el) => {
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

		updateStatus()
		const interval = setInterval(updateStatus, 2000)
		return () => clearInterval(interval)
	}, [showPanel])

	if (!import.meta.env.DEV && !show) return null

	if (!showPanel) {
		return (
			<div className="fixed right-3 top-3 z-[9999]">
				<Button variant="outline" size="sm" onClick={() => setShowPanel(true)}>
					📊 AdSense Debug
				</Button>
			</div>
		)
	}

	const row = (label, ok, okText, badText, sub) => (
		<div className="space-y-1">
			<div className="text-sm font-medium">{label}</div>
			<Badge variant={ok ? 'success' : 'destructive'}>
				{ok ? okText : badText}
			</Badge>
			{sub && <div className="text-xs text-muted-foreground">{sub}</div>}
		</div>
	)

	return (
		<div className="fixed right-3 top-3 z-[9999] max-h-[80vh] w-[350px] overflow-y-auto">
			<Card className="shadow-lg">
				<CardHeader className="flex-row items-center justify-between space-y-0">
					<CardTitle className="text-sm">🛡️ AdSense Debug Panel</CardTitle>
					<Button
						variant="ghost"
						size="icon"
						className="size-7"
						onClick={() => setShowPanel(false)}
					>
						✕
					</Button>
				</CardHeader>
				<CardContent className="space-y-4">
					{row(
						'📄 Conteúdo',
						status.hasValidContent,
						'VÁLIDO',
						'INVÁLIDO',
						`${status.contentLength} caracteres | ${status.pageLoadTime}ms`,
					)}
					<div className="space-y-1">
						<div className="text-sm font-medium">🎭 Skeletons</div>
						<Badge variant={status.skeletonCount === 0 ? 'success' : 'warning'}>
							{status.skeletonCount} visíveis
						</Badge>
					</div>
					{row(
						'🛡️ Policy Guard',
						status.policyStatus?.isMonitoring,
						'ATIVO',
						'INATIVO',
						`Última validação: ${status.policyStatus?.lastValidation?.isValid ? '✅' : '❌'}`,
					)}
					{row(
						'📺 AdSense Manager',
						status.adSenseStatus?.autoAdsInitialized,
						'INICIALIZADO',
						'PENDENTE',
						`Anúncios carregados: ${status.adSenseStatus?.loadedAdsCount || 0}`,
					)}
					<div className="grid gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								const result = policyGuard.forceValidation()
								console.log('🔍 Validação forçada:', result)
							}}
						>
							🔄 Forçar Validação
						</Button>
						<Button
							variant="outline"
							size="sm"
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
				</CardContent>
			</Card>
		</div>
	)
}

export default AdSenseDebugPanel

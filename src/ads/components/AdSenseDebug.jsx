// Hooks e componentes de debugging para AdSense
import React from 'react'
import { useEffect, useState } from 'react'
import { policyGuard } from '../utils/adSensePolicyGuard.js'

/**
 * Hook para verificar compliance em tempo real
 */
export const useAdSenseCompliance = () => {
	const [isCompliant, setIsCompliant] = useState(false)
	const [validation, setValidation] = useState(null)

	useEffect(() => {
		let mounted = true

		const checkCompliance = () => {
			if (!mounted) return

			const result = policyGuard.forceValidation()
			setValidation(result)
			setIsCompliant(result.isValid)
		}

		// Verificação inicial
		checkCompliance()

		// Registrar callback
		const handlePolicyChange = (policyValidation) => {
			if (mounted) {
				setValidation(policyValidation)
				setIsCompliant(policyValidation.isValid)
			}
		}

		policyGuard.onViolation(handlePolicyChange)

		return () => {
			mounted = false
		}
	}, [])

	return {
		isCompliant,
		validation,
		forceCheck: () => policyGuard.forceValidation(),
	}
}

/**
 * Componente para exibir status de compliance (debug)
 */
export const AdSenseComplianceIndicator = () => {
	const { isCompliant, validation } = useAdSenseCompliance()

	if (import.meta.env.PROD) return null

	return (
		<div
			style={{
				position: 'fixed',
				top: '100px',
				right: '10px',
				padding: '8px 12px',
				backgroundColor: isCompliant ? '#d4edda' : '#f8d7da',
				border: `1px solid ${isCompliant ? '#c3e6cb' : '#f5c6cb'}`,
				borderRadius: '4px',
				fontSize: '12px',
				zIndex: 9999,
				maxWidth: '300px',
			}}
		>
			<div
				style={{
					color: isCompliant ? '#155724' : '#721c24',
					fontWeight: 'bold',
				}}
			>
				{isCompliant ? '✅ AdSense OK' : '❌ AdSense Blocked'}
			</div>
			{validation?.issues && validation.issues.length > 0 && (
				<div
					style={{
						marginTop: '4px',
						fontSize: '11px',
						color: '#721c24',
					}}
				>
					{validation.issues.slice(0, 2).map((issue, index) => (
						<div key={index}>• {issue}</div>
					))}
				</div>
			)}
		</div>
	)
}

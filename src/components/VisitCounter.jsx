import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import useViewCounter from '../hooks/useViewCounter' // Verifique se o caminho para o hook está correto
import './VisitCounter.css' // CSS para animações e o skeleton

const VisitCounter = ({
	pageId = 'home',
	autoIncrement = true,
	cooldownSeconds = 3600,
}) => {
	// 1. Hook para buscar os dados do Firebase
	const { count, loading, error } = useViewCounter(pageId, {
		autoIncrement,
		cooldownSeconds,
	})

	// 2. Estados para controlar a exibição e a animação
	const [displayCount, setDisplayCount] = useState(0)
	const [isAnimating, setIsAnimating] = useState(false)

	// 3. Efeito que "assiste" a mudanças no `count` vindo do hook
	useEffect(() => {
		// Apenas atualiza e anima se o `count` for um número válido e diferente do que já está na tela
		if (typeof count === 'number' && count !== displayCount) {
			setDisplayCount(count) // Atualiza o número a ser exibido
			setIsAnimating(true) // Ativa a classe CSS de animação

			// Remove a classe de animação após 600ms para que possa ser reativada em futuras atualizações
			const timer = setTimeout(() => {
				setIsAnimating(false)
			}, 600)

			// Limpa o timer caso o componente seja desmontado
			return () => clearTimeout(timer)
		}
	}, [count, displayCount]) // Roda sempre que `count` ou `displayCount` mudar

	// 4. Função auxiliar para formatar números grandes
	const formatNumber = (num) => {
		if (num === null || typeof num === 'undefined') return '0'
		if (num >= 1_000_000) {
			return (num / 1_000_000).toFixed(1).replace('.0', '') + 'M'
		}
		if (num >= 1_000) {
			return (num / 1_000).toFixed(1).replace('.0', '') + 'K'
		}
		return num.toString()
	}

	// 5. Renderização do componente
	return (
		<div className="flex items-center justify-center py-2">
			<div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm">
				<Eye className="size-4 text-primary" />
				<span className="text-sm text-muted-foreground">Total de visitas</span>
				<span
					className={`counter-value min-w-8 text-center text-lg font-bold tabular-nums text-foreground ${isAnimating ? 'number-increment' : ''}`}
					aria-live="polite"
				>
					{loading && count === null ? (
						<span className="skeleton-number" aria-hidden="true"></span>
					) : (
						formatNumber(displayCount)
					)}
				</span>
				{error && (
					<span className="text-xs text-destructive">erro ao carregar</span>
				)}
			</div>
		</div>
	)
}

export default VisitCounter

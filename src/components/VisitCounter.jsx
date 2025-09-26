import { Eye, TrendingUp } from 'lucide-react'
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
		<div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
			<div className="text-center">
				{/* Cabeçalho */}
				<div className="mb-5">
					<div className="d-flex align-items-center justify-content-center gap-2 mb-3">
						<TrendingUp size={32} className="text-primary" />
						<h1 className="fw-bold display-5">Contador de Visitas</h1>
					</div>
					<p className="text-muted fs-5">
						Acompanhe o número de visitantes em tempo real
					</p>
				</div>

				{/* Card do Contador */}
				<div
					className="card shadow-sm border-0"
					style={{ maxWidth: '400px', margin: '0 auto' }}
				>
					<div className="card-body p-4 p-md-5">
						<div className="d-flex align-items-center justify-content-center gap-3 mb-4">
							<Eye size={24} className="text-primary" />
							<span className="fs-5 text-muted">Total de Visitas</span>
						</div>

						{/* Contador Principal com Animação */}
						<div
							className={`display-2 fw-bolder my-3 counter-value ${isAnimating ? 'number-increment' : ''}`}
							aria-live="polite"
							style={{ minHeight: '3.5rem' }}
						>
							{/* Mostra um esqueleto de carregamento enquanto busca o dado inicial */}
							{loading && count === null ? (
								<span className="skeleton-number" aria-hidden="true"></span>
							) : (
								formatNumber(displayCount)
							)}
						</div>

						{/* Status de Carregamento ou Erro */}
						<div className="mt-3 text-center" style={{ minHeight: '1.25rem' }}>
							{loading && <div className="text-muted small">Carregando...</div>}
							{error && (
								<div className="text-danger small">Erro ao carregar dados.</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VisitCounter

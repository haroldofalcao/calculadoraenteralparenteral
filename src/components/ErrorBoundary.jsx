import React, { Component } from 'react'

class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error }
	}

	componentDidCatch(error, errorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="mx-auto max-w-2xl px-4 py-16">
						<div
							role="alert"
							className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm"
						>
							<h4 className="font-semibold tracking-tight text-destructive">
								Oops! Algo deu errado
							</h4>
							<p className="mt-2 text-muted-foreground">
								Ocorreu um erro inesperado. Por favor, recarregue a página ou tente novamente.
							</p>
							<div className="mt-4">
								<button
									className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/40 outline-none"
									onClick={() => window.location.reload()}
								>
									Recarregar Página
								</button>
							</div>
						</div>
					</div>
				)
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary

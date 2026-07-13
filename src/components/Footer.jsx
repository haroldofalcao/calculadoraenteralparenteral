import React from 'react'

const Footer = () => {
	return (
		<footer className="mt-auto border-t border-border bg-secondary/40">
			<div className="mx-auto max-w-6xl px-4 py-6">
				<p className="text-center text-xs text-muted-foreground">
					&copy; {new Date().getFullYear()} Calculadora Nutricional v.5{' '}
					<span className="text-muted-foreground/80">CC BY-NC-ND 4.0</span>
					<span className="mx-2 text-border">|</span>
					<a
						href="mailto:haroldofalcao@gmail.com"
						className="font-medium text-primary underline-offset-4 hover:underline"
					>
						Haroldo Falcão Ramos da Cunha
					</a>
				</p>
			</div>
		</footer>
	)
}

export default Footer

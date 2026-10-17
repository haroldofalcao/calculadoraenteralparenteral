import React from 'react'
import { Link } from 'react-router-dom'

const footerLinks = [
	{ to: '/sobre', label: 'Sobre' },
	{ to: '/artigos', label: 'Artigos' },
	{ to: '/privacidade', label: 'Privacidade' },
]

const Footer = () => {
	return (
		<footer className="mt-auto border-t border-border bg-secondary/40">
			<div className="mx-auto max-w-6xl px-4 py-6">
				<nav className="mb-3 flex justify-center gap-4 text-xs">
					{footerLinks.map((l) => (
						<Link
							key={l.to}
							to={l.to}
							className="font-medium text-muted-foreground hover:text-foreground"
						>
							{l.label}
						</Link>
					))}
				</nav>
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

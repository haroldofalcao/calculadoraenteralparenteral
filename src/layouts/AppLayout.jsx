import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Activity, Globe, Menu, X } from 'lucide-react'
import { AdSenseDebugPanel } from '../ads'
import ErrorBoundary from '../components/ErrorBoundary.jsx'
import Footer from '../components/Footer.jsx'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Toaster } from '@/components/ui/sonner'
import { AnimatePresence, motion } from '@/components/motion'
import { cn } from '@/lib/utils'
import { usePageTracking } from '../hooks/usePageTracking'

const navItemClass = ({ isActive }) =>
	cn(
		'rounded-md px-3 py-2 text-sm font-medium transition-colors',
		isActive
			? 'bg-secondary text-foreground'
			: 'text-muted-foreground hover:bg-accent hover:text-foreground',
	)

function AppLayout() {
	const { t, i18n } = useTranslation()
	const [menuOpen, setMenuOpen] = useState(false)
	const location = useLocation()

	usePageTracking()

	// Fechar menu mobile ao trocar de rota
	React.useEffect(() => {
		setMenuOpen(false)
	}, [location.pathname])

	const changeLanguage = (lng) => i18n.changeLanguage(lng)

	const links = [
		{ to: '/', label: t('navigation.home'), end: true },
		{ to: '/nenpt', label: t('navigation.nenpt') },
		{ to: '/nenpt/gerenciar-produtos', label: t('navigation.manageProducts') },
		{ to: '/gids', label: t('navigation.gids') },
	]

	const currentLang = i18n.language === 'pt-BR' ? '🇧🇷 PT' : '🇺🇸 EN'

	return (
		<div className="flex min-h-dvh flex-col bg-background">
			<header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
					<Link
						to="/"
						data-cy="logo"
						className="navbar-brand flex items-center gap-2.5 outline-none"
						aria-label="NutriCalc"
					>
						<span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
							<Activity className="size-5" strokeWidth={2.5} />
						</span>
						<span className="flex flex-col leading-none">
							<span className="text-base font-bold tracking-tight text-foreground">
								NutriCalc
							</span>
							<span className="mt-0.5 text-[10px] font-medium text-muted-foreground">
								CC BY-NC-ND 4.0
							</span>
						</span>
					</Link>

					<nav className="hidden items-center gap-1 md:flex">
						{links.map((l) => (
							<NavLink
								key={l.to}
								to={l.to}
								end={l.end}
								className={navItemClass}
							>
								{l.label}
							</NavLink>
						))}
					</nav>

					<div className="flex items-center gap-1.5">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="gap-1.5"
									aria-label="Idioma / Language"
								>
									<Globe className="size-4" />
									<span className="hidden sm:inline">{currentLang}</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => changeLanguage('pt-BR')}>
									🇧🇷 Português
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => changeLanguage('en')}>
									🇺🇸 English
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Button
							variant="ghost"
							size="icon"
							className="menu-toggle md:hidden"
							data-cy="menu-toggle"
							aria-label="Menu"
							aria-expanded={menuOpen}
							onClick={() => setMenuOpen((v) => !v)}
						>
							{menuOpen ? (
								<X className="size-5" />
							) : (
								<Menu className="size-5" />
							)}
						</Button>
					</div>
				</div>

				<AnimatePresence initial={false}>
					{menuOpen && (
						<motion.nav
							key="mobile-nav"
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
							className="overflow-hidden border-t border-border/70 bg-background md:hidden"
						>
							<div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
								{links.map((l) => (
									<NavLink
										key={l.to}
										to={l.to}
										end={l.end}
										className={({ isActive }) =>
											cn(
												'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
												isActive
													? 'bg-secondary text-foreground'
													: 'text-muted-foreground hover:bg-accent hover:text-foreground',
											)
										}
									>
										{l.label}
									</NavLink>
								))}
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</header>

			<main className="flex-1 py-6 sm:py-10">
				<ErrorBoundary>
					<Outlet />
				</ErrorBoundary>
			</main>

			<Footer />
			<Toaster />
			<AdSenseDebugPanel />
		</div>
	)
}

export default AppLayout

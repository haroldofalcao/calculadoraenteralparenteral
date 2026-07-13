import React from 'react'
import { cn } from '@/lib/utils'

/**
 * SidebarLayout — duas colunas para otimização de anúncios.
 *
 * @param {React.ReactNode} children - Conteúdo principal
 * @param {React.ReactNode} sidebar - Barra lateral (ex.: anúncio)
 * @param {boolean} reverse - Se true, sidebar à esquerda no desktop
 */
const SidebarLayout = ({ children, sidebar, reverse = false }) => {
	return (
		<div className="mx-auto max-w-6xl px-4">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
				<div
					className={cn('min-w-0 lg:col-span-8', reverse && 'lg:order-2')}
				>
					{children}
				</div>
				<aside
					className={cn('lg:col-span-4', reverse && 'lg:order-1')}
				>
					<div className="lg:sticky lg:top-20">{sidebar}</div>
				</aside>
			</div>
		</div>
	)
}

export default SidebarLayout

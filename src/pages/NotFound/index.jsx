import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '../../hooks/useAnalytics'

function NotFound() {
	const { t } = useTranslation()
	const { trackEvent } = useAnalytics()

	useEffect(() => {
		trackEvent('notfound_view', { page: 'notfound' })
	}, [trackEvent])

	return (
		<div
			data-no-ads="true"
			className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-4 py-20 text-center"
		>
			<p className="text-8xl font-bold tabular-nums text-muted-foreground/30">
				404
			</p>
			<h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
				{t('notFound.title')}
			</h1>
			<p className="mt-2 text-muted-foreground">{t('notFound.message')}</p>
			<Button asChild className="mt-6">
				<Link
					to="/"
					onClick={() =>
						trackEvent('notfound_back_home', { label: 'back_home' })
					}
				>
					<Home className="size-4" />
					{t('notFound.backHome')}
				</Link>
			</Button>
		</div>
	)
}

export default NotFound

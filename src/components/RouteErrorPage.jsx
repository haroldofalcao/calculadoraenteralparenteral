import React from 'react'
import { useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

function RouteErrorPage() {
	const error = useRouteError()
	const { t } = useTranslation()

	return (
		<div className="mx-auto max-w-2xl px-4 py-16" data-no-ads="true">
			<Alert variant="destructive">
				<TriangleAlert />
				<AlertTitle>{t('routeError.title')}</AlertTitle>
				<AlertDescription>
					<p>{t('routeError.message')}</p>
					<p className="italic">
						{error?.statusText ||
							error?.message ||
							t('routeError.unknownError')}
					</p>
				</AlertDescription>
			</Alert>
			<div className="mt-4">
				<Button onClick={() => window.history.back()}>
					{t('routeError.goBack')}
				</Button>
			</div>
		</div>
	)
}

export default RouteErrorPage

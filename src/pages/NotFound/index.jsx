import React from 'react'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAnalytics } from '../../hooks/useAnalytics'

function NotFound() {
	const { t } = useTranslation()
	const { trackEvent } = useAnalytics()

	useEffect(() => {
		trackEvent('notfound_view', { page: 'notfound' })
	}, [trackEvent])

	return (
		<Container data-no-ads="true">
			<Row className="justify-content-center text-center">
				<Col md={6}>
					<div className="py-5">
						<h1 className="display-1 text-muted">404</h1>
						<h2 className="mb-4">{t('notFound.title')}</h2>
						<p className="lead text-muted mb-4">{t('notFound.message')}</p>
						<Link
							to="/"
							className="btn btn-primary"
							onClick={() =>
								trackEvent('notfound_back_home', { label: 'back_home' })
							}
						>
							{t('notFound.backHome')}
						</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default NotFound

import React from 'react'
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'
import { AdSenseComplianceIndicator, AdSenseDebugPanel } from '../ads'
import ErrorBoundary from '../components/ErrorBoundary.jsx'
import Footer from '../components/Footer.jsx'

function AppLayout() {
	const { t, i18n } = useTranslation()

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng)
	}

	return (
		<div className="d-flex flex-column min-vh-100">
			<Navbar bg="primary" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand
						as={Link}
						to="/"
						className="text-wrap"
						style={{ textWrap: 'wrap' }}
					>
						{t('navigation.brand')}{' '}
						<small className="text-light">CC BY-NC-ND 4.0</small>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link as={Link} to="/">
								{t('navigation.home')}
							</Nav.Link>
							<Nav.Link as={Link} to="/nenpt">
								{t('navigation.nenpt')}
							</Nav.Link>
							<Nav.Link as={Link} to="/nenpt/gerenciar-produtos">
								{t('navigation.manageProducts')}
							</Nav.Link>
							<Nav.Link as={Link} to="/gids">
								{t('navigation.gids')}
							</Nav.Link>

							<Dropdown align="end">
								<Dropdown.Toggle
									variant="outline-light"
									size="sm"
									className="ms-2"
								>
									{i18n.language === 'pt-BR' ? '🇧🇷 PT' : '🇺🇸 EN'}
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item onClick={() => changeLanguage('pt-BR')}>
										🇧🇷 Português
									</Dropdown.Item>
									<Dropdown.Item onClick={() => changeLanguage('en')}>
										🇺🇸 English
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<main className="flex-grow-1 py-4">
				<ErrorBoundary>
					<Outlet />
				</ErrorBoundary>
			</main>

			<Footer />
			{/* <AdSenseComplianceIndicator /> */}
			<AdSenseDebugPanel />
		</div>
	)
}

export default AppLayout

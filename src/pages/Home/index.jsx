import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AdSenseCompliantPage, InFeedAd, ResponsiveBanner } from '../../ads'
import SEO from '../../components/SEO.jsx'

function Home() {
	const { t } = useTranslation()

	return (
		<>
			<SEO
				title="NutriCalc - Calculadoras Nutricionais Profissionais | Enteral e Parenteral"
				description="NutriCalc oferece calculadoras especializadas para cálculos nutricionais enterais e parenterais. Ferramenta profissional para nutricionistas e profissionais da saúde."
				canonical="/"
				keywords="calculadora nutricional, nutrição enteral, nutrição parenteral, nutricionista, profissionais saúde, cálculos nutricionais, terapia nutricional"
				structuredDataType="WebApplication"
				structuredData={{
					applicationCategory: 'HealthApplication',
					operatingSystem: 'Web Browser',
				}}
			/>
			<main>
				<Container>
					<Row className="justify-content-center">
						<Col md={10} lg={8}>
							<div className="text-center mb-5">
								<h1 className="display-4 text-primary mb-3">
									{t('home.title')}
								</h1>
								<p className="lead text-muted">{t('home.subtitle')}</p>
							</div>

							{/* Anúncio superior - configuração mais permissiva */}
							<AdSenseCompliantPage minContentLength={200} allowSkeletons={true} timeout={10000}>
								<ResponsiveBanner
									adSlot="home-top-banner"
									requireContent={false}
									style={{ marginBottom: '30px' }}
								/>
							</AdSenseCompliantPage>

							<Row className="g-4">
								<Col md={6}>
									<Card className="h-100 shadow-sm">
										<Card.Body className="d-flex flex-column">
											<Card.Title className="text-primary">
												<i className="fas fa-calculator me-2"></i>
												{t('home.nenpt.title')}
											</Card.Title>
											<Card.Text className="flex-grow-1">
												{t('home.nenpt.description')}
											</Card.Text>
											<div className="mt-auto">
												<Button
													as={Link}
													to="/nenpt"
													variant="primary"
													className="me-2"
												>
													{t('home.nenpt.accessCalculator')}
												</Button>
												<Button
													as={Link}
													to="/nenpt/gerenciar-produtos"
													variant="outline-primary"
												>
													{t('home.nenpt.manageProducts')}
												</Button>
											</div>
										</Card.Body>
									</Card>
								</Col>

								<Col md={6}>
									<Card className="h-100 shadow-sm">
										<Card.Body className="d-flex flex-column">
											<Card.Title className="text-success">
												<i className="fas fa-stethoscope me-2"></i>
												{t('home.gids.title')}
											</Card.Title>
											<Card.Text className="flex-grow-1">
												{t('home.gids.description')}
											</Card.Text>
											<div className="mt-auto">
												<Button as={Link} to="/gids" variant="success">
													{t('home.gids.access')}
												</Button>
											</div>
										</Card.Body>
									</Card>
								</Col>
							</Row>

							{/* Anúncio no meio do conteúdo - configuração mais permissiva */}
							<AdSenseCompliantPage minContentLength={300} allowSkeletons={true} timeout={10000}>
								<InFeedAd
									adSlot="home-middle-ad"
									requireContent={false}
									showLabel={true}
									style={{ margin: '40px 0' }}
								/>
							</AdSenseCompliantPage>

							<Row className="mt-5">
								<Col>
									<Card className="bg-light">
										<Card.Body>
											<Card.Title className="text-info">
												<i className="fas fa-info-circle me-2"></i>
												{t('home.about.title')}
											</Card.Title>
											<Card.Text>{t('home.about.description')}</Card.Text>

											{/* Conteúdo adicional para garantir densidade adequada */}
											<div className="mt-4">
												<h5>
													{t(
														'home.features.title',
														'Características principais:',
													)}
												</h5>
												<ul>
													<li>
														{t(
															'home.features.accurate',
															'Cálculos precisos e confiáveis',
														)}
													</li>
													<li>
														{t('home.features.easy', 'Interface fácil de usar')}
													</li>
													<li>
														{t(
															'home.features.professional',
															'Desenvolvido para profissionais de saúde',
														)}
													</li>
													<li>
														{t(
															'home.features.validated',
															'Baseado em protocolos validados',
														)}
													</li>
												</ul>
											</div>

											<small className="text-muted">
												<strong>{t('home.about.license')}</strong>
											</small>
										</Card.Body>
									</Card>
								</Col>
							</Row>

							{/* Anúncio no final da página - configuração mais permissiva */}
							<AdSenseCompliantPage minContentLength={400} allowSkeletons={true} timeout={8000}>
								<ResponsiveBanner
									adSlot="home-bottom-banner"
									requireContent={false}
									style={{ marginTop: '40px' }}
								/>
							</AdSenseCompliantPage>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	)
}

export default Home

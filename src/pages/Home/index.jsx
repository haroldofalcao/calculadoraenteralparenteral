import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AdSenseCompliantPage, InFeedAd, ResponsiveBanner } from '../../ads'
import SEO from '../../components/SEO.jsx'
import VisitCounter from '../../components/VisitCounter'
import { useAnalytics } from '../../hooks/useAnalytics'

function Home() {
	const { t } = useTranslation()
	const { trackEvent } = useAnalytics()

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
								<p className="lead text-muted mb-4">{t('home.subtitle')}</p>
								<div className="text-start mx-auto" style={{ maxWidth: '800px' }}>
									<p className="mb-3">
										{t(
											'home.intro.p1',
											'Bem-vindo ao NutriCalc, a plataforma de referência para cálculos nutricionais hospitalares. Nossa ferramenta foi desenvolvida para otimizar o fluxo de trabalho de nutricionistas, médicos e enfermeiros, oferecendo precisão matemática aliada a protocolos clínicos validados.',
										)}
									</p>
									<p>
										{t(
											'home.intro.p2',
											'Diferente de calculadoras genéricas, o NutriCalc foca nas especificidades da terapia nutricional enteral e parenteral, considerando fatores críticos como calorias não-nutricionais (propofol, citrato), ajustes para pacientes renais e metas proteicas individualizadas.',
										)}
									</p>
								</div>
							</div>

							{/* Anúncio superior - configuração mais permissiva */}
							<AdSenseCompliantPage
								minContentLength={200}
								allowSkeletons={true}
								timeout={10000}
							>
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
													onClick={() =>
														trackEvent('home_nenpt_acessar_calculadora', {
															origem: 'home',
														})
													}
												>
													{t('home.nenpt.accessCalculator')}
												</Button>
												<Button
													as={Link}
													to="/nenpt/gerenciar-produtos"
													variant="outline-primary"
													onClick={() =>
														trackEvent('home_nenpt_gerenciar_produtos', {
															origem: 'home',
														})
													}
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
												<Button
													as={Link}
													to="/gids"
													variant="success"
													onClick={() =>
														trackEvent('home_gids_acessar', { origem: 'home' })
													}
												>
													{t('home.gids.access')}
												</Button>
											</div>
										</Card.Body>
									</Card>
								</Col>
							</Row>

							{/* Anúncio no meio do conteúdo - configuração mais permissiva */}
							<AdSenseCompliantPage
								minContentLength={300}
								allowSkeletons={true}
								timeout={10000}
							>
								<InFeedAd
									adSlot="home-middle-ad"
									requireContent={false}
									showLabel={true}
									style={{ margin: '40px 0' }}
								/>
							</AdSenseCompliantPage>

							{/* Seção de Benefícios - AdSense Content Expansion */}
							<Row className="mt-5 mb-5">
								<Col md={12}>
									<h2 className="text-center mb-4 text-primary">
										{t('home.whyChoose.title', 'Por que escolher o NutriCalc?')}
									</h2>
								</Col>
								<Col md={4}>
									<div className="p-3 h-100">
										<h4 className="text-info h5">
											<i className="fas fa-check-circle me-2"></i>
											{t('home.whyChoose.precision.title', 'Precisão Clínica')}
										</h4>
										<p className="text-muted small">
											{t(
												'home.whyChoose.precision.desc',
												'Nossos algoritmos são calibrados com as diretrizes mais recentes (ASPEN/ESPEN). Garantimos que cada mililitro de propofol ou citrato seja contabilizado no balanço energético final.',
											)}
										</p>
									</div>
								</Col>
								<Col md={4}>
									<div className="p-3 h-100">
										<h4 className="text-info h5">
											<i className="fas fa-user-md me-2"></i>
											{t('home.whyChoose.professional.title', 'Foco Profissional')}
										</h4>
										<p className="text-muted small">
											{t(
												'home.whyChoose.professional.desc',
												'Ferramenta "Point-of-Care" ideal para uso à beira do leito. Interface limpa, rápida e responsiva, permitindo decisões ágeis durante rounds multidisciplinares.',
											)}
										</p>
									</div>
								</Col>
								<Col md={4}>
									<div className="p-3 h-100">
										<h4 className="text-info h5">
											<i className="fas fa-shield-alt me-2"></i>
											{t('home.whyChoose.safety.title', 'Segurança do Paciente')}
										</h4>
										<p className="text-muted small">
											{t(
												'home.whyChoose.safety.desc',
												'Alertas automáticos para inconsistências e validações de dados vitais previnem erros de prescrição e melhoram a segurança na terapia nutricional.',
											)}
										</p>
									</div>
								</Col>
							</Row>

							<Row className="mb-5">
								<Col>
									<Card className="bg-light border-0 shadow-sm">
										<Card.Body className="p-4">
											<Card.Title className="text-dark mb-3">
												<i className="fas fa-info-circle me-2"></i>
												{t('home.about.title')}
											</Card.Title>
											<Card.Text>{t('home.about.description')}</Card.Text>

											<div className="mt-4">
												<h5 className="h6 fw-bold">
													{t(
														'home.features.title',
														'Características principais:',
													)}
												</h5>
												<ul className="row">
													<li className="col-md-6 mb-2">
														{t(
															'home.features.accurate',
															'Cálculos precisos e confiáveis',
														)}
													</li>
													<li className="col-md-6 mb-2">
														{t('home.features.easy', 'Interface fácil de usar')}
													</li>
													<li className="col-md-6 mb-2">
														{t(
															'home.features.professional',
															'Desenvolvido para profissionais de saúde',
														)}
													</li>
													<li className="col-md-6 mb-2">
														{t(
															'home.features.validated',
															'Baseado em protocolos validados',
															'Baseado em protocolos validados',
														)}
													</li>
												</ul>
											</div>

											<div className="mt-3 pt-3 border-top">
												<small className="text-muted">
													<strong>{t('home.about.license')}</strong>
												</small>
											</div>
										</Card.Body>
									</Card>
								</Col>
							</Row>

							{/* Anúncio no final da página - configuração mais permissiva */}
							<AdSenseCompliantPage
								minContentLength={400}
								allowSkeletons={true}
								timeout={8000}
							>
								<ResponsiveBanner
									adSlot="home-bottom-banner"
									requireContent={false}
									style={{ marginTop: '40px' }}
								/>
							</AdSenseCompliantPage>

							{/* Visit Counter (Realtime) */}
							<div className="mt-4">
								<VisitCounter pageId="home" autoIncrement={true} />
							</div>
						</Col>
					</Row>
				</Container>
			</main>
		</>
	)
}

export default Home

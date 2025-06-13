import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useEffect } from 'react'
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Row,
	Tab,
	Table,
	Tabs,
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import {
	AdSenseCompliantPage,
	InFeedAd,
	ResponsiveBanner,
	ResultsAd,
} from '../../ads'

// Schema de validação
const gidsSchema = z.object({
	patientName: z.string().optional(),
	patientId: z.string().optional(),
	patientAge: z.number().optional(),
	admissionDate: z.string().optional(),

	// Sintomas básicos
	bowelSounds: z.boolean().default(false),
	vomiting: z.boolean().default(false),
	grv: z.boolean().default(false),
	ileus: z.boolean().default(false),
	distension: z.boolean().default(false),
	mildDiarrhea: z.boolean().default(false),
	bleedingNo: z.boolean().default(false),
	iap_12_20: z.boolean().default(false),
	noOral: z.boolean().default(false),

	// Sintomas graves
	severeDiarrhea: z.boolean().default(false),
	bleedingYes: z.boolean().default(false),
	prokinetics: z.boolean().default(false),
	iap_gt_20: z.boolean().default(false),

	// Condições ameaçadoras
	shock: z.boolean().default(false),
	ischemia: z.boolean().default(false),
	compartment: z.boolean().default(false),
})

function Gids() {
	const { t } = useTranslation()
	const [activeTab, setActiveTab] = useState('measurement')
	const [savedData, setSavedData] = useState(null)
	const [currentScore, setCurrentScore] = useState(0)
	const [currentClassification, setCurrentClassification] = useState('')

	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		// formState: { errors },
	} = useForm({
		resolver: zodResolver(gidsSchema),
		defaultValues: {
			bowelSounds: false,
			vomiting: false,
			grv: false,
			ileus: false,
			distension: false,
			mildDiarrhea: false,
			bleedingNo: false,
			iap_12_20: false,
			noOral: false,
			severeDiarrhea: false,
			bleedingYes: false,
			prokinetics: false,
			iap_gt_20: false,
			shock: false,
			ischemia: false,
			compartment: false,
		},
	})

	const watchedValues = watch()

	// Função para calcular o GIDS
	const calculateGIDS = (data) => {
		console.log('=== GIDS Calculation Debug ===')
		console.log('Input data:', data)

		// GIDS 4: Ameaça à vida (qualquer um dos sinais abaixo)
		if (data.shock || data.ischemia || data.compartment) {
			console.log('GIDS 4: Ameaça à vida detectada')
			return 4
		}

		// Contar sintomas de cada categoria
		// Sintomas que contribuem para GIDS 1 (coluna básica)
		let basicSymptoms = 0
		if (data.noOral) basicSymptoms++
		if (data.bowelSounds) basicSymptoms++
		if (data.vomiting) basicSymptoms++
		if (data.grv) basicSymptoms++
		if (data.ileus) basicSymptoms++
		if (data.distension) basicSymptoms++
		if (data.mildDiarrhea) basicSymptoms++
		if (data.bleedingNo) basicSymptoms++
		if (data.iap_12_20) basicSymptoms++

		// Sintomas específicos de GIDS 2 (disfunção GI)
		let dysfunctionSymptoms = 0
		if (data.severeDiarrhea) dysfunctionSymptoms++
		if (data.bleedingYes) dysfunctionSymptoms++
		if (data.prokinetics) dysfunctionSymptoms++
		if (data.iap_gt_20) dysfunctionSymptoms++

		// Sintomas que também contam para GIDS 3 (além dos de disfunção)
		let failureSymptoms = dysfunctionSymptoms
		if (data.ileus) failureSymptoms++
		if (data.distension) failureSymptoms++

		console.log('Contadores:', {
			basicSymptoms,
			dysfunctionSymptoms,
			failureSymptoms,
		})

		// GIDS 3: Falência GI (3 ou mais dos sintomas listados)
		if (failureSymptoms >= 3) {
			console.log('GIDS 3: Falência GI - failureSymptoms >= 3')
			return 3
		}

		// GIDS 2: Disfunção GI
		// - 1 ou mais sintomas específicos de disfunção OU
		// - 3 ou mais sintomas básicos
		if (dysfunctionSymptoms >= 1 || basicSymptoms >= 3) {
			console.log('GIDS 2: Disfunção GI', {
				dysfunctionCondition: dysfunctionSymptoms >= 1,
				basicCondition: basicSymptoms >= 3,
			})
			return 2
		}

		// GIDS 1: Risco aumentado
		// - 1 sintoma (se for "não via oral") OU
		// - 2 ou mais sintomas básicos
		if ((data.noOral && basicSymptoms === 1) || basicSymptoms >= 2) {
			console.log('GIDS 1: Risco aumentado', {
				noOralCondition: data.noOral && basicSymptoms === 1,
				basicCondition: basicSymptoms >= 2,
			})
			return 1
		}

		// GIDS 0: Sem risco (0-1 sintomas básicos, exceto quando é só "não via oral")
		console.log('GIDS 0: Sem risco')
		return 0
	}

	// Atualizar score em tempo real
	useEffect(() => {
		const score = calculateGIDS(watchedValues)
		setCurrentScore(score)
		setCurrentClassification(t(`gids.classifications.${score}`))

		// Debug para desenvolvimento
		console.log('GIDS Score atualizado:', {
			watchedValues,
			calculatedScore: score,
			classification: t(`gids.classifications.${score}`),
		})
	}, [watchedValues, t])

	const onSubmit = (data) => {
		const score = calculateGIDS(data)
		const measurementData = {
			...data,
			score,
			classification: t(`gids.classifications.${score}`),
			timestamp: new Date().toISOString(),
		}

		setSavedData(measurementData)
		localStorage.setItem('gidsData', JSON.stringify(measurementData))
		setActiveTab('summary')
	}

	const clearMeasurement = () => {
		reset()
		setSavedData(null)
		localStorage.removeItem('gidsData')
	}

	const exportReport = () => {
		if (!savedData) return

		const patientName = savedData.patientName || t('gids.export.unknownPatient')
		const now = new Date()
		const dateString = now.toISOString().split('T')[0]
		const filename = `${t('gids.export.filename')}_${patientName.replace(/[^a-zA-Z0-9]/g, '_')}_${dateString}.txt`

		let report = `${t('gids.title')} - ${patientName}\n\n`
		report += `${t('gids.patientData')}:\n`
		report += `${t('gids.patientName')}: ${savedData.patientName || '--'}\n`
		report += `${t('gids.patientId')}: ${savedData.patientId || '--'}\n`
		report += `${t('gids.patientAge')}: ${savedData.patientAge || '--'}\n`
		report += `${t('gids.measurementDate')}: ${savedData.admissionDate || '--'}\n\n`
		report += `${t('gids.score')}: ${savedData.score} - ${savedData.classification}\n\n`

		const blob = new Blob([report], { type: 'text/plain' })
		const a = document.createElement('a')
		a.href = URL.createObjectURL(blob)
		a.download = filename
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(a.href)
	}

	// Carregar dados salvos ao montar o componente
	useEffect(() => {
		const saved = localStorage.getItem('gidsData')
		if (saved) {
			const data = JSON.parse(saved)
			setSavedData(data)
			Object.keys(data).forEach((key) => {
				if (
					key !== 'score' &&
					key !== 'classification' &&
					key !== 'timestamp'
				) {
					setValue(key, data[key])
				}
			})
		}
	}, [setValue])

	const getScoreClass = (score) => {
		const classes = {
			0: 'bg-success text-white',
			1: 'bg-warning text-dark',
			2: 'bg-orange text-white',
			3: 'bg-danger text-white',
			4: 'bg-dark text-white',
		}
		return classes[score] || 'bg-secondary text-white'
	}

	// Função para obter detalhes do cálculo para exibição
	const getCalculationDetails = (data) => {
		if (!data) return null

		const basicSymptoms = [
			data.noOral && 'Não via oral',
			data.bowelSounds && 'Ruídos hidroaéreos diminuídos/ausentes',
			data.vomiting && 'Vômitos',
			data.grv && 'GRV > 500ml/6h',
			data.ileus && 'Íleo',
			data.distension && 'Distensão abdominal',
			data.mildDiarrhea && 'Diarreia leve',
			data.bleedingNo && 'Sangramento GI (sem hemodynamic instability)',
			data.iap_12_20 && 'PIA 12-20 mmHg',
		].filter(Boolean)

		const dysfunctionSymptoms = [
			data.severeDiarrhea && 'Diarreia grave (>1500ml/dia)',
			data.bleedingYes && 'Sangramento GI (com instabilidade hemodinâmica)',
			data.prokinetics && 'Necessidade de procinéticos',
			data.iap_gt_20 && 'PIA > 20 mmHg',
		].filter(Boolean)

		const lifeThreatening = [
			data.shock && 'Choque',
			data.ischemia && 'Isquemia GI',
			data.compartment && 'Síndrome compartimental abdominal',
		].filter(Boolean)

		return {
			basicSymptoms,
			dysfunctionSymptoms,
			lifeThreatening,
			basicCount: basicSymptoms.length,
			dysfunctionCount: dysfunctionSymptoms.length,
			lifeThreateningCount: lifeThreatening.length,
		}
	}

	return (
		<main>
			<Container>
				<Row className="justify-content-center">
					<Col md={10} lg={8}>
						{/* Header */}
						<Card className="mb-4">
							<Card.Header className="bg-primary text-white text-center">
								<h1 className="mb-0">
									{t('gids.title')} - {t('gids.subtitle')}
								</h1>
							</Card.Header>
							<Card.Body>
								<p className="mb-0 text-muted">
									{t(
										'gids.description',
										'Avaliação da síndrome de disfunção gastrointestinal em pacientes críticos. Esta ferramenta auxilia na classificação da gravidade dos sintomas gastrointestinais e no direcionamento do manejo clínico apropriado.',
									)}
								</p>
							</Card.Body>
						</Card>

						{/* Anúncio superior - só carrega se página estiver em compliance */}
						<AdSenseCompliantPage minContentLength={800}>
							<ResponsiveBanner
								adSlot="gids-top-banner"
								requireContent={true}
								style={{ marginBottom: '30px' }}
							/>
						</AdSenseCompliantPage>

						{/* Tabs */}
						<Tabs
							activeKey={activeTab}
							onSelect={(k) => setActiveTab(k)}
							className="mb-4"
						>
							<Tab eventKey="measurement" title={t('gids.currentMeasurement')}>
								<Form onSubmit={handleSubmit(onSubmit)} className="gids-form">
									{/* Dados do Paciente */}
									<Card className="mb-4">
										<Card.Body>
											<Card.Title className="text-primary mb-3">
												{t('gids.patientData')}
											</Card.Title>
											<Row className="g-3">
												<Col md={6}>
													<Form.Group>
														<Form.Label>{t('gids.patientName')}</Form.Label>
														<Form.Control
															type="text"
															{...register('patientName')}
															placeholder={t('gids.patientName')}
														/>
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>{t('gids.patientId')}</Form.Label>
														<Form.Control
															type="text"
															{...register('patientId')}
															placeholder={t('gids.patientId')}
														/>
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>{t('gids.patientAge')}</Form.Label>
														<Form.Control
															type="number"
															{...register('patientAge', {
																valueAsNumber: true,
															})}
															placeholder={t('gids.patientAge')}
														/>
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>{t('gids.measurementDate')}</Form.Label>
														<Form.Control
															type="date"
															{...register('admissionDate')}
														/>
													</Form.Group>
												</Col>
											</Row>
										</Card.Body>
									</Card>

									{/* Sintomas Básicos */}
									<Card className="mb-4">
										<Card.Body>
											<Card.Title className="text-info mb-3">
												{t('gids.basicSymptoms')}
											</Card.Title>
											<div className="gids-symptoms-section gids-basic-symptoms">
												{[
													'bowelSounds',
													'vomiting',
													'grv',
													'ileus',
													'distension',
													'mildDiarrhea',
													'bleedingNo',
													'iap_12_20',
													'noOral',
												].map((symptom) => (
													<Form.Check
														key={symptom}
														type="checkbox"
														id={symptom}
														label={t(`gids.symptoms.${symptom}`)}
														{...register(symptom)}
													/>
												))}
											</div>
										</Card.Body>
									</Card>

									{/* Sintomas Graves */}
									<Card className="mb-4">
										<Card.Body>
											<Card.Title className="text-warning mb-3">
												{t('gids.severeSymptoms')}
											</Card.Title>
											<div className="gids-symptoms-section gids-severe-symptoms">
												{[
													'severeDiarrhea',
													'bleedingYes',
													'prokinetics',
													'iap_gt_20',
												].map((symptom) => (
													<Form.Check
														key={symptom}
														type="checkbox"
														id={symptom}
														label={t(`gids.symptoms.${symptom}`)}
														{...register(symptom)}
													/>
												))}
											</div>
										</Card.Body>
									</Card>

									{/* Condições Ameaçadoras */}
									<Card className="mb-4">
										<Card.Body>
											<Card.Title className="text-danger mb-3">
												{t('gids.lifeThreatening')}
											</Card.Title>
											<div className="gids-symptoms-section gids-life-threatening">
												{['shock', 'ischemia', 'compartment'].map((symptom) => (
													<Form.Check
														key={symptom}
														type="checkbox"
														id={symptom}
														label={t(`gids.symptoms.${symptom}`)}
														{...register(symptom)}
													/>
												))}
											</div>
										</Card.Body>
									</Card>

									{/* Resultado */}
									<Card className="mb-4">
										<Card.Body className="text-center">
											<div
												className={`gids-score-display ${getScoreClass(currentScore)}`}
											>
												<h4 className="mb-0">
													{t('gids.score')}: {currentScore} -{' '}
													{currentClassification}
												</h4>
											</div>

											{/* Detalhes do cálculo em tempo real */}
											{(() => {
												const details = getCalculationDetails(watchedValues)
												if (!details) return null

												// Calcular scores para debug
												const basicCount = details.basicCount
												const dysfunctionCount = details.dysfunctionCount
												const lifeThreateningCount =
													details.lifeThreateningCount

												// Contar sintomas sobrepostos para GIDS 3
												let failureCount = dysfunctionCount
												if (watchedValues.ileus) failureCount++
												if (watchedValues.distension) failureCount++

												let calculationReason = ''
												if (lifeThreateningCount > 0) {
													calculationReason = t('gids.debug.gids4', {
														count: lifeThreateningCount,
													})
												} else if (failureCount >= 3) {
													calculationReason = t('gids.debug.gids3', {
														count: failureCount,
													})
												} else if (dysfunctionCount >= 1) {
													calculationReason = t('gids.debug.gids2Dysfunction', {
														count: dysfunctionCount,
													})
												} else if (basicCount >= 3) {
													calculationReason = t('gids.debug.gids2Basic', {
														count: basicCount,
													})
												} else if (basicCount >= 2) {
													calculationReason = t('gids.debug.gids1Basic', {
														count: basicCount,
													})
												} else if (watchedValues.noOral && basicCount === 1) {
													calculationReason = t('gids.debug.gids1NoOral')
												} else {
													calculationReason = t('gids.debug.gids0', {
														count: basicCount,
													})
												}

												return (
													<div className="mt-3 text-start">
														<small className="text-muted">
															<div>
																<strong>
																	{t('gids.debug.selectedSymptoms')}
																</strong>
															</div>
															{basicCount > 0 && (
																<div>
																	• {t('gids.debug.basicSymptoms')} {basicCount}
																</div>
															)}
															{dysfunctionCount > 0 && (
																<div>
																	• {t('gids.debug.dysfunctionSymptoms')}{' '}
																	{dysfunctionCount}
																</div>
															)}
															{failureCount > dysfunctionCount && (
																<div>
																	• {t('gids.debug.failureTotal')}{' '}
																	{failureCount}
																</div>
															)}
															{lifeThreateningCount > 0 && (
																<div>
																	• {t('gids.debug.lifeThreatening')}{' '}
																	{lifeThreateningCount}
																</div>
															)}
															<div className="mt-2 p-2 bg-light rounded">
																<strong>{t('gids.debug.calculation')}</strong>{' '}
																{calculationReason}
															</div>
														</small>
													</div>
												)
											})()}
										</Card.Body>
									</Card>

									{/* Anúncio após resultado - só aparece quando há cálculo válido */}
									{currentScore > 0 && (
										<AdSenseCompliantPage minContentLength={1000}>
											<ResultsAd
												adSlot="gids-results-ad"
												style={{ margin: '30px 0' }}
											/>
										</AdSenseCompliantPage>
									)}

									{/* Botões */}
									<div className="d-flex justify-content-between">
										<Button variant="secondary" onClick={clearMeasurement}>
											{t('gids.clearMeasurement')}
										</Button>
										<Button variant="primary" type="submit">
											{savedData
												? t('gids.measurementSaved')
												: t('gids.saveMeasurement')}
										</Button>
									</div>
								</Form>
							</Tab>

							<Tab eventKey="summary" title={t('gids.summary')}>
								<Card className="mb-4">
									<Card.Body>
										<Card.Title className="text-primary mb-3">
											{t('gids.patientData')}
										</Card.Title>
										<div>
											<strong>{t('gids.patientName')}:</strong>{' '}
											{savedData?.patientName || '--'}
											<br />
											<strong>{t('gids.patientId')}:</strong>{' '}
											{savedData?.patientId || '--'}
											<br />
											<strong>{t('gids.patientAge')}:</strong>{' '}
											{savedData?.patientAge || '--'}
											<br />
											<strong>{t('gids.measurementDate')}:</strong>{' '}
											{savedData?.admissionDate || '--'}
										</div>
									</Card.Body>
								</Card>

								<Card className="mb-4">
									<Card.Body>
										<Card.Title className="text-primary mb-3">
											{t('gids.score')}
										</Card.Title>
										<Table striped bordered hover>
											<thead>
												<tr>
													<th>{t('gids.summaryTable.measure')}</th>
													<th>{t('gids.summaryTable.score')}</th>
													<th>{t('gids.summaryTable.classification')}</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>{t('gids.summaryTable.singleMeasurement')}</td>
													<td>{savedData?.score || '--'}</td>
													<td>{savedData?.classification || '--'}</td>
												</tr>
											</tbody>
										</Table>
									</Card.Body>
								</Card>

								<Card className="mb-4">
									<Card.Body>
										<Card.Title className="text-primary mb-3">
											{t('gids.clinicalAnalysis')}
										</Card.Title>
										<div>
											{savedData ? (
												<>
													<p>
														<strong>{t('gids.analysis.title')}</strong>
													</p>
													<p>
														{t('gids.analysis.scoreDisplay', {
															score: savedData.score,
															classification: savedData.classification,
														})}
													</p>
													{savedData.score >= 2 ? (
														<p>
															{t('gids.analysis.highRiskRecommendation', {
																score: savedData.score,
																classification: savedData.classification,
															})}
														</p>
													) : (
														<p>
															{t('gids.analysis.lowRiskRecommendation', {
																score: savedData.score,
																classification: savedData.classification,
															})}
														</p>
													)}
												</>
											) : (
												<p>{t('gids.analysis.noDataMessage')}</p>
											)}
										</div>
									</Card.Body>
								</Card>

								<div className="text-center">
									<Button
										variant="primary"
										onClick={exportReport}
										disabled={!savedData}
									>
										{t('gids.exportReport')}
									</Button>
								</div>
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Container>
		</main>
	)
}

export default Gids

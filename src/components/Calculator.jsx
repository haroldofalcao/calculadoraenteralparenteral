import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import AdSenseCompliantPage from '../ads/components/AdSenseCompliantPage.jsx'
import {
	InFeedAd,
	ResponsiveBanner,
	ResultsAd,
} from '../ads/components/AdVariants.jsx'
import { useAnalytics } from '../hooks/useAnalytics'
import { calculatorSchema } from '../schemas/calculatorSchema'
import { allProductsAtom } from '../store/productsAtoms'
import { calculateResults } from '../utils/calculationUtils'
import SEO from './SEO.jsx'

const Calculator = () => {
	const { t } = useTranslation()
	const [allProducts] = useAtom(allProductsAtom)
	const [results, setResults] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const { trackEvent } = useAnalytics()

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(calculatorSchema),
		defaultValues: {
			weight: '',
			height: '',
			age: '',
			gender: 'masculino',
			calculationMethod: 'harris-benedict',
			kcalPerKg: '25',
			product: '',
			volume: '',
			infusionTime: '',
			proteinModule: '',
			otherModule: '',
		},
	})

	// Observar o método de cálculo para renderização condicional
	const calculationMethod = watch('calculationMethod')

	useEffect(() => {
		trackEvent('calculator_view', { page: 'nenpt' })
	}, [trackEvent])

	const onSubmit = (data) => {
		setLoading(true)

		// Encontrar o produto selecionado
		const selectedProduct = allProducts.find((p) => p.nome === data.product)

		trackEvent('calculator_submitted', {
			product: data.product || null,
			weight: data.weight || null,
			height: data.height || null,
			calculationMethod: data.calculationMethod || null,
		})

		if (!selectedProduct) {
			alert(t('nenpt.validation.invalidProduct'))
			setLoading(false)
			return
		}

		// Calcular resultados
		const calculatedResults = calculateResults(data, selectedProduct)
		setResults(calculatedResults)

		// Enviar evento de resultados mostrados
		trackEvent('calculator_results_shown', {
			totalCalories: calculatedResults.totalCalories,
			totalProtein: calculatedResults.totalProtein,
		})

		setLoading(false)
	}

	return (
		<main className="calculator">
			<Container>
				{/* Banner de topo - configuração mais permissiva para calculadoras */}
				<AdSenseCompliantPage
					minContentLength={50}
					allowSkeletons={true}
					timeout={5000}
				>
					<ResponsiveBanner
						adSlot="5804222918"
						requireContent={false}
						style={{ marginBottom: '30px' }}
					/>
				</AdSenseCompliantPage>

				<h1 className="mb-4 text-center">{t('nenpt.title')}</h1>

				<Alert variant="info" className="mb-4">
					<i className="bi bi-info-circle-fill me-2"></i>
					<strong>{t('common.warning')}:</strong> {t('nenpt.warning')}
				</Alert>
				<Form
					onSubmit={handleSubmit(onSubmit)}
					className="mb-5 p-4 shadow-sm rounded bg-light"
				>
					<h2 className="fs-5 mb-3 border-bottom pb-2">
						{t('nenpt.patientData')}
					</h2>
					<Row className="mb-3">
						<Col md={3}>
							<Form.Group>
								<Form.Label>{t('nenpt.weight')}</Form.Label>
								<Controller
									name="weight"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											step="0.1"
											isInvalid={!!errors.weight}
											{...field}
										/>
									)}
								/>
								{errors.weight && (
									<Form.Control.Feedback type="invalid">
										{errors.weight.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col md={3}>
							<Form.Group>
								<Form.Label>{t('nenpt.height')}</Form.Label>
								<Controller
									name="height"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											isInvalid={!!errors.height}
											{...field}
										/>
									)}
								/>
								{errors.height && (
									<Form.Control.Feedback type="invalid">
										{errors.height.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col md={3}>
							<Form.Group>
								<Form.Label>{t('nenpt.age')}</Form.Label>
								<Controller
									name="age"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											isInvalid={!!errors.age}
											{...field}
										/>
									)}
								/>
								{errors.age && (
									<Form.Control.Feedback type="invalid">
										{errors.age.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col md={3}>
							<Form.Group>
								<Form.Label>{t('nenpt.sex')}</Form.Label>
								<Controller
									name="gender"
									control={control}
									render={({ field }) => (
										<Form.Select isInvalid={!!errors.gender} {...field}>
											<option value="masculino">{t('nenpt.male')}</option>
											<option value="feminino">{t('nenpt.female')}</option>
										</Form.Select>
									)}
								/>
								{errors.gender && (
									<Form.Control.Feedback type="invalid">
										{errors.gender.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
					</Row>

					<h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">
						{t('nenpt.calculationMethod')}
					</h2>
					<Row className="mb-3">
						<Col md={6}>
							<Form.Group>
								<Form.Label>{t('nenpt.caloricMethod')}</Form.Label>
								<Controller
									name="calculationMethod"
									control={control}
									render={({ field }) => (
										<Form.Select
											isInvalid={!!errors.calculationMethod}
											{...field}
										>
											<option value="harris-benedict">
												{t('nenpt.harrisBenedict')}
											</option>
											<option value="pocket-formula">
												{t('nenpt.pocketFormula')}
											</option>
										</Form.Select>
									)}
								/>
								{errors.calculationMethod && (
									<Form.Control.Feedback type="invalid">
										{errors.calculationMethod.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col md={6}>
							{calculationMethod === 'pocket-formula' && (
								<Form.Group>
									<Form.Label>{t('nenpt.kcalPerKgDay')}</Form.Label>
									<Controller
										name="kcalPerKg"
										control={control}
										render={({ field }) => (
											<Form.Control
												type="number"
												min="0"
												step="0.1"
												isInvalid={!!errors.kcalPerKg}
												{...field}
											/>
										)}
									/>
									{errors.kcalPerKg && (
										<Form.Control.Feedback type="invalid">
											{errors.kcalPerKg.message}
										</Form.Control.Feedback>
									)}
								</Form.Group>
							)}
						</Col>
					</Row>

					{/* Anúncio no meio do formulário - discreto */}
					<AdSenseCompliantPage minContentLength={600}>
						<InFeedAd
							adSlot="1864977909"
							requireContent={true}
							showLabel={true}
							variant="subtle"
							style={{ margin: '30px 0' }}
						/>
					</AdSenseCompliantPage>

					<h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">
						{t('nenpt.formulaData')}
					</h2>
					<Row className="mb-3">
						<Col md={6}>
							<Form.Group>
								<Form.Label>{t('nenpt.formulaProduct')}</Form.Label>
								<Controller
									name="product"
									control={control}
									render={({ field }) => (
										<Form.Select
											isInvalid={!!errors.product}
											{...field}
											onChange={(e) => {
												field.onChange(e)
												const selected = allProducts.find(
													(p) => p.nome === e.target.value,
												)
												trackEvent('calculator_product_selected', {
													product: e.target.value,
													productExists: !!selected,
												})
											}}
										>
											<option value="">{t('nenpt.selectProduct')}</option>
											{allProducts.map((product, index) => (
												<option key={index} value={product.nome}>
													{product.nome}
												</option>
											))}
										</Form.Select>
									)}
								/>
								{errors.product && (
									<Form.Control.Feedback type="invalid">
										{errors.product.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group>
								<Form.Label>{t('nenpt.prescribedVolume')}</Form.Label>
								<Controller
									name="volume"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											isInvalid={!!errors.volume}
											{...field}
										/>
									)}
								/>
								{errors.volume && (
									<Form.Control.Feedback type="invalid">
										{errors.volume.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
					</Row>

					<h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">
						{t('nenpt.optionalData')}
					</h2>
					<Row className="mb-3">
						<Col md={4}>
							<Form.Group>
								<Form.Label>{t('nenpt.infusionTime')}</Form.Label>
								<Controller
									name="infusionTime"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											isInvalid={!!errors.infusionTime}
											{...field}
										/>
									)}
								/>
								{errors.infusionTime && (
									<Form.Control.Feedback type="invalid">
										{errors.infusionTime.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group>
								<Form.Label>{t('nenpt.proteinModule')}</Form.Label>
								<Controller
									name="proteinModule"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											isInvalid={!!errors.proteinModule}
											{...field}
										/>
									)}
								/>
								{errors.proteinModule && (
									<Form.Control.Feedback type="invalid">
										{errors.proteinModule.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group>
								<Form.Label>{t('nenpt.otherModule')}</Form.Label>
								<Controller
									name="otherModule"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											isInvalid={!!errors.otherModule}
											{...field}
										/>
									)}
								/>
								{errors.otherModule && (
									<Form.Control.Feedback type="invalid">
										{errors.otherModule.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
					</Row>

					<div className="d-grid gap-2 col-6 mx-auto mt-4">
						<Button variant="primary" type="submit" disabled={loading}>
							{loading ? t('common.loading') : t('nenpt.calculateButton')}
						</Button>
					</div>
				</Form>

				{results && (
					<div className="results-section mb-5">
						<h2 className="fs-4 mb-3">{t('nenpt.results.title')}</h2>
						<Row>
							{watch('weight') && watch('height') && (
								<Col md={4} className="mb-3">
									<Card>
										<Card.Body>
											{' '}
											<Card.Title className="text-muted fs-6">
												{t('nenpt.results.bmi')}
											</Card.Title>
											<Card.Text className="fs-4 text-primary">
												{results.imc.toFixed(1)} kg/m²
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							)}
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.caloricGoal')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.geb.toFixed(1)} kcal
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.caloriesProvided')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.totalCalories.toFixed(1)} kcal
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.proteinProvided')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.totalProtein.toFixed(1)} g
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.carbsProvided')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.totalCarbs.toFixed(1)} g
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.lipidsProvided')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.totalLipids.toFixed(1)} g
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row>
							{watch('weight') && (
								<>
									<Col md={4} className="mb-3">
										<Card>
											<Card.Body>
												<Card.Title className="text-muted fs-6">
													{t('nenpt.results.proteinPerKg')}
												</Card.Title>
												<Card.Text className="fs-4 text-primary">
													{results.proteinPerKg.toFixed(2)} g/kg
												</Card.Text>
											</Card.Body>
										</Card>
									</Col>
									<Col md={4} className="mb-3">
										<Card>
											<Card.Body>
												<Card.Title className="text-muted fs-6">
													{t('nenpt.results.caloriesPerKg')}
												</Card.Title>
												<Card.Text className="fs-4 text-primary">
													{results.caloriesPerKg.toFixed(1)} kcal/kg
												</Card.Text>
											</Card.Body>
										</Card>
									</Col>
								</>
							)}
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.volumePerHour')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.volumePerHour
												? `${results.volumePerHour.toFixed(1)} mL/h`
												: 'N/A'}
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.carbsDistribution')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.carbsPercentage.toFixed(1)}%
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.lipidsDistribution')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.lipidsPercentage.toFixed(1)}%
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.proteinDistribution')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.proteinPercentage.toFixed(1)}%
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</div>
				)}
				{/* Anúncio após os resultados - só quando há resultados válidos */}
				{results && (
					<AdSenseCompliantPage minContentLength={1200}>
						<ResultsAd adSlot="1864977909" />
					</AdSenseCompliantPage>
				)}

				{/* Seções Informativas - Após o conteúdo principal */}
				<div className="mb-4 mt-5">
					<h3 className="text-primary mb-4 text-center">
						Informações Sobre Terapia Nutricional
					</h3>

					{/* Importância da Terapia Nutricional */}
					<Card className="mb-3">
						<Card.Body>
							<h5 className="text-primary mb-3">
								{t('nenpt.clinicalImportance.title')}
							</h5>
							<p className="text-justify">
								{t('nenpt.clinicalImportance.content')}
							</p>
						</Card.Body>
					</Card>

					{/* Avaliação e Prescrição Nutricional */}
					<Card className="mb-3">
						<Card.Body>
							<h5 className="text-primary mb-3">
								{t('nenpt.nutritionalAssessment.title')}
							</h5>
							<p className="text-justify">
								{t('nenpt.nutritionalAssessment.content')}
							</p>
						</Card.Body>
					</Card>

					{/* Seção adicional para garantir conteúdo suficiente */}
					<Card className="mb-3">
						<Card.Body>
							<h5 className="text-primary mb-3">
								Protocolo de Segurança e Boas Práticas
							</h5>
							<p className="text-justify">
								A nutrição enteral e parenteral requer cuidados específicos e
								protocolos rigorosos de segurança. Esta calculadora foi
								desenvolvida seguindo diretrizes internacionais para auxiliar
								profissionais de saúde na prescrição nutricional adequada e
								segura para pacientes em diferentes estados clínicos.
							</p>
							<p className="text-justify">
								É fundamental sempre considerar o quadro clínico completo do
								paciente, incluindo função renal, hepática, cardiovascular e
								metabólica antes de implementar qualquer protocolo nutricional.
								A monitorização contínua e ajustes baseados na resposta clínica
								são essenciais para o sucesso terapêutico.
							</p>
						</Card.Body>
					</Card>

					<Card className="mb-3">
						<Card.Body>
							<h5 className="text-primary mb-3">
								Validação Científica e Referências
							</h5>
							<p className="text-justify">
								Os cálculos implementados nesta ferramenta são baseados em
								evidências científicas atuais e protocolos validados por
								sociedades médicas reconhecidas. Recomendamos sempre consultar
								as diretrizes mais recentes da ASPEN, ESPEN e outras
								organizações especializadas em nutrição clínica.
							</p>
						</Card.Body>
					</Card>
				</div>
			</Container>
		</main>
	)
}

export default Calculator

import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SidebarLayout from '../layouts/SidebarLayout'
import AdSenseCompliantPage from '../ads/components/AdSenseCompliantPage.jsx'
import {
	InFeedAd,
	ResponsiveBanner,
	ResultsAd,
	SidebarAd,
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
			product2: '',
			volume2: '',
			infusionTime: '',
			proteinModule: '',
			otherModule: '',
			citrato: false,
			propofol_ml: '',
			sg5_ml: '',
		},
	})

	// Observar o método de cálculo para renderização condicional
	const calculationMethod = watch('calculationMethod')

	useEffect(() => {
		trackEvent('calculator_view', { page: 'nenpt' })
	}, [trackEvent])

	const onSubmit = (data) => {
		setLoading(true)

		// Encontrar o produto selecionado (Fórmula 1)
		const selectedProduct1 = allProducts.find((p) => p.nome === data.product)

		// Encontrar o segundo produto se preenchido (Fórmula 2)
		const selectedProduct2 = data.product2
			? allProducts.find((p) => p.nome === data.product2)
			: null

		// Preparar dados de calorias não-nutricionais
		const nonNutritionalCals = {
			citrato: data.citrato || false,
			propofol_ml: data.propofol_ml || 0,
			sg5_ml: data.sg5_ml || 0,
		}

		trackEvent('calculator_submitted', {
			product: data.product || null,
			product2: data.product2 || null,
			weight: data.weight || null,
			height: data.height || null,
			calculationMethod: data.calculationMethod || null,
			hasSecondFormula: !!selectedProduct2,
			hasNonNutritional:
				nonNutritionalCals.citrato ||
				parseFloat(nonNutritionalCals.propofol_ml) > 0 ||
				parseFloat(nonNutritionalCals.sg5_ml) > 0,
		})

		if (!selectedProduct1) {
			alert(t('nenpt.validation.invalidProduct'))
			setLoading(false)
			return
		}

		// Calcular resultados com múltiplas fórmulas e calorias não-nutricionais
		const calculatedResults = calculateResults(
			data,
			selectedProduct1,
			selectedProduct2,
			nonNutritionalCals,
		)
		setResults(calculatedResults)

		// Enviar evento de resultados mostrados
		trackEvent('calculator_results_shown', {
			totalCalories: calculatedResults.totals.totalCalories,
			totalProtein: calculatedResults.totals.totalProtein,
			hasSecondFormula: !!selectedProduct2,
			hasNonNutritional:
				calculatedResults.nonNutritional.totalCalories > 0,
		})

		setLoading(false)
	}

	return (
		<main className="calculator">
			{/* Banner de topo removido - agora global no AppLayout */}
			<Container>
				<h1 className="mb-4 text-center">{t('nenpt.title')}</h1>
			</Container>

			<SidebarLayout
				sidebar={
					<div className="d-flex flex-column gap-4">
						{/* Anúncio Vertical na Sidebar */}
						<AdSenseCompliantPage minContentLength={100}>
							<SidebarAd
								adSlot="sidebar-calculator-right"
								style={{ minHeight: '600px' }}
							/>
						</AdSenseCompliantPage>

						{/* Widget: Produtos Populares (Exemplo para preencher espaço) */}
						<Card className="shadow-sm border-0 bg-light">
							<Card.Body>
								<h6 className="text-muted text-uppercase small fw-bold mb-3">
									Destaques
								</h6>
								<p className="small mb-0">
									Confira nossos guias e calculadoras especializadas para
									nutrição clínica.
								</p>
							</Card.Body>
						</Card>
					</div>
				}
			>


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

					{/* Segunda Fórmula (Suplementar) */}
					<h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">
						{t('nenpt.secondaryFormula')}{' '}
						<span className="text-muted fs-6">({t('common.optional')})</span>
					</h2>
					<Row className="mb-3">
						<Col md={6}>
							<Form.Group>
								<Form.Label>{t('nenpt.formulaProduct')}</Form.Label>
								<Controller
									name="product2"
									control={control}
									render={({ field }) => (
										<Form.Select
											isInvalid={!!errors.product2}
											{...field}
											onChange={(e) => {
												field.onChange(e)
												const selected = allProducts.find(
													(p) => p.nome === e.target.value,
												)
												trackEvent('calculator_product2_selected', {
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
								{errors.product2 && (
									<Form.Control.Feedback type="invalid">
										{errors.product2.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group>
								<Form.Label>{t('nenpt.prescribedVolume')}</Form.Label>
								<Controller
									name="volume2"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											isInvalid={!!errors.volume2}
											{...field}
										/>
									)}
								/>
								{errors.volume2 && (
									<Form.Control.Feedback type="invalid">
										{errors.volume2.message}
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

					{/* Calorias Não-Nutricionais */}
					<h2 className="fs-5 mb-3 border-bottom pb-2 mt-4">
						{t('nenpt.nonNutritionalCalories')}{' '}
						<span className="text-muted fs-6">({t('common.optional')})</span>
					</h2>
					<Row className="mb-3">
						<Col md={4}>
							<Form.Group>
								<Controller
									name="citrato"
									control={control}
									render={({ field }) => (
										<Form.Check
											type="checkbox"
											label={t('nenpt.citratoLabel')}
											checked={field.value}
											onChange={(e) => field.onChange(e.target.checked)}
										/>
									)}
								/>
								<Form.Text className="text-muted">
									{t('nenpt.citratoHelp')}
								</Form.Text>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group>
								<Form.Label>{t('nenpt.propofolVolume')}</Form.Label>
								<Controller
									name="propofol_ml"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											placeholder="0"
											isInvalid={!!errors.propofol_ml}
											{...field}
										/>
									)}
								/>
								<Form.Text className="text-muted">
									{t('nenpt.propofolHelp')}
								</Form.Text>
								{errors.propofol_ml && (
									<Form.Control.Feedback type="invalid">
										{errors.propofol_ml.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group>
								<Form.Label>{t('nenpt.sg5Volume')}</Form.Label>
								<Controller
									name="sg5_ml"
									control={control}
									render={({ field }) => (
										<Form.Control
											type="number"
											min="0"
											placeholder="0"
											isInvalid={!!errors.sg5_ml}
											{...field}
										/>
									)}
								/>
								<Form.Text className="text-muted">{t('nenpt.sg5Help')}</Form.Text>
								{errors.sg5_ml && (
									<Form.Control.Feedback type="invalid">
										{errors.sg5_ml.message}
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
											{results.totals.totalCalories.toFixed(1)} kcal
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						</Row>

						{/* Tabela Comparativa de Fórmulas */}
						<Card className="mt-4">
							<Card.Body>
								<Card.Title className="fs-5 mb-3">
									{t('nenpt.results.detailedBreakdown')}
								</Card.Title>
								<Table responsive hover bordered>
									<thead className="table-light">
										<tr>
											<th>{t('nenpt.results.metric')}</th>
											<th className="text-center">{t('nenpt.results.formula1')}</th>
											{results.formula2 && results.formula2.calories > 0 && (
												<th className="text-center text-success">
													{t('nenpt.results.formula2')}
												</th>
											)}
											<th className="text-center text-primary">
												<strong>{t('nenpt.results.total')}</strong>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<strong>{t('nenpt.results.caloriesProvided')}</strong>
											</td>
											<td className="text-center">
												{results.formula1.calories.toFixed(1)} kcal
											</td>
											{results.formula2 && results.formula2.calories > 0 && (
												<td className="text-center text-success">
													{results.formula2.calories.toFixed(1)} kcal
												</td>
											)}
											<td className="text-center bg-light">
												<strong className="text-primary">
													{results.totals.totalCalories.toFixed(1)} kcal
												</strong>
											</td>
										</tr>
										<tr>
											<td>
												<strong>{t('nenpt.results.proteinProvided')}</strong>
											</td>
											<td className="text-center">
												{results.formula1.protein.toFixed(1)} g
											</td>
											{results.formula2 && results.formula2.calories > 0 && (
												<td className="text-center text-success">
													{results.formula2.protein.toFixed(1)} g
												</td>
											)}
											<td className="text-center bg-light">
												<strong className="text-primary">
													{results.totals.totalProtein.toFixed(1)} g
												</strong>
											</td>
										</tr>
										<tr>
											<td>
												<strong>{t('nenpt.results.carbsProvided')}</strong>
											</td>
											<td className="text-center">
												{results.formula1.carbs.toFixed(1)} g
											</td>
											{results.formula2 && results.formula2.calories > 0 && (
												<td className="text-center text-success">
													{results.formula2.carbs.toFixed(1)} g
												</td>
											)}
											<td className="text-center bg-light">
												<strong className="text-primary">
													{results.totals.totalCarbs.toFixed(1)} g
												</strong>
											</td>
										</tr>
										<tr>
											<td>
												<strong>{t('nenpt.results.lipidsProvided')}</strong>
											</td>
											<td className="text-center">
												{results.formula1.lipids.toFixed(1)} g
											</td>
											{results.formula2 && results.formula2.calories > 0 && (
												<td className="text-center text-success">
													{results.formula2.lipids.toFixed(1)} g
												</td>
											)}
											<td className="text-center bg-light">
												<strong className="text-primary">
													{results.totals.totalLipids.toFixed(1)} g
												</strong>
											</td>
										</tr>
									</tbody>
								</Table>

								{/* Alert de Calorias Não-Nutricionais */}
								{results.nonNutritional && results.nonNutritional.totalCalories > 0 && (
									<Alert variant="info" className="mt-3 mb-0">
										<div className="d-flex align-items-start">
											<div className="me-2">ℹ️</div>
											<div>
												<strong>{t('nenpt.results.nonNutritionalIncluded')}:</strong>
												<ul className="mb-0 mt-2">
													{results.nonNutritional.calories.citrato > 0 && (
														<li>
															Citrato: {results.nonNutritional.calories.citrato} kcal
														</li>
													)}
													{results.nonNutritional.calories.propofol > 0 && (
														<li>
															Propofol: {results.nonNutritional.calories.propofol.toFixed(1)}{' '}
															kcal ({results.nonNutritional.macros.lipids.toFixed(1)}g
															lipídios)
														</li>
													)}
													{results.nonNutritional.calories.sg5 > 0 && (
														<li>
															SG5%: {results.nonNutritional.calories.sg5.toFixed(1)} kcal (
															{results.nonNutritional.macros.carbs.toFixed(1)}g CHO)
														</li>
													)}
												</ul>
											</div>
										</div>
									</Alert>
								)}
							</Card.Body>
						</Card>

						<Row className="mt-4">
							<Col md={4} className="mb-3">
								<Card>
									<Card.Body>
										<Card.Title className="text-muted fs-6">
											{t('nenpt.results.proteinProvided')}
										</Card.Title>
										<Card.Text className="fs-4 text-primary">
											{results.totals.totalProtein.toFixed(1)} g
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
											{results.totals.totalCarbs.toFixed(1)} g
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
											{results.totals.totalLipids.toFixed(1)} g
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
											{results.totals.carbsPercentage.toFixed(1)}%
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
											{results.totals.lipidsPercentage.toFixed(1)}%
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
											{results.totals.proteinPercentage.toFixed(1)}%
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
			</SidebarLayout>
		</main>
	)
}

export default Calculator

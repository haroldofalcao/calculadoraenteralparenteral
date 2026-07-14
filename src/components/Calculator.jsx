import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Info, Loader2, TriangleAlert } from 'lucide-react'
import AdSenseCompliantPage from '../ads/components/AdSenseCompliantPage.jsx'
import {
	InFeedAd,
	ResponsiveBanner,
	ResultsAd,
	SidebarAd,
} from '../ads/components/AdVariants.jsx'
import SidebarLayout from '../layouts/SidebarLayout.jsx'
import { useAnalytics } from '../hooks/useAnalytics'
import { calculatorSchema } from '../schemas/calculatorSchema'
import { allProductsAtom } from '../store/productsAtoms'
import { calculateResults } from '../utils/calculationUtils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/native-select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Reveal } from '@/components/motion'

// Card de métrica de resultado
const Metric = ({ label, value, testid }) => (
	<div
		data-testid={testid}
		className="result-card rounded-xl border border-border bg-card p-4 shadow-sm"
	>
		<div className="text-xs font-medium text-muted-foreground">{label}</div>
		<div className="mt-1 text-2xl font-bold tabular-nums text-primary">
			{value}
		</div>
	</div>
)

const Calculator = () => {
	const { t } = useTranslation()
	const [allProducts] = useAtom(allProductsAtom)
	const [results, setResults] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const { trackEvent } = useAnalytics()

	const form = useForm({
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
	const { control, handleSubmit, watch } = form

	const calculationMethod = watch('calculationMethod')

	useEffect(() => {
		trackEvent('calculator_view', { page: 'nenpt' })
	}, [trackEvent])

	const onSubmit = (data) => {
		setLoading(true)

		const selectedProduct1 = allProducts.find((p) => p.nome === data.product)
		const selectedProduct2 = data.product2
			? allProducts.find((p) => p.nome === data.product2)
			: null

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

		const calculatedResults = calculateResults(
			data,
			selectedProduct1,
			selectedProduct2,
			nonNutritionalCals,
		)
		setResults(calculatedResults)

		trackEvent('calculator_results_shown', {
			totalCalories: calculatedResults.totals.totalCalories,
			totalProtein: calculatedResults.totals.totalProtein,
			hasSecondFormula: !!selectedProduct2,
			hasNonNutritional: calculatedResults.nonNutritional.totalCalories > 0,
		})

		setLoading(false)
	}

	// Campo numérico (react-hook-form + shadcn Form)
	const numField = (name, label, extra = {}) => (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input type="number" min="0" {...extra} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)

	const showSecondFormula = () =>
		results?.formula2 && results.formula2.calories > 0

	return (
		<SidebarLayout sidebar={<SidebarAd />}>
			<AdSenseCompliantPage
				minContentLength={50}
				allowSkeletons={true}
				timeout={5000}
			>
				<ResponsiveBanner
					adSlot="5804222918"
					requireContent={false}
					style={{ marginBottom: '24px' }}
				/>
			</AdSenseCompliantPage>

			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">
					{t('nenpt.title')}
				</h1>
			</div>

			<Alert variant="warning" className="mb-6">
				<TriangleAlert />
				<AlertTitle>{t('common.warning')}</AlertTitle>
				<AlertDescription>{t('nenpt.warning')}</AlertDescription>
			</Alert>

			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Dados do Paciente */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								{t('nenpt.patientData')}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
								{numField('weight', t('nenpt.weight'), { step: '0.1' })}
								{numField('height', t('nenpt.height'))}
								{numField('age', t('nenpt.age'))}
								<Controller
									control={control}
									name="gender"
									render={({ field, fieldState }) => (
										<div className="grid gap-2">
											<Label htmlFor="gender">{t('nenpt.sex')}</Label>
											<NativeSelect
												id="gender"
												{...field}
												aria-invalid={!!fieldState.error}
											>
												<option value="masculino">{t('nenpt.male')}</option>
												<option value="feminino">{t('nenpt.female')}</option>
											</NativeSelect>
										</div>
									)}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Método de Cálculo */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								{t('nenpt.calculationMethod')}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Controller
									control={control}
									name="calculationMethod"
									render={({ field, fieldState }) => (
										<div className="grid gap-2">
											<Label htmlFor="calculationMethod">
												{t('nenpt.caloricMethod')}
											</Label>
											<NativeSelect
												id="calculationMethod"
												{...field}
												aria-invalid={!!fieldState.error}
											>
												<option value="harris-benedict">
													{t('nenpt.harrisBenedict')}
												</option>
												<option value="pocket-formula">
													{t('nenpt.pocketFormula')}
												</option>
											</NativeSelect>
										</div>
									)}
								/>
								{calculationMethod === 'pocket-formula' &&
									numField('kcalPerKg', t('nenpt.kcalPerKgDay'), {
										step: '0.1',
									})}
							</div>
						</CardContent>
					</Card>

					<AdSenseCompliantPage minContentLength={600}>
						<InFeedAd
							adSlot="1864977909"
							adLayoutKey="-fb+5w+4e-db+86"
							requireContent={true}
							showLabel={true}
							variant="subtle"
							style={{ margin: '8px 0' }}
						/>
					</AdSenseCompliantPage>

					{/* Fórmula 1 */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								{t('nenpt.formulaData')}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Controller
									control={control}
									name="product"
									render={({ field, fieldState }) => (
										<div className="grid gap-2">
											<Label htmlFor="product">
												{t('nenpt.formulaProduct')}
											</Label>
											<NativeSelect
												id="product"
												{...field}
												aria-invalid={!!fieldState.error}
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
											</NativeSelect>
											{fieldState.error && (
												<p className="text-xs font-medium text-destructive">
													{fieldState.error.message}
												</p>
											)}
										</div>
									)}
								/>
								{numField('volume', t('nenpt.prescribedVolume'))}
							</div>
						</CardContent>
					</Card>

					{/* Fórmula 2 */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-lg">
								{t('nenpt.secondaryFormula')}
								<span className="text-sm font-normal text-muted-foreground">
									({t('common.optional')})
								</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Controller
									control={control}
									name="product2"
									render={({ field, fieldState }) => (
										<div className="grid gap-2">
											<Label htmlFor="product2">
												{t('nenpt.formulaProduct')}
											</Label>
											<NativeSelect
												id="product2"
												{...field}
												aria-invalid={!!fieldState.error}
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
											</NativeSelect>
											{fieldState.error && (
												<p className="text-xs font-medium text-destructive">
													{fieldState.error.message}
												</p>
											)}
										</div>
									)}
								/>
								{numField('volume2', t('nenpt.prescribedVolume'))}
							</div>
						</CardContent>
					</Card>

					{/* Dados Opcionais */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">
								{t('nenpt.optionalData')}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
								{numField('infusionTime', t('nenpt.infusionTime'))}
								{numField('proteinModule', t('nenpt.proteinModule'))}
								{numField('otherModule', t('nenpt.otherModule'))}
							</div>
						</CardContent>
					</Card>

					{/* Calorias Não-Nutricionais */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-lg">
								{t('nenpt.nonNutritionalCalories')}
								<span className="text-sm font-normal text-muted-foreground">
									({t('common.optional')})
								</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
								<div className="grid gap-2">
									<Controller
										control={control}
										name="citrato"
										render={({ field }) => (
											<label className="flex cursor-pointer items-center gap-2.5 pt-1">
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
												<span className="text-sm font-medium">
													{t('nenpt.citratoLabel')}
												</span>
											</label>
										)}
									/>
									<p className="text-xs text-muted-foreground">
										{t('nenpt.citratoHelp')}
									</p>
								</div>
								<FormField
									control={control}
									name="propofol_ml"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t('nenpt.propofolVolume')}</FormLabel>
											<FormControl>
												<Input
													type="number"
													min="0"
													placeholder="0"
													{...field}
												/>
											</FormControl>
											<p className="text-xs text-muted-foreground">
												{t('nenpt.propofolHelp')}
											</p>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="sg5_ml"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t('nenpt.sg5Volume')}</FormLabel>
											<FormControl>
												<Input
													type="number"
													min="0"
													placeholder="0"
													{...field}
												/>
											</FormControl>
											<p className="text-xs text-muted-foreground">
												{t('nenpt.sg5Help')}
											</p>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>

					<div className="flex justify-center pt-2">
						<Button
							type="submit"
							size="lg"
							disabled={loading}
							className="min-w-64"
						>
							{loading ? (
								<>
									<Loader2 className="size-4 animate-spin" />
									{t('common.loading')}
								</>
							) : (
								t('nenpt.calculateButton')
							)}
						</Button>
					</div>
				</form>
			</Form>

			{/* Resultados */}
			{results && (
				<Reveal className="results-section mt-10" data-testid="results">
					<h2 className="mb-4 text-2xl font-bold tracking-tight">
						{t('nenpt.results.title')}
					</h2>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{watch('weight') && watch('height') && (
							<Metric
								testid="result-bmi"
								label={t('nenpt.results.bmi')}
								value={`${results.imc.toFixed(1)} kg/m²`}
							/>
						)}
						<Metric
							testid="result-caloric-goal"
							label={t('nenpt.results.caloricGoal')}
							value={`${results.geb.toFixed(1)} kcal`}
						/>
						<Metric
							testid="result-calories"
							label={t('nenpt.results.caloriesProvided')}
							value={`${results.totals.totalCalories.toFixed(1)} kcal`}
						/>
					</div>

					{/* Tabela comparativa */}
					<Card className="mt-4">
						<CardHeader>
							<CardTitle className="text-lg">
								{t('nenpt.results.detailedBreakdown')}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>{t('nenpt.results.metric')}</TableHead>
										<TableHead className="text-center">
											{t('nenpt.results.formula1')}
										</TableHead>
										{showSecondFormula() && (
											<TableHead className="text-center text-success">
												{t('nenpt.results.formula2')}
											</TableHead>
										)}
										<TableHead className="text-center text-primary">
											{t('nenpt.results.total')}
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{[
										{
											label: t('nenpt.results.caloriesProvided'),
											f1: `${results.formula1.calories.toFixed(1)} kcal`,
											f2: `${results.formula2?.calories.toFixed(1)} kcal`,
											total: `${results.totals.totalCalories.toFixed(1)} kcal`,
										},
										{
											label: t('nenpt.results.proteinProvided'),
											f1: `${results.formula1.protein.toFixed(1)} g`,
											f2: `${results.formula2?.protein.toFixed(1)} g`,
											total: `${results.totals.totalProtein.toFixed(1)} g`,
										},
										{
											label: t('nenpt.results.carbsProvided'),
											f1: `${results.formula1.carbs.toFixed(1)} g`,
											f2: `${results.formula2?.carbs.toFixed(1)} g`,
											total: `${results.totals.totalCarbs.toFixed(1)} g`,
										},
										{
											label: t('nenpt.results.lipidsProvided'),
											f1: `${results.formula1.lipids.toFixed(1)} g`,
											f2: `${results.formula2?.lipids.toFixed(1)} g`,
											total: `${results.totals.totalLipids.toFixed(1)} g`,
										},
									].map((row) => (
										<TableRow key={row.label}>
											<TableCell className="font-medium">{row.label}</TableCell>
											<TableCell className="text-center tabular-nums">
												{row.f1}
											</TableCell>
											{showSecondFormula() && (
												<TableCell className="text-center tabular-nums text-success">
													{row.f2}
												</TableCell>
											)}
											<TableCell className="bg-secondary/40 text-center font-semibold tabular-nums text-primary">
												{row.total}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							{results.nonNutritional &&
								results.nonNutritional.totalCalories > 0 && (
									<Alert variant="info" className="mt-4">
										<Info />
										<AlertTitle>
											{t('nenpt.results.nonNutritionalIncluded')}
										</AlertTitle>
										<AlertDescription>
											<ul className="list-disc pl-4">
												{results.nonNutritional.calories.citrato > 0 && (
													<li>
														Citrato: {results.nonNutritional.calories.citrato}{' '}
														kcal
													</li>
												)}
												{results.nonNutritional.calories.propofol > 0 && (
													<li>
														Propofol:{' '}
														{results.nonNutritional.calories.propofol.toFixed(
															1,
														)}{' '}
														kcal (
														{results.nonNutritional.macros.lipids.toFixed(1)}g
														lipídios)
													</li>
												)}
												{results.nonNutritional.calories.sg5 > 0 && (
													<li>
														SG5%:{' '}
														{results.nonNutritional.calories.sg5.toFixed(1)}{' '}
														kcal (
														{results.nonNutritional.macros.carbs.toFixed(1)}g
														CHO)
													</li>
												)}
											</ul>
										</AlertDescription>
									</Alert>
								)}
						</CardContent>
					</Card>

					{/* Macros totais */}
					<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<Metric
							label={t('nenpt.results.proteinProvided')}
							value={`${results.totals.totalProtein.toFixed(1)} g`}
						/>
						<Metric
							label={t('nenpt.results.carbsProvided')}
							value={`${results.totals.totalCarbs.toFixed(1)} g`}
						/>
						<Metric
							label={t('nenpt.results.lipidsProvided')}
							value={`${results.totals.totalLipids.toFixed(1)} g`}
						/>
						{watch('weight') && (
							<>
								<Metric
									label={t('nenpt.results.proteinPerKg')}
									value={`${results.proteinPerKg.toFixed(2)} g/kg`}
								/>
								<Metric
									label={t('nenpt.results.caloriesPerKg')}
									value={`${results.caloriesPerKg.toFixed(1)} kcal/kg`}
								/>
							</>
						)}
						<Metric
							label={t('nenpt.results.volumePerHour')}
							value={
								results.volumePerHour
									? `${results.volumePerHour.toFixed(1)} mL/h`
									: 'N/A'
							}
						/>
						<Metric
							label={t('nenpt.results.carbsDistribution')}
							value={`${results.totals.carbsPercentage.toFixed(1)}%`}
						/>
						<Metric
							label={t('nenpt.results.lipidsDistribution')}
							value={`${results.totals.lipidsPercentage.toFixed(1)}%`}
						/>
						<Metric
							label={t('nenpt.results.proteinDistribution')}
							value={`${results.totals.proteinPercentage.toFixed(1)}%`}
						/>
					</div>
				</Reveal>
			)}

			{results && (
				<AdSenseCompliantPage minContentLength={1200}>
					<ResultsAd adSlot="1864977909" adLayoutKey="-fb+5w+4e-db+86" />
				</AdSenseCompliantPage>
			)}

			{/* Seções Informativas */}
			<div className="mt-12">
				<h3 className="mb-6 text-center text-xl font-bold text-foreground">
					Informações Sobre Terapia Nutricional
				</h3>
				<div className="space-y-4">
					{[
						{
							title: t('nenpt.clinicalImportance.title'),
							content: t('nenpt.clinicalImportance.content'),
						},
						{
							title: t('nenpt.nutritionalAssessment.title'),
							content: t('nenpt.nutritionalAssessment.content'),
						},
						{
							title: t('nenpt.safetyProtocol.title'),
							content: t('nenpt.safetyProtocol.content'),
						},
						{
							title: t('nenpt.scientificValidation.title'),
							content: t('nenpt.scientificValidation.content'),
						},
					].map((sec) => (
						<Card key={sec.title}>
							<CardContent className="pt-6">
								<h4 className="mb-3 text-base font-semibold text-primary">
									{sec.title}
								</h4>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{sec.content}
								</p>
							</CardContent>
						</Card>
					))}

					<Card>
						<CardContent className="pt-6">
							<h4 className="mb-3 text-base font-semibold text-primary">
								{t('nenpt.guide.title', 'Como Utilizar a Calculadora NENPT')}
							</h4>
							<div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
								{[1, 2, 3, 4].map((n) => (
									<p key={n}>
										<strong className="text-foreground">
											{n}. {t(`nenpt.guide.step${n}.title`)}:
										</strong>{' '}
										{t(`nenpt.guide.step${n}.desc`)}
									</p>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</SidebarLayout>
	)
}

export default Calculator

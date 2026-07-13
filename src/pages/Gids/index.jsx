import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Download, Eraser, Save } from 'lucide-react'
import {
	AdSenseCompliantPage,
	ResponsiveBanner,
	ResultsAd,
} from '../../ads'
import SEO from '../../components/SEO.jsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Schema de validação
const gidsSchema = z.object({
	patientName: z.string().optional(),
	patientId: z.string().optional(),
	patientAge: z.number().optional(),
	admissionDate: z.string().optional(),
	bowelSounds: z.boolean().default(false),
	vomiting: z.boolean().default(false),
	grv: z.boolean().default(false),
	ileus: z.boolean().default(false),
	distension: z.boolean().default(false),
	mildDiarrhea: z.boolean().default(false),
	bleedingNo: z.boolean().default(false),
	iap_12_20: z.boolean().default(false),
	noOral: z.boolean().default(false),
	severeDiarrhea: z.boolean().default(false),
	bleedingYes: z.boolean().default(false),
	prokinetics: z.boolean().default(false),
	iap_gt_20: z.boolean().default(false),
	shock: z.boolean().default(false),
	ischemia: z.boolean().default(false),
	compartment: z.boolean().default(false),
})

const scoreStyles = {
	0: 'bg-success text-success-foreground',
	1: 'bg-warning text-warning-foreground',
	2: 'bg-orange text-orange-foreground',
	3: 'bg-destructive text-destructive-foreground',
	4: 'bg-foreground text-background',
}

function Gids() {
	const { t } = useTranslation()
	const [activeTab, setActiveTab] = useState('measurement')
	const [savedData, setSavedData] = useState(null)
	const [currentScore, setCurrentScore] = useState(0)
	const [currentClassification, setCurrentClassification] = useState('')

	const { register, control, handleSubmit, watch, reset, setValue } = useForm({
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

	const calculateGIDS = (data) => {
		// GIDS 4: ameaça à vida
		if (data.shock || data.ischemia || data.compartment) return 4

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

		let dysfunctionSymptoms = 0
		if (data.severeDiarrhea) dysfunctionSymptoms++
		if (data.bleedingYes) dysfunctionSymptoms++
		if (data.prokinetics) dysfunctionSymptoms++
		if (data.iap_gt_20) dysfunctionSymptoms++

		let failureSymptoms = dysfunctionSymptoms
		if (data.ileus) failureSymptoms++
		if (data.distension) failureSymptoms++

		// GIDS 3: falência GI
		if (failureSymptoms >= 3) return 3
		// GIDS 2: disfunção GI
		if (dysfunctionSymptoms >= 1 || basicSymptoms >= 3) return 2
		// GIDS 1: risco aumentado
		if (basicSymptoms >= 2) return 1
		// GIDS 0: sem risco
		return 0
	}

	useEffect(() => {
		const score = calculateGIDS(watchedValues)
		setCurrentScore(score)
		setCurrentClassification(t(`gids.classifications.${score}`))
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

	useEffect(() => {
		const saved = localStorage.getItem('gidsData')
		if (saved) {
			const data = JSON.parse(saved)
			setSavedData(data)
			Object.keys(data).forEach((key) => {
				if (key !== 'score' && key !== 'classification' && key !== 'timestamp') {
					setValue(key, data[key])
				}
			})
		}
	}, [setValue])

	const groups = [
		{
			key: 'basic',
			title: t('gids.basicSymptoms'),
			badge: 'secondary',
			highlight:
				'has-[[data-state=checked]]:border-primary/40 has-[[data-state=checked]]:bg-primary/5',
			items: [
				'bowelSounds',
				'vomiting',
				'grv',
				'ileus',
				'distension',
				'mildDiarrhea',
				'bleedingNo',
				'iap_12_20',
				'noOral',
			],
		},
		{
			key: 'severe',
			title: t('gids.severeSymptoms'),
			badge: 'warning',
			highlight:
				'has-[[data-state=checked]]:border-warning/50 has-[[data-state=checked]]:bg-warning/10',
			items: ['severeDiarrhea', 'bleedingYes', 'prokinetics', 'iap_gt_20'],
		},
		{
			key: 'life',
			title: t('gids.lifeThreatening'),
			badge: 'destructive',
			highlight:
				'has-[[data-state=checked]]:border-destructive/50 has-[[data-state=checked]]:bg-destructive/5',
			items: ['shock', 'ischemia', 'compartment'],
		},
	]

	const patientFields = [
		{ name: 'patientName', label: t('gids.patientName'), type: 'text' },
		{ name: 'patientId', label: t('gids.patientId'), type: 'text' },
		{ name: 'patientAge', label: t('gids.patientAge'), type: 'number' },
		{ name: 'admissionDate', label: t('gids.measurementDate'), type: 'date' },
	]

	return (
		<>
			<SEO
				title="Calculadora GIDS - NutriCalc | Gastrointestinal Dysfunction Score"
				description="Calcule o GIDS (Gastrointestinal Dysfunction Score) para avaliar disfunção gastrointestinal em pacientes críticos. Ferramenta essencial para profissionais de saúde."
				keywords="calculadora GIDS, disfunção gastrointestinal, pacientes críticos, nutrição enteral, escore GI"
				canonical="/"
			/>

			<div className="mx-auto max-w-4xl px-4">
				{/* Cabeçalho limpo (system.md §4.1) */}
				<div className="mb-6">
					<h1 className="text-3xl font-bold tracking-tight text-foreground">
						{t('gids.title')}
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						{t('gids.subtitle')}
					</p>
					<p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
						{t('gids.description')}
					</p>
				</div>

				<AdSenseCompliantPage
					minContentLength={300}
					allowSkeletons={true}
					timeout={10000}
				>
					<ResponsiveBanner
						adSlot="gids-top-banner"
						requireContent={false}
						style={{ marginBottom: '24px' }}
					/>
				</AdSenseCompliantPage>

				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="mb-4 w-full sm:w-auto">
						<TabsTrigger value="measurement">
							{t('gids.currentMeasurement')}
						</TabsTrigger>
						<TabsTrigger value="summary">{t('gids.summary')}</TabsTrigger>
					</TabsList>

					{/* MEDIDA ATUAL */}
					<TabsContent value="measurement">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							{/* Dados do paciente */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">
										{t('gids.patientData')}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										{patientFields.map((f) => (
											<div key={f.name} className="grid gap-2">
												<Label htmlFor={f.name}>{f.label}</Label>
												<Input
													id={f.name}
													type={f.type}
													placeholder={f.type !== 'date' ? f.label : undefined}
													{...register(
														f.name,
														f.type === 'number'
															? { valueAsNumber: true }
															: undefined,
													)}
												/>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Grupos de sintomas */}
							{groups.map((group) => (
								<Card key={group.key}>
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-lg">
											{group.title}
											<Badge variant={group.badge}>{group.items.length}</Badge>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
											{group.items.map((symptom) => (
												<Controller
													key={symptom}
													control={control}
													name={symptom}
													render={({ field }) => (
														<label
															htmlFor={symptom}
															className={`flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-accent ${group.highlight}`}
														>
															<Checkbox
																id={symptom}
																checked={!!field.value}
																onCheckedChange={field.onChange}
															/>
															<span>{t(`gids.symptoms.${symptom}`)}</span>
														</label>
													)}
												/>
											))}
										</div>
									</CardContent>
								</Card>
							))}

							{/* Resultado ao vivo */}
							<Card>
								<CardContent className="pt-6">
									<div
										className={`rounded-xl p-6 text-center shadow-sm ${scoreStyles[currentScore]}`}
										data-testid="gids-score"
									>
										<div className="text-sm font-medium opacity-90">
											{t('gids.score')}
										</div>
										<div className="mt-1 text-3xl font-bold tabular-nums">
											{currentScore}
										</div>
										<div className="mt-1 text-lg font-semibold">
											{currentClassification}
										</div>
									</div>

									<GidsBreakdown data={watchedValues} t={t} />
								</CardContent>
							</Card>

							{currentScore > 0 && (
								<AdSenseCompliantPage minContentLength={1000}>
									<ResultsAd
										adSlot="gids-results-ad"
										style={{ margin: '8px 0' }}
									/>
								</AdSenseCompliantPage>
							)}

							<div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
								<Button
									type="button"
									variant="outline"
									onClick={clearMeasurement}
								>
									<Eraser className="size-4" />
									{t('gids.clearMeasurement')}
								</Button>
								<Button type="submit">
									<Save className="size-4" />
									{savedData
										? t('gids.measurementSaved')
										: t('gids.saveMeasurement')}
								</Button>
							</div>
						</form>
					</TabsContent>

					{/* RESUMO */}
					<TabsContent value="summary" className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									{t('gids.patientData')}
								</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-1.5 text-sm">
								<div>
									<span className="text-muted-foreground">
										{t('gids.patientName')}:
									</span>{' '}
									<span className="font-medium">
										{savedData?.patientName || '--'}
									</span>
								</div>
								<div>
									<span className="text-muted-foreground">
										{t('gids.patientId')}:
									</span>{' '}
									<span className="font-medium">
										{savedData?.patientId || '--'}
									</span>
								</div>
								<div>
									<span className="text-muted-foreground">
										{t('gids.patientAge')}:
									</span>{' '}
									<span className="font-medium">
										{savedData?.patientAge || '--'}
									</span>
								</div>
								<div>
									<span className="text-muted-foreground">
										{t('gids.measurementDate')}:
									</span>{' '}
									<span className="font-medium">
										{savedData?.admissionDate || '--'}
									</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">{t('gids.score')}</CardTitle>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>{t('gids.summaryTable.measure')}</TableHead>
											<TableHead>{t('gids.summaryTable.score')}</TableHead>
											<TableHead>
												{t('gids.summaryTable.classification')}
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableCell>
												{t('gids.summaryTable.singleMeasurement')}
											</TableCell>
											<TableCell className="tabular-nums">
												{savedData?.score ?? '--'}
											</TableCell>
											<TableCell>
												{savedData ? (
													<Badge variant={badgeForScore(savedData.score)}>
														{savedData.classification}
													</Badge>
												) : (
													'--'
												)}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									{t('gids.clinicalAnalysis')}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 text-sm leading-relaxed">
								{savedData ? (
									<>
										<p className="font-medium text-foreground">
											{t('gids.analysis.title')}
										</p>
										<p className="text-muted-foreground">
											{t('gids.analysis.scoreDisplay', {
												score: savedData.score,
												classification: savedData.classification,
											})}
										</p>
										<p className="text-muted-foreground">
											{savedData.score >= 2
												? t('gids.analysis.highRiskRecommendation', {
														score: savedData.score,
														classification: savedData.classification,
													})
												: t('gids.analysis.lowRiskRecommendation', {
														score: savedData.score,
														classification: savedData.classification,
													})}
										</p>
									</>
								) : (
									<p className="text-muted-foreground">
										{t('gids.analysis.noDataMessage')}
									</p>
								)}
							</CardContent>
						</Card>

						<div className="text-center">
							<Button onClick={exportReport} disabled={!savedData}>
								<Download className="size-4" />
								{t('gids.exportReport')}
							</Button>
						</div>
					</TabsContent>
				</Tabs>

				{/* Seções informativas */}
				<div className="mt-12">
					<h3 className="mb-6 text-center text-xl font-bold text-foreground">
						Informações Sobre Disfunção Gastrointestinal
					</h3>
					<div className="space-y-4">
						{[
							'clinicalImportance',
							'prevalenceOutcomes',
							'gidsClassification',
							'objectiveAssessment',
						].map((key) => (
							<Card key={key}>
								<CardContent className="pt-6">
									<h4 className="mb-3 text-base font-semibold text-primary">
										{t(`gids.${key}.title`)}
									</h4>
									<p className="text-sm leading-relaxed text-muted-foreground">
										{t(`gids.${key}.content`)}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

function badgeForScore(score) {
	return (
		{ 0: 'success', 1: 'warning', 2: 'orange', 3: 'destructive', 4: 'default' }[
			score
		] || 'secondary'
	)
}

// Detalhamento do cálculo em tempo real
function GidsBreakdown({ data, t }) {
	if (!data) return null

	const basicCount = [
		data.noOral,
		data.bowelSounds,
		data.vomiting,
		data.grv,
		data.ileus,
		data.distension,
		data.mildDiarrhea,
		data.bleedingNo,
		data.iap_12_20,
	].filter(Boolean).length

	const dysfunctionCount = [
		data.severeDiarrhea,
		data.bleedingYes,
		data.prokinetics,
		data.iap_gt_20,
	].filter(Boolean).length

	const lifeThreateningCount = [data.shock, data.ischemia, data.compartment].filter(
		Boolean,
	).length

	let failureCount = dysfunctionCount
	if (data.ileus) failureCount++
	if (data.distension) failureCount++

	let reason = ''
	if (lifeThreateningCount > 0)
		reason = t('gids.debug.gids4', { count: lifeThreateningCount })
	else if (failureCount >= 3)
		reason = t('gids.debug.gids3', { count: failureCount })
	else if (dysfunctionCount >= 1)
		reason = t('gids.debug.gids2Dysfunction', { count: dysfunctionCount })
	else if (basicCount >= 3)
		reason = t('gids.debug.gids2Basic', { count: basicCount })
	else if (basicCount >= 2)
		reason = t('gids.debug.gids1Basic', { count: basicCount })
	else reason = t('gids.debug.gids0', { count: basicCount })

	return (
		<div className="mt-4 rounded-lg border border-border bg-secondary/40 p-4 text-sm">
			<div className="mb-2 font-medium text-foreground">
				{t('gids.debug.selectedSymptoms')}
			</div>
			<ul className="space-y-1 text-muted-foreground">
				{basicCount > 0 && (
					<li>
						• {t('gids.debug.basicSymptoms')} {basicCount}
					</li>
				)}
				{dysfunctionCount > 0 && (
					<li>
						• {t('gids.debug.dysfunctionSymptoms')} {dysfunctionCount}
					</li>
				)}
				{failureCount > dysfunctionCount && (
					<li>
						• {t('gids.debug.failureTotal')} {failureCount}
					</li>
				)}
				{lifeThreateningCount > 0 && (
					<li>
						• {t('gids.debug.lifeThreatening')} {lifeThreateningCount}
					</li>
				)}
			</ul>
			<div className="mt-3 rounded-md bg-background p-2 font-medium text-foreground">
				<span className="text-muted-foreground">{t('gids.debug.calculation')}</span>{' '}
				{reason}
			</div>
		</div>
	)
}

export default Gids

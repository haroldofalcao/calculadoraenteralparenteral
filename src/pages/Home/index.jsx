import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
	ArrowRight,
	Boxes,
	Calculator,
	CheckCircle2,
	ClipboardList,
	ShieldCheck,
	Sparkles,
	Stethoscope,
	Target,
	UserRound,
} from 'lucide-react'
import { AdSenseCompliantPage, InFeedAd, ResponsiveBanner } from '../../ads'
import SEO from '../../components/SEO.jsx'
import VisitCounter from '../../components/VisitCounter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion'
import { useAnalytics } from '../../hooks/useAnalytics'

function Home() {
	const { t } = useTranslation()
	const { trackEvent } = useAnalytics()

	const tools = [
		{
			key: 'nenpt',
			testid: 'tool-card-nenpt',
			icon: Calculator,
			accent: 'text-primary',
			chip: 'bg-primary/10 text-primary',
			title: t('home.nenpt.title'),
			description: t('home.nenpt.description'),
			actions: (
				<div className="mt-auto flex flex-wrap gap-2 pt-4">
					<Button asChild>
						<Link
							to="/nenpt"
							onClick={() =>
								trackEvent('home_nenpt_acessar_calculadora', { origem: 'home' })
							}
						>
							{t('home.nenpt.accessCalculator')}
							<ArrowRight className="size-4" />
						</Link>
					</Button>
					<Button asChild variant="outline">
						<Link
							to="/nenpt/gerenciar-produtos"
							onClick={() =>
								trackEvent('home_nenpt_gerenciar_produtos', { origem: 'home' })
							}
						>
							{t('home.nenpt.manageProducts')}
						</Link>
					</Button>
				</div>
			),
		},
		{
			key: 'gids',
			testid: 'tool-card-gids',
			icon: Stethoscope,
			accent: 'text-success',
			chip: 'bg-success/10 text-success',
			title: t('home.gids.title'),
			description: t('home.gids.description'),
			actions: (
				<div className="mt-auto pt-4">
					<Button asChild variant="success">
						<Link
							to="/gids"
							onClick={() =>
								trackEvent('home_gids_acessar', { origem: 'home' })
							}
						>
							{t('home.gids.access')}
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			),
		},
		{
			key: 'products',
			testid: 'tool-card-products',
			icon: Boxes,
			accent: 'text-foreground',
			chip: 'bg-secondary text-secondary-foreground',
			title: t('navigation.manageProducts'),
			description: t('productManager.productCustomization.content').slice(
				0,
				180,
			),
			actions: (
				<div className="mt-auto pt-4">
					<Button asChild variant="outline">
						<Link
							to="/nenpt/gerenciar-produtos"
							onClick={() =>
								trackEvent('home_products_acessar', { origem: 'home' })
							}
						>
							{t('home.nenpt.manageProducts')}
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			),
		},
	]

	const benefits = [
		{
			icon: Target,
			title: t('home.whyChoose.precision.title', 'Precisão Clínica'),
			desc: t('home.whyChoose.precision.desc'),
		},
		{
			icon: UserRound,
			title: t('home.whyChoose.professional.title', 'Foco Profissional'),
			desc: t('home.whyChoose.professional.desc'),
		},
		{
			icon: ShieldCheck,
			title: t('home.whyChoose.safety.title', 'Segurança do Paciente'),
			desc: t('home.whyChoose.safety.desc'),
		},
	]

	const steps = [1, 2, 3, 4].map((n) => ({
		n,
		title: t(`home.how.step${n}.title`),
		desc: t(`home.how.step${n}.desc`),
	}))

	const stats = [
		{ value: t('home.stats.formulasValue'), label: t('home.stats.formulas') },
		{
			value: t('home.stats.calculatorsValue'),
			label: t('home.stats.calculators'),
		},
		{ value: t('home.stats.costValue'), label: t('home.stats.cost') },
	]

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

			{/* ============================ HERO ============================ */}
			<section className="relative overflow-hidden">
				<div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/70 via-background to-background" />
				<div
					aria-hidden
					className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
				/>
				<div className="mx-auto max-w-6xl px-4 pb-4 pt-6 text-center sm:pt-12">
					<FadeIn className="mx-auto max-w-3xl">
						<Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1">
							<Sparkles className="size-3.5 text-primary" />
							{t('home.hero.badge')}
						</Badge>
						<h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
							{t('home.title')}
						</h1>
						<p className="mt-3 text-balance text-xl font-semibold text-primary sm:text-2xl">
							{t('home.hero.titleHighlight')}
						</p>
						<p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
							{t('home.hero.description')}
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Button asChild size="lg">
								<Link
									to="/nenpt"
									onClick={() =>
										trackEvent('home_hero_nenpt', { origem: 'hero' })
									}
								>
									<Calculator className="size-4" />
									{t('home.hero.ctaPrimary')}
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<Button asChild size="lg" variant="outline">
								<Link
									to="/gids"
									onClick={() =>
										trackEvent('home_hero_gids', { origem: 'hero' })
									}
								>
									<Stethoscope className="size-4" />
									{t('home.hero.ctaSecondary')}
								</Link>
							</Button>
						</div>
					</FadeIn>

					{/* Stats */}
					<Stagger className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
						{stats.map((s) => (
							<StaggerItem key={s.label}>
								<div className="rounded-xl border border-border bg-card p-5 shadow-sm">
									<div className="text-3xl font-bold tabular-nums text-primary">
										{s.value}
									</div>
									<div className="mt-1 text-sm text-muted-foreground">
										{s.label}
									</div>
								</div>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</section>

			<div className="mx-auto max-w-6xl px-4">
				{/* Anúncio superior */}
				<AdSenseCompliantPage
					minContentLength={200}
					allowSkeletons={true}
					timeout={10000}
				>
					<ResponsiveBanner
						adSlot="home-top-banner"
						requireContent={false}
						style={{ margin: '32px 0' }}
					/>
				</AdSenseCompliantPage>

				{/* ============================ TOOLS ============================ */}
				<section className="py-8 sm:py-12">
					<FadeIn className="mb-8 text-center">
						<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
							{t('home.toolsTitle')}
						</h2>
						<p className="mt-2 text-muted-foreground">{t('home.subtitle')}</p>
					</FadeIn>

					<Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{tools.map((tool) => {
							const Icon = tool.icon
							return (
								<StaggerItem
									key={tool.key}
									whileHover={{ y: -4 }}
									transition={{ type: 'spring', stiffness: 300, damping: 24 }}
								>
									<Card
										data-testid={tool.testid}
										className="flex h-full flex-col transition-shadow hover:shadow-md"
									>
										<CardHeader>
											<div
												className={`mb-2 grid size-11 place-items-center rounded-lg ${tool.chip}`}
											>
												<Icon className="size-6" />
											</div>
											<CardTitle className={`text-lg ${tool.accent}`}>
												{tool.title}
											</CardTitle>
										</CardHeader>
										<CardContent className="flex flex-1 flex-col">
											<CardDescription className="text-pretty leading-relaxed">
												{tool.description}
											</CardDescription>
											{tool.actions}
										</CardContent>
									</Card>
								</StaggerItem>
							)
						})}
					</Stagger>
				</section>

				{/* Anúncio meio */}
				<AdSenseCompliantPage
					minContentLength={300}
					allowSkeletons={true}
					timeout={10000}
				>
					<InFeedAd
						adSlot="home-middle-ad"
						requireContent={false}
						showLabel={true}
						style={{ margin: '24px 0' }}
					/>
				</AdSenseCompliantPage>

				{/* ============================ BENEFITS ============================ */}
				<section className="py-8 sm:py-12">
					<FadeIn className="mb-8 text-center">
						<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
							{t('home.whyChoose.title', 'Por que escolher o NutriCalc?')}
						</h2>
					</FadeIn>
					<Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{benefits.map((b) => {
							const Icon = b.icon
							return (
								<StaggerItem key={b.title}>
									<div className="h-full rounded-xl border border-border bg-card p-6 shadow-sm">
										<div className="mb-3 grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
											<Icon className="size-5" />
										</div>
										<h3 className="text-base font-semibold">{b.title}</h3>
										<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
											{b.desc}
										</p>
									</div>
								</StaggerItem>
							)
						})}
					</Stagger>
				</section>

				{/* ============================ HOW IT WORKS ============================ */}
				<section className="py-8 sm:py-12">
					<FadeIn className="mb-8 text-center">
						<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
							{t('home.how.title')}
						</h2>
						<p className="mt-2 text-muted-foreground">
							{t('home.how.subtitle')}
						</p>
					</FadeIn>
					<Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{steps.map((s) => (
							<StaggerItem key={s.n}>
								<div className="relative h-full rounded-xl border border-border bg-card p-5 shadow-sm">
									<div className="mb-3 grid size-9 place-items-center rounded-full bg-primary font-bold text-primary-foreground tabular-nums">
										{s.n}
									</div>
									<h3 className="text-sm font-semibold">{s.title}</h3>
									<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
										{s.desc}
									</p>
								</div>
							</StaggerItem>
						))}
					</Stagger>
				</section>

				{/* ============================ ABOUT ============================ */}
				<FadeIn as="section" className="py-8 sm:py-12">
					<Card className="bg-secondary/40">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-xl">
								<ClipboardList className="size-5 text-primary" />
								{t('home.about.title')}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="leading-relaxed text-muted-foreground">
								{t('home.about.description')}
							</p>
							<ul className="grid gap-2 sm:grid-cols-2">
								{[
									t('home.features.accurate', 'Cálculos precisos e confiáveis'),
									t('home.features.easy', 'Interface fácil de usar'),
									t(
										'home.features.professional',
										'Desenvolvido para profissionais de saúde',
									),
									t(
										'home.features.validated',
										'Baseado em protocolos validados',
									),
								].map((f) => (
									<li
										key={f}
										className="flex items-start gap-2 text-sm text-foreground"
									>
										<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
										{f}
									</li>
								))}
							</ul>
							<p className="border-t border-border pt-4 text-xs text-muted-foreground">
								<strong className="font-medium">
									{t('home.about.license')}
								</strong>
							</p>
						</CardContent>
					</Card>
				</FadeIn>

				{/* Anúncio inferior */}
				<AdSenseCompliantPage
					minContentLength={400}
					allowSkeletons={true}
					timeout={8000}
				>
					<ResponsiveBanner
						adSlot="home-bottom-banner"
						requireContent={false}
						style={{ margin: '24px 0' }}
					/>
				</AdSenseCompliantPage>

				{/* ============================ FINAL CTA ============================ */}
				<FadeIn as="section" className="py-8 sm:py-12">
					<div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center shadow-sm">
						<div
							aria-hidden
							className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]"
						/>
						<h2 className="text-balance text-2xl font-bold text-primary-foreground sm:text-3xl">
							{t('home.finalCta.title')}
						</h2>
						<p className="mx-auto mt-3 max-w-xl text-pretty text-primary-foreground/85">
							{t('home.finalCta.description')}
						</p>
						<Button asChild size="lg" variant="secondary" className="mt-6">
							<Link
								to="/nenpt"
								onClick={() =>
									trackEvent('home_final_cta', { origem: 'final_cta' })
								}
							>
								{t('home.finalCta.button')}
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</FadeIn>

				{/* Visit Counter */}
				<div className="pb-8 pt-2">
					<VisitCounter pageId="home" autoIncrement={true} />
				</div>
			</div>
		</>
	)
}

export default Home

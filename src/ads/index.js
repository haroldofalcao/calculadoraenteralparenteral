// Arquivo central de exportações para o módulo de anúncios
// Facilita importações e centraliza todos os componentes/utilitários

// Componentes principais
export { default as AdSense } from './components/AdSense'
export {
	ResponsiveBanner,
	SidebarAd,
	InFeedAd,
	ResultsAd,
} from './components/AdVariants'
export { default as AdSenseCompliantPage } from './components/AdSenseCompliantPage'
export {
	useAdSenseCompliance,
	AdSenseComplianceIndicator,
} from './components/AdSenseDebug'

// Utilitários
export { default as adSenseManager } from './utils/adSenseManager'
export { default as policyGuard } from './utils/adSensePolicyGuard'
export { default as adSensePolicyValidator } from './utils/adSensePolicyValidator'
export {
	hasValidContent,
	isValidPageForAds,
} from './utils/adSenseHelpers'

// Ferramentas de teste
export {
	runComplianceTests,
	testSPANavigation,
	simulateViolations,
} from './tests/adSenseComplianceTests'
export {
	testAdSense,
	resetAdSense,
} from './utils/adSenseTest'

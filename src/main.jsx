import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './router/index.jsx'
import './i18n/index.js' // Importar configuração do i18n
import './index.css'
import './App.css'

// Importar teste do AdSense para depuração
import './ads/utils/adSenseTest.js'

if (import.meta.env.DEV && typeof window !== 'undefined') {
	import('./ads/utils/adSensePolicyValidator.js')
}

export const createRoot = ViteReactSSG({ routes, basename: '/' })

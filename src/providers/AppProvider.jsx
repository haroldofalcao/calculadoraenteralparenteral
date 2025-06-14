import React, { startTransition } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary.jsx'
import SEO from '../components/SEO.jsx'
import { router } from '../router/index.jsx'
import '../i18n/index.js' // Importar configuração do i18n
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

// Importar teste do AdSense para depuração
import '../ads/utils/adSenseTest.js'

function AppProvider() {
	return (
		<ErrorBoundary>
			<HelmetProvider>
				<SEO />
				<RouterProvider router={router} />
			</HelmetProvider>
		</ErrorBoundary>
	)
}

export default AppProvider

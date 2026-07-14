import React from 'react'
import ErrorBoundary from '../components/ErrorBoundary.jsx'
import RouteErrorPage from '../components/RouteErrorPage.jsx'
import SEO from '../components/SEO.jsx'
import AppLayout from '../layouts/AppLayout.jsx'

import Gids from '../pages/Gids/index.jsx'
// Imports diretos das páginas
import Home from '../pages/Home/index.jsx'
import GerenciarProdutos from '../pages/Nenpt/GerenciarProdutos/index.jsx'
import Nenpt from '../pages/Nenpt/index.jsx'
import NotFound from '../pages/NotFound/index.jsx'
import Faq from '../pages/Faq/index.jsx'
import { Outlet } from 'react-router-dom'

function RootProviders() {
	return (
		<ErrorBoundary>
			<SEO />
			<Outlet />
		</ErrorBoundary>
	)
}

export const routes = [
	{
		element: <RootProviders />,
		errorElement: <RouteErrorPage />,
		children: [
			{
				path: '/',
				element: <AppLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: 'nenpt',
						element: <Nenpt />,
					},
					{
						path: 'nenpt/gerenciar-produtos',
						element: <GerenciarProdutos />,
					},
					{
						path: 'gids',
						element: <Gids />,
					},
					{
						path: 'perguntas-frequentes',
						element: <Faq />,
					},
				],
			},
			{
				path: '404',
				element: <NotFound />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]

export default routes

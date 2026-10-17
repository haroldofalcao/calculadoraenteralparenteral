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
import Artigos from '../pages/Artigos/index.jsx'
import Artigo from '../pages/Artigos/Artigo.jsx'
import Sobre from '../pages/Sobre/index.jsx'
import Privacidade from '../pages/Privacidade/index.jsx'
import { artigos } from '../content/artigos.js'
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
					{
						path: 'artigos',
						element: <Artigos />,
					},
					...artigos.map((artigo) => ({
						path: `artigos/${artigo.slug}`,
						element: <Artigo artigo={artigo} />,
					})),
					{
						path: 'sobre',
						element: <Sobre />,
					},
					{
						path: 'privacidade',
						element: <Privacidade />,
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

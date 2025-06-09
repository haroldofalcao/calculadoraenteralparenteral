import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.jsx';
import RouteErrorPage from '../components/RouteErrorPage.jsx';

// Lazy loading das páginas
const Home = lazy(() => import('../pages/Home/index.jsx'));
const Nenpt = lazy(() => import('../pages/Nenpt/index.jsx'));
const GerenciarProdutos = lazy(() => import('../pages/Nenpt/GerenciarProdutos/index.jsx'));
const Gids = lazy(() => import('../pages/Gids/index.jsx'));
const NotFound = lazy(() => import('../pages/NotFound/index.jsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

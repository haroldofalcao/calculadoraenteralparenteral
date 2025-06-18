import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.jsx';
import RouteErrorPage from '../components/RouteErrorPage.jsx';

// Imports diretos das páginas
import Home from '../pages/Home/index.jsx';
import Nenpt from '../pages/Nenpt/index.jsx';
import GerenciarProdutos from '../pages/Nenpt/GerenciarProdutos/index.jsx';
import Gids from '../pages/Gids/index.jsx';
import NotFound from '../pages/NotFound/index.jsx';

export const router = createBrowserRouter(
  [
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
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

export default router;

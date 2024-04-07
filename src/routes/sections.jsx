import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const PledgesPage = lazy(() => import('src/pages/pledges-page'))
export const DetailsPage = lazy(() => import('src/pages/details'))
export const CreatePledgesPage = lazy(() => import('src/pages/create-pledges-page'))

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <PledgesPage />, index: true },
        { path: 'pledges', element: <PledgesPage/> },
        { path: 'pledges/:uid', element: <DetailsPage/> },
        { path: 'pledges/create', element: <CreatePledgesPage/>}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    }
  ]);

  return routes;
}

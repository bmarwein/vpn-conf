import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Nodes = lazy(() => import('./pages/Nodes'));
const Alerts = lazy(() => import('./pages/Alerts'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));

function Layout() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Suspense fallback={<p>Chargement...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'nodes', element: <Nodes /> },
        { path: 'alerts', element: <Alerts /> },
        { path: 'reports', element: <Reports /> },
        { path: 'settings', element: <Settings /> }
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
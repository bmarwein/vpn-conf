import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Nodes from './pages/Nodes';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';

// Layout avec Navbar visible sur toutes les pages
function Layout() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
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
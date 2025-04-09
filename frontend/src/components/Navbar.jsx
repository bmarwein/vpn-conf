import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navItemClass = (path) =>
    `px-4 py-2 rounded hover:bg-blue-500 hover:text-white ${
      location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-800'
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-blue-700">VPN Dashboard</div>
      <div className="space-x-4">
        <Link to="/" className={navItemClass('/')}>🏠 Dashboard</Link>
        <Link to="/nodes" className={navItemClass('/nodes')}>🛰️ Nodes</Link>
        <Link to="/alerts" className={navItemClass('/alerts')}>🚨 Alertes</Link>
        <Link to="/reports" className={navItemClass('/reports')}>📊 Rapports</Link>
        <Link to="/settings" className={navItemClass('/settings')}>⚙️ Paramètres</Link>
      </div>
    </nav>
  );
}

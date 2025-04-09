import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('/api/alerts')
      .then(res => setAlerts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🚨 Alertes Récentes</h2>
      <ul className="bg-white p-4 rounded shadow space-y-2">
        {alerts.length > 0 ? alerts.map((alert, index) => (
          <li key={index} className={`p-2 border-l-4 ${alert.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
            <strong>{alert.timestamp}</strong> — {alert.message}
          </li>
        )) : (
          <p className="text-gray-600">Aucune alerte enregistrée.</p>
        )}
      </ul>
    </div>
  );
}

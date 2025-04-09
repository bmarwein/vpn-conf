import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Nodes() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    axios.get('/api/nodes')
      .then(res => setNodes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🛰️ Gestion des Nodes</h2>
      <table className="table-auto w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Fournisseur</th>
            <th className="p-2">Pays</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr key={node.id} className="border-t">
              <td className="p-2">{node.id}</td>
              <td className="p-2">{node.vpn.provider}</td>
              <td className="p-2">{node.vpn.country}</td>
              <td className="p-2">{node.status}</td>
              <td className="p-2 space-x-2">
                <button className="bg-yellow-300 px-2 py-1 rounded">Redémarrer</button>
                <button className="bg-gray-300 px-2 py-1 rounded">Changer Pays</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

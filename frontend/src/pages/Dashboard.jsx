import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default function Dashboard() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    axios.get('/api/nodes')
      .then(res => setNodes(res.data))
      .catch(err => console.error('Erreur chargement des nodes', err));
  }, []);

  const positions = nodes.map(node => ({
    id: node.id,
    coords: [node.location.lat, node.location.lng],
    label: `${node.vpn.provider} - ${node.vpn.country}`
  }));

  const polyline = positions.map(pos => pos.coords);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🌍 Carte des VPN Nodes</h2>
      <MapContainer center={[45, 5]} zoom={3} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map(pos => (
          <Marker key={pos.id} position={pos.coords}>
            <Tooltip>{pos.label}</Tooltip>
          </Marker>
        ))}
        {polyline.length > 1 && (
          <Polyline positions={polyline} color="blue" />
        )}
      </MapContainer>
    </div>
  );
}

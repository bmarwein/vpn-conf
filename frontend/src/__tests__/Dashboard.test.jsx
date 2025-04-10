jest.mock('leaflet/dist/leaflet.css', () => {});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

describe('Dashboard', () => {
  it('affiche le titre de la page Dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Statut des VPN Nodes/i)).toBeInTheDocument();
  });
});

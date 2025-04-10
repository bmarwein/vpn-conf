import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Supprimer les warnings dans les tests Jest
beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation((msg) => {
      if (
        msg.includes('React Router Future Flag Warning') ||
        msg.includes('Relative route resolution')
      ) return;
      console.warn(msg);
    });
  });
  
describe('Navbar', () => {
  it('affiche le titre du dashboard', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByText(/VPN Dashboard/i)).toBeInTheDocument();
  });

  it('affiche tous les liens principaux', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByText('🏠 Dashboard')).toBeInTheDocument();
    expect(screen.getByText('🛰️ Nodes')).toBeInTheDocument();
    expect(screen.getByText('🚨 Alertes')).toBeInTheDocument();
    expect(screen.getByText('📊 Rapports')).toBeInTheDocument();
    expect(screen.getByText('⚙️ Paramètres')).toBeInTheDocument();
  });
});

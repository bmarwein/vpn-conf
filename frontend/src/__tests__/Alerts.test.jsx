import React from 'react';
import { render, screen } from '@testing-library/react';
import Alerts from '../pages/Alerts';

describe('Alerts', () => {
  it('affiche les alertes ou un message vide', () => {
    render(<Alerts />);
    expect(screen.getByText(/Alertes Récentes/i)).toBeInTheDocument();
  });
});

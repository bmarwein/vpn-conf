import React from 'react';
import { render, screen } from '@testing-library/react';
import Settings from '../pages/Settings';

describe('Settings', () => {
  it('affiche la page des paramètres', () => {
    render(<Settings />);
    expect(screen.getByText(/⚙️ Paramètres/i)).toBeInTheDocument();
  });
});

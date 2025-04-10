import React from 'react';
import { render, screen } from '@testing-library/react';
import Nodes from '../pages/Nodes';

describe('Nodes', () => {
  it('affiche la liste des nodes ou un message', () => {
    render(<Nodes />);
    expect(screen.getByText(/Gestion des Nodes/i)).toBeInTheDocument();
  });
});

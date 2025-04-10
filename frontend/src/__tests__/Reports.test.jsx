import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Reports from '../pages/Reports';
import axios from 'axios';

jest.mock('axios');

describe('Rapports', () => {
  it('permet de générer un rapport hebdomadaire', async () => {
    axios.post.mockResolvedValue({ data: { file: 'weekly-report-test.html' } });
    render(<Reports />);
    
    const button = screen.getByText(/Générer le rapport/);
    fireEvent.click(button);

    expect(await screen.findByText(/Voir le rapport/)).toBeInTheDocument();
  });
});

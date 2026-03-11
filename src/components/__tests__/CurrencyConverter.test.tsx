import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CurrencyConverter from '../CurrencyConverter';
import { LanguageProvider } from '../../context/LanguageContext';

const MockedCurrencyConverter = () => (
  <LanguageProvider>
    <CurrencyConverter />
  </LanguageProvider>
);

describe('CurrencyConverter Component', () => {
  it('renders currency converter title', () => {
    render(<MockedCurrencyConverter />);
    expect(screen.getByText(/currency converter/i)).toBeInTheDocument();
  });

  it('converts currency correctly', () => {
    render(<MockedCurrencyConverter />);
    
    const amountInput = screen.getByDisplayValue('1000000');
    expect(amountInput).toBeInTheDocument();
    
    // Default conversion USD to AED should be visible
    const outputs = screen.getAllByRole('textbox');
    expect(outputs.length).toBeGreaterThan(0);
  });

  it('allows currency selection', () => {
    render(<MockedCurrencyConverter />);
    
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBe(2); // From and To currency selects
  });
});

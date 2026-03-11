import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PropertyComparison, { useComparison } from '../PropertyComparison';
import { LanguageProvider } from '../../context/LanguageContext';
import { renderHook } from '@testing-library/react';

const MockedPropertyComparison = () => (
  <BrowserRouter>
    <LanguageProvider>
      <PropertyComparison />
    </LanguageProvider>
  </BrowserRouter>
);

describe('PropertyComparison Component', () => {
  it('does not render when no properties are selected', () => {
    localStorage.removeItem('landai:comparison');
    const { container } = render(<MockedPropertyComparison />);
    expect(container.firstChild).toBeNull();
  });

  it('useComparison hook works correctly', () => {
    localStorage.removeItem('landai:comparison');
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>
        <LanguageProvider>{children}</LanguageProvider>
      </BrowserRouter>
    );

    const { result } = renderHook(() => useComparison(), { wrapper });
    
    expect(result.current.selectedIds).toEqual([]);
    expect(result.current.isInComparison('test-id')).toBe(false);
  });
});

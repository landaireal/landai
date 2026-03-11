import { describe, it, expect } from 'vitest';
import {
  calculatePayment,
  formatCurrency,
  calculateMonthlyPaymentOverYears,
} from './paymentCalculator';
import { PAYMENT_PLANS } from '../types/payment';

describe('paymentCalculator', () => {
  describe('calculatePayment', () => {
    it('calculates full payment correctly', () => {
      const fullPlan = PAYMENT_PLANS.find((p) => p.type === 'full-payment')!;
      const result = calculatePayment(1_000_000, fullPlan);

      expect(result.propertyPrice).toBe(1_000_000);
      expect(result.downPayment).toBe(1_000_000);
      expect(result.loanAmount).toBe(0);
      expect(result.totalAmount).toBe(1_000_000);
      expect(result.totalInterest).toBe(0);
      expect(result.processingFee).toBe(0);
    });

    it('calculates monthly plan with down payment and interest', () => {
      const monthlyPlan = PAYMENT_PLANS.find((p) => p.type === 'monthly')!;
      const result = calculatePayment(2_000_000, monthlyPlan);

      expect(result.propertyPrice).toBe(2_000_000);
      expect(result.downPayment).toBe(400_000); // 20%
      expect(result.loanAmount).toBe(1_600_000);
      expect(result.totalInstallments).toBe(12);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.processingFee).toBeGreaterThan(0);
      expect(result.totalAmount).toBeGreaterThan(2_000_000);
    });

    it('returns installment amount for multi-installment plans', () => {
      const quarterlyPlan = PAYMENT_PLANS.find((p) => p.type === 'quarterly')!;
      const result = calculatePayment(1_000_000, quarterlyPlan);

      expect(result.totalInstallments).toBe(4);
      expect(result.installmentAmount).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeGreaterThan(0);
    });
  });

  describe('formatCurrency', () => {
    it('formats amount with default AED currency', () => {
      expect(formatCurrency(1500000)).toBe('AED 1,500,000');
    });

    it('formats amount with custom currency', () => {
      expect(formatCurrency(100000, 'USD')).toBe('USD 100,000');
    });

    it('formats zero correctly', () => {
      expect(formatCurrency(0)).toBe('AED 0');
    });
  });

  describe('calculateMonthlyPaymentOverYears', () => {
    it('calculates loan over years with interest', () => {
      const result = calculateMonthlyPaymentOverYears(
        1_000_000,
        10,
        20,
        4.5
      );

      expect(result.propertyPrice).toBe(1_000_000);
      expect(result.downPayment).toBe(200_000);
      expect(result.loanAmount).toBe(800_000);
      expect(result.totalInstallments).toBe(120);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalAmount).toBeGreaterThan(1_000_000);
      expect(result.totalInterest).toBeGreaterThan(0);
    });
  });
});

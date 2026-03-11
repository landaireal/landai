import { PaymentPlan, PaymentCalculation } from '../types/payment';

export function calculatePayment(
  propertyPrice: number,
  plan: PaymentPlan
): PaymentCalculation {
  // Calculate down payment
  const downPayment = (propertyPrice * plan.downPaymentPercentage) / 100;
  
  // Calculate loan amount (remaining after down payment)
  const loanAmount = propertyPrice - downPayment;
  
  // Calculate processing fee
  const processingFee = (loanAmount * plan.processingFee) / 100;
  
  // Calculate total interest
  const totalInterest = (loanAmount * plan.interestRate) / 100;
  
  // Calculate total amount to be paid
  const totalAmount = downPayment + loanAmount + totalInterest + processingFee;
  
  // Calculate installment amount (excluding down payment)
  const installmentAmount = plan.installments === 1 
    ? totalAmount 
    : (loanAmount + totalInterest + processingFee) / plan.installments;
  
  // Calculate monthly payment (for comparison purposes)
  const monthsPerInstallment = 12 / plan.installments;
  const monthlyPayment = plan.installments === 1 
    ? totalAmount 
    : installmentAmount / monthsPerInstallment;

  return {
    propertyPrice,
    downPayment,
    loanAmount,
    installmentAmount,
    totalInstallments: plan.installments,
    totalInterest,
    processingFee,
    totalAmount,
    monthlyPayment,
  };
}

export function formatCurrency(amount: number, currency: string = 'AED'): string {
  return `${currency} ${amount.toLocaleString('en-US', { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  })}`;
}

export function calculateMonthlyPaymentOverYears(
  propertyPrice: number,
  years: number,
  downPaymentPercentage: number = 20,
  annualInterestRate: number = 4.5
): PaymentCalculation {
  const downPayment = (propertyPrice * downPaymentPercentage) / 100;
  const loanAmount = propertyPrice - downPayment;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalInstallments = years * 12;
  
  // Calculate monthly payment using loan formula
  const monthlyPayment = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalInstallments)) /
    (Math.pow(1 + monthlyInterestRate, totalInstallments) - 1);
  
  const totalAmount = downPayment + (monthlyPayment * totalInstallments);
  const totalInterest = totalAmount - propertyPrice;
  
  return {
    propertyPrice,
    downPayment,
    loanAmount,
    installmentAmount: monthlyPayment,
    totalInstallments,
    totalInterest,
    processingFee: 0,
    totalAmount,
    monthlyPayment,
  };
}

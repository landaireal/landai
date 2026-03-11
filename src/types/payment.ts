// Payment plan types and interfaces

export type PaymentPlanType = 
  | 'monthly' 
  | 'quarterly' 
  | 'semi-annual' 
  | 'three-quarterly' 
  | 'annual' 
  | 'full-payment';

export interface PaymentPlan {
  type: PaymentPlanType;
  label: string;
  labelAr: string;
  installments: number;
  interestRate: number; // Annual interest rate percentage
  downPaymentPercentage: number;
  processingFee: number; // Percentage
  popular?: boolean;
}

export interface PaymentCalculation {
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  installmentAmount: number;
  totalInstallments: number;
  totalInterest: number;
  processingFee: number;
  totalAmount: number;
  monthlyPayment: number;
}

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    type: 'full-payment',
    label: 'Full Payment',
    labelAr: 'الدفع الكامل',
    installments: 1,
    interestRate: 0,
    downPaymentPercentage: 100,
    processingFee: 0,
  },
  {
    type: 'monthly',
    label: 'Monthly Payment',
    labelAr: 'دفع شهري',
    installments: 12,
    interestRate: 4.5,
    downPaymentPercentage: 20,
    processingFee: 1,
    popular: true,
  },
  {
    type: 'quarterly',
    label: 'Quarterly Payment',
    labelAr: 'دفع ربع سنوي',
    installments: 4,
    interestRate: 3.5,
    downPaymentPercentage: 25,
    processingFee: 0.8,
  },
  {
    type: 'semi-annual',
    label: 'Semi-Annual Payment',
    labelAr: 'دفع نصف سنوي',
    installments: 2,
    interestRate: 2.5,
    downPaymentPercentage: 30,
    processingFee: 0.5,
  },
  {
    type: 'three-quarterly',
    label: 'Three Quarterly Payment',
    labelAr: 'دفع ثلاثة أرباع سنوي',
    installments: 3,
    interestRate: 3,
    downPaymentPercentage: 25,
    processingFee: 0.7,
  },
  {
    type: 'annual',
    label: 'Annual Payment',
    labelAr: 'دفع سنوي',
    installments: 1,
    interestRate: 0,
    downPaymentPercentage: 100,
    processingFee: 0,
  },
];

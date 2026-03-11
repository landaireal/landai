// Payment gateway types and interfaces

export type PaymentMethodType = 
  | 'credit-card'
  | 'debit-card'
  | 'paypal'
  | 'apple-pay'
  | 'google-pay'
  | 'instapay'
  | 'crypto-bitcoin'
  | 'crypto-ethereum'
  | 'crypto-usdt'
  | 'bank-transfer'
  | 'cash';

export interface PaymentMethod {
  type: PaymentMethodType;
  name: string;
  nameAr: string;
  icon: string;
  description: string;
  descriptionAr: string;
  processingTime: string;
  processingTimeAr: string;
  fee: number; // Percentage
  popular?: boolean;
  recommended?: boolean;
}

export interface CreditCardInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface BankTransferInfo {
  accountNumber: string;
  accountHolder: string;
  bankName: string;
  swiftCode?: string;
}

export interface CryptoPaymentInfo {
  walletAddress: string;
  network: string;
  amount: number;
  currency: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    type: 'credit-card',
    name: 'Credit Card',
    nameAr: 'بطاقة الائتمان',
    icon: '💳',
    description: 'Visa, Mastercard, American Express',
    descriptionAr: 'فيزا، ماستركارد، أمريكان إكسبريس',
    processingTime: 'Instant',
    processingTimeAr: 'فوري',
    fee: 2.9,
    popular: true,
  },
  {
    type: 'debit-card',
    name: 'Debit Card',
    nameAr: 'بطاقة الخصم',
    icon: '💳',
    description: 'Direct debit from your bank account',
    descriptionAr: 'خصم مباشر من حسابك البنكي',
    processingTime: 'Instant',
    processingTimeAr: 'فوري',
    fee: 1.9,
    recommended: true,
  },
  {
    type: 'paypal',
    name: 'PayPal',
    nameAr: 'باي بال',
    icon: '💰',
    description: 'Pay securely with your PayPal account',
    descriptionAr: 'ادفع بأمان باستخدام حساب PayPal',
    processingTime: 'Instant',
    processingTimeAr: 'فوري',
    fee: 3.5,
    popular: true,
  },
  {
    type: 'apple-pay',
    name: 'Apple Pay',
    nameAr: 'آبل باي',
    icon: '',
    description: 'Fast and secure payment with Apple Pay',
    descriptionAr: 'دفع سريع وآمن مع Apple Pay',
    processingTime: 'Instant',
    processingTimeAr: 'فوري',
    fee: 2.5,
  },
  {
    type: 'google-pay',
    name: 'Google Pay',
    nameAr: 'جوجل باي',
    icon: '🔵',
    description: 'Pay with your Google account',
    descriptionAr: 'ادفع باستخدام حساب Google',
    processingTime: 'Instant',
    processingTimeAr: 'فوري',
    fee: 2.5,
  },
  {
    type: 'instapay',
    name: 'InstaPay',
    nameAr: 'إنستاباي',
    icon: '⚡',
    description: 'Instant bank transfer in UAE',
    descriptionAr: 'تحويل بنكي فوري في الإمارات',
    processingTime: 'Instant',
    processingTimeAr: 'فوري',
    fee: 0,
    recommended: true,
  },
  {
    type: 'crypto-bitcoin',
    name: 'Bitcoin (BTC)',
    nameAr: 'بيتكوين',
    icon: '₿',
    description: 'Pay with Bitcoin cryptocurrency',
    descriptionAr: 'ادفع بعملة البيتكوين',
    processingTime: '10-30 minutes',
    processingTimeAr: '10-30 دقيقة',
    fee: 1.0,
  },
  {
    type: 'crypto-ethereum',
    name: 'Ethereum (ETH)',
    nameAr: 'إيثيريوم',
    icon: '◈',
    description: 'Pay with Ethereum cryptocurrency',
    descriptionAr: 'ادفع بعملة الإيثيريوم',
    processingTime: '2-5 minutes',
    processingTimeAr: '2-5 دقائق',
    fee: 1.0,
  },
  {
    type: 'crypto-usdt',
    name: 'USDT (Tether)',
    nameAr: 'تيثر',
    icon: '₮',
    description: 'Pay with USDT stablecoin',
    descriptionAr: 'ادفع بعملة USDT المستقرة',
    processingTime: '2-5 minutes',
    processingTimeAr: '2-5 دقائق',
    fee: 0.5,
  },
  {
    type: 'bank-transfer',
    name: 'Bank Transfer',
    nameAr: 'تحويل بنكي',
    icon: '🏦',
    description: 'Direct transfer from your bank',
    descriptionAr: 'تحويل مباشر من البنك',
    processingTime: '1-3 business days',
    processingTimeAr: '1-3 أيام عمل',
    fee: 0,
  },
  {
    type: 'cash',
    name: 'Cash Payment',
    nameAr: 'الدفع النقدي',
    icon: '💵',
    description: 'Pay in cash at our office',
    descriptionAr: 'ادفع نقداً في مكتبنا',
    processingTime: 'Schedule appointment',
    processingTimeAr: 'حدد موعد',
    fee: 0,
  },
];

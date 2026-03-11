import { useState } from 'react';
import { CreditCard, Lock, AlertCircle, Calendar, User, Building, Wallet } from 'lucide-react';
import { PaymentMethod } from '../types/paymentGateway';
import { Property } from '../services/api';
import { formatCurrency } from '../utils/paymentCalculator';

interface PaymentFormProps {
  method: PaymentMethod;
  amount: number;
  property: Property;
  isAr: boolean;
  onBack: () => void;
  onSuccess: () => void;
}

export function CreditDebitCardForm({ method, amount, property, isAr, onBack, onSuccess }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
        <CreditCard className="w-8 h-8 text-blue-600" />
        {isAr ? 'تفاصيل البطاقة' : 'Card Details'}
      </h3>
      
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-500/30">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
              {isAr ? 'دفع آمن ومشفر' : 'Secure and Encrypted Payment'}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {isAr 
                ? 'معلوماتك محمية بتشفير SSL 256-bit'
                : 'Your information is protected with 256-bit SSL encryption'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {isAr ? 'رقم البطاقة' : 'Card Number'}
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-zinc-900 dark:text-white focus:border-blue-500 dark:focus:border-cyan-400 outline-none transition-colors pl-12"
              required
            />
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-2 mt-2">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-8" />
            <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-8" />
          </div>
        </div>

        {/* Card Holder */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {isAr ? 'اسم حامل البطاقة' : 'Cardholder Name'}
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-zinc-900 dark:text-white focus:border-blue-500 dark:focus:border-cyan-400 outline-none transition-colors pl-12"
              required
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {isAr ? 'تاريخ الانتهاء' : 'Expiry Date'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  }
                  setExpiryDate(value);
                }}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-zinc-900 dark:text-white focus:border-blue-500 dark:focus:border-cyan-400 outline-none transition-colors pl-12"
                required
              />
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-zinc-900 dark:text-white focus:border-blue-500 dark:focus:border-cyan-400 outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Amount Summary */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
              {formatCurrency(amount, property.currency)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {isAr ? 'رجوع' : 'Back'}
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            {isAr ? 'دفع الآن' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
}

export function PayPalForm({ method, amount, property, isAr, onBack, onSuccess }: PaymentFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <span className="text-4xl">💰</span>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {isAr ? 'الدفع عبر PayPal' : 'Pay with PayPal'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {isAr ? 'بريد PayPal الإلكتروني' : 'PayPal Email'}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-zinc-900 dark:text-white focus:border-blue-500 dark:focus:border-cyan-400 outline-none transition-colors"
            required
          />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
              {formatCurrency(amount, property.currency)}
            </span>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {isAr ? 'رجوع' : 'Back'}
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg"
          >
            {isAr ? 'متابعة مع PayPal' : 'Continue with PayPal'}
          </button>
        </div>
      </form>
    </div>
  );
}

export function CryptoForm({ method, amount, property, isAr, onBack, onSuccess }: PaymentFormProps) {
  const cryptoAmount = (amount / 90000).toFixed(6); // Mock conversion rate

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
          <span className="text-4xl">{method.icon}</span>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {isAr ? `الدفع بـ ${method.nameAr}` : `Pay with ${method.name}`}
        </h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-500/30">
          <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
            {isAr ? 'مبلغ العملة المشفرة' : 'Cryptocurrency Amount'}
          </p>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {cryptoAmount} {method.name.split(' ')[0]}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            ≈ {formatCurrency(amount, property.currency)}
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {isAr ? 'أرسل إلى هذا العنوان' : 'Send to this address'}
          </p>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-300 dark:border-gray-600 font-mono text-sm break-all">
            bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
          </div>
          <button className="mt-3 text-sm text-blue-600 dark:text-cyan-400 hover:underline">
            {isAr ? 'نسخ العنوان' : 'Copy Address'}
          </button>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-semibold mb-1">
                {isAr ? 'مهم' : 'Important'}
              </p>
              <p>
                {isAr 
                  ? 'سيتم تأكيد الدفع بعد 3 تأكيدات على الشبكة (تقريباً 30 دقيقة)'
                  : 'Payment will be confirmed after 3 network confirmations (approximately 30 minutes)'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onBack}
            className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {isAr ? 'رجوع' : 'Back'}
          </button>
          <button
            onClick={onSuccess}
            className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg"
          >
            {isAr ? 'لقد دفعت' : 'I Have Paid'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function BankTransferForm({ method, amount, property, isAr, onBack, onSuccess }: PaymentFormProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <Building className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {isAr ? 'تفاصيل التحويل البنكي' : 'Bank Transfer Details'}
        </h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-3">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{isAr ? 'اسم البنك' : 'Bank Name'}</p>
            <p className="font-semibold text-zinc-900 dark:text-white">Emirates NBD</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{isAr ? 'رقم الحساب' : 'Account Number'}</p>
            <p className="font-semibold text-zinc-900 dark:text-white">1234567890123</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{isAr ? 'اسم الحساب' : 'Account Name'}</p>
            <p className="font-semibold text-zinc-900 dark:text-white">Land AI Real Estate LLC</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">IBAN</p>
            <p className="font-semibold text-zinc-900 dark:text-white">AE070331234567890123456</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">SWIFT Code</p>
            <p className="font-semibold text-zinc-900 dark:text-white">EBILAEAD</p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">{isAr ? 'المبلغ المطلوب تحويله' : 'Amount to Transfer'}</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
              {formatCurrency(amount, property.currency)}
            </span>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-semibold mb-1">{isAr ? 'ملاحظة هامة' : 'Important Note'}</p>
              <p>{isAr ? 'يرجى تضمين رقم العقار في وصف التحويل' : 'Please include property ID in transfer description'}: <strong>{property.id}</strong></p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onBack}
            className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {isAr ? 'رجوع' : 'Back'}
          </button>
          <button
            onClick={onSuccess}
            className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg"
          >
            {isAr ? 'لقد حولت المبلغ' : 'I Have Transferred'}
          </button>
        </div>
      </div>
    </div>
  );
}

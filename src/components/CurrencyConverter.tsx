import { useState } from 'react';
import { DollarSign, ArrowRightLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', rate: 3.75 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.24 },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1000000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('AED');
  const { language } = useLanguage();

  const convert = () => {
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
    const amountNum = parseFloat(amount) || 0;
    return (amountNum / fromRate * toRate).toFixed(2);
  };

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-blue-100 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500 dark:bg-cyan-500 rounded-xl">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {language === 'ar' ? 'محول العملات' : 'Currency Converter'}
        </h3>
      </div>

      <div className="space-y-4">
        {/* From */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {language === 'ar' ? 'من' : 'From'}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            onClick={swap}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white transition-colors"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        {/* To */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {language === 'ar' ? 'إلى' : 'To'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={convert()}
              readOnly
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

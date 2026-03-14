import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  propertyPrice: number;
  currency: string;
}

export default function MortgageCalculator({ propertyPrice, currency }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  
  const [downPayment, setDownPayment] = useState(20);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(3.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [downPayment, loanTerm, interestRate, propertyPrice]);

  const calculateMortgage = () => {
    const principal = propertyPrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const payment = principal / numberOfPayments;
      setMonthlyPayment(payment);
      setTotalPayment(principal);
      setTotalInterest(0);
    } else {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      const total = payment * numberOfPayments;
      const interest = total - principal;

      setMonthlyPayment(payment);
      setTotalPayment(total);
      setTotalInterest(interest);
    }
  };

  const downPaymentAmount = propertyPrice * (downPayment / 100);
  const loanAmount = propertyPrice - downPaymentAmount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-6 md:p-8 border-2 border-blue-200 dark:border-blue-500/40 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
            {isAr ? 'حاسبة الرهن العقاري' : 'Mortgage Calculator'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isAr ? 'احسب الدفعات الشهرية' : 'Calculate your monthly payments'}
          </p>
        </div>
      </div>

      {/* Input Controls */}
      <div className="space-y-6 mb-8">
        {/* Down Payment */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {isAr ? 'الدفعة الأولى' : 'Down Payment'}
            </label>
            <span className="text-lg font-black text-blue-600 dark:text-blue-400">
              {downPayment}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500 mt-1">
            <span>10%</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {currency} {downPaymentAmount.toLocaleString()}
            </span>
            <span>50%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {isAr ? 'مدة القرض' : 'Loan Term'}
            </label>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              {loanTerm} {isAr ? 'سنة' : 'years'}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 dark:bg-indigo-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500 mt-1">
            <span>5 {isAr ? 'سنوات' : 'years'}</span>
            <span>30 {isAr ? 'سنة' : 'years'}</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Percent className="w-4 h-4" />
              {isAr ? 'معدل الفائدة' : 'Interest Rate'}
            </label>
            <span className="text-lg font-black text-purple-600 dark:text-purple-400">
              {interestRate}%
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-purple-200 dark:bg-purple-800 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-400"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500 mt-1">
            <span>1.0%</span>
            <span>8.0%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Monthly Payment - Featured */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm font-semibold mb-1">
                {isAr ? 'الدفعة الشهرية' : 'Monthly Payment'}
              </p>
              <p className="text-3xl md:text-4xl font-black text-white">
                {currency} {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border-2 border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              {isAr ? 'مبلغ القرض' : 'Loan Amount'}
            </p>
            <p className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
              {currency} {loanAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border-2 border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              {isAr ? 'إجمالي الفائدة' : 'Total Interest'}
            </p>
            <p className="text-lg md:text-xl font-black text-orange-600 dark:text-orange-400">
              {currency} {totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="col-span-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-4 border-2 border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              {isAr ? 'إجمالي المدفوعات' : 'Total Payment'}
            </p>
            <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              {currency} {totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              {isAr ? 'على مدى' : 'Over'} {loanTerm} {isAr ? 'سنة' : 'years'} ({loanTerm * 12} {isAr ? 'دفعة' : 'payments'})
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-500/30 rounded-xl">
        <p className="text-xs text-amber-800 dark:text-amber-300">
          {isAr 
            ? '* هذه الحسابات تقديرية ولأغراض إعلامية فقط. قد تختلف الأسعار الفعلية.'
            : '* These calculations are estimates for informational purposes only. Actual rates may vary.'}
        </p>
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, DollarSign, TrendingUp, Home } from 'lucide-react';

export default function CalculatorsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [mortgageAmount, setMortgageAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(25);

  const [propertyPrice, setPropertyPrice] = useState(2000000);
  const [rentalIncome, setRentalIncome] = useState(120000);
  const [expenses, setExpenses] = useState(20000);

  // Mortgage Calculator
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - mortgageAmount;

  // ROI Calculator
  const annualIncome = rentalIncome - expenses;
  const roi = ((annualIncome / propertyPrice) * 100).toFixed(2);

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Real Estate Calculators - Land AI Real Estate"
        description="Calculate mortgage payments, ROI, and more with our real estate calculators"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'حاسبات العقارات' : 'Real Estate Calculators'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 text-lg">
          {isAr 
            ? 'احسب دفعات الرهن العقاري والعائد على الاستثمار والمزيد'
            : 'Calculate mortgage payments, ROI, and more with our calculators'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mortgage Calculator */}
          <div className="p-8 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Home className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {isAr ? 'حاسبة الرهن العقاري' : 'Mortgage Calculator'}
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  {isAr ? 'مبلغ القرض (AED)' : 'Loan Amount (AED)'}
                </label>
                <input 
                  type="number" 
                  value={mortgageAmount}
                  onChange={(e) => setMortgageAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-transparent text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  {isAr ? 'معدل الفائدة (%)' : 'Interest Rate (%)'}
                </label>
                <input 
                  type="number" 
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-transparent text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  {isAr ? 'مدة القرض (سنوات)' : 'Loan Term (Years)'}
                </label>
                <input 
                  type="number" 
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-transparent text-zinc-900 dark:text-white"
                />
              </div>

              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700 space-y-4">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">{isAr ? 'الدفعة الشهرية:' : 'Monthly Payment:'}</span>
                  <span className="font-bold text-zinc-900 dark:text-white">AED {monthlyPayment.toFixed(2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">{isAr ? 'إجمالي الدفعات:' : 'Total Payment:'}</span>
                  <span className="font-bold text-zinc-900 dark:text-white">AED {totalPayment.toFixed(2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">{isAr ? 'إجمالي الفائدة:' : 'Total Interest:'}</span>
                  <span className="font-bold text-blue-600 dark:text-cyan-400">AED {totalInterest.toFixed(2).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="p-8 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {isAr ? 'حاسبة العائد على الاستثمار' : 'ROI Calculator'}
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  {isAr ? 'سعر العقار (AED)' : 'Property Price (AED)'}
                </label>
                <input 
                  type="number" 
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-transparent text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  {isAr ? 'الدخل الإيجاري السنوي (AED)' : 'Annual Rental Income (AED)'}
                </label>
                <input 
                  type="number" 
                  value={rentalIncome}
                  onChange={(e) => setRentalIncome(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-transparent text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  {isAr ? 'المصاريف السنوية (AED)' : 'Annual Expenses (AED)'}
                </label>
                <input 
                  type="number" 
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-transparent text-zinc-900 dark:text-white"
                />
              </div>

              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700 space-y-4">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">{isAr ? 'الدخل السنوي الصافي:' : 'Annual Net Income:'}</span>
                  <span className="font-bold text-zinc-900 dark:text-white">AED {annualIncome.toLocaleString()}</span>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 dark:text-green-300 font-bold">{isAr ? 'العائد على الاستثمار:' : 'ROI:'}</span>
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">{roi}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

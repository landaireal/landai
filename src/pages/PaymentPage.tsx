import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useProperty } from '../hooks/useProperty';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { PAYMENT_PLANS, PaymentPlan } from '../types/payment';
import { calculatePayment, formatCurrency } from '../utils/paymentCalculator';
import { 
  ArrowLeft, 
  CheckCircle, 
  CreditCard, 
  Calendar,
  TrendingDown,
  Shield,
  Clock,
  Percent
} from 'lucide-react';

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isAr = language === 'ar';
  const { property, loading, error } = useProperty(id);
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>(PAYMENT_PLANS[1]); // Default to monthly
  const [showCheckout, setShowCheckout] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-20 flex flex-col justify-center items-center">
        <p className="text-red-500 mb-4">{error || 'Property not found'}</p>
        <button
          onClick={() => navigate('/properties')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {t('backToProperties')}
        </button>
      </div>
    );
  }

  const calculation = calculatePayment(property.price, selectedPlan);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50 dark:bg-gray-900">
      <SEO 
        title={`Payment Plans - ${property.title} - Land AI Real Estate`}
        description={`Flexible payment plans for ${property.title}. Choose from monthly, quarterly, semi-annual, or annual payment options.`}
      />
      
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/properties/${id}`)}
          className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          {isAr ? 'العودة إلى تفاصيل العقار' : 'Back to Property Details'}
        </button>

        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                {isAr ? 'خطط الدفع' : 'Payment Plans'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">{property.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{property.location}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {isAr ? 'سعر العقار' : 'Property Price'}
              </div>
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-gold-300 dark:to-yellow-500">
                {formatCurrency(property.price, property.currency)}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Plans Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
            {isAr ? 'اختر خطة الدفع' : 'Choose Your Payment Plan'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAYMENT_PLANS.map((plan) => {
              const planCalc = calculatePayment(property.price, plan);
              const isSelected = selectedPlan.type === plan.type;
              
              return (
                <button
                  key={plan.type}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 transition-all text-left ${
                    isSelected
                      ? 'border-blue-500 dark:border-cyan-400 shadow-lg scale-105'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-cyan-500'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      {isAr ? 'الأكثر شعبية' : 'Most Popular'}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {isAr ? plan.labelAr : plan.label}
                    </h3>
                    {isSelected && (
                      <CheckCircle className="w-6 h-6 text-blue-500 dark:text-cyan-400" />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {plan.installments === 1 
                          ? (isAr ? 'دفعة واحدة' : 'One-time payment')
                          : `${plan.installments} ${isAr ? 'أقساط' : 'installments'}`
                        }
                      </span>
                    </div>
                    
                    {plan.interestRate > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Percent className="w-4 h-4" />
                        <span>
                          {plan.interestRate}% {isAr ? 'فائدة سنوية' : 'annual interest'}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <TrendingDown className="w-4 h-4" />
                      <span>
                        {plan.downPaymentPercentage}% {isAr ? 'دفعة أولى' : 'down payment'}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-500 mb-1">
                        {plan.installments === 1 
                          ? (isAr ? 'المبلغ الإجمالي' : 'Total Amount')
                          : (isAr ? 'الدفعة لكل قسط' : 'Per Installment')
                        }
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
                        {formatCurrency(planCalc.installmentAmount, property.currency)}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Breakdown Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                {isAr ? 'تفاصيل الدفع' : 'Payment Breakdown'}
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    {isAr ? 'سعر العقار' : 'Property Price'}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {formatCurrency(calculation.propertyPrice, property.currency)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    {isAr ? 'الدفعة الأولى' : 'Down Payment'} ({selectedPlan.downPaymentPercentage}%)
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(calculation.downPayment, property.currency)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    {isAr ? 'مبلغ القرض' : 'Loan Amount'}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {formatCurrency(calculation.loanAmount, property.currency)}
                  </span>
                </div>

                {calculation.totalInterest > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      {isAr ? 'الفائدة الإجمالية' : 'Total Interest'} ({selectedPlan.interestRate}%)
                    </span>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      {formatCurrency(calculation.totalInterest, property.currency)}
                    </span>
                  </div>
                )}

                {calculation.processingFee > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      {isAr ? 'رسوم المعالجة' : 'Processing Fee'} ({selectedPlan.processingFee}%)
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      {formatCurrency(calculation.processingFee, property.currency)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 mt-4">
                  <span className="text-lg font-bold text-zinc-900 dark:text-white">
                    {isAr ? 'المبلغ الإجمالي' : 'Total Amount'}
                  </span>
                  <span className="text-2xl font-black text-blue-600 dark:text-cyan-400">
                    {formatCurrency(calculation.totalAmount, property.currency)}
                  </span>
                </div>

                {selectedPlan.installments > 1 && (
                  <>
                    <div className="flex justify-between items-center py-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-4">
                      <span className="font-bold text-zinc-900 dark:text-white">
                        {isAr ? 'الدفعة لكل قسط' : 'Per Installment'}
                      </span>
                      <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(calculation.installmentAmount, property.currency)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600 dark:text-gray-400">
                        {isAr ? 'عدد الأقساط' : 'Number of Installments'}
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {calculation.totalInstallments}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                {isAr ? 'لماذا تختار هذه الخطة؟' : 'Why Choose This Plan?'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      {isAr ? 'آمن ومضمون' : 'Secure & Protected'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isAr ? 'معاملات آمنة بتقنية البلوكشين' : 'Blockchain secured transactions'}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      {isAr ? 'موافقة سريعة' : 'Quick Approval'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isAr ? 'معالجة فورية خلال 24 ساعة' : 'Instant processing within 24 hours'}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      {isAr ? 'أسعار تنافسية' : 'Competitive Rates'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isAr ? 'أفضل الأسعار في السوق' : 'Best rates in the market'}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      {isAr ? 'طرق دفع متعددة' : 'Flexible Payment'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {isAr ? 'خيارات دفع متنوعة' : 'Multiple payment methods'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                {isAr ? 'ملخص الطلب' : 'Order Summary'}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{isAr ? 'خطة الدفع' : 'Payment Plan'}</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {isAr ? selectedPlan.labelAr : selectedPlan.label}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{isAr ? 'الدفعة الأولى' : 'Down Payment'}</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {formatCurrency(calculation.downPayment, property.currency)}
                  </span>
                </div>
                {selectedPlan.installments > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{isAr ? 'القسط الشهري' : 'Per Installment'}</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      {formatCurrency(calculation.installmentAmount, property.currency)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-zinc-900 dark:text-white">{isAr ? 'المبلغ الإجمالي' : 'Total'}</span>
                  <span className="text-2xl font-black text-blue-600 dark:text-cyan-400">
                    {formatCurrency(calculation.totalAmount, property.currency)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/properties/${id}/payment/gateway?amount=${calculation.totalAmount}&plan=${selectedPlan.type}`)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg"
                >
                  {isAr ? 'متابعة للدفع' : 'Proceed to Payment'}
                </button>
                <button 
                  onClick={() => navigate(`/properties/${id}`)}
                  className="w-full py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {isAr ? 'العودة للعقار' : 'Back to Property'}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>{isAr ? 'معاملة آمنة ومشفرة' : 'Secure encrypted transaction'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Modal (Simple version) */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                {isAr ? 'معلومات الدفع' : 'Payment Information'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {isAr 
                  ? 'سيتم توجيهك إلى بوابة الدفع الآمنة لإتمام العملية.'
                  : 'You will be redirected to our secure payment gateway to complete the transaction.'
                }
              </p>
              <div className="space-y-3">
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                  {isAr ? 'متابعة للدفع' : 'Continue to Payment'}
                </button>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

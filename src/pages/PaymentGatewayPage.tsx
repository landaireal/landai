import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useProperty } from '../hooks/useProperty';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { PAYMENT_METHODS, PaymentMethod } from '../types/paymentGateway';
import { formatCurrency } from '../utils/paymentCalculator';
import { CreditDebitCardForm, PayPalForm, CryptoForm, BankTransferForm } from '../components/PaymentForms';
import { 
  ArrowLeft, 
  CheckCircle, 
  CreditCard, 
  Lock,
  Shield,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function PaymentGatewayPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isAr = language === 'ar';
  const { property, loading, error } = useProperty(id);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Get amount from URL params
  const amount = parseFloat(searchParams.get('amount') || '0');
  const planType = searchParams.get('plan') || '';

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

  const totalAmount = amount || property.price;
  const processingFee = selectedMethod ? (totalAmount * selectedMethod.fee) / 100 : 0;
  const finalAmount = totalAmount + processingFee;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:bg-gradient-to-br dark:from-[#030014] dark:via-[#0a0a2e] dark:to-[#1a0b2e] relative overflow-hidden">
      {/* 12D Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/5 rounded-full blur-[120px] animate-pulse delay-500"></div>
      </div>

      <SEO 
        title={`Payment Gateway - ${property.title} - Land AI Real Estate`}
        description={`Secure payment for ${property.title}. Multiple payment methods available.`}
      />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/properties/${id}/payment`)}
          className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          {isAr ? 'العودة إلى خطط الدفع' : 'Back to Payment Plans'}
        </button>

        {/* Header - 12D Enhanced */}
        <div className="glass-12d rounded-[3rem] p-8 mb-8 border border-zinc-200 dark:border-white/20 shadow-xl dark:shadow-[0_20px_70px_rgba(6,182,212,0.3)] relative overflow-hidden group">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 dark:from-cyan-500/10 dark:via-purple-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight uppercase dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {isAr ? 'بوابة الدفع الآمنة' : 'Secure Payment Gateway'}
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-semibold mt-1 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-500" />
                  {isAr ? '🔐 جميع المعاملات مشفرة بتقنية 256-bit SSL' : '🔐 All transactions encrypted with 256-bit SSL'}
                </p>
              </div>
            </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{isAr ? 'العقار' : 'Property'}</p>
              <p className="text-xl font-bold text-zinc-900 dark:text-white">{property.title}</p>
              <p className="text-sm text-gray-500">{property.location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">{isAr ? 'المبلغ المستحق' : 'Amount Due'}</p>
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {formatCurrency(totalAmount, property.currency)}
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* Payment Method Selection - 12D Enhanced */}
        {!showPaymentForm && (
          <div className="mb-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight uppercase dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {isAr ? 'اختر طريقة الدفع' : 'Select Payment Method'}
              </h2>
              <p className="text-lg text-blue-600 dark:text-purple-300 font-bold uppercase tracking-widest">
                {isAr ? '11 خيار دفع متاح' : '11 Payment Options Available'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedMethod?.type === method.type;
                
                return (
                  <button
                    key={method.type}
                    onClick={() => setSelectedMethod(method)}
                    className={`relative glass-12d rounded-[2rem] p-6 border-2 transition-all duration-500 text-left group hover:scale-105 ${
                      isSelected
                        ? 'border-blue-500 dark:border-cyan-400 shadow-2xl dark:shadow-[0_20px_60px_rgba(6,182,212,0.6)] scale-105'
                        : 'border-zinc-200 dark:border-white/20 hover:border-blue-300 dark:hover:border-cyan-500/60 hover:shadow-xl dark:hover:shadow-[0_20px_40px_rgba(6,182,212,0.3)]'
                    }`}
                  >
                    {/* 12D Glow Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-[2rem] blur-xl transition-opacity duration-500 ${
                      isSelected ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
                    }`}></div>
                    {method.popular && (
                      <div className="absolute -top-3 -right-3 z-20">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-md animate-pulse"></div>
                          <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                            ⭐ {isAr ? 'شائع' : 'Popular'}
                          </div>
                        </div>
                      </div>
                    )}
                    {method.recommended && (
                      <div className="absolute -top-3 -right-3 z-20">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur-md animate-pulse"></div>
                          <div className="relative bg-gradient-to-r from-green-500 to-emerald-700 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                            ✓ {isAr ? 'موصى به' : 'Recommended'}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative">
                          <div className={`text-5xl transition-transform duration-500 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {method.icon}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-400 dark:bg-cyan-400 rounded-full blur-md animate-pulse"></div>
                            <CheckCircle className="relative w-7 h-7 text-blue-500 dark:text-cyan-400" />
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tight dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                        {isAr ? method.nameAr : method.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium">
                        {isAr ? method.descriptionAr : method.description}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-200 dark:border-white/20">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-purple-500" />
                          <span className="text-gray-600 dark:text-gray-300 font-semibold">
                            {isAr ? method.processingTimeAr : method.processingTime}
                          </span>
                        </div>
                        <span className={`font-black uppercase tracking-wider px-2 py-1 rounded-lg ${
                          method.fee === 0 
                            ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30' 
                            : 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30'
                        }`}>
                          {method.fee === 0 ? (isAr ? 'مجاناً' : 'FREE') : `${method.fee}%`}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedMethod && (
              <div className="mt-8 glass-12d rounded-[2rem] p-8 shadow-2xl dark:shadow-[0_30px_80px_rgba(6,182,212,0.4)] border border-zinc-200 dark:border-white/20 relative overflow-hidden group">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 dark:from-cyan-500/10 dark:via-purple-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    {isAr ? 'ملخص الدفع' : 'Payment Summary'}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">{isAr ? 'المبلغ' : 'Amount'}</span>
                      <span className="text-xl font-bold text-zinc-900 dark:text-white">
                        {formatCurrency(totalAmount, property.currency)}
                      </span>
                    </div>
                    
                    {processingFee > 0 && (
                      <div className="flex justify-between items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-500/30">
                        <span className="text-orange-700 dark:text-orange-300 font-semibold">
                          {isAr ? 'رسوم المعالجة' : 'Processing Fee'} ({selectedMethod.fee}%)
                        </span>
                        <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                          {formatCurrency(processingFee, property.currency)}
                        </span>
                      </div>
                    )}
                    
                    <div className="relative mt-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl border-2 border-blue-200 dark:border-cyan-400/50 shadow-lg">
                      <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-black uppercase tracking-wider rounded-full">
                        {isAr ? 'المجموع النهائي' : 'Final Total'}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-semibold">
                            {isAr ? 'مشفر وآمن' : 'Encrypted & Secure'}
                          </span>
                        </div>
                        <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                          {formatCurrency(finalAmount, property.currency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPaymentForm(true)}
                    className="relative w-full mt-6 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-black text-lg rounded-2xl transition-all shadow-2xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)] flex items-center justify-center gap-3 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Lock className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
                    <span className="relative z-10 uppercase tracking-wider">
                      {isAr ? 'متابعة للدفع الآمن' : 'Continue to Secure Payment'}
                    </span>
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>{isAr ? 'محمي بتقنية البلوكتشين' : 'Protected by Blockchain Technology'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment Form */}
        {showPaymentForm && selectedMethod && (
          <PaymentFormRenderer 
            method={selectedMethod}
            amount={finalAmount}
            property={property}
            isAr={isAr}
            onBack={() => setShowPaymentForm(false)}
            onSuccess={() => {
              // Handle successful payment
              alert(isAr ? 'تم الدفع بنجاح! ✅' : 'Payment successful! ✅');
              navigate(`/properties/${id}`);
            }}
          />
        )}
      </div>
    </div>
  );
}

// Payment Form Renderer
function PaymentFormRenderer({ method, amount, property, isAr, onBack, onSuccess }: any) {
  const props = { method, amount, property, isAr, onBack, onSuccess };

  switch (method.type) {
    case 'credit-card':
    case 'debit-card':
      return <CreditDebitCardForm {...props} />;
    
    case 'paypal':
      return <PayPalForm {...props} />;
    
    case 'crypto-bitcoin':
    case 'crypto-ethereum':
    case 'crypto-usdt':
      return <CryptoForm {...props} />;
    
    case 'bank-transfer':
      return <BankTransferForm {...props} />;
    
    case 'apple-pay':
    case 'google-pay':
    case 'instapay':
      return <DigitalWalletForm {...props} />;
    
    case 'cash':
      return <CashPaymentForm {...props} />;
    
    default:
      return <GenericPaymentForm {...props} />;
  }
}

// Additional Payment Forms
function DigitalWalletForm({ method, amount, property, isAr, onBack, onSuccess }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <span className="text-4xl">{method.icon}</span>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {isAr ? method.nameAr : method.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {isAr ? method.descriptionAr : method.description}
        </p>
      </div>

      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">{isAr ? 'المبلغ' : 'Amount'}</span>
          <span className="text-3xl font-bold text-blue-600 dark:text-cyan-400">
            {formatCurrency(amount, property.currency)}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          {isAr ? 'رجوع' : 'Back'}
        </button>
        <button onClick={onSuccess} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg">
          {isAr ? `الدفع بـ ${method.nameAr}` : `Pay with ${method.name}`}
        </button>
      </div>
    </div>
  );
}

function CashPaymentForm({ method, amount, property, isAr, onBack, onSuccess }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <span className="text-4xl">💵</span>
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {isAr ? 'الدفع النقدي' : 'Cash Payment'}
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{isAr ? 'المبلغ النقدي' : 'Cash Amount'}</p>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(amount, property.currency)}</p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
            {isAr ? 'عنوان المكتب' : 'Office Address'}
          </h4>
          <p className="text-gray-700 dark:text-gray-300">Land AI Real Estate</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Dubai Marina, UAE</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Open: 9 AM - 6 PM</p>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-500/30">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            {isAr 
              ? 'يرجى حجز موعد قبل الزيارة للدفع النقدي'
              : 'Please schedule an appointment before visiting for cash payment'}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          {isAr ? 'رجوع' : 'Back'}
        </button>
        <button onClick={onSuccess} className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg">
          {isAr ? 'حجز موعد' : 'Schedule Appointment'}
        </button>
      </div>
    </div>
  );
}

function GenericPaymentForm({ method, amount, property, isAr, onBack, onSuccess }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
        {isAr ? method.nameAr : method.name}
      </h3>
      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">{isAr ? 'المبلغ' : 'Amount'}</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
            {formatCurrency(amount, property.currency)}
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          {isAr ? 'رجوع' : 'Back'}
        </button>
        <button onClick={onSuccess} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg">
          {isAr ? 'تأكيد' : 'Confirm'}
        </button>
      </div>
    </div>
  );
}

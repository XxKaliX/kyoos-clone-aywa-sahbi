
import { Check, Crown, Zap, Star } from 'lucide-react';

const plans = [
  {
    name: "الباقة الأساسية",
    price: "99",
    originalPrice: "149",
    period: "شهر",
    icon: Zap,
    popular: false,
    features: [
      "شحن الألعاب الأساسية",
      "دعم فني 24/7",
      "ضمان استرداد الأموال",
      "تنفيذ خلال 24 ساعة",
      "دعم عبر الواتساب"
    ],
    color: "from-gray-600 to-gray-700",
    buttonStyle: "border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
  },
  {
    name: "الباقة الذهبية",
    price: "199",
    originalPrice: "299",
    period: "شهر",
    icon: Crown,
    popular: true,
    features: [
      "جميع خدمات الباقة الأساسية",
      "خدمات وسائل التواصل الاجتماعي",
      "بطاقات رقمية مخفضة 20%",
      "أولوية في التنفيذ",
      "مدير حساب مخصص",
      "خصومات حصرية",
      "تقارير شهرية مفصلة"
    ],
    color: "from-blue-500 to-cyan-500",
    buttonStyle: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
  },
  {
    name: "الباقة الماسية",
    price: "399",
    originalPrice: "599",
    period: "شهر",
    icon: Star,
    popular: false,
    features: [
      "جميع خدمات الباقات السابقة",
      "حسابات ألعاب مميزة",
      "خدمات تسويق متقدمة",
      "استشارات مجانية",
      "خصومات VIP تصل إلى 50%",
      "دعم أولوية قصوى",
      "خدمات حصرية ومخصصة",
      "API للربط مع موقعك"
    ],
    color: "from-yellow-500 to-orange-500",
    buttonStyle: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
  }
];

const Pricing = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            اختر الباقة المناسبة لك
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            باقات متنوعة تناسب جميع احتياجاتك مع أفضل الأسعار وضمان الجودة
          </p>
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mt-6">
            <span className="text-green-400 text-sm">عرض محدود - خصم 50% على جميع الباقات</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-slate-800/50 p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20 lg:scale-110' 
                  : 'border-blue-500/20 hover:border-blue-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    الأكثر شعبية ⭐
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`bg-gradient-to-r ${plan.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <plan.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 line-through text-lg">{plan.originalPrice} ريال</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">خصم 50%</span>
                  </div>
                  <div className="flex items-baseline justify-center mt-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{plan.price} ريال</span>
                    <span className="text-gray-400 mr-2">/ {plan.period}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 px-6 rounded-xl font-bold transition-all text-lg ${plan.buttonStyle} shadow-lg`}
              >
                اشترك الآن
              </button>

              {plan.popular && (
                <div className="text-center mt-4">
                  <span className="text-green-400 text-sm font-semibold">💎 الأكثر توفيراً</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">جميع الباقات تشمل ضمان استرداد الأموال خلال 30 يوم</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ دفع آمن ومشفر</span>
            <span>✓ دعم فني 24/7</span>
            <span>✓ بدء فوري</span>
            <span>✓ ضمان الجودة</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

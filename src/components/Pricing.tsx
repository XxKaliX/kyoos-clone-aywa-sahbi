
import { Check, Crown, Zap } from 'lucide-react';

const plans = [
  {
    name: "الباقة الأساسية",
    price: "50",
    period: "شهر",
    icon: Zap,
    features: [
      "خدمات الألعاب الأساسية",
      "دعم فني 24/7",
      "ضمان الجودة",
      "تنفيذ سريع"
    ],
    highlighted: false,
    color: "from-gray-600 to-gray-700"
  },
  {
    name: "الباقة المتقدمة",
    price: "100",
    period: "شهر",
    icon: Crown,
    features: [
      "جميع خدمات الباقة الأساسية",
      "خدمات وسائل التواصل",
      "بطاقات رقمية مخفضة",
      "أولوية في التنفيذ",
      "خصومات حصرية",
      "مدير حساب مخصص"
    ],
    highlighted: true,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "الباقة المميزة",
    price: "200",
    period: "شهر",
    icon: Crown,
    features: [
      "جميع خدمات الباقات السابقة",
      "حسابات ألعاب مميزة",
      "خدمات تسويق متقدمة",
      "استشارات مجانية",
      "خصومات VIP",
      "دعم أولوية قصوى",
      "خدمات حصرية"
    ],
    highlighted: false,
    color: "from-yellow-500 to-yellow-600"
  }
];

const Pricing = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            اختر الباقة المناسبة لك
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            باقات متنوعة تناسب جميع احتياجاتك مع أفضل الأسعار
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-gray-800/50 p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 ${
                plan.highlighted 
                  ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20' 
                  : 'border-blue-500/20 hover:border-blue-500/50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    الأكثر شعبية
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`bg-gradient-to-r ${plan.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-blue-400">{plan.price} ريال</span>
                  <span className="text-gray-400 mr-2">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 ml-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 px-6 rounded-full font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg'
                    : 'border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                }`}
              >
                اشترك الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

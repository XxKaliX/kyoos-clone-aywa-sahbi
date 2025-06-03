
import { Check } from 'lucide-react';

const plans = [
  {
    name: "المجاني",
    price: "0",
    period: "شهر",
    features: [
      "حتى 100 مستخدم",
      "API أساسي",
      "دعم عبر البريد الإلكتروني",
      "تشفير أساسي"
    ],
    highlighted: false
  },
  {
    name: "المتقدم",
    price: "29",
    period: "شهر",
    features: [
      "حتى 1000 مستخدم",
      "API متقدم",
      "دعم 24/7",
      "تشفير متقدم",
      "تحليلات مفصلة",
      "حماية DDoS"
    ],
    highlighted: true
  },
  {
    name: "الاحترافي",
    price: "99",
    period: "شهر",
    features: [
      "مستخدمين غير محدودين",
      "API كامل",
      "دعم مخصص",
      "تشفير عسكري",
      "تحليلات متقدمة",
      "حماية شاملة",
      "خوادم مخصصة"
    ],
    highlighted: false
  }
];

const Pricing = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            خطط تناسب جميع الاحتياجات
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            اختر الخطة المناسبة لك وابدأ في حماية تطبيقاتك اليوم
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-gray-800 p-8 rounded-xl border ${
                plan.highlighted 
                  ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-50' 
                  : 'border-gray-700'
              } hover:border-purple-500 transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    الأكثر شعبية
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-purple-400">${plan.price}</span>
                  <span className="text-gray-400 mr-2">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-purple-500 ml-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white'
                }`}
              >
                ابدأ الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

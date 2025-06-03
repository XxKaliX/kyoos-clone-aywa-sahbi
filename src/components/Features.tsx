
import { Smartphone, Users, BarChart, Globe, GamepadIcon, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: "خدمات الألعاب",
    description: "شحن الألعاب وبطاقات Google Play و iTunes"
  },
  {
    icon: Users,
    title: "وسائل التواصل",
    description: "زيادة المتابعين والتفاعل على جميع المنصات"
  },
  {
    icon: CreditCard,
    title: "البطاقات الرقمية",
    description: "جميع أنواع البطاقات الرقمية والكروت المدفوعة"
  },
  {
    icon: GamepadIcon,
    title: "حسابات الألعاب",
    description: "بيع وشراء حسابات الألعاب الشهيرة"
  },
  {
    icon: BarChart,
    title: "خدمات التسويق",
    description: "حلول تسويقية متكاملة لنمو أعمالك"
  },
  {
    icon: Globe,
    title: "دعم عالمي",
    description: "خدمة على مدار الساعة في جميع أنحاء العالم"
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات الرقمية بأعلى معايير الجودة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

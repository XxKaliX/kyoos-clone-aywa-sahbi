
import { Smartphone, Users, BarChart, Globe, GamepadIcon, CreditCard, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: GamepadIcon,
    title: "شحن الألعاب",
    description: "شحن جميع الألعاب الشهيرة مثل PUBG، Free Fire، Fortnite وغيرها بأسرع وقت"
  },
  {
    icon: Users,
    title: "وسائل التواصل الاجتماعي",
    description: "زيادة المتابعين والإعجابات والمشاهدات على إنستغرام، تيك توك، يوتيوب وجميع المنصات"
  },
  {
    icon: CreditCard,
    title: "البطاقات الرقمية",
    description: "بطاقات Google Play، iTunes، Steam، PlayStation وجميع البطاقات الرقمية"
  },
  {
    icon: Smartphone,
    title: "تطبيقات الهاتف",
    description: "خدمات التطبيقات المختلفة مثل Netflix، Spotify، Disney+ وغيرها"
  },
  {
    icon: BarChart,
    title: "التسويق الرقمي",
    description: "حلول تسويقية متكاملة لتنمية أعمالك وزيادة مبيعاتك أونلاين"
  },
  {
    icon: Globe,
    title: "خدمات عالمية",
    description: "نخدم العملاء في جميع أنحاء العالم بدعم 24/7 ومتابعة مستمرة"
  }
];

const stats = [
  { number: "50,000+", label: "عميل راضي" },
  { number: "1M+", label: "طلب مكتمل" },
  { number: "99.9%", label: "معدل النجاح" },
  { number: "24/7", label: "دعم فني" }
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات الرقمية بأعلى معايير الجودة والسرعة في التنفيذ
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-slate-800/50 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-8 rounded-2xl border border-blue-500/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">سرعة في التنفيذ</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              نضمن تنفيذ جميع الطلبات في أسرع وقت ممكن مع الحفاظ على أعلى معايير الجودة
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-500/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">أمان وموثوقية</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              جميع خدماتنا آمنة ومضمونة مع حماية كاملة لبيانات العملاء وخصوصيتهم
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

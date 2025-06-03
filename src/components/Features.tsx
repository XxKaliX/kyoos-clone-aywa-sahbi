
import { Code, Users, BarChart, Globe } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: "API سهل الاستخدام",
    description: "تكامل بسيط وسريع مع تطبيقك في دقائق معدودة"
  },
  {
    icon: Users,
    title: "إدارة المستخدمين",
    description: "نظام شامل لإدارة المستخدمين والصلاحيات"
  },
  {
    icon: BarChart,
    title: "تحليلات مفصلة",
    description: "تقارير وإحصائيات دقيقة عن استخدام تطبيقك"
  },
  {
    icon: Globe,
    title: "دعم عالمي",
    description: "خدمة سريعة وموثوقة في جميع أنحاء العالم"
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            مميزات استثنائية لحماية مثالية
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            اكتشف القوة الحقيقية لنظام KeyAuth وكيف يمكنه حماية تطبيقاتك
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

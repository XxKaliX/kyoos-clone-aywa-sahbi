
import { Shield, Zap, Lock, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">الخدمة الأولى في الوطن العربي</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">KALI</span>
            <br />
            <span className="text-white text-3xl md:text-4xl">VIP SERVICES</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            احصل على أفضل الخدمات الرقمية المتميزة مع ضمان الجودة والسرعة في التنفيذ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
              ابدأ الآن
            </button>
            <button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
              اكتشف المزيد
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">أمان تام</h3>
            <p className="text-gray-400">حماية متقدمة لجميع بياناتك وخصوصيتك</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">سرعة فائقة</h3>
            <p className="text-gray-400">تنفيذ سريع لجميع الطلبات والخدمات</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/50 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">موثوقية عالية</h3>
            <p className="text-gray-400">خدمة موثوقة بضمان الجودة والاستمرارية</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

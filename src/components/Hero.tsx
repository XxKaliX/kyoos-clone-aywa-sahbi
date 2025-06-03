
import { Shield, Zap, Lock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            حماية تطبيقاتك بأحدث التقنيات
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            KeyAuth يوفر نظام مصادقة قوي وآمن لحماية تطبيقاتك وألعابك من القرصنة والاستخدام غير المشروع
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
            ابدأ مجاناً
          </button>
          <button className="border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all">
            شاهد العرض التوضيحي
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">حماية متقدمة</h3>
            <p className="text-gray-400">تشفير قوي ونظام حماية متعدد الطبقات</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">سرعة فائقة</h3>
            <p className="text-gray-400">استجابة فورية وأداء محسّن</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">أمان تام</h3>
            <p className="text-gray-400">حماية شاملة ضد جميع أنواع التهديدات</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

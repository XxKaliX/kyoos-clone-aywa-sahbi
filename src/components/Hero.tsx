
import { Play, Star, Users, Trophy } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 flex items-center py-20 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-right">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">الموقع الأول في الشرق الأوسط</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              KALI VIP
            </span>
            <br />
            <span className="text-white text-3xl lg:text-5xl">
              خدمات رقمية متميزة
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            احصل على أفضل الخدمات الرقمية في الوطن العربي. شحن الألعاب، زيادة المتابعين، 
            البطاقات الرقمية وأكثر بأسعار منافسة وجودة عالية.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl">
              ابدأ الآن مجاناً
            </button>
            <button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center gap-2 justify-center">
              <Play className="w-5 h-5" />
              شاهد العرض التوضيحي
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">50K+</div>
              <div className="text-gray-400 text-sm">عميل راضي</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-1">99%</div>
              <div className="text-gray-400 text-sm">معدل النجاح</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
              <div className="text-gray-400 text-sm">دعم فني</div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm border border-blue-500/30">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-blue-500/20">
                  <Users className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">زيادة المتابعين</h3>
                  <p className="text-gray-400 text-sm">متابعين حقيقيين وآمنين</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-blue-500/20">
                  <Trophy className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">شحن الألعاب</h3>
                  <p className="text-gray-400 text-sm">جميع الألعاب المشهورة</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-blue-500/20 col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">إحصائيات حية</h3>
                      <p className="text-gray-400 text-sm">تتبع طلباتك في الوقت الفعلي</p>
                    </div>
                    <div className="text-2xl font-bold text-green-400">+1,234</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

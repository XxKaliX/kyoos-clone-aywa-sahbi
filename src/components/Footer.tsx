
import { Shield, Mail, Phone, MapPin, MessageCircle, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-blue-500/20">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 py-12 px-4 border-b border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            احصل على أحدث العروض والخصومات
          </h3>
          <p className="text-gray-300 mb-6">
            اشترك في نشرتنا البريدية واحصل على خصم 20% على أول طلب
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
              اشتراك
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  KALI VIP
                </span>
              </div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed max-w-md">
                الوجهة الأولى للحصول على أفضل الخدمات الرقمية في الشرق الأوسط. 
                نقدم خدمات عالية الجودة بأسعار منافسة مع ضمان الرضا التام.
              </p>
              
              {/* Social Media */}
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-colors group">
                  <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center transition-colors group">
                  <Instagram className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center transition-colors group">
                  <Youtube className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors group">
                  <span className="text-white font-bold group-hover:scale-110 transition-transform">T</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">خدماتنا</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">شحن الألعاب</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">وسائل التواصل</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">البطاقات الرقمية</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">حسابات الألعاب</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">التسويق الرقمي</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">خدمات أخرى</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">تواصل معنا</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">البريد الإلكتروني</div>
                    <div className="text-gray-400 text-sm">support@kalivip.com</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">واتساب</div>
                    <div className="text-gray-400 text-sm">+966 50 123 4567</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">الموقع</div>
                    <div className="text-gray-400 text-sm">الرياض، السعودية</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-blue-500/20 pt-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-white font-semibold text-sm">دفع آمن</div>
                <div className="text-gray-400 text-xs">SSL مشفر</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-white font-semibold text-sm">سرعة في التنفيذ</div>
                <div className="text-gray-400 text-xs">خلال دقائق</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="text-white font-semibold text-sm">ضمان الجودة</div>
                <div className="text-gray-400 text-xs">99.9% نجاح</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🎧</div>
                <div className="text-white font-semibold text-sm">دعم 24/7</div>
                <div className="text-gray-400 text-xs">على مدار الساعة</div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-blue-500/20 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center lg:text-right">
                © 2024 KALI VIP Services. جميع الحقوق محفوظة.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">سياسة الخصوصية</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">شروط الخدمة</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">سياسة الإرجاع</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">الأسئلة الشائعة</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

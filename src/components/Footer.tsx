
import { Shield, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-blue-500/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">KALI</span>
            </div>
            <p className="text-gray-400 mb-6">
              الوجهة الأولى للحصول على أفضل الخدمات الرقمية بجودة عالية وأسعار منافسة
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-white text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-white text-sm">t</span>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">خدماتنا</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">شحن الألعاب</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">وسائل التواصل</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">البطاقات الرقمية</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">حسابات الألعاب</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">الدعم</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">مركز المساعدة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">سياسة الاستخدام</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-gray-400">support@kali.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="text-gray-400">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-gray-400">المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 KALI VIP Services. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">سياسة الخصوصية</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">شروط الخدمة</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">سياسة الإرجاع</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

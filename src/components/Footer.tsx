
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold text-white">KeyAuth</span>
            </div>
            <p className="text-gray-400 mb-4">
              نظام المصادقة الأكثر أماناً وموثوقية لحماية تطبيقاتك
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <span className="text-white">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <span className="text-white">t</span>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                <span className="text-white">in</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">المنتجات</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">نظام المصادقة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">حماية التطبيقات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">إدارة المستخدمين</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">التحليلات</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">الدعم</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">التوثيق</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">المساعدة</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">تواصل معنا</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">الحالة</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-500" />
                <span className="text-gray-400">support@keyauth.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span className="text-gray-400">السعودية، الرياض</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 KeyAuth. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">سياسة الخصوصية</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">شروط الاستخدام</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">ملفات تعريف الارتباط</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

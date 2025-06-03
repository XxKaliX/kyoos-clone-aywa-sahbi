
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-blue-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              KALI VIP
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">الرئيسية</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">الخدمات</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">الأسعار</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">من نحن</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">تواصل معنا</a>
            <div className="flex gap-3">
              <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-2 rounded-lg transition-all">
                تسجيل دخول
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg transition-all">
                إنشاء حساب
              </button>
            </div>
          </nav>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500/20">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">الرئيسية</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">الخدمات</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">الأسعار</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">من نحن</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">تواصل معنا</a>
              <div className="flex flex-col gap-2 mt-4">
                <button className="border border-blue-500 text-blue-400 px-6 py-2 rounded-lg">
                  تسجيل دخول
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg">
                  إنشاء حساب
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

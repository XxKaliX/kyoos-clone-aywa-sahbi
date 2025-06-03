
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">KALI</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">الرئيسية</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">الخدمات</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">الأسعار</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">اتصل بنا</a>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105">
              تسجيل الدخول
            </button>
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
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">اتصل بنا</a>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full transition-all w-fit">
                تسجيل الدخول
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

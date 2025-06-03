
import { Shield, Menu } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold text-white">KeyAuth</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">الرئيسية</a>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">المنتجات</a>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">الأسعار</a>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">المساعدة</a>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              تسجيل الدخول
            </button>
          </nav>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">الرئيسية</a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">المنتجات</a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">الأسعار</a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">المساعدة</a>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors w-fit">
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


import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import AuthModal from './auth/AuthModal';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-blue-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              KALI VIP
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">{t('home')}</Link>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">{t('services')}</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">{t('pricing')}</a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors font-medium">{t('about')}</a>
            
            <LanguageSelector />
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-300">{t('welcome')}, {user.name}</span>
                
                {user.subscriptionLevel && (
                  <Link to="/downloads">
                    <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg transition-all text-sm">
                      {t('downloads')}
                    </button>
                  </Link>
                )}
                
                {['admin', 'superadmin', 'owner', 'support'].includes(user.role) && (
                  <Link to="/admin">
                    <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition-all text-sm">
                      {t('admin_dashboard')}
                    </button>
                  </Link>
                )}
                
                <a href="#support" className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white px-4 py-2 rounded-lg transition-all text-sm">
                  {t('support')}
                </a>
                
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all text-sm"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={() => handleAuthClick('login')}
                  className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-2 rounded-lg transition-all"
                >
                  {t('login')}
                </button>
                <button 
                  onClick={() => handleAuthClick('register')}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg transition-all"
                >
                  {t('register')}
                </button>
              </div>
            )}
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
              <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">{t('home')}</Link>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('services')}</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('pricing')}</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">{t('about')}</a>
              
              <LanguageSelector />
              
              {user ? (
                <div className="flex flex-col gap-2 mt-4">
                  <span className="text-gray-300">{t('welcome')}, {user.name}</span>
                  
                  {user.subscriptionLevel && (
                    <Link to="/downloads">
                      <button className="border border-green-500 text-green-400 px-6 py-2 rounded-lg w-full">
                        {t('downloads')}
                      </button>
                    </Link>
                  )}
                  
                  {['admin', 'superadmin', 'owner', 'support'].includes(user.role) && (
                    <Link to="/admin">
                      <button className="border border-blue-500 text-blue-400 px-6 py-2 rounded-lg w-full">
                        {t('admin_dashboard')}
                      </button>
                    </Link>
                  )}
                  
                  <a href="#support" className="border border-yellow-500 text-yellow-400 px-6 py-2 rounded-lg text-center">
                    {t('support')}
                  </a>
                  
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg w-full"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <button 
                    onClick={() => handleAuthClick('login')}
                    className="border border-blue-500 text-blue-400 px-6 py-2 rounded-lg"
                  >
                    {t('login')}
                  </button>
                  <button 
                    onClick={() => handleAuthClick('register')}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg"
                  >
                    {t('register')}
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
};

export default Header;

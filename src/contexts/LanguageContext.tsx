
import React, { createContext, useContext, useState } from 'react';

type Language = 'ar' | 'en' | 'ru' | 'tr' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    pricing: 'الأسعار',
    about: 'من نحن',
    contact: 'تواصل معنا',
    login: 'تسجيل دخول',
    register: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم',
    admin_dashboard: 'لوحة الإدارة',
    packages: 'الباقات',
    users: 'المستخدمين',
    support_chat: 'دعم فني',
    logout: 'تسجيل خروج'
  },
  en: {
    home: 'Home',
    services: 'Services',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    admin_dashboard: 'Admin Dashboard',
    packages: 'Packages',
    users: 'Users',
    support_chat: 'Support Chat',
    logout: 'Logout'
  },
  ru: {
    home: 'Главная',
    services: 'Услуги',
    pricing: 'Цены',
    about: 'О нас',
    contact: 'Контакты',
    login: 'Войти',
    register: 'Регистрация',
    email: 'Электронная почта',
    password: 'Пароль',
    name: 'Имя',
    admin_dashboard: 'Панель администратора',
    packages: 'Пакеты',
    users: 'Пользователи',
    support_chat: 'Чат поддержки',
    logout: 'Выйти'
  },
  tr: {
    home: 'Ana Sayfa',
    services: 'Hizmetler',
    pricing: 'Fiyatlar',
    about: 'Hakkımızda',
    contact: 'İletişim',
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    email: 'E-posta',
    password: 'Şifre',
    name: 'İsim',
    admin_dashboard: 'Yönetici Paneli',
    packages: 'Paketler',
    users: 'Kullanıcılar',
    support_chat: 'Destek Sohbeti',
    logout: 'Çıkış Yap'
  },
  vi: {
    home: 'Trang chủ',
    services: 'Dịch vụ',
    pricing: 'Giá cả',
    about: 'Về chúng tôi',
    contact: 'Liên hệ',
    login: 'Đăng nhập',
    register: 'Đăng ký',
    email: 'Email',
    password: 'Mật khẩu',
    name: 'Tên',
    admin_dashboard: 'Bảng điều khiển quản trị',
    packages: 'Gói',
    users: 'Người dùng',
    support_chat: 'Chat hỗ trợ',
    logout: 'Đăng xuất'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

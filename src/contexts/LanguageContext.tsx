
import React, { createContext, useContext, useState } from 'react';

type Language = 'ar' | 'en' | 'ru' | 'tr' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    services: 'الخدمات',
    pricing: 'الأسعار',
    about: 'من نحن',
    contact: 'تواصل معنا',
    
    // Authentication
    login: 'تسجيل دخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل خروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم',
    
    // Placeholders
    enter_email: 'أدخل البريد الإلكتروني',
    enter_password: 'أدخل كلمة المرور',
    enter_name: 'أدخل الاسم',
    
    // Auth Messages
    logging_in: 'جارٍ تسجيل الدخول...',
    creating_account: 'جارٍ إنشاء الحساب...',
    login_success: 'نجح تسجيل الدخول',
    welcome_back: 'مرحباً بك مرة أخرى!',
    login_error: 'خطأ في تسجيل الدخول',
    invalid_credentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    account_created: 'تم إنشاء الحساب بنجاح',
    registration_error: 'خطأ في إنشاء الحساب',
    email_already_exists: 'البريد الإلكتروني مستخدم بالفعل',
    no_account: 'ليس لديك حساب؟',
    have_account: 'لديك حساب بالفعل؟',
    create_account: 'إنشاء حساب جديد',
    
    // Email Verification
    verify_email: 'تأكيد البريد الإلكتروني',
    verification_code: 'رمز التأكيد',
    verification_code_sent_to: 'تم إرسال رمز التأكيد إلى',
    verification_email_sent: 'تم إرسال رمز التأكيد:',
    email_verification_required: 'مطلوب تأكيد البريد الإلكتروني',
    please_verify_email: 'يرجى تأكيد بريدك الإلكتروني أولاً',
    verifying: 'جارٍ التأكيد...',
    verify: 'تأكيد',
    email_verified: 'تم تأكيد البريد الإلكتروني',
    account_verified_success: 'تم تأكيد حسابك بنجاح',
    verification_failed: 'فشل التأكيد',
    invalid_verification_code: 'رمز التأكيد غير صحيح',
    resend_code: 'إعادة إرسال الرمز',
    code_resent: 'تم إعادة إرسال الرمز',
    new_verification_code: 'رمز التأكيد الجديد:',
    back_to_login: 'العودة لتسجيل الدخول',
    redirecting_login: 'جارٍ إعادة التوجيه...',
    
    // Admin Dashboard
    admin_dashboard: 'لوحة الإدارة',
    packages: 'الباقات',
    users: 'المستخدمين',
    support_chat: 'دعم فني',
    
    // Hero Section
    hero_title: 'أدوات متقدمة للأمن السيبراني',
    hero_subtitle: 'اكتشف مجموعة شاملة من الأدوات المتخصصة في الأمن السيبراني واختبار الاختراق',
    get_started: 'ابدأ الآن',
    learn_more: 'اعرف المزيد',
    
    // Features
    features_title: 'ميزات متقدمة',
    features_subtitle: 'أدوات متخصصة للمحترفين',
    
    // Footer
    quick_links: 'روابط سريعة',
    follow_us: 'تابعنا',
    all_rights_reserved: 'جميع الحقوق محفوظة',
    
    // Common
    welcome: 'مرحباً',
    loading: 'جارٍ التحميل...',
    error: 'خطأ',
    success: 'نجح',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    add: 'إضافة',
    search: 'بحث',
    filter: 'تصفية',
    sort: 'ترتيب',
    
    // 404 Page
    page_not_found: 'الصفحة غير موجودة',
    return_home: 'العودة للرئيسية'
  },
  en: {
    // Navigation
    home: 'Home',
    services: 'Services',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    
    // Authentication
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    
    // Placeholders
    enter_email: 'Enter email',
    enter_password: 'Enter password',
    enter_name: 'Enter name',
    
    // Auth Messages
    logging_in: 'Logging in...',
    creating_account: 'Creating account...',
    login_success: 'Login successful',
    welcome_back: 'Welcome back!',
    login_error: 'Login error',
    invalid_credentials: 'Invalid email or password',
    account_created: 'Account created successfully',
    registration_error: 'Registration error',
    email_already_exists: 'Email already exists',
    no_account: "Don't have an account?",
    have_account: 'Already have an account?',
    create_account: 'Create new account',
    
    // Email Verification
    verify_email: 'Verify Email',
    verification_code: 'Verification Code',
    verification_code_sent_to: 'Verification code sent to',
    verification_email_sent: 'Verification code sent:',
    email_verification_required: 'Email verification required',
    please_verify_email: 'Please verify your email first',
    verifying: 'Verifying...',
    verify: 'Verify',
    email_verified: 'Email Verified',
    account_verified_success: 'Your account has been verified successfully',
    verification_failed: 'Verification failed',
    invalid_verification_code: 'Invalid verification code',
    resend_code: 'Resend code',
    code_resent: 'Code resent',
    new_verification_code: 'New verification code:',
    back_to_login: 'Back to login',
    redirecting_login: 'Redirecting...',
    
    // Admin Dashboard
    admin_dashboard: 'Admin Dashboard',
    packages: 'Packages',
    users: 'Users',
    support_chat: 'Support Chat',
    
    // Hero Section
    hero_title: 'Advanced Cybersecurity Tools',
    hero_subtitle: 'Discover a comprehensive suite of specialized cybersecurity and penetration testing tools',
    get_started: 'Get Started',
    learn_more: 'Learn More',
    
    // Features
    features_title: 'Advanced Features',
    features_subtitle: 'Professional tools for experts',
    
    // Footer
    quick_links: 'Quick Links',
    follow_us: 'Follow Us',
    all_rights_reserved: 'All rights reserved',
    
    // Common
    welcome: 'Welcome',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    
    // 404 Page
    page_not_found: 'Page not found',
    return_home: 'Return home'
  },
  ru: {
    // Navigation
    home: 'Главная',
    services: 'Услуги',
    pricing: 'Цены',
    about: 'О нас',
    contact: 'Контакты',
    
    // Authentication
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    email: 'Электронная почта',
    password: 'Пароль',
    name: 'Имя',
    
    // Placeholders
    enter_email: 'Введите email',
    enter_password: 'Введите пароль',
    enter_name: 'Введите имя',
    
    // Auth Messages
    logging_in: 'Вход в систему...',
    creating_account: 'Создание аккаунта...',
    login_success: 'Успешный вход',
    welcome_back: 'С возвращением!',
    login_error: 'Ошибка входа',
    invalid_credentials: 'Неверный email или пароль',
    account_created: 'Аккаунт успешно создан',
    registration_error: 'Ошибка регистрации',
    email_already_exists: 'Email уже существует',
    no_account: 'Нет аккаунта?',
    have_account: 'Уже есть аккаунт?',
    create_account: 'Создать новый аккаунт',
    
    // Email Verification
    verify_email: 'Подтвердить email',
    verification_code: 'Код подтверждения',
    verification_code_sent_to: 'Код подтверждения отправлен на',
    verification_email_sent: 'Код подтверждения отправлен:',
    email_verification_required: 'Требуется подтверждение email',
    please_verify_email: 'Пожалуйста, сначала подтвердите ваш email',
    verifying: 'Подтверждение...',
    verify: 'Подтвердить',
    email_verified: 'Email подтвержден',
    account_verified_success: 'Ваш аккаунт успешно подтвержден',
    verification_failed: 'Подтверждение не удалось',
    invalid_verification_code: 'Неверный код подтверждения',
    resend_code: 'Отправить код повторно',
    code_resent: 'Код отправлен повторно',
    new_verification_code: 'Новый код подтверждения:',
    back_to_login: 'Вернуться к входу',
    redirecting_login: 'Перенаправление...',
    
    // Admin Dashboard
    admin_dashboard: 'Панель администратора',
    packages: 'Пакеты',
    users: 'Пользователи',
    support_chat: 'Чат поддержки',
    
    // Hero Section
    hero_title: 'Продвинутые инструменты кибербезопасности',
    hero_subtitle: 'Откройте для себя комплексный набор специализированных инструментов кибербезопасности и тестирования на проникновение',
    get_started: 'Начать',
    learn_more: 'Узнать больше',
    
    // Features
    features_title: 'Продвинутые функции',
    features_subtitle: 'Профессиональные инструменты для экспертов',
    
    // Footer
    quick_links: 'Быстрые ссылки',
    follow_us: 'Подписывайтесь',
    all_rights_reserved: 'Все права защищены',
    
    // Common
    welcome: 'Добро пожаловать',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успех',
    cancel: 'Отмена',
    save: 'Сохранить',
    delete: 'Удалить',
    edit: 'Редактировать',
    add: 'Добавить',
    search: 'Поиск',
    filter: 'Фильтр',
    sort: 'Сортировка',
    
    // 404 Page
    page_not_found: 'Страница не найдена',
    return_home: 'Вернуться домой'
  },
  tr: {
    // Navigation
    home: 'Ana Sayfa',
    services: 'Hizmetler',
    pricing: 'Fiyatlar',
    about: 'Hakkımızda',
    contact: 'İletişim',
    
    // Authentication
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    logout: 'Çıkış Yap',
    email: 'E-posta',
    password: 'Şifre',
    name: 'İsim',
    
    // Placeholders
    enter_email: 'E-posta girin',
    enter_password: 'Şifre girin',
    enter_name: 'İsim girin',
    
    // Auth Messages
    logging_in: 'Giriş yapılıyor...',
    creating_account: 'Hesap oluşturuluyor...',
    login_success: 'Giriş başarılı',
    welcome_back: 'Tekrar hoş geldiniz!',
    login_error: 'Giriş hatası',
    invalid_credentials: 'Geçersiz e-posta veya şifre',
    account_created: 'Hesap başarıyla oluşturuldu',
    registration_error: 'Kayıt hatası',
    email_already_exists: 'E-posta zaten mevcut',
    no_account: 'Hesabınız yok mu?',
    have_account: 'Zaten hesabınız var mı?',
    create_account: 'Yeni hesap oluştur',
    
    // Email Verification
    verify_email: 'E-posta Doğrula',
    verification_code: 'Doğrulama Kodu',
    verification_code_sent_to: 'Doğrulama kodu gönderildi',
    verification_email_sent: 'Doğrulama kodu gönderildi:',
    email_verification_required: 'E-posta doğrulaması gerekli',
    please_verify_email: 'Lütfen önce e-postanızı doğrulayın',
    verifying: 'Doğrulanıyor...',
    verify: 'Doğrula',
    email_verified: 'E-posta Doğrulandı',
    account_verified_success: 'Hesabınız başarıyla doğrulandı',
    verification_failed: 'Doğrulama başarısız',
    invalid_verification_code: 'Geçersiz doğrulama kodu',
    resend_code: 'Kodu tekrar gönder',
    code_resent: 'Kod tekrar gönderildi',
    new_verification_code: 'Yeni doğrulama kodu:',
    back_to_login: 'Girişe geri dön',
    redirecting_login: 'Yönlendiriliyor...',
    
    // Admin Dashboard
    admin_dashboard: 'Yönetici Paneli',
    packages: 'Paketler',
    users: 'Kullanıcılar',
    support_chat: 'Destek Sohbeti',
    
    // Hero Section
    hero_title: 'Gelişmiş Siber Güvenlik Araçları',
    hero_subtitle: 'Siber güvenlik ve penetrasyon testi için özel araçların kapsamlı paketini keşfedin',
    get_started: 'Başlayın',
    learn_more: 'Daha Fazla Öğren',
    
    // Features
    features_title: 'Gelişmiş Özellikler',
    features_subtitle: 'Uzmanlar için profesyonel araçlar',
    
    // Footer
    quick_links: 'Hızlı Bağlantılar',
    follow_us: 'Bizi Takip Edin',
    all_rights_reserved: 'Tüm hakları saklıdır',
    
    // Common
    welcome: 'Hoş geldiniz',
    loading: 'Yükleniyor...',
    error: 'Hata',
    success: 'Başarılı',
    cancel: 'İptal',
    save: 'Kaydet',
    delete: 'Sil',
    edit: 'Düzenle',
    add: 'Ekle',
    search: 'Ara',
    filter: 'Filtrele',
    sort: 'Sırala',
    
    // 404 Page
    page_not_found: 'Sayfa bulunamadı',
    return_home: 'Ana sayfaya dön'
  },
  vi: {
    // Navigation
    home: 'Trang chủ',
    services: 'Dịch vụ',
    pricing: 'Giá cả',
    about: 'Về chúng tôi',
    contact: 'Liên hệ',
    
    // Authentication
    login: 'Đăng nhập',
    register: 'Đăng ký',
    logout: 'Đăng xuất',
    email: 'Email',
    password: 'Mật khẩu',
    name: 'Tên',
    
    // Placeholders
    enter_email: 'Nhập email',
    enter_password: 'Nhập mật khẩu',
    enter_name: 'Nhập tên',
    
    // Auth Messages
    logging_in: 'Đang đăng nhập...',
    creating_account: 'Đang tạo tài khoản...',
    login_success: 'Đăng nhập thành công',
    welcome_back: 'Chào mừng bạn trở lại!',
    login_error: 'Lỗi đăng nhập',
    invalid_credentials: 'Email hoặc mật khẩu không hợp lệ',
    account_created: 'Tài khoản đã được tạo thành công',
    registration_error: 'Lỗi đăng ký',
    email_already_exists: 'Email đã tồn tại',
    no_account: 'Chưa có tài khoản?',
    have_account: 'Đã có tài khoản?',
    create_account: 'Tạo tài khoản mới',
    
    // Email Verification
    verify_email: 'Xác thực Email',
    verification_code: 'Mã xác thực',
    verification_code_sent_to: 'Mã xác thực đã được gửi đến',
    verification_email_sent: 'Mã xác thực đã được gửi:',
    email_verification_required: 'Cần xác thực email',
    please_verify_email: 'Vui lòng xác thực email của bạn trước',
    verifying: 'Đang xác thực...',
    verify: 'Xác thực',
    email_verified: 'Email đã được xác thực',
    account_verified_success: 'Tài khoản của bạn đã được xác thực thành công',
    verification_failed: 'Xác thực thất bại',
    invalid_verification_code: 'Mã xác thực không hợp lệ',
    resend_code: 'Gửi lại mã',
    code_resent: 'Mã đã được gửi lại',
    new_verification_code: 'Mã xác thực mới:',
    back_to_login: 'Quay lại đăng nhập',
    redirecting_login: 'Đang chuyển hướng...',
    
    // Admin Dashboard
    admin_dashboard: 'Bảng điều khiển quản trị',
    packages: 'Gói',
    users: 'Người dùng',
    support_chat: 'Chat hỗ trợ',
    
    // Hero Section
    hero_title: 'Công cụ An ninh mạng Nâng cao',
    hero_subtitle: 'Khám phá bộ công cụ chuyên dụng toàn diện cho an ninh mạng và kiểm tra xâm nhập',
    get_started: 'Bắt đầu',
    learn_more: 'Tìm hiểu thêm',
    
    // Features
    features_title: 'Tính năng Nâng cao',
    features_subtitle: 'Công cụ chuyên nghiệp cho các chuyên gia',
    
    // Footer
    quick_links: 'Liên kết nhanh',
    follow_us: 'Theo dõi chúng tôi',
    all_rights_reserved: 'Tất cả quyền được bảo lưu',
    
    // Common
    welcome: 'Chào mừng',
    loading: 'Đang tải...',
    error: 'Lỗi',
    success: 'Thành công',
    cancel: 'Hủy',
    save: 'Lưu',
    delete: 'Xóa',
    edit: 'Chỉnh sửa',
    add: 'Thêm',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    sort: 'Sắp xếp',
    
    // 404 Page
    page_not_found: 'Không tìm thấy trang',
    return_home: 'Trở về trang chủ'
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

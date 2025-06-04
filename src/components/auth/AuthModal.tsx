
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import EmailVerification from './EmailVerification';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register' | 'verify'>(initialMode);
  const [verificationEmail, setVerificationEmail] = useState('');
  const { t } = useLanguage();

  const handleRegisterSuccess = (email: string) => {
    setVerificationEmail(email);
    setMode('verify');
  };

  const getTitle = () => {
    switch (mode) {
      case 'login':
        return t('login');
      case 'register':
        return t('create_account');
      case 'verify':
        return t('verify_email');
      default:
        return t('login');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-blue-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        
        {mode === 'login' && (
          <LoginForm 
            onSwitchToRegister={() => setMode('register')}
            onClose={onClose}
          />
        )}
        
        {mode === 'register' && (
          <RegisterForm 
            onSwitchToLogin={() => setMode('login')}
            onClose={onClose}
          />
        )}
        
        {mode === 'verify' && (
          <EmailVerification
            email={verificationEmail}
            onVerified={() => {
              setMode('login');
              onClose();
            }}
            onBack={() => setMode('login')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;


import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-blue-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </DialogTitle>
        </DialogHeader>
        
        {mode === 'login' ? (
          <LoginForm 
            onSwitchToRegister={() => setMode('register')}
            onClose={onClose}
          />
        ) : (
          <RegisterForm 
            onSwitchToLogin={() => setMode('login')}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

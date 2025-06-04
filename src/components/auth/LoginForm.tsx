
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onClose: () => void;
}

const LoginForm = ({ onSwitchToRegister, onClose }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Attempting login for:', email);
    const result = await login(email, password);
    
    if (result.success) {
      if (!result.user?.isVerified) {
        toast({
          title: t('email_verification_required'),
          description: t('please_verify_email'),
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      toast({
        title: t('login_success'),
        description: t('welcome_back')
      });
      onClose();
      
      // Navigate to admin if user is admin/superadmin
      if (result.user.role === 'admin' || result.user.role === 'superadmin') {
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000);
      }
    } else {
      toast({
        title: t('login_error'),
        description: t('invalid_credentials'),
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-white">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
          placeholder={t('enter_email')}
        />
      </div>
      
      <div>
        <Label htmlFor="password" className="text-white">{t('password')}</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
          placeholder={t('enter_password')}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('logging_in') : t('login')}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-blue-400 hover:underline"
        >
          {t('no_account')} {t('register')}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

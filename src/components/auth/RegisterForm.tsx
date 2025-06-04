
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

const RegisterForm = ({ onSwitchToLogin, onClose }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await register(email, password, name);
    
    if (success) {
      // Send verification email (simulated)
      const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem(`verification_${email}`, verificationCode);
      
      toast({
        title: t('account_created'),
        description: `${t('verification_email_sent')} ${verificationCode}`,
      });
      
      // Switch to verification view
      onSwitchToLogin();
    } else {
      toast({
        title: t('registration_error'),
        description: t('email_already_exists'),
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-white">{t('name')}</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
          placeholder={t('enter_name')}
        />
      </div>

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
        {isLoading ? t('creating_account') : t('register')}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-400 hover:underline"
        >
          {t('have_account')} {t('login')}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

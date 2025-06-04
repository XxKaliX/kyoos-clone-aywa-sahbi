
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const EmailVerification = ({ email, onVerified, onBack }: EmailVerificationProps) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Get stored verification code
    const storedCode = localStorage.getItem(`verification_${email}`);
    
    if (code.toUpperCase() === storedCode) {
      // Update user verification status
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === email);
      
      if (userIndex !== -1) {
        users[userIndex].isVerified = true;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem(`verification_${email}`);
        
        setIsVerified(true);
        toast({
          title: t('email_verified'),
          description: t('account_verified_success')
        });
        
        setTimeout(() => {
          onVerified();
        }, 2000);
      }
    } else {
      toast({
        title: t('verification_failed'),
        description: t('invalid_verification_code'),
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const resendCode = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem(`verification_${email}`, newCode);
    
    toast({
      title: t('code_resent'),
      description: `${t('new_verification_code')} ${newCode}`
    });
  };

  if (isVerified) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h3 className="text-xl font-bold text-white">{t('email_verified')}</h3>
        <p className="text-gray-300">{t('redirecting_login')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-white">{t('verify_email')}</h3>
        <p className="text-gray-300 text-sm">
          {t('verification_code_sent_to')} {email}
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <Label htmlFor="code" className="text-white">{t('verification_code')}</Label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            required
            className="mt-1 bg-slate-700 border-slate-600 text-white text-center text-lg tracking-widest"
            placeholder="XXXXXX"
            maxLength={6}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t('verifying') : t('verify')}
        </Button>

        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={resendCode}
            className="text-blue-400 hover:underline text-sm"
          >
            {t('resend_code')}
          </button>
          
          <br />
          
          <button
            type="button"
            onClick={onBack}
            className="text-gray-400 hover:underline text-sm"
          >
            {t('back_to_login')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;

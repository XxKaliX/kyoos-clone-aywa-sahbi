
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/auth';
import { Navigate } from 'react-router-dom';
import { Download, Lock, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Downloads = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts).filter((p: Product) => p.isActive));
    }
  }, []);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const canDownload = (product: Product) => {
    if (!user.subscriptionLevel) return false;
    if (!user.subscriptionExpiry) return false;
    
    // Check if subscription is expired
    const now = new Date();
    const expiry = new Date(user.subscriptionExpiry);
    if (now > expiry) return false;

    // Check if user has required level
    const levels = ['basic', 'gold', 'diamond'];
    const userLevelIndex = levels.indexOf(user.subscriptionLevel);
    const requiredLevelIndex = levels.indexOf(product.requiredLevel);
    
    return userLevelIndex >= requiredLevelIndex;
  };

  const getSubscriptionStatus = () => {
    if (!user.subscriptionLevel) return 'لا يوجد اشتراك';
    if (!user.subscriptionExpiry) return 'اشتراك غير محدود';
    
    const now = new Date();
    const expiry = new Date(user.subscriptionExpiry);
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'انتهت صلاحية الاشتراك';
    return `باقي ${daysLeft} يوم`;
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'basic': return 'أساسي';
      case 'gold': return 'ذهبي';
      case 'diamond': return 'الماسي';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('downloads')}</h1>
          <div className="bg-slate-800 p-4 rounded-lg">
            <p className="text-lg">مرحباً {user.name}</p>
            <p className="text-gray-400">نوع الاشتراك: {user.subscriptionLevel ? getLevelText(user.subscriptionLevel) : 'لا يوجد'}</p>
            <p className="text-gray-400">الحالة: {getSubscriptionStatus()}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const canUserDownload = canDownload(product);
            
            return (
              <Card key={product.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{product.name}</span>
                    <span className="text-sm bg-blue-600 px-2 py-1 rounded">
                      {getLevelText(product.requiredLevel)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{product.description}</p>
                  
                  {canUserDownload ? (
                    product.fileUrl ? (
                      <Button 
                        className="w-full"
                        onClick={() => window.open(product.fileUrl, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        تحميل
                      </Button>
                    ) : (
                      <Button disabled className="w-full">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        رابط التحميل غير متوفر
                      </Button>
                    )
                  ) : (
                    <Button disabled className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      {!user.subscriptionLevel 
                        ? 'يتطلب اشتراك'
                        : getSubscriptionStatus().includes('انتهت')
                        ? 'انتهت صلاحية الاشتراك'
                        : `يتطلب اشتراك ${getLevelText(product.requiredLevel)}`
                      }
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">لا توجد منتجات متاحة حالياً</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Downloads;

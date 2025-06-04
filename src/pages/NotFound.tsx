
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">الصفحة غير موجودة</p>
        <Link to="/">
          <Button>العودة للرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

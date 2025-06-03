
import { useState } from 'react';
import AppIcon from './AppIcon';
import { 
  User, 
  Calendar, 
  Settings, 
  Search, 
  Mail, 
  Image, 
  Music,
  Clock,
  Map,
  Calculator,
  Camera,
  Phone
} from 'lucide-react';

const apps = [
  { icon: Phone, name: 'الهاتف', bgColor: 'bg-green-500' },
  { icon: Mail, name: 'الرسائل', bgColor: 'bg-blue-500' },
  { icon: User, name: 'جهات الاتصال', bgColor: 'bg-orange-500' },
  { icon: Calendar, name: 'التقويم', bgColor: 'bg-red-500' },
  { icon: Camera, name: 'الكاميرا', bgColor: 'bg-purple-500' },
  { icon: Image, name: 'المعرض', bgColor: 'bg-pink-500' },
  { icon: Music, name: 'الموسيقى', bgColor: 'bg-indigo-500' },
  { icon: Clock, name: 'المنبه', bgColor: 'bg-yellow-500' },
  { icon: Map, name: 'الخرائط', bgColor: 'bg-teal-500' },
  { icon: Calculator, name: 'الآلة الحاسبة', bgColor: 'bg-gray-600' },
  { icon: Search, name: 'البحث', bgColor: 'bg-cyan-500' },
  { icon: Settings, name: 'الإعدادات', bgColor: 'bg-slate-600' }
];

const AppGrid = () => {
  const [selectedApp, setSelectedApp] = useState<number | null>(null);

  const handleAppClick = (index: number) => {
    setSelectedApp(index);
    setTimeout(() => setSelectedApp(null), 300);
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
        {apps.map((app, index) => (
          <AppIcon
            key={index}
            icon={app.icon}
            name={app.name}
            bgColor={app.bgColor}
            isSelected={selectedApp === index}
            onClick={() => handleAppClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AppGrid;

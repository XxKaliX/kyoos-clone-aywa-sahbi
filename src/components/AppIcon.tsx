
import { LucideIcon } from 'lucide-react';

interface AppIconProps {
  icon: LucideIcon;
  name: string;
  bgColor: string;
  textColor?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const AppIcon = ({ 
  icon: Icon, 
  name, 
  bgColor, 
  textColor = "text-white", 
  isSelected = false,
  onClick 
}: AppIconProps) => {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105"
      onClick={onClick}
    >
      <div 
        className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-1 shadow-lg ${
          isSelected ? 'ring-2 ring-white shadow-2xl scale-110' : ''
        } transition-all duration-200`}
      >
        <Icon className={`w-6 h-6 ${textColor}`} />
      </div>
      <span className="text-white text-xs font-medium text-center leading-tight max-w-14 truncate">
        {name}
      </span>
    </div>
  );
};

export default AppIcon;

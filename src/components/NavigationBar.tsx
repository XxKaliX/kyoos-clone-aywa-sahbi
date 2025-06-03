
import { ArrowLeft, Circle, RotateCcw } from 'lucide-react';

const NavigationBar = () => {
  return (
    <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-700 rounded transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs">رجوع</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-700 rounded transition-colors">
        <Circle className="w-4 h-4" />
        <span className="text-xs">اختيار</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-700 rounded transition-colors">
        <RotateCcw className="w-4 h-4" />
        <span className="text-xs">خيارات</span>
      </button>
    </div>
  );
};

export default NavigationBar;

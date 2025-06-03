
import StatusBar from '../components/StatusBar';
import AppGrid from '../components/AppGrid';
import NavigationBar from '../components/NavigationBar';

const Index = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex flex-col">
      <StatusBar />
      
      <div className="flex-1 flex flex-col">
        <div className="text-center py-4">
          <h1 className="text-white text-lg font-semibold">KaiOS</h1>
          <p className="text-gray-300 text-sm">الشاشة الرئيسية</p>
        </div>
        
        <AppGrid />
      </div>
      
      <NavigationBar />
    </div>
  );
};

export default Index;

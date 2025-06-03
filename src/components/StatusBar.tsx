
import { useState, useEffect } from 'react';

const StatusBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white px-3 py-1 flex justify-between items-center text-xs font-medium">
      <div className="flex items-center gap-2">
        <span>KaiOS</span>
        <div className="flex gap-1">
          <div className="w-1 h-3 bg-white rounded-sm"></div>
          <div className="w-1 h-3 bg-white rounded-sm opacity-75"></div>
          <div className="w-1 h-3 bg-white rounded-sm opacity-50"></div>
          <div className="w-1 h-3 bg-white rounded-sm opacity-25"></div>
        </div>
      </div>
      <div className="text-center">
        <div>{time.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-2 border border-white rounded-sm">
          <div className="w-3 h-1 bg-green-400 rounded-sm m-0.5"></div>
        </div>
        <span>4G</span>
      </div>
    </div>
  );
};

export default StatusBar;

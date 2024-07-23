import React, { useState, useEffect } from 'react';
import Pomodoro from './components/Pomodoro';

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-500 to-white">
      <div className="absolute top-0 left-0 p-4">
        <Pomodoro />
      </div>
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">Current Time</h1>
        <p className="text-2xl mt-4">{time}</p>
      </div>
    </div>
  );
}

export default App;

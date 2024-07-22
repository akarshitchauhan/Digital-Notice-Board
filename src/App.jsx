import React, { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">Current Time</h1>
        <p className="text-2xl mt-4">{time}</p>
      </div>
    </div>
  );
}

export default App;

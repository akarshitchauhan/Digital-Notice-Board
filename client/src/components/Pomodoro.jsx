import React, { useState, useEffect, useRef } from 'react';

function Pomodoro() {
  const [mode, setMode] = useState('Pomodoro');
  const [timer, setTimer] = useState(25 * 60); // timer in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // new state variable
  const intervalRef = useRef(null);
  const initialTimes = { Pomodoro: 25 * 60, shortBreak: 5 * 60, longBreak: 10 * 60 }; // initial times in seconds

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setIsRunning(false);
    setHasStarted(false); // reset this state on mode change
    clearInterval(intervalRef.current);
    setTimer(initialTimes[selectedMode]);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
    if (!isRunning) setHasStarted(true); // mark as started when starting the timer
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasStarted(false); // reset this state on reset
    clearInterval(intervalRef.current);
    setTimer(initialTimes[mode]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const progressPercentage = ((initialTimes[mode] - timer) / initialTimes[mode]) * 100;

  return (
    <div className="flex flex-row justify-between items-center p-2 rounded-xl text-white w-[24rem] max-h-max">
      <div className="text-center w-32 mb-8">
        <p
          className={`text-xl mb-4 cursor-pointer ${mode === 'Pomodoro' ? 'bg-blue-700 p-2 rounded-3xl shadow-xl' : ''}`}
          onClick={() => handleModeChange('Pomodoro')}
        >
          Pomodoro
        </p>
        <p
          className={`text-xl mb-4 cursor-pointer ${mode === 'shortBreak' ? 'bg-blue-700 p-2 rounded-3xl shadow-xl' : ''}`}
          onClick={() => handleModeChange('shortBreak')}
        >
          Short break
        </p>
        <p
          className={`text-xl cursor-pointer ${mode === 'longBreak' ? 'bg-blue-700 p-2 rounded-3xl shadow-xl' : ''}`}
          onClick={() => handleModeChange('longBreak')}
        >
          Long break
        </p>
      </div>
      <div className="flex flex-col items-center justify-center p-4 mb-2 rounded-lg">
        <div>
          <p className="text-2xl p-2 mb-0 mr-4">{formatTime(timer)}</p>
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div
              className="bg-green-400 h-2.5 rounded-full shadow-xl"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="bg-white hover:bg-blue-600 hover:text-white text-blue-500 rounded-3xl shadow-xl mr-2"
            onClick={handleStartStop}
          >
            {isRunning ? 'Stop' : hasStarted ? 'Continue' : 'Start'}
          </button>
          <button
            className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 rounded-3xl shadow-xl"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;

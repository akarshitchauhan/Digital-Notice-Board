import React, { useState, useEffect } from "react";
import Pomodoro from "./components/Pomodoro";
import GoogleSlideEmbed from "./components/GoogleSlideEmbed";
import Notes from "./components/Notes";
import Opportunity from "./components/Opportunity";
import TextBox from "./components/TextBox";
import MeetWidget from "./components/MeetWidget";
import Polls from "./components/Polls";

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleSlideUrl =
    "https://docs.google.com/presentation/d/e/2PACX-1vS6qTgQIXPQKdrD6vd9_ZUuAzTFJupHZH9xmOwftEZpmLaBliTDOQ-zOt246h2ulkCh9g7_EGoOSKhJ/embed?start=true&loop=true&delayms=5000";

  return (
    <div className="relative flex flex-col h-screen w-screen bg-gradient-to-r from-blue-500 to-white overflow-hidden">
      <div className="flex justify-between items-start p-4">
        <div className="ml-2">
          <div className="flex flex-row">
            <Pomodoro />
            <TextBox />
          </div>
          <div className="flex flex-row justify-between">
            <Opportunity />
            <MeetWidget />
          </div>
          <Notes />
        </div>
        <div className="w-1/2 flex justify-end h-screen">
          <div className="flex flex-col">
            <GoogleSlideEmbed embedUrl={googleSlideUrl} />
            <Polls />
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;

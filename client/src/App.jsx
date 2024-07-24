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
    <div className="relative flex flex-col h-screen w-screen bg-gradient-to-r from-blue-500 to-white">
      <div className="flex justify-between items-start p-4">
        <div className="">
          <div className="flex flex-row">
            <Pomodoro />
            <TextBox />
          </div>
          <Opportunity />
          <MeetWidget />
        </div>
        <div className="w-1/2 h-screen">
          <GoogleSlideEmbed embedUrl={googleSlideUrl} />
          <Polls />
        </div>
      </div>

      {/* <Notes /> */}
    </div>
  );
}

export default App;

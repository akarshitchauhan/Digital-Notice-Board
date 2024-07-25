import React, { useState, useEffect } from "react";
import Pomodoro from "./components/Pomodoro";
import GoogleSlideEmbed from "./components/GoogleSlideEmbed";
import GoogleMeetWidget from "./components/GoogleMeetWidget";
import Notes from "./components/Notes";
import Opportunity from "./components/Opportunity";
import TextBox from "./components/TextBox";
import MeetWidget from "./components/MeetWidget";
import Polls from "./components/Polls";
import { FaEdit } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [widgets, setWidgets] = useState({
    Pomodoro: true,
    SearchBox: true,
    Opportunity: true,
    MeetWidget: true,
    TIL: true,
    GoogleSlides: true,
    Polls: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleSlideUrl =
    "https://docs.google.com/presentation/d/e/2PACX-1vS6qTgQIXPQKdrD6vd9_ZUuAzTFJupHZH9xmOwftEZpmLaBliTDOQ-zOt246h2ulkCh9g7_EGoOSKhJ/embed?start=true&loop=true&delayms=5000";

  const toggleWidget = (widget) => {
    setWidgets({ ...widgets, [widget]: !widgets[widget] });
  };

  return (
    <div className="relative flex flex-col h-screen w-screen bg-gradient-to-r from-blue-500 to-white overflow-hidden">
      <div className="flex justify-between items-start p-4">
        <div className="ml-2">
          <div className="flex flex-row">
            <div className="w-[24rem] h-44">
              {widgets.Pomodoro && <Pomodoro />}
            </div>
            {widgets.SearchBox && <TextBox />}
          </div>
          <div className="flex flex-row justify-between">
            {widgets.Opportunity && <Opportunity />}
            {widgets.MeetWidget && <GoogleMeetWidget />}
          </div>
          {widgets.TIL && <Notes />}
        </div>
        <div className="w-1/2 flex justify-end h-screen">
          <div className="flex flex-col">
            {widgets.GoogleSlides && <GoogleSlideEmbed embedUrl={googleSlideUrl} />}
            {widgets.Polls && <Polls />}
          </div>
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <FaEdit size={20} />
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Widgets"
        className="bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto my-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl text-black font-semibold w-64 mb-4">Edit Widgets</h2>
        <div className="flex flex-col space-y-2">
          {Object.keys(widgets).map((widget) => (
            <div key={widget} className="flex justify-between text-black items-center">
              <span className="text-lg">{widget}</span>
              <button
                className={`px-3 py-1 rounded-full ${widgets[widget] ? 'bg-red-500' : 'bg-green-500'} text-white`}
                onClick={() => toggleWidget(widget)}
              >
                {widgets[widget] ? 'Drop' : 'Add'}
              </button>
            </div>
          ))}
        </div>
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded-3xl shadow-xl"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default App;

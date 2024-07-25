import React from 'react';

const MeetWidget = () => {
  return (
    <div className="p-6 mt-8 bg-white rounded-3xl shadow-xl w-80">
      <h2 className="text-xl text-gray-700 font-bold mb-4">Meetings</h2>
      <div className="flex flex-col space-y-4">
        <button className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Start a New Meeting
        </button>
        <button className="bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
          Schedule a New Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetWidget;

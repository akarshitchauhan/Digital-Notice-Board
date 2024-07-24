import { useState } from "react";
import axios from "axios";

const CreatePoll = ({ onClose, fetchPolls }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleCreatePoll = async () => {
    try {
      await axios.post("http://localhost:4000/polls/create", {
        question,
        options,
      });
      setQuestion("");
      setOptions(["", ""]);
      fetchPolls();
      onClose(); // Close the popup after creating the poll
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">Create a Poll</h2>
        <input
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            key={index}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
            onClick={handleCreatePoll}
          >
            Create Poll
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;

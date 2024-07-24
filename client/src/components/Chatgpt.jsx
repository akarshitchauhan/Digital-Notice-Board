import React, { useState } from 'react';
import axios from 'axios';

const Chatgpt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const OPENAI_API_KEY = 'your_openai_api_key_here';

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setPrompt('');
    setResponse('');
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      setResponse(res.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching response from ChatGPT:', error);
    }
  };

  return (
    <div>
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        ChatGPT
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={toggleChat}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Ask ChatGPT..."
                className="w-full p-3 border border-gray-300 rounded"
                rows="4"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600"
              >
                Send
              </button>
            </form>
            {response && (
              <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded">
                <p>{response}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatgpt;

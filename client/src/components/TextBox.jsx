import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TextBox = () => {
  const [query, setQuery] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.location.href = searchUrl;
    }
  };

  return (
    <div className="p-4 mt-2 ml-16">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="  Search with Google"
        className="w-80 bg-white text-black p-2 border rounded-3xl shadow-xl"
      />
      <div className="mt-4 ml-20">
        <h2 className="text-xl ml-8 text-black">{time.toLocaleTimeString()}</h2>
        <h3 className="text-lg text-gray-700">
          {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h3>
      </div>
    </div>
  );
};

export default TextBox;

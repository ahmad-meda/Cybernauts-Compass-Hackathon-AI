import logo from './logo.svg';
import './App.css';
import { FaVideo } from "react-icons/fa";
import { FaClosedCaptioning } from "react-icons/fa";
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate', {
        user_input: input
      });
      setOutput(response.data.generated_text);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  return (
    <>
      <div className="navbar">
        <ul className="nav_items">
          <li><a href="#"><FaVideo /></a></li>
          <li><a href="#"><FaClosedCaptioning /></a></li>
        </ul>
      </div>
      <div className="content">
        <textarea
          className="text_area"
          placeholder="Enter input here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button className='generate_btn' onClick={handleGenerate}>Generate</button>
        {output && (
          <div>
            <h2>Generated Text</h2>
            <p>{output}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

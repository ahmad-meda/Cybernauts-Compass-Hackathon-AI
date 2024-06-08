import './audio.css'
import React, { useState } from 'react';
import axios from 'axios';

function Audio() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate', {
        user_input: input
      });
      setOutput(response.data.generated_text);
      speak(response.data.generated_text); // Convert text to speech
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      console.error('Text-to-speech not supported.');
    }
  };
  return (
    <>
      <p class="audio_title">Text to Speech Generator</p>
      <div className="content">
        <textarea
          className="text_area"
          placeholder="Enter main idea to generate related audio"
          value={input}
          onChange={(e) => setInput(e.target.value)}>
        </textarea>
        <button className='generate_btn' onClick={handleGenerate}>Generate</button>
        {output && (
          <div className='audio_text'>
            <h2>Generated Text</h2>
            <p>{output}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Audio;

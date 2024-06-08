import React, { useState } from 'react';
import axios from 'axios';
import './video_page.css';

function Video() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [videoPath, setVideoPath] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate', {
        user_input: input
      });
      setOutput(response.data.generated_text);
      speak(response.data.generated_text); // Convert text to speech
      if (response.data.video_path)
        setVideoPath(response.data.video_path);
    } catch (error) {
      console.error('Error generating text and video:', error);
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
      <p class="video_title">AI Video Generator</p>
      <div className="content">
        <textarea
          className="text_area"
          placeholder="Enter the idea and details of the video to be generated with transcription"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button className='generate_btn' onClick={handleGenerate}>Generate</button>
        {output && (
          <div className="video_text">
            <h2>Generated Text</h2>
            <p>{output}</p>
          </div>
        )}
        {videoPath && (
          <div className="video_container">
            <h2>Generated Video</h2>
            <video src={`http://localhost:5001/${videoPath}`} controls></video>
          </div>
        )}
      </div>
    </>
  );
}

export default Video;
import './audio.css';
import React, { useState, useEffect, useRef } from 'react';

function Audio() {
  const [input, setInput] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleGenerate = () => {
    if ('speechSynthesis' in window) {
      if (!isRecording) {
        const speech = new SpeechSynthesisUtterance(input);
        speech.onstart = () => {
          startRecording();
        };
        speech.onend = () => {
          stopRecording();
        };
        window.speechSynthesis.speak(speech);
      } else {
        console.error('Recording is already in progress.');
      }
    } else {
      console.error('Text-to-speech not supported.');
    }
  };

  const startRecording = () => {
    audioChunksRef.current = [];
    const stream = new MediaStream();
    navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(mediaStream);
      const destination = audioContext.createMediaStreamDestination();
      source.connect(destination);
      stream.addTrack(destination.stream.getAudioTracks()[0]);

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }).catch((error) => {
      console.error('Error accessing microphone:', error);
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <>
      <p className="audio_title">Text to Speech Generator</p>
      <div className="content">
        <textarea
          className="text_area"
          placeholder="Enter input here"
          value={input}
          onChange={(e) => setInput(e.target.value)}>
        </textarea>
        <button className='generate_btn' onClick={handleGenerate}>Generate</button>
        {audioURL && (
          <div className='audio_text'>
            <h2>Downloadable Audio</h2>
            <a href={audioURL} download="user_input_audio.wav">Download Link</a>
          </div>
        )}
      </div>
    </>
  );
}

export default Audio;

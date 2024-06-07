import React, { useState } from 'react';
import axios from 'axios';

const NotebookRunner = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleRunNotebook = async () => {
    try {
      const response = await axios.post('https://44ee-217-165-108-199.ngrok-free.app/generate', {
        user_input: input
      });
      console.log(response.data.generated_text)
      setOutput(response.data.generated_text);
    } catch (error) {
      console.error('Error running notebook:', error);
    }
  };

  return (
    <div>
      <h1>Run Jupyter Notebook</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input"
      />
      <button onClick={handleRunNotebook}>Run Notebook</button>
      <div>
        <h2>Output</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default NotebookRunner;

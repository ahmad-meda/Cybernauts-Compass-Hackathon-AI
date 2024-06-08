import React from 'react';
import { FaVideo, FaClosedCaptioning, FaFileAudio } from "react-icons/fa";
import './App.css';

function App() {
  return (
    <>
      <div className='tsparticles' data-generated="false" aria-hidden="true" width=" 1858" height=" 1424"
      ></div>
      <div className="navbar">
        <ul className="nav_items">
          <li><a href="/"><FaVideo /></a></li>
          <li><a href="/caption"><FaClosedCaptioning /></a></li>
          <li><a href="/audio"><FaFileAudio /></a></li>
        </ul>
      </div></>
  );
}

export default App;

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router";
import Video from "./video_page.js";
import Caption from "./caption.js";
import Audio from "./audio.js"


function Rout() {

  return (
    <Routes>
      <Route path="/" element={<Video />} />
      <Route path="/caption" element={<Caption />} />
      <Route path="/audio" element={<Audio />} />
    </Routes>
  );
};

export default Rout;
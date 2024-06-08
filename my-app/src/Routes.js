import React from "react";
import { Routes, Route } from "react-router";
import Video from "./video_page.js";
import Audio from "./audio.js"


function Rout() {

  return (
    <Routes>
      <Route path="/" element={<Video />} />
      <Route path="/audio" element={<Audio />} />
    </Routes>
  );
};

export default Rout;
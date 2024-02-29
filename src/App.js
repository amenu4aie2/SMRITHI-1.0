import React, { useState } from "react";
import axios from "axios";
import { useSpeechRecognition } from "react-speech-recognition";
import { Button } from "@material-tailwind/react";
import { WavRecorder } from "webm-to-wav-converter";
import SpeechRecognition from "react-speech-recognition";
import Perspective from "./Perspective";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Authentication/Login/Login";
import SignUp from "./Authentication/SignUp/SignUp";
function App() {
  // if not authenticated then return <Login />
  // else
  // Perspective
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/Perspective" element={<Perspective />} />

          <Route path="/SignUp" element={< SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
  // return <Perspective />;
}

export default App;

import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useSpeechRecognition } from "react-speech-recognition";

function SpeechRecognitionComponent({ setInputText }) {
  const [recording, setRecording] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition, startListening, stopListening } = useSpeechRecognition();

  const handleStartRecording = () => {
    if (browserSupportsSpeechRecognition) {
      resetTranscript();
      startListening({ continuous: true });
      setRecording(true);
    } else {
      alert("Your browser doesn't support speech recognition.");
    }
  };

  const handleStopRecording = () => {
    stopListening();
    setRecording(false);
  };

  return (
    <div>
      <Button
        className={`bg-indigo-900 ml-4 text-lg ${recording ? "bg-indigo-800" : ""}`}
        onClick={recording ? handleStopRecording : handleStartRecording}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </Button>
      <Button className="bg-indigo-900 text-lg" onClick={() => {resetTranscript(); setInputText('');}}>
        Reset
      </Button>
      <p className="text-sm pt-5">Microphone: {recording ? "on" : "off"}</p>
      <p className="text-sm">{transcript}</p>
    </div>
  );
}

export default SpeechRecognitionComponent;

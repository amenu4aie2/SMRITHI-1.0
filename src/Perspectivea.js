import axios from "axios";
import React, { useState } from "react";
import "./Perspective.css";
import { useSpeechRecognition } from "react-speech-recognition";
import { Button } from "@material-tailwind/react";
import { WavRecorder } from "webm-to-wav-converter";
import SpeechRecognition from "react-speech-recognition";
// firestore
import Book from "../src/Authentication/Book";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import LiveChat from "./LiveChat.js";

function Perspectivea(props) {
  const [inputText, setInputText] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const db = await getFirestore();
      // add as an element in array with collection name journal and document name as uuid of user
      const docRef = await addDoc(collection(db, "journal"), {
        user_message: inputText,
        poem: "poem",
      });
      await axios.post("http://127.0.0.1:5000/get_poem", {
        user_message: inputText,
      });

      alert("Text stored successfully!");
      setInputText("");
    } catch (error) {
      console.error("Error storing text:", error);
    }
  };

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    } else {
      alert("Your browser doesn't support speech recognition.");
    }
  };

  const stopListening = () => {
    setInputText((prev) => prev + " " + transcript);
    SpeechRecognition.stopListening();
  };

  return (
    <div
      className="container w-full p-10 rounded-xl mt-20 pt-20  h-100 w-700"
      style={{
        background: "linear-gradient(145deg, #6D5B97, #2A2A57)",
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <LiveChat />

      <div className="box two">
        <form
          onSubmit={handleSubmit}
          className="max-auto  shadow-md rounded px-10 pt-85 pb-20 mb-14"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #6D5B97)",
          }}
        >
          <label className="block text-gray-0 text-sm font-bold mb-10 pt-36 pb-10">
            Perception:
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-24 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </form>
      </div>

      <div className="box three">
        <form
          onSubmit={handleSubmit}
          className="max-auto  shadow-md rounded px-10 pt-85 pb-20 mb-14"
          style={{
            background: "linear-gradient(to right, #ff7e5f, #6D5B97)",
          }}
        >
          <label className="block text-gray-0 text-sm font-bold mb-10 pt-36 pb-10">
            Solution:
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-24 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </form>
      </div>
    </div>
  );
}

export default Perspectivea;

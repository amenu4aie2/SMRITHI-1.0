import axios from "axios";
import React, { useState } from "react";
import "./Perspective.css";
import { useSpeechRecognition } from "react-speech-recognition";
import { Button } from "@material-tailwind/react";
import { WavRecorder } from "webm-to-wav-converter";
import SpeechRecognition from "react-speech-recognition";
import { getAuth } from "firebase/auth";
// setDoc
import { setDoc, doc } from "firebase/firestore";
// firestore
// take from config
import { app } from "./config";
import Book from "../src/Authentication/Book";
import { useLocation } from "react-router-dom";
import Perspectivea from "./Perspectivea";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
function Perspective() {
  const location = useLocation();
  const dataFromSendingComponent = location.state.user;
  const [inputText, setInputText] = useState("");
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // add as an element in array with collection name journal and document name as uuid of user

      const auth = getAuth(app);
      const db = getFirestore(app);
      console.log(dataFromSendingComponent);
      console.log(auth.currentUser.uid);

      try {
        await setDoc(doc(db, "journal", auth.currentUser.uid), {
          inputText: inputText,

          createdAt: new Date(),
        });
        console.log("Document written with ID: ");

        await axios
          .post("http://127.0.0.1:5000/get_poem", {
            user_message: inputText,
          })
          .then((response) => {
            console.log(response.data);
            setInputText(response.data);
          });

        alert("Text stored successfully!");
        setInputText("");
      } catch (error) {
        console.error("Error storing text:", error);
      }
    } catch (error) {
      console.error("Error storing text:", error);
    }
    // Navigate("/Perspectivea", { state: { user: dataFromSendingComponent } });
    // send the input text to perspectivea
    Navigate("/Perspectivea", { state: { user: inputText } });
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
    <div className="container mx-auto p-8">
      <Book />

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Enter Text:
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <div className="flex items-center justify-between">
          <Button
            type="button"
            onClick={startListening}
            style={{ color: "blue" }}
          >
            Start Recording
          </Button>
          <Button
            type="button"
            onClick={stopListening}
            style={{ color: "red" }}
          >
            Stop Recording
          </Button>
          <Button type="submit" style={{ color: "green" }}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Perspective;

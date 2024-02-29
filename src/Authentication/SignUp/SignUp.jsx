import { useState } from "react";
import { app } from "../../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
function SignUp() {
  const navigate = useNavigate();
  // make states for each input
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  const [Age, setAge] = useState("")
  const [Gmail, setGmail] = useState("")
  // make a function to handle the submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const db = getFirestore(app);
    await createUserWithEmailAndPassword(auth, Gmail, Password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setDoc(doc(db, "credentials", user.uid), {
          username: Username,
          age: Age,
          gmail: Gmail,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
      navigate('/Login'); 
  }
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="text-pink-300 text-3xl font-bold mb-10">Sign Up</h1>
        <div className="signup-input">
          <input type="text" placeholder="USERNAME" onChange={(e)=> setUsername(e.target.value) } />
        </div>
        <div className="signup-input">
          <input type="password" placeholder="PASSWORD" />
        </div>
        {/* age ,gmail,  */}
        <div className="signup-input">
          <input type="text" placeholder="AGE" onChange={(e)=> setAge(e.target.value)}/> 
        </div>
        <div className="signup-input">
          <input type="text" placeholder="GMAIL" onChange={(e)=> setGmail(e.target.value)}/>
        </div>


        <button className="signup-button">
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default SignUp;

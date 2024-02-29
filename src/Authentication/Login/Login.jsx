import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { app } from '../../config';
const auth = getAuth(app);
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            var user="";
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // Signed in
                console.log(userCredential);
                var user = userCredential.user;
                console.log(user.uid);
                navigate('/Perspective', { state: { uid: user.uid } });
                // ...
            });
            
            console.log("logged in successfully");
            // navigate('/Perspective');
            // send n to perspective
            
        } catch (error) {
            console.error("Error signing in:", error);
            navigate('/SignUp');
        }
    };
    const gradientStyle = {
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)', 
      };    
    return (
        <div className="w='500px' h-full flex justify-center rounded-3xl items-center gradient-background">
            <div className="p-2 rounded-3xl shadow-2xl gradient-card">
            <div className="p-10 rounded-2xl flex flex-col items-center gradient-card" style={{ padding: '6rem', borderRadius: '1.5rem', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', background: 'linear-gradient(145deg, #6D5B97, #2A2A57)' }}>
                    <h1 className="text-pink-300 text-3xl font-bold mb-10"></h1>
                    <div className="gradient-input p-1 w-80 rounded-lg mb-4"style ={{marginBottom:'3rem'}}>
                        <input type="text" placeholder="USERNAME" className="w-full bg-transparent text-white placeholder-white px-4 py-2 rounded-lg focus:outline-none" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="gradient-input p-1 w-80 rounded-lg mb-8"style ={{marginBottom:'2rem'}}>
                        <input type="password" placeholder="PASSWORD" className="w-full bg-transparent text-white placeholder-white px-4 py-2 rounded-lg focus:outline-none" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className="gradient-button text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out"  style={{ background: '#3F2455'} } onClick={handleLogin}>
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;

import "../App.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth, logInWithEmailAndPassword, signInWithGoogle, signInWithPopup, signInWithFacebook } from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import PrivacyPolicy from "../PrivacyPolicy.jsx"

// Svgs
import {Logo} from '../assets/logo.jsx';
import {Google} from '../assets/Google.jsx';
import {Facebook} from '../assets/Facebook.jsx';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [privacyPolicy, setPrivacyPolicy] = useState(false)

  useEffect(() => {
    if (loading) return

    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <>
    <div className="mx-auto my-2 flex justify-center h-[200px] animate-fadeDOWN"><Logo/></div>
    <div className="login animate-fadeUP2">
      <div className="login__container bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none">
        <input
          type="text"
          className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2"
          onClick={() => logInWithEmailAndPassword(email, password)}>
          Login
        </button>
        <p className="my-5">- or -</p>

        <div className="flex flex-row w-[fit-content] mx-auto gap-[10px]">
          <button className="text-center m-auto bg-gradient-to-r from-transparent" onClick={signInWithGoogle}>
            <Google/>
          </button>

          <button className="text-center m-auto bg-gradient-to-r from-transparent" onClick={signInWithFacebook}>
            <Facebook/>
          </button>
        </div>
        
        <div className="mt-[2rem!important]">
          <Link className="text-[#ff5858]  bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none" to="/reset">Forgot Password</Link>
        </div>
        <div className="my-4">
          Don't have an account? <Link className="text-[#ff5858] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none " to="/register">Register</Link> now.
        </div>
{/* 
        <div
          className="fb-like"
          data-share="true"
          data-width="450"
          data-show-faces="true">
        </div> */}

        <div>
          <button href="#" className="my-4 underline bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl p-2 outline-none " onClick={()=>setPrivacyPolicy(true)}>Privacy Policy</button>
        </div>
        {privacyPolicy && <PrivacyPolicy privacyPolicy={setPrivacyPolicy}/> }
      </div>
    </div>
    </>
  );
}

export default Login;

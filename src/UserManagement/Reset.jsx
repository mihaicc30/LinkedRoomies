import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../Config/firebase";

// Svgs
import {Logo} from '../assets/logo.jsx';


function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <>
    <div className="mx-auto my-2 flex justify-center h-[200px]"><Logo/></div>
    
    <div className="reset flex flex-col  animate-fadeUP2">
    
      <div className="reset__container bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none">
        <input
          type="text"
          className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2" onClick={() => sendPasswordReset(email)}>
          Send password reset email
        </button>

        <div>
          Don't have an account? <Link to="/register" className="text-[#ff5858] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none">Register</Link> now.
        </div>
      </div>
    </div>
    </>
  );
}

export default Reset;

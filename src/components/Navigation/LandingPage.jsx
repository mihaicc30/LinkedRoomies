
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../config/firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";

// Svgs
import {Logo} from '../../assets/logo.jsx';
import {Google} from '../../assets/Google.jsx';


const LandingPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
      if (loading) return
      if (!user) navigate("/login")
      if (user) navigate("/dashboard");
    }, [user, loading]);
  
}

export default LandingPage

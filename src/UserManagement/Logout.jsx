import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Logout = () => {
	const navigate = useNavigate();
	signOut(auth);

	useEffect(() => {
		navigate("/login");
	});

	return null;
};

export default Logout;

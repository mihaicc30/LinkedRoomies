import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	db,
	auth,
	logInWithEmailAndPassword,
	signInWithGoogle,
	signInWithPopup,
	signInWithFacebook,
} from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import PrivacyPolicy from "./PrivacyPolicy.jsx";

// Svgs
import { Logo } from "../assets/logo.jsx";
import { Google } from "../assets/Google.jsx";
import { Facebook } from "../assets/Facebook.jsx";

function Login() {
	const [err, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const [privacyPolicy, setPrivacyPolicy] = useState(false);

	useEffect(() => {
		if (loading) return;

		if (user) navigate("/dashboard");
	}, [user, loading, err]);

	const handleLogin = async (method) => {
		switch (method) {
			case "logInWithEmailAndPassword":
				try {
					setErrors([]);
					let errors = [];
					let testingString =
						/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
					if (!email) {
						errors.push("Email required.");
					} else if (!testingString.test(email)) {
						errors.push("Email invalid.");
					}

					if (!password) {
						errors.push("Password required.");
					} else if (password.length < 3) {
						errors.push("Password too short.");
					}

					if (errors.length > 0) {
						errors.map((err, i) =>
							setErrors((prevErrors) => [...prevErrors, err]),
						);
					} else {
						await logInWithEmailAndPassword(email, password);
					}
				} catch (error) {
					console.log(error.message);
					switch (error.message) {
						case "Firebase: Error (auth/user-not-found).":
							setErrors("User is not found. ");
							break;

						case "Firebase: Error (auth/wrong-password).":
							setErrors("Password is incorrect. ");
							break;

						case "Firebase: Error (auth/internal-error).":
							setErrors("Login fields are not valid. ");
							break;

						case "Firebase: Error (auth/invalid-email).":
							setErrors("Login fields are not valid. ");
							break;

						case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
							setErrors(
								"Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. ",
							);
							break;

						default:
							break;
					}
				}
				break;

			case "signInWithGoogle":
				console.log("Opening google login popup.");
				await signInWithGoogle();
				break;
			case "signInWithFacebook":
				console.log("Opening facebook login popup.");
				await signInWithFacebook();
				break;

			default:
				break;
		}
	};

	return (
		<>
			<div className="mx-auto my-2 flex justify-center h-[200px] animate-fadeDOWN">
				<Logo />
			</div>
			<div className="login animate-fadeUP2">
				<div className="login__container bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none">
					<input
						type="text"
						className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email Address"
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
						onClick={() => handleLogin("logInWithEmailAndPassword")}>
						Login
					</button>

					{err && err.length > 0 &&
							<p className="text-red-400 mt-3 animate-fadeUP1">
								🔻{err}
							</p>
						}

					<p className="my-5">- or -</p>

					<div className="flex flex-row w-[fit-content] mx-auto gap-[10px]">
						<button
							className="text-center m-auto bg-gradient-to-r from-transparent"
							onClick={() => handleLogin("signInWithGoogle")}>
							<Google />
						</button>

						<button
							className="text-center m-auto bg-gradient-to-r from-transparent"
							onClick={() => handleLogin("signInWithFacebook")}>
							<Facebook />
						</button>
					</div>

					<div className="mt-[2rem!important]">
						<Link
							className="text-[#ff5858]  bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none"
							to="/reset">
							Forgot Password
						</Link>
					</div>
					<div className="my-4">
						Don't have an account?
						<Link
							className="text-[#ff5858] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none "
							to="/register">
							Register
						</Link>
						now.
					</div>
					<div>
						<button
							href="#"
							className="my-4 underline bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl p-2 outline-none "
							onClick={() => setPrivacyPolicy(true)}>
							Privacy Policy
						</button>
					</div>
					{privacyPolicy && <PrivacyPolicy privacyPolicy={setPrivacyPolicy} />}
				</div>
			</div>
		</>
	);
}

export default Login;

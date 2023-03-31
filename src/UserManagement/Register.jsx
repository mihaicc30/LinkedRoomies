import "../App.css";
import React, { useEffect, useState } from "react";
import { Google } from "../assets/Google.jsx";
import { Facebook } from '../assets/Facebook.jsx';
import { Logo } from "../assets/logo.jsx";
import { NavLink, Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	auth,
	db,
	logout,
	registerWithEmailAndPassword,
	signInWithGoogle,
	signInWithFacebook
} from "../Config/firebase";

function Register() {

	const [user, loading, error] = useAuthState(auth);
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
	});
	
	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};



	const register = async () => {
		setErrors([])
		let errors = []
		let testingString =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!values.name) {
			errors.push("Name required.")
		} else if (values.name.length < 3) {
			errors.push("Name too short.")
		}
		if (!values.email) {
			errors.push("Email required.")
		} else if (!testingString.test(values.email)) {
			errors.push("Email invalid.")
		}

		if (!values.password) {
			errors.push("Password required.")
		} else if (values.password.length < 3) {
			errors.push("Password too short.")
		}
		
		console.log(errors);
		if(errors.length > 0) {
			errors.map((err,i)=>  setErrors(prevErrors => [...prevErrors, err]))
			
		} else {
			console.log("Registering user");
			const regMe = await registerWithEmailAndPassword(values.name, values.email, values.password);
			console.log(regMe);
			if (regMe != "Success") setErrors(regMe);
		}

		
	};

	useEffect(() => {
		if (loading) return;
		if (user) navigate("/dashboard");
	}, [user, loading, error, errors]);

	return (
		<>
			<div className="mx-auto my-2 flex justify-center h-[200px]">
				<Logo />
			</div>

			<div className="register  animate-fadeUP2">
				<div className="register__container bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none">
					<input
						type="text"
						className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none"
						value={values.name}
						name="name"
						onChange={handleChange}
						placeholder="Full Name"
					/>
					<input
						type="text"
						className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none"
						name="email"
						value={values.email}
						onChange={handleChange}
						placeholder="E-mail Address"
					/>
					<input
						type="password"
						className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none"
						value={values.password}
						name="password"
						onChange={handleChange}
						placeholder="Password"
					/>
					<button className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2" onClick={register}>
						Register
					</button>
					<div className="flex flex-col">
						{console.log(errors)}
					{errors && errors.map((err,i) => (
						<p key={i} className="text-red-400">🔻{err}</p>
					))}


					</div>

					<p className="my-5">- or -</p>
					
        <div className="flex flex-row w-[fit-content] mx-auto gap-[10px]">
          <button className="text-center m-auto bg-gradient-to-r from-transparent" onClick={signInWithGoogle}>
            <Google/>
          </button>

          <button className="text-center m-auto bg-gradient-to-r from-transparent" onClick={signInWithFacebook}>
            <Facebook/>
          </button>
        </div>

					<div>
						Already have an account?{" "}
						<NavLink className="text-[#ff5858] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none" to="/login">
							Login
						</NavLink>{" "}
						now.
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;


import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { auth, db, logout } from "../../config/firebase.jsx";
import {
	query,
	collection,
	getDocs,
	where,
	setDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import Modal from "../Modals/Modal.jsx";
import {
	getAuth,
	updateProfile,
	updateEmail,
	updatePassword,
} from "firebase/auth";

import { DefaultUser } from "../../assets/DefaultUser.jsx";
import { Logo } from "../../assets/logo.jsx";
import Nav from "../Navigation/Nav";
import ScrollToTopButton from "../ScrollToTopButton.jsx";

function Profile() {
	const navigate = useNavigate();

	const [user, loading, error] = useAuthState(auth);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [namePhoto, setNamePhoto] = useState("");
	const [nameAttr, setNameAttr] = useState(false);
	const [nameTemp, setNameTemp] = useState("");
	const [PhotoTemp, setPhotoTemp] = useState("");
	const [PasswordTemp, setPasswordTemp] = useState("");
	const [EmailTemp, setEmailTemp] = useState("");

	// to do : perform validation
	//   const [errors, setErrors] = useState({});

	const fetchUserName = async () => {
		if (!user) return;
		try {
			const q = await query(
				collection(db, "users"),
				where("uid", "==", user?.uid),
			);
			const doc = await getDocs(q);

			const data = await doc.docs[0].data();
			setName(data.name);
			setEmail(data.email);
			setNamePhoto(data.photo);
			if (data.attr != undefined) setNameAttr(data.attr);
			setNameTemp(data.name);
			setEmailTemp(data.email);
			setPhotoTemp(data.photo);
		} catch (err) {
			console.error(err);
			console.log("An error occured while fetching user data");
		}
	};

	useEffect(() => {
		if (loading) {
			return;
		} else if (!user) {
			return navigate("/");
		} else {
			fetchUserName();
		}
	}, [user, loading]);

	// to do : perform validation
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const q = await query(
				collection(db, "users"),
				where("uid", "==", user.uid),
			);
			const docx = await getDocs(q);

			const docRef = await doc(db, "users", docx.docs[0].id);
			await updateDoc(docRef, {
				name: nameTemp,
				email: EmailTemp,
				photo: PhotoTemp,
			});

			const userAuthAccount = getAuth();
			if (userAuthAccount) {
				await updateProfile(auth.currentUser, {
					displayName: nameTemp,
					photoURL: PhotoTemp,
				});
				await updateEmail(userAuthAccount.currentUser, EmailTemp);
				await updatePassword(auth.currentUser, PasswordTemp);
			} else {
				console.log("User is not authenticated");
			}
			console.log("Profile updated successfully!");

			await fetchUserName();
			setModalOpen(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		if (e.target.name == "name") {
			setNameTemp(e.target.value);
		}
		if (e.target.name == "photo") {
			setPhotoTemp(e.target.value);
		}
		if (e.target.name == "email") {
			setEmailTemp(e.target.value);
		}
		if (e.target.name == "password") {
			setPasswordTemp(e.target.value);
		}
	};

	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<main className="w-[100%] flex flex-col items-center gap-2">
				<form onSubmit={handleSubmit}>
					<div className="relative p-4 border-2 flex flex-col gap-2 animate-fadeUP1">
						<p className="text-center border-b-2 border-b-red-400 font-bold">
							<span className="capitalize">{name}</span> Profile
						</p>

						<div className="form styled-input mt-[30px] max-[539px]:w-[80vw] min-[701px]:w-[50vw] max-w-[400px] animate-fadeUP1">
							<input
								type="text"
								name="name"
								required
								value={nameTemp}
								onChange={handleChange}
							/>
							<label>Name*</label>
						</div>

						<div className="form styled-input max-[700px]:w-[80vw] min-[701px]:w-[50vw] max-w-[400px]  animate-fadeUP2">
							<input
								type="text"
								name="email"
								required
								value={EmailTemp}
								onChange={handleChange}
							/>
							<label className="rounded-[12px] w-[fit-content]">Email*</label>
						</div>

						<div className="form styled-input max-[700px]:w-[80vw] min-[701px]:w-[50vw] max-w-[400px]  animate-fadeUP2">
							<input
								type="text"
								name="photo"
								value={PhotoTemp}
								onChange={handleChange}
								required
							/>
							<label>Avatar</label>
						</div>

						<div className="form styled-input max-[700px]:w-[80vw] min-[701px]:w-[50vw] max-w-[400px]  animate-fadeUP2">
							<input
								type="password"
								name="password"
								defaultValue={""}
								onChange={handleChange}
								required
								auto="false"
							/>
							<label>Password</label>
						</div>

						<button className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 font-bold">
							Save
						</button>
					</div>
				</form>

				<div className="my-5 border-2 p-4 flex flex-col items-center w-[436px] max-[539px]:w-[80vw] animate-fadeUP1">
					<p className="text-center border-b-2 border-b-red-400 font-bold w-[100%]">
						User Traits
					</p>
					{/* start of traits */}
					{!nameAttr && <p>Questionnaire not filled in!</p>}
					{nameAttr && (
						<>
							<div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
								<span className="basis-1/2">Clean</span>
								<span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
									<span
										className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs"
										style={{
											width: parseInt(`${nameAttr["Clean"]}%`) * 20,
										}}></span>
								</span>
							</div>

							<div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
								<span className="basis-1/2">Friendly</span>
								<span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
									<span
										className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs"
										style={{
											width: parseInt(`${nameAttr["Friendly"]}%`) * 20,
										}}></span>
								</span>
							</div>

							<div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
								<span className="basis-1/2">Drinking</span>
								<span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
									<span
										className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs"
										style={{
											width: parseInt(`${nameAttr["Drinking"]}%`) * 20,
										}}></span>
								</span>
							</div>

							<div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
								<span className="basis-1/2">Responsable</span>
								<span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
									<span
										className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs"
										style={{
											width: parseInt(`${nameAttr["Responsable"]}%`) * 20,
										}}></span>
								</span>
							</div>

							<div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
								<span className="basis-1/2">Smoking</span>
								<span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
									<span
										className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs"
										style={{
											width: parseInt(`${nameAttr["Smoking"]}%`) * 20,
										}}></span>
								</span>
							</div>
						</>
					)}
					{/* end of traits */}
				</div>
				<NavLink to="/questionnaire" activeclassname={"active"}>
					<span className="bg-gradient-to-b from-red-400 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 cursor-pointer font-bold">
						&#62;&#62; {nameAttr ? "Reset" : "Add"} Traits &#60;&#60;
					</span>
				</NavLink>

				{modalOpen && (
					<Modal
						setOpenModal={setModalOpen}
						message={"Profile has been updated!"}
						type={"success"}
					/>
				)}
				<ScrollToTopButton />
			</main>
		</>
	);
}

export default Profile;

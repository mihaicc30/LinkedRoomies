
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { auth, db, logout } from "../Config/firebase";
import { query, collection, getDocs, where, setDoc, doc, updateDoc  } from "firebase/firestore";
import Modal from '../Modal.jsx'

import {DefaultUser} from '../assets/DefaultUser.jsx';
import {Logo} from '../assets/logo.jsx';
import ScrollTop from '../assets/ScrollTop.jsx';
import Nav from '../Navigation/Nav'


const AdminProfile = () => {
const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [namePhoto, setNamePhoto] = useState("");
  const [nameAttr, setNameAttr] = useState(false);
  const [nameTemp, setNameTemp] = useState("");
  const [PhotoTemp, setPhotoTemp] = useState("");

  const fetchUserName = async () => {
    if (!user) return
    try {
      const q = await query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);

      const data = await doc.docs[0].data();
      setName(data.name)
      setEmail(data.email)
      setNamePhoto(data.photo)
      if(data.attr != undefined)setNameAttr(data.attr)
	  setNameTemp(data.name)
	  setPhotoTemp(data.photo)
    } catch (err) {
      console.error(err);
      console.log("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) {
      return 
    } else if (!user) {
      return navigate("/")
    } else {
      fetchUserName();
    }
  }, [user, loading]);


  const handleSubmit = async(e) =>{
    e.preventDefault()
	try {

		const q = await query(collection(db, "users"), where("uid", "==", user.uid));
		const docx = await getDocs(q);

		const docRef = await doc(db, 'users', docx.docs[0].id)
		await updateDoc(docRef, {
			name: nameTemp,
			photo: PhotoTemp,
		})
		await fetchUserName()
		setModalOpen(true)
	} catch (error) {
		console.log(error);
	}
	
  }

	const handleChange = (e) => {
		if(e.target.name == "name"){
			setNameTemp(e.target.value)
		}
		if(e.target.name == "photo"){
			setPhotoTemp(e.target.value)
		}
	};


	const [modalOpen, setModalOpen] = useState(false);


  return (
    <div className="flex justify-center">
				<form onSubmit={handleSubmit} className="px-2">
					<div className="relative p-4 border-2 flex flex-col gap-2 animate-fadeUP1">
						<p className="text-center border-b-2 border-b-red-400 font-bold">
							<span className="capitalize">{name}</span> Profile
						</p>
						
						<div className="form styled-input mt-[30px] max-w-[400px] animate-fadeUP1">
							<input type="text" name="name" required value={nameTemp} onChange={handleChange} />
							<label>Name*</label>
						</div>

						<div className="form styled-input  max-w-[400px]  animate-fadeUP2">
							<input type="text" required  defaultValue={email} className="select-none text-[grey!important] bg-[#dad9d9!important]"/>
							<label className="bg-[#dad9d9!important] rounded-[12px] w-[fit-content]">Email*</label>
							<span className="absolute w-[100%] h-[100%] z-[2]" style={{WebkitUserDrag: "none",userSelect: "none"}}></span>
						</div>

						<div className="form styled-input  max-w-[400px]  animate-fadeUP2">
							<input type="text" name="photo" value={PhotoTemp} onChange={handleChange}/>
							<label>Avatar</label>
						</div>
						
						<button className="px-4 py-2 mt-[30px] border-2 rounded-[14px] bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 font-bold">
							Save
						</button>
					</div>
				</form>
    </div>
  )
}

export default AdminProfile

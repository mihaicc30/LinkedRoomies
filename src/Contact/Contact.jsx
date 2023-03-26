import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { auth, db, logout } from "../Config/firebase";
import { query, collection, getDocs, where, setDoc, doc } from "firebase/firestore";
import {DefaultUser} from '../assets/DefaultUser.jsx';
import Modal from '../Modal.jsx'

import {Logo} from '../assets/logo.jsx';
import ScrollToTopButton from '../ScrollToTopButton.jsx'
import Nav from '../Navigation/Nav'


function Contact() {
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [namePhoto, setNamePhoto] = useState("");
  const [modalOpen, setModalOpen] = useState(false);


  const fetchUserName = async () => {
    if (!user) return
    try {
      const q = await query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);

      const data = await doc.docs[0].data();

      setName(data.name)
      setNamePhoto(data.photo)
	  setEmail(data.email)
      
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
	// to do : perform validation
	try {
		const userRef = collection(db, "messages");
		await setDoc(doc(userRef), {
			uid: crypto.randomUUID(),
			name: e.target[0].value,
			email: e.target[1].value,
			message: e.target[2].value,
			status: "unread",
			date: new Date()
		})
		await fetchUserName()
		e.target[0].value,e.target[1].value,e.target[2].value = ""
		setModalOpen(true)
	} catch (error) {
		console.log(error);
	}
  }

  
  const [modal, setmodal] = useState("none");

  const handleOpenModal = () => {
    setmodal("flex")
  }
  
  const handleCloseModal = (i) => {
	  
	if(!i.startsWith("closingClass")) return

	const modal = document.getElementById('modal')
	modal.classList.add('animate-fadeOUT')

	setTimeout(() => {
		modal.classList.remove('animate-fadeOUT')
		setmodal("none")
	}, 250);
  }

  return (
		<>
			<main className="w-[100%] flex flex-col items-center gap-2">
				<form onSubmit={handleSubmit}>
					<div className="relative p-4 border-2 flex flex-col gap-2 animate-fadeUP1">
						<p className="text-center border-b-2 border-b-red-400 font-bold">
							Contact Form
						</p>

						<div className="form mt-[30px] styled-input max-[700px]:w-[80vw] min-[701px]:w-[50vw] max-w-[400px] animate-fadeUP1">
							<input type="text" name="name" required  defaultValue={name}/>
							<label>Name*</label>
						</div>

						<div className="form styled-input max-[700px]:w-[80vw] min-[701px]:w-[50vw] max-w-[400px] animate-fadeUP2">
							<input type="text" name="email" required defaultValue={email}/>
							<label>Email*</label>
						</div>

						<div className="styled-input max-[700px]:w-[80vw] min-[701px]:w-[50vw] max-w-[400px] animate-fadeUP2 h-[190px!important]">
							<textarea name="message" defaultValue=""
								rows="6"
								cols="22"
								required
								type="text"
							></textarea>
							<label>Message*</label>
						</div>

						<button className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 font-bold">
							Send
						</button>
					</div>
				</form>

				<div className="w-[80vw] min-h-[150px] overflow-auto flex flex-row gap-[2rem] my-[2rem]">
					<div className="min-w-[400px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 m-2 animate-fadeLEFT1">
						<h5 className="card-title text-xl font-bold text-center">
							General enquiries
						</h5>
						<p className="card-text">Telephone: 012345 123 123</p>
						<p className="card-text">
							Email: Generalenquiries@linkroomie.co.uk
						</p>
					</div>
					<div className="min-w-[400px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 m-2 animate-fadeLEFT2">
						<h5 className="card-title text-xl font-bold text-center">
							Cleaning enquiries
						</h5>
						<p className="card-text">Telephone: 023 8001 1722</p>
						<p className="card-text">
							Email: Cleaningenquiries@linkroomie.co.uk
						</p>
					</div>
					<div className="min-w-[400px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 m-2 animate-fadeLEFT3">
						<h5 className="card-title text-xl font-bold text-center">
							Press enquiries
						</h5>
						<p className="card-text">Telephone: 023 8201 3040</p>
						<p className="card-text">
							Email: Pressenquiries@linkroomie.co.uk
						</p>
					</div>
					<div className="min-w-[400px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 m-2 animate-fadeLEFT1">
						<h5 className="card-title text-xl font-bold text-center">
							Student Management
						</h5>
						<p className="card-text">Telephone: 023 8001 1722</p>
						<p className="card-text">
							Email: StudentManagement@linkroomie.co.uk
						</p>
					</div>
				</div>

				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6917.511154881631!2d-2.1947177485095053!3d52.194156195236246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870f17fa825cbb3%3A0xb57621d7cda583af!2sCCWorcester!5e0!3m2!1sen!2suk!4v1678295154348!5m2!1sen!2suk"
					className="w-[80vw] h-[450px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 animate-fadeUP1"
					allowFullScreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>

			<ScrollToTopButton/>
			</main>
			
			{modalOpen && <Modal setOpenModal={setModalOpen} message={"Your message has been sent!"} type={"success"}/>}
		</>
  );
  
}

export default Contact;

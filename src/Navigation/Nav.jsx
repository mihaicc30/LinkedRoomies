
import "../App.css";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Logo } from '../assets/logo.jsx';
import { DefaultUser } from '../assets/DefaultUser.jsx';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../Config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { signOut } from 'firebase/auth';

import MobileNav from './MobileNav.jsx'
import MobileNav2 from './MobileNav2.jsx'

const Nav = () => {
    const navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [namePhoto, setNamePhoto] = useState("");
  
    const fetchUserName = async () => {
      if (!user) return
      try {
        const q = await query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
  
        const data = await doc.docs[0].data();
        setName(data.name)
        setNamePhoto(data.photo)
        
      } catch (err) {
        console.error(err);
        console.log("An error occured while fetching user data");
      }
    };
  
    useEffect(() => {
      if (loading) {
        return 
      } else if (!user) {
        return navigate("/login")
      } else {
        fetchUserName();
      }
    }, [user, loading, namePhoto]);
  

    const handleLogout = () =>{
      signOut(auth);
      navigate("/login")
    }
  

    return (
        <>
        <header className="flex flex-col items-center z-[12]">
            <div className="flex w-[100%] justify-evenly items-center bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 outline-none">
            
                <nav className="w-full flex justify-between items-center relative max-h-[100px]"> 
                    <div className="w-[200px] animate-fadeDOWN max-[750px]:basis-1/3"><Logo/></div>
                
                    <ul className="flex flex-row gap-4 p-2 justify-center items-center max-[750px]:hidden">
                            <li className=" animate-fadeUP1">
                            <NavLink to="/dashboard" activeclassname={"active"} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw]">
                                Home
                            </NavLink>
                            </li>
                            <li className=" animate-fadeUP2">
                            <NavLink to="/accommodation" activeclassname={"active"} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw]">
                                Accommodation
                            </NavLink>
                            </li>
                            <li className=" animate-fadeUP3">
                            <NavLink to="/contact" activeclassname={"active"} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw]">
                                Contact
                            </NavLink>
                            </li>
                    </ul>
                    
                    <div className="flex flex-row justify-center items-center gap-4 p-[30px] max-h-[45px] max-[750px]:basis-1/3 max-[750px]:mr-4 max-[750px]:justify-around max-[750px]:p-0 ">
                        <li className="list-none  animate-fadeLEFT2 max-[750px]:hidden">
                            <NavLink to="/profile" activeclassname={"active"} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw]">
                                Profile
                            </NavLink>
                        </li>
                        <li className="list-none  animate-fadeLEFT2 max-[750px]:hidden">
                            <NavLink to="/logout" activeclassname={"active"} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw]">
                              Logout
                            </NavLink>
                        </li>
                        <div className=" min-[750px]:hidden flex items-center justify-around gap-[50px] basis-1/3 translate-y-[10%] translate-x-[-10%]">

                        <MobileNav/>
                        <MobileNav2 namePhoto={namePhoto} />
                        </div>
                        {namePhoto !== "" 
                          ? <img  src={namePhoto} className="rounded-xl max-[750px]:hidden fixed h-[50px] w-[50px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30" />
                          : <DefaultUser/> }
                    </div>
                </nav>
            
            </div>
        </header>
        
        </>
    )
}

export default Nav

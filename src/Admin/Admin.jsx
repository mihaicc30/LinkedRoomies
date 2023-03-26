import "../App.css";
import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, useNavigate, Routes, Route, Outlet, NavLink  } from "react-router-dom";
import { auth, db, logout } from "../Config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { Logo } from '../assets/logo.jsx';

import AdminDash from './AdminDash'
import AdminNav from './AdminNav'
import AdminMessages from './AdminMessages'
import AdminProfile from './AdminProfile'
import AdminRooms from './AdminRooms'
import AdminStudents from './AdminStudents'

const Admin = () => {

  const [ navState, setNavState ] = useState("Dash")

  return (
    
    <div className="adminPanel flex flex-col w-[100vw] h-[100vh] relative bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30">

      <div className="flex">
        <div className={`w-[200px] max-[350px]:w-[150px]`}>
          <div className="w-[200px] animate-fadeDOWN max-[350px]:w-[150px]"><Logo/></div>
        </div>
        
         
        <div className="flex items-center mx-5 text-lg font-bold overflow-hidden max-[350px]:mx-1">
          <p>{navState}</p>
        </div>
      </div>

      <div className="flex flex-nowrap  overflow-hidden">

        <div className={`flex flex-col items-inline w-[200px] max-[671px]:w-[36px] min-[671px]:w-[200px] text-[#162050] font-bold `}>
          <AdminNav navi={setNavState}/>
        </div>

        <div className="flex-1 left-[20%] h-[100%]  overflow-y-auto pb-5 text-[#162050]">
			    {navState == "Dash" && <AdminDash/>}
			    {navState == "Students" && <AdminStudents/>}
			    {navState == "Rooms" && <AdminRooms/>}
			    {navState == "Messages" && <AdminMessages/>}
			    {navState == "Profile" && <AdminProfile/>}
        </div>

      </div>

    </div>
  )
}

export default Admin

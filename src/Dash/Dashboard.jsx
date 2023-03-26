import "../App.css";
import React, { useEffect, useState } from "react";

// Authentification
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../Config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

// Carousel library
import Carousel from 'nuka-carousel';

// Svgs

// Components of Dashboard
import About from './About'
import Attributes from './Attributes'
import FromTheTeam from './FromTheTeam'
import Testimonial from './Testimonial'
import HelpSection from './HelpSection'

import ScrollToTopButton from '../ScrollToTopButton.jsx'

function Dashboard() {


  const fetchUserStatus = async () => {
    if (!user) return
    try {
      const q = await query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);

      const data = await doc.docs[0].data();
  
      return data.admin
    } catch (err) {
      console.error(err);
      console.log("An error occured while fetching rooms data");
    }
  };

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return
    if (user){
      async function fetchData(){
        const userStatus = await fetchUserStatus()
        if(userStatus) {navigate('/Admin')} else {navigate("/dashboard")}
      }
      fetchData()
    }
  }, [user, loading]);
  
  return (
    <>
    <main className="w-[100%] flex flex-col " >
      <p className="text-5xl text-center mt-[3rem] max-[500px]:text-3xl animate-fadeUP1 ">LinkedRoomies</p>
      <p className="text-[2vw] text-sm md:text-base text-center text-red-400 font-bold animate-fadeUP2">is the perfect app for university students who are looking for a compatible roommate to share a living space.</p>
      
      <div className="w-[600px] mx-auto max-[600px]:w-[90vw] animate-fadeUP3 bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4" >
        <Carousel slidesToShow={1} autoplay="true" wrapAround={true} animation="zoom" speed="1000" autoplayInterval="3000" className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl" >
          <img src="./assets/roomie1.JPG" />
          <img src="./assets/roomie2.JPG" />
          <img src="./assets/roomie4.JPG" />
          <img src="./assets/roomie3.JPG" />
        </Carousel>
      </div>

      <About/>
      <Attributes/>
      <FromTheTeam/>
      <Testimonial/>
      <HelpSection/>

      <ScrollToTopButton/>
    </main>

    </>
  );
  
}

export default Dashboard;

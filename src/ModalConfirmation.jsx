import React, {useState, useEffect} from 'react'
import { auth, db, logout } from "./Config/firebase";
import { query, collection, getDocs, where, setDoc, doc, updateDoc  } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Modal({setOpenModal,message, type, handleDelete, modalMessage, handleKick, qID}) {

  const [user, loading, error] = useAuthState(auth);
  
  const handleConfirmation = () =>{
    if(message == "Kick Out") {
      console.log("Proceed to kick out user.");
      handleKick(qID)
      handleCloseModal()
    } else if (message == "Delete Account"){
      console.log("Proceed to delete user account.");
      handleDelete(qID)
      handleCloseModal()
    }
  }
  const handleCloseModal = () =>{
    setOpenModal(false)
  }

  return (
    <div className="closingClass animate-fadeIN bg-[#000000b3] flex-col fixed items-center justify-center h-[100vh] z-[99]" style={{display:"flex", transition:".3s", inset:"0" }}>
        <div className="bg-[#fbf5f5] py-[15vw] px-[10vw] flex flex-col items-center gap-[5vw]">
            
              {type !== "confirmation"  ? "" :
                <>
                <p className="text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto animate-ping">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>


              Waiting...
              </p>
              <p>{`Are you sure you wish to proceed to ${message == "Send Eviction" ? "send a eviction notice and kick user out ?": "delete this account? Process is ireversible."}`}</p>
              <p>
                <button  onClick={handleConfirmation} className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none px-6 py-3"> Yes </button>
              </p>

              <button className="closingClass bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl p-2 outline-none px-6 py-3" onClick={handleCloseModal}>Close</button>
            </>
              }
        </div>
    </div>
  )
}

export default Modal

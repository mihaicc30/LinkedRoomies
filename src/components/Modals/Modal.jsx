import React, {useState, useEffect} from 'react'
import { auth, db, logout } from "../../config/firebase.jsx";
import { query, collection, getDocs, where, setDoc, doc, updateDoc  } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Modal({theID, setOpenModal,message, type, roomID}) {

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
		const interval = setTimeout(async() => {
			if (type == "loading") {
        // do my stuff
        if(!user) return

        handleCloseModal()
        // window.location.reload();
        // navigate('/accommodation')
			}
		}, 1000);

		return () => {
			clearTimeout(interval);
		};

	}, []);
  
  const handleCloseModal = () =>{
    setOpenModal(false)
  }

  return (
    <div onClick={handleCloseModal} id={"modal"+theID} className="closingClass animate-fadeIN bg-[#000000b3] flex-col fixed items-center justify-center h-[100vh] z-[99]" style={{display:"flex", transition:".3s", inset:"0" }}>
        <div className="bg-[#fbf5f5] py-[15vw] px-[10vw] flex flex-col items-center gap-[5vw]">
            
                {type == "success"  ?
                <><p className="text-green-500 font-bold"><svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth={2.5} stroke="green" className="w-6 h-6 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>Success</p></> : "" }
                
                {type == "failure"  ?
                <>
                <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-400 ]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                </svg>
                <p className="text-center w-[100%] text-lg text-red-400 font-bold">Error</p></div>
                </> : "" }

              
              {type == "loading"  ?
                <>
                <p className="text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 animate-spin mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

              Loading
              </p>
              </> : "" }
              {type == "loading"  ? "" :
              <>
            <p>{message}</p>
            {type == "loading"  ? "" :
            <button className="closingClass px-6 py-3 rounded-xl bg-gradient-to-r from-[#bfbfbf40] to-[#ffffff]" onClick={handleCloseModal}>Close</button>
              }
            </>
              }
        </div>
    </div>
  )
}

export default Modal

import React, { useState, useEffect } from 'react'
import { query, collection, getDocs, where, setDoc, doc, updateDoc  } from "firebase/firestore";
import StudentCard from './StudentCard.jsx'
import Modal from '../../Modals/Modal.jsx'
import { auth, db, logout } from "../../../config/firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { matchUsers, overallMatch } from "../../../Config/MatchFunction.jsx";

const Room = (props) => {


    const [user, loading, error] = useAuthState(auth);
    const {data, me, aniDelay, filters, userIsInRoom} = props
    const [modalRoomID, setModalRoomID] = useState("")
	const [modalOpen, setModalOpen] = useState(false);
	const [modalOpen2, setModalOpen2] = useState(false);
    const [roomPC, setRoomPC] = useState(0)

    const [showFilteredComponent, setShowFilteredComponent] = useState(false);
    const [showComponent, setShowComponent] = useState(false);
    
    const handleJoin = async(roomID) =>{
        // console.log(roomID);
        setModalRoomID(roomID)
        
        
        // get room data
        
        const qq = await query(collection(db, "rooms"), where("uid", "==", roomID));
        const doczz = await getDocs(qq);
        let docRoomID=doczz.docs[0]?.id
        let roomDATA = doczz.docs[0].data() 
        // if there is no room 
        // *just double checking the space available in case two students click in the same time and there is only one spot left
        if(roomDATA.students.length >= roomDATA.pax) return setModalOpen2(true)
        
        //opening the loading modal
        setModalOpen(true)

        if(!user) return
       
        // console.log(`Looking for user : ${user.uid}`);
        // step1. check if user is in ANY room, if yes, delete record
        const q = await query(collection(db, "rooms"), where("students", "array-contains", user.uid));
        const docz = await getDocs(q);
        if(docz.docs[0]?.data()){
          console.log("user found = > delete this data");
          let docID=docz.docs[0]?.id
          let data2=docz.docs[0].data()
          const updatedStudents = data2.students.filter(id => id !== user.uid);
          const docRef = await doc(db, 'rooms', docID)
		      await updateDoc(docRef, {
          	students : updatedStudents
          })
        } else {
          console.log("user not found");
        }
        // step2. put user in room
        // console.log(roomID);

        // console.log(roomDATA);
        roomDATA.students.push(user.uid)

        const docRef2 = await doc(db, 'rooms', docRoomID)
        await updateDoc(docRef2, {
          	students : roomDATA.students
        })

        setTimeout(() => {
            props.triggerRefresh(true)
        }, 300);  
    }

    useEffect(()=>{
        if(data.students.length > 0) {
            
            const updatedStudents = data.students.filter(id => id !== user.uid);
            async function calculateMatch() {
                setRoomPC(await overallMatch(props.me, updatedStudents))
            }
            calculateMatch()
        } else {
            setRoomPC(false)
        }

        if((filters.maxppl >= data.pax || filters.maxppl == "All") &&
            (filters.ensuite == data.ensuite || filters.ensuite == "All")  &&
                (parseInt(String(roomPC).split('.')[0]) >= parseInt(filters.match)  || filters.match == 0) &&
                    (filters.full && (data.students.length - data.pax != 0) || !filters.full) 
            ) {setShowFilteredComponent(true)} else {setShowFilteredComponent(false)}

    },[me, data, roomPC, filters, userIsInRoom])

    useEffect(() => {
        const timer = setTimeout(() => {
            if(showFilteredComponent) setShowComponent(true);
        }, aniDelay * 50); // delay time in milliseconds
        return () => clearTimeout(timer);
    }, [me, data, roomPC, filters, userIsInRoom,showComponent]);

    
    if (showComponent && showFilteredComponent)
        return (
            <>
                <div key={crypto.randomUUID()} className="flex flex-col basis-1/4 justify-evenly border-2 p-4 animate-fadeUP1 min-w-[260px] max-w-[270px] min-h-[300px] max-h-[380px]" >
                    {/* future idea : below to insert a slideshow of pics */}
                    <img src={data.imgs[0]} alt="avatar" className="my-4 w-[100%] rounded shadow-lg shadow-[#000] p-[2px] animate-fadeUP1" />

                    <div className="text-[2rem] whitespace-nowrap animate-fadeUP1">{data.location}</div>
                    <div className="whitespace-nowrap animate-fadeUP1">
                        Pax: {data.students.length}/{data.pax}
                    </div>

                    <div className="animate-fadeUP1">
                        {/* if there are people in the flat */}
                        {/* display here and the % match with user profile */}
                        <div className="student w-[100%]">
                            {" "}
                            {/* this is the result from student map loop*/}
                            <p className="whitespace-nowrap">
                                {roomPC && data.students.length - data.pax != 0 &&
                                <>
                                <span className="text-red-600 font-bold text-xl">
                                    {roomPC}
                                </span>
                                <span className="text-red-600 font-bold text-xl"> Match</span>{" "}
                                with Roomie
                                </>
                                }
                                
                                {roomPC && data.students.length - data.pax == 0 &&
                                <>
                                <span className="text-red-400 font-bold"> Full!</span>
                                </>
                                }
                                {!roomPC && data.pax > 1 &&
                                <>
                                <span className="text-red-400 font-bold"> No roomies in here!</span>
                                </>
                                }

                                {!roomPC && data.pax < 2 && data.students.length < 1 &&
                                <>
                                <span className="text-red-400 font-bold animate-mPulse"> ✨Rare Own Flat✨</span>
                                </>
                                }

                                

                            </p>
                            {/* start dropdown on more details about the match */}
                            <div className="studentDropdownMatchDetails animate-fadeIN flex flex-row-reverse justify-between">
                               
                                    {userIsInRoom == data.uid && 
                                    <button className="px-4 py-2 border-2 text-white bg-red-400 rounded-xl" disabled={true}>
                                        <p>Already</p>
                                        <p>In!</p>
                                    </button>
                                    }
                                    {userIsInRoom !== data.uid &&  roomPC && data.students.length - data.pax != 0 &&
                                    <button className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4" onClick={()=>handleJoin(data.uid)}>
                                        Join
                                    </button>
                                    }
                                    
                                    {userIsInRoom !== data.uid &&  data.students.length == 0 &&
                                    <button className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 min-h-[68px]" onClick={()=>handleJoin(data.uid)}>
                                        Join
                                    </button>
                                    }
                                    {userIsInRoom !== data.uid &&  roomPC && data.students.length - data.pax == 0 &&
                                    <button className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 min-h-[68px]" disabled={true}>
                                        Join
                                    </button>
                                    }
                            
                            {/* userIsInRoom == data.uid */}
                            {roomPC && data.students.length - data.pax != 0 &&
                                <button key={crypto.randomUUID()} type="button" onClick={() => document.getElementById(data.uid).classList.remove("hidden")} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4" >
                                    <p>Match</p>
                                    <p>Details</p>
                                </button>
                                }

                                {roomPC && data.students.length - data.pax == 0 && userIsInRoom == data.uid &&
                                <button key={crypto.randomUUID()} type="button" onClick={() => document.getElementById(data.uid).classList.remove("hidden")} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4" >
                                    <p>Match</p>
                                    <p>Details</p>
                                </button>
                                }

                                <div className="fixed inset-0 z-[50] hidden items-center justify-center bg-[#000000e6] gap-[2rem] text-sm" id={data.uid} >
                                    <div className="fixed top-[150px] bottom-[5vw] right-[5vw] left-[5vw]  flex flex-col flex-nowrap justify-center gap-[1rem] align-center items-center bg-[#f1f1f1] animate-fadeIN max-w-[900px] overflow-auto max-[780px]:flex-col rounded-lg mx-auto">
                                        
                                        <div className="flex flex-col h-[100%] items-center p-6">
                                            <StudentCard data={props.me} myself={"x"} key={props.me.uid}/>

                                            <div className="overallMatchInfo">
                                                <p className="textShadow">Match:</p>
                                                <p className="textShadow text-3xl">{roomPC}</p>

                                                <button onClick={() => document.getElementById(data.uid).classList.add("hidden")} className="px-[2rem] py-[1rem] rounded-xl shadow-lg shadow-stone-900 bg-[#00000029] " >Close</button>
                                            </div>
                                            <div className="flex flex-wrap w-[100%] justify-center">
                                                {data.students.map((stud,index) => {
                                                    if(stud.uid == me.uid ) return
                                                    return <StudentCard key={stud.uid} data={stud} myself={props.me} />
                                                    
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/*end of dropdown */}
                        </div>{" "}
                        {/* end of 1 student loop, repeat if more*/}
                    </div>
                </div>
                {/*end of post of room*/}
                
      			{modalOpen && <Modal setOpenModal={setModalOpen} message={""} type={"loading"} roomID={modalRoomID}/>}
      			{modalOpen2 && <Modal setOpenModal={setModalOpen2} message={"Room is full. Try refreshing the page!"} type={"failure"} roomID={modalRoomID}/>}
            </>
        );
}

export default Room
 

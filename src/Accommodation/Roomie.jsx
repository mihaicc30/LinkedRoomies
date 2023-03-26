import React, { useState, useEffect } from 'react'
import { auth, db, logout } from "../Config/firebase";
import { query, collection, getDocs, getDoc, where, orderBy, doc } from "firebase/firestore";

const Roomie = ({i}) => {
    const [roomieName, setRoomieName] = useState(false)
    const [roomiePhoto, setRoomiePhoto] = useState(false)
      
    async function returnStudentPhoto(id){
    if (!id) return
    try {
        const q1 = await query(collection(db, "users"), where("uid", "==", id));
        const doc = await getDocs(q1);
    
        const data = await doc.docs[0].data();

        if(data.photo == "./assets/DefaultUser.JPG"){
            setRoomiePhoto(data.photo)
        } else {
            setRoomiePhoto(data.photo)
        }
        setRoomieName(data.name)
    
        } catch (err) {
        console.error(err);
        console.log("An error occured while fetching user data");
        return null
        }
    }
      
    useEffect(()=>{
        returnStudentPhoto(i)
    }, [i])

  return (
            <div className="flex flex-col items-center justify-between h-[100%] mt-2 w-[90px]">
                <img src={roomiePhoto} className="h-[70px] w-[70px] bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.2] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-full" />
                <p className="elips">{roomieName}</p>
            </div>
	);
}

export default Roomie
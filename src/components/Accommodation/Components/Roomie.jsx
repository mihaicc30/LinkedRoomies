import React, { useState, useEffect } from 'react'
import { auth, db, logout } from "../../../config/firebase.jsx";
import { query, collection, getDocs, getDoc, where, orderBy, doc } from "firebase/firestore";
import UserRating from './UserRating.jsx'
import Loading from '../../../assets/Loading.jsx'
import { useAuthState } from "react-firebase-hooks/auth";

const Roomie = ({i}) => {
    const [roomieId, setRoomieId] = useState(false)
    const [roomieName, setRoomieName] = useState(false)
    const [roomiePhoto, setRoomiePhoto] = useState(false)
    const [roomieRating, setRoomieRating] = useState(false)
    const [user, loading, error] = useAuthState(auth);
    const [loadingData, setLoadingData] = useState(true);
    const [triggerRefresh, setTriggerRefresh] = useState(false)
      
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
            setRoomieId(data.uid)
            setRoomieName(data.name)
            setRoomieRating(data.rating)
        
        } catch (err) {
        console.error(err);
        console.log("An error occured while fetching user data");
        return null
        }
    }
    useEffect(()=>{
        returnStudentPhoto(i)
        setLoadingData(false)


        if(triggerRefresh) {
            setTimeout(() => {
                returnStudentPhoto(i)
                setTriggerRefresh(false)
            }, 111);
        }
    }, [triggerRefresh])

    if(!roomiePhoto) return

  return (
            <div className="flex flex-col items-center  h-[100%] mt-2 w-[90px] animate-fadeUP1">
                {loadingData && roomieRating ? (
                    <p className="animate-spin  min-h-[48px]">
                     <Loading/>   
                    </p>
                ) : (
                    <UserRating key={crypto.randomUUID()} data={roomieRating} currUser={user.uid} roomieUser={roomieId} tr={setTriggerRefresh} infoOnly={false}/>
                )}
                <img src={roomiePhoto} className="h-[70px] w-[70px] bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.2] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-full" />


                <p className="elips">{roomieName}</p>
            </div>
	);
}

export default Roomie
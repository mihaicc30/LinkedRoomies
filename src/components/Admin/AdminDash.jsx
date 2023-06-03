import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../../config/firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where, setDoc, doc, updateDoc  } from "firebase/firestore";
import RoomModal from '../Modals/RoomModal.jsx'

const AdminDash = () => {
  const [user, loading, error] = useAuthState(auth);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalOpen2, setModalOpen2] = useState(false);

  const [messages, setMessages] = useState()
  const [messagesU, setUMessages] = useState()

  const [rooms, setRooms] = useState()
  const [roomsU, setUrooms] = useState()

  
  const [students, setStudents] = useState()
  const [studentsU, setUStudents] = useState()

  async function getStudentData() {
    const q = query(collection(db, "users"));
    const docx = await getDocs(q);
    const data = await docx.docs.map((result) => result.data());
    const data2 = data.filter(result => result.admin != true  )
    let totalStudents = 0;
    let totalNewStudents = 0;
  
    const today = new Date(); 
  
    data2.forEach((user) => {
      const userDate = new Date(user.date.seconds * 1000);
      const diffInMs = today - userDate;
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
      if (diffInDays <= 30) {
        totalNewStudents += 1;
      }
      totalStudents += 1;
    });
  
    setStudents(totalStudents);
    setUStudents(totalNewStudents);
  }
  
  async function getRoomData() {
    const q = query(collection(db, "rooms"));
    const docx = await getDocs(q);
    const data = docx.docs.map((result) => result.data());
    let totalRoms = 0
    let totalOccupiedRooms = 0

    await data.forEach(room => {
      totalRoms += room.pax
      totalOccupiedRooms += room.students.length
    });

    setRooms(totalRoms)
    setUrooms(totalOccupiedRooms)
  }

  async function getMessagesData() {
    const q = query(collection(db, "messages"));
    const docx = await getDocs(q);
    const messageees = docx.docs.map((result) => result.data());
    const unreadMessageees = messageees.filter((result2) => { if(result2.status == "unread") {return result2.status} });
    setMessages(messageees.length)
    setUMessages(unreadMessageees.length)
  }

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

  useEffect(()=>{
    fetchUserName()
    getMessagesData()
    getRoomData()
    getStudentData()
  },[user,name, namePhoto])



  return (
    <div className="ml-1 text-xs max-[671px]:text-[10px]">
        <p className="animate-fadeUP2 text-2xl max-[700px]:text-sm flex flex-nowrap text-[#162050]">Welcome {name}<img className="w-[35px] h-[35px] rounded-full" src={namePhoto} alt="Avatar" /></p>
        <div>
          <div className="flex items-baseline justify-start relative my-2 p-4 border-2 flex-wrap animate-fadeUP1 bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30">
          <p className="absolute top-0 left-0 animate-fadeUP2">-Stats-</p>


            <div className="max-[671px]:basis-[40%] max-w-[160px] mx-2 flex flex-col items-center animate-fadeIN5 text-center cursor-default">
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[10vw] h-[10vh]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </span>
              <p className="text-xl max-[671px]:text-sm font-bold leading-[40px]">Students</p>
              <p className="max-[671px]:text-sm ">{studentsU} New Students in the last 30days ({students})</p>
            </div>


            <div className="max-[671px]:basis-[40%] max-w-[160px] mx-2 flex flex-col items-center text-center animate-fadeIN5 cursor-default">
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[10vw] h-[10vh]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </span>
              <p className="text-xl max-[671px]:text-sm font-bold leading-[40px]">Rooms</p>
              <p className="max-[671px]:text-sm">{roomsU} Rooms Occupied ({rooms})</p>
            </div>


            <div className="max-[671px]:basis-[40%] max-w-[160px] mx-2 flex flex-col items-center text-center animate-fadeIN5 cursor-default">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[10vw] h-[10vh]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              </span>
              <p className="max-[671px]:text-sm text-xl font-bold leading-[40px]">Messages</p>
              <p className="max-[671px]:text-sm">{messagesU} Unread Messages ({messages})</p>
            </div>

          </div>
        </div>

        <div>

          <div className="flex items-baseline justify-start relative my-2 p-4 max-[500px]:px-0 border-2 flex-wrap bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30">
            <p className="absolute top-0 left-0 animate-fadeUP1">-Actions-</p>

            <div className="max-[500px]:basis-[40%] w-[140px] flex flex-col m-2 items-center hover:scale-[1.1] transition-[1s] animate-fadeIN5 cursor-pointer" onClick={()=>setModalOpen(true)}>
              
              <p className="max-[500px]:text-sm text-xl font-bold leading-[40px] text-center"><span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[10vw] h-[10vh] mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
                </svg>
              </span>Create Room</p>
            </div>

            <div className="max-[500px]:basis-[40%] w-[140px] flex flex-col m-2 items-center hover:scale-[1.1] transition-[1s] animate-fadeIN5  cursor-pointer" >
              
              <a href={`mailto:?subject=Admin Query&body=Your message...`} className="max-[500px]:text-sm text-xl font-bold leading-[40px] text-center"><span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[10vw] h-[10vh] mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>Send Email</a>
            </div>

          </div>

        </div>

        {modalOpen && <RoomModal setOpenModal={setModalOpen} message={""} type={"processing"}/>}
        {modalOpen2 && <RoomModal setOpenModal={setModalOpen2} message={"Room has been added!"} type={"success"}/>}
    </div>
  )
}

export default AdminDash

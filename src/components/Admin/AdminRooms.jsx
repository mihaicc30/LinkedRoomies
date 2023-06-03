import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../../config/firebase.jsx";
import {
	query,
	collection,
	getFirestore,
	getDocs,
	where,
	setDoc,
	deleteDoc,
	doc,
	updateDoc,
	orderBy,
} from "firebase/firestore";
import RoomModal from "../Modals/RoomModal.jsx";

import { useCollectionData } from "react-firebase-hooks/firestore";
const firestore = getFirestore();

const AdminRooms = () => {
	const [roomz, setRoomz] = useState([]);
	const [roomID, setRoomID] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalOpen2, setModalOpen2] = useState(false);

	const findWhichRoomHasStudent = async (studentUID) => {
		const q = await query(
			collection(db, "users"),
			where("uid", "==", studentUID),
		);
		const docz = await getDocs(q);
		if (docz.docs[0]?.data()) {
			return docz.docs[0]?.data().name;
		}
	};


  const roomsRef = collection(db, "rooms");
  const queryRef = query(roomsRef, orderBy("location", "asc"));
  const [rooooms] = useCollectionData(queryRef);

	const getRooms = async () => {
		const roooomsWithStudents = await Promise.all(
			rooooms.map(async (room) => {
				if (room.students.length > 0) {
					const students = await Promise.all(
						room.students.map(findWhichRoomHasStudent),
					);
					return { ...room, students };
				} else {
					return room;
				}
			}),
		);
		setRoomz(roooomsWithStudents);
	};

	const handleEdit = (uid) => {
		setRoomID(roomz.filter((result) => result.uid == uid));
		setModalOpen2(true);
	};

	const handleDelete = async (uid) => {
		setModalOpen(true);
		const collectionRef = collection(db, "rooms");
		const q = query(collectionRef, where("uid", "==", uid));
		try {
			const querySnapshot = await getDocs(q);
			const docRef = doc(db, "rooms", querySnapshot.docs[0].id);
			const deleteQuery = await deleteDoc(docRef);
			console.log("Document successfully deleted!");
			getRooms();
		} catch (error) {
			console.error("Error deleting document: ", error);
		}
	};

  
	useEffect(() => {
    if(!rooooms) return
		getRooms();
	}, [rooooms]);

	if (!roomz) return;
	if (roomz.length < 1) return;
	return (
		<>
			<div className="flex flex-wrap justify-center ">
				{roomz &&
					roomz.map((room, i) => (
						<div
							key={room.location}
							className="bg-gradient-to-r from-[#bfbfbf40] to-[#ffffff] flex flex-col max-[671px]:text-sm 
        max-[420px]:basis-[80%] 
        max-[671px]:basis-[43%] 
        basis-[30%] 
        max-[671px]:max-w-[unset] 
        m-1 rounded-xl text-[#212e72] text-center max-w-[230px] shadow-md shadow-gray-600">
							<div className={`relative overflow-hidden h-[140px]`}>
								<img
									src={room.imgs[0]}
									className="absolute inset-0 z-[10] brightness-[.3] opacity-[.3] rounded-t-xl"
								/>
								<img
									style={{ position: "inherit" }}
									className="divide-y inherit divide-dashed z-[20] w-[120px] h-[120px] rounded-full mx-auto my-5 border-4 border-white hover:scale-[1.2] ease duration-300"
									src={room.imgs[0]}
									alt={"Room Photo"}
								/>
							</div>

							<div className="grow cursor-default">
								<p className="font-bold">{room.location}</p>
								<p>
									{room.students.length}/{room.pax}
								</p>

								{room.students.length < 1 ? (
									<p className="truncate text-red-400">Vacant</p>
								) : (
									room.students.map((s, i) => (
										<li className="eli2 h-[20px!important]" key={i}>
											{s}
										</li>
									))
								)}
							</div>

							<div className="flex flex-nowrap justify-evenly pt-[16px] my-4 text-gray-700 font-bold rounded-b-lg relative text-xs max-[671px]:text-[10px]">
								<span className="absolute cursor-default top-0 font-bold text-xs contrast-50 leading-5">
									Actions
								</span>
								<button
									className=" py-1 basis-[40%] rounded-lg m-1 p-1 bg-gradient-to-t from-gray-200 to-transparent hover:contrast-[2] hover:scale-[1.05] hover:brightness-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30"
									onClick={() => handleEdit(room.uid)}>
									Edit
								</button>
								<button
									className=" py-1 basis-[40%] rounded-lg m-1 p-1 bg-gradient-to-t from-gray-200 to-transparent hover:contrast-[2] hover:scale-[1.05] hover:brightness-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30"
									onClick={() => handleDelete(room.uid)}>
									Delete
								</button>
							</div>
						</div>
					))}
				{modalOpen && (
					<RoomModal
						setOpenModal={setModalOpen}
						message={""}
						type={"loading"}
						key={crypto.randomUUID()}
					/>
				)}
				{modalOpen2 && (
					<RoomModal
						setOpenModal={setModalOpen2}
						message={""}
						room={roomID}
						handlegetRooms={getRooms}
						type={"processing"}
						key={crypto.randomUUID()}
					/>
				)}
			</div>
		</>
	);
};

export default AdminRooms;

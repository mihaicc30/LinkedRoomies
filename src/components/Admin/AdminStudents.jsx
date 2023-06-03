import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../../config/firebase.jsx";
import {
	query,
	collection,
	getDocs,
	where,
	setDoc,
	doc,
	updateDoc,
	deleteDoc,
	getFirestore,
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import Modal from "../Modals/ModalConfirmation.jsx";
import UserRating from "../Accommodation/Components/UserRating";
import { useCollectionData } from "react-firebase-hooks/firestore";
const firestore = getFirestore();

const AdminStudents = () => {
	const [studs, setStuds] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [qID, setQID] = useState([]);
	const [modalMessage, setmodalMessage] = useState("");

	const studentsRef = collection(db, "users");
	const studentsQuery = query(
		studentsRef,
		where("email", "!=", "admin@admin.admin"),
	);
	const [stds] = useCollectionData(studentsQuery);

  const roomsRef = collection(db, "rooms");
  const q = query(roomsRef);
  const [rawRoomsData] = useCollectionData(q);


	console.log(stds);
	const findStudentInWhichRoom = async(stdID) =>{
    const q = await query(collection(db, "rooms"), where("students", "array-contains", stdID));
    const docz = await getDocs(q);
    if(docz.docs[0]?.data()){
      return docz.docs[0]?.data().location
    }
  }

	async function getStudents() {
		if (stds) {
			const stdsWithLocation = stds.map(async (st) => {
				const location = await findStudentInWhichRoom(st.uid);
				return {
					...st,
					location,
				};
			});
			Promise.all(stdsWithLocation).then((result) => setStuds(result));
		}
	}

	useEffect(() => {
		if (!stds) return;
		getStudents();
	}, [stds, rawRoomsData]);

	const handleDelete = async (e) => {
		const rID = e;

		const collectionRef = collection(db, "users");
		const q = query(collectionRef, where("uid", "==", rID));
		try {
			const querySnapshot = await getDocs(q);
			const docRef = doc(db, "users", querySnapshot.docs[0].id);
			const deleteQuery = await deleteDoc(docRef);
			console.log(`User account with ID ${rID} disabled successfully`);
		} catch (error) {
			console.error(
				`Error occurred while disabling user account with ID ${rID}:`,
				error,
			);
		}
	};

	const handleKick = async (e) => {
		console.log("aaaaaaa");
		const rID = e;
		const q = await query(
			collection(db, "rooms"),
			where("students", "array-contains", rID),
		);
		const docz = await getDocs(q);
		if (docz.docs[0]?.data()) {
			console.log("user found = > delete this data");
			let docID = docz.docs[0]?.id;
			let data2 = docz.docs[0].data();
			const updatedStudents = data2.students.filter((id) => id !== rID);
			const docRef = await doc(db, "rooms", docID);
			await updateDoc(docRef, {
				students: updatedStudents,
			});
		} else {
			console.log("user not found");
		}
	};

	const modalInit = (e) => {
		setQID(e.target.getAttribute("data-rid"));
		setmodalMessage(e.target.innerText);
		setModalOpen(true);
	};

	return (
		<>
			<div className="studsGrid flex flex-wrap justify-center">
				{studs &&
					studs.map((std, i) => (
						<div
							key={i}
							className="bg-gradient-to-r from-[#bfbfbf40] to-[#ffffff] flex flex-col basis-[80%]  m-1 rounded-xl text-[#212e72] text-center max-w-[210px] shadow-md shadow-gray-600">
							<div
								className={`relative flex justify-center overflow-hidden h-[140px] `}>
								<div className="absolute left-0">
									<UserRating
										key={crypto.randomUUID()}
										data={std.rating}
										currUser={std.uid}
										roomieUser={std.uid}
										tr={false}
										infoOnly={true}
									/>
								</div>
								<img
									src={std.photo}
									className="absolute inset-0 z-[10] brightness-[.3] opacity-[.3] rounded-tl-xl"
									alt={std.name + " avatar"}
								/>
								<img
									style={{ position: "inherit" }}
									className="divide-y inherit divide-dashed z-[20] w-[120px] h-[120px] rounded-full my-5 border-4 border-white hover:scale-[1.2] ease duration-300"
									src={std.photo}
									alt={std.name + " avatar"}
								/>
							</div>

							<div className="grow cursor-default">
								<p className="font-bold break-all">{std.name}</p>
								<p className="break-all">{std.email}</p>
								<p className="grow break-all">
									{std.location ? std.location : "No room selected!"}
								</p>
							</div>
							<div className="relative text-gray-700 font-bold flex p-1 pt-[16px]  flex-wrap gap-[4px] justify-center rounded-b-lg mt-4 text-xs max-[671px]:text-[10px]">
								<span className="absolute cursor-default top-0 font-bold text-xs contrast-50 leading-5">
									Actions
								</span>
								<button
									className="max-[671px]:w-[100%!important] w-[60px] rounded-lg m-1 p-1 bg-gradient-to-t from-gray-200 to-transparent hover:contrast-[2] hover:scale-[1.05] hover:brightness-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30"
									disabled={!std.location}
									data-rid={std.uid}
									onClick={modalInit}>
									Send Eviction
								</button>

								<button
									className="max-[671px]:w-[100%!important] w-[60px] rounded-lg m-1 p-1 bg-gradient-to-t from-gray-200 to-transparent hover:contrast-[2] hover:scale-[1.05] hover:brightness-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30"
									data-rid={std.uid}
									onClick={modalInit}>
									Delete Account
								</button>
							</div>
						</div>
					))}
				{modalOpen && (
					<Modal
						setOpenModal={setModalOpen}
						handleDelete={handleDelete}
						message={modalMessage}
						handleKick={handleKick}
						qID={qID}
						type={"confirmation"}
						key={crypto.randomUUID()}
					/>
				)}
			</div>
		</>
	);
};

export default AdminStudents;

import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, NavLink } from "react-router-dom";

import { auth, db, logout } from "../Config/firebase";
import {
	query,
	collection,
	getFirestore,
	getDocs,
	getDoc,
	where,
	orderBy,
	doc,
	updateDoc,
} from "firebase/firestore";
import { DefaultUser } from "../assets/DefaultUser.jsx";
import Room from "./Room.jsx";
import Roomie from "./Roomie.jsx";

import { Logo } from "../assets/logo.jsx";
import ScrollToTopButton from "../ScrollToTopButton.jsx";
import Nav from "../Navigation/Nav";

import UserRating from "./UserRating";
import { matchUsers, overallMatch } from "../Config/MatchFunction";

import { useCollectionData } from "react-firebase-hooks/firestore";
const firestore = getFirestore();

function Accommodation() {
	const navigate = useNavigate();

	const [user, loading, error] = useAuthState(auth);
	const [name, setName] = useState("");
	const [namePhoto, setNamePhoto] = useState("");
	const [rooms, setRooms] = useState([]);

	const [sortingType, setSortingType] = useState("location");
	const [sortingOrder, setSortingOrder] = useState("asc");

	const [userRatings, setUserRatings] = useState(false);
	const [userRoom, setUserRoom] = useState(false);
	const [userData, setUserData] = useState();
	const [questionnaire, setQuestionnaire] = useState(true);
	const [triggerRefresh, setTriggerRefresh] = useState(false);

	const [filter, setfilter] = useState({
		maxppl: "All",
		ensuite: "All",
		match: 0,
		full: false,
	});

	const [trig, setTrig] = useState(false);

	const roomsRef = useRef();

	const ref = collection(firestore, "rooms");
	const q = query(ref, orderBy(sortingType, sortingOrder));
	const [roomRawData] = useCollectionData(q);

	// async function fetchRooms() {
	// 	const roomDataPromises = roomRawData.map(async (data) => {
	// 		const students = await Promise.all(
	// 			data.students
	// 				? data.students.map(async (student) => {
	// 						if (user?.uid == student) setUserRoom(data);

	// 						const q = await query(
	// 							collection(db, "users"),
	// 							where("uid", "==", student),
	// 						);
	// 						const doc = await getDocs(q);
	// 						return doc.docs[0].data();
	// 				  })
	// 				: 0,
	// 		);
	// 		const roomData = { ...data, students };
	// 		return roomData;
	// 	});

	// 	const results = await Promise.allSettled(roomDataPromises);
	// 	const successfulResults = results
	// 		.filter((result) => result.status === "fulfilled")
	// 		.map((result) => result.value);

	// 	setRooms(successfulResults);
	// }

	const fetchUserName = async () => {
		if (!user) return;
		try {
			const q = await query(
				collection(db, "users"),
				where("uid", "==", user?.uid),
			);
			const doc = await getDocs(q);

			const data = await doc.docs[0].data();
			setUserData(data);
			setName(data.name);
			setNamePhoto(data.photo);
			setQuestionnaire(data.questionnaire);
			setUserRatings(data.rating);
		} catch (err) {
			console.error(err);
			console.log("An error occured while fetching rooms data");
		}
	};

	
	const fetchRooms = async () => {
		const roomDataPromises = roomRawData.map(async (data) => {
		  const students = await Promise.all(
			data.students
			  ? data.students.map(async (student) => {
				  if (user?.uid == student) setUserRoom(data);
  
				  const q = query(collection(db, "users"), where("uid", "==", student));
				  const doc = await getDocs(q);
				  return doc.docs[0].data();
				})
			  : 0
		  );
		  const roomData = { ...data, students };
		  return roomData;
		});
  
		const results = await Promise.allSettled(roomDataPromises);
		const successfulResults = results
		  .filter((result) => result.status === "fulfilled")
		  .map((result) => result.value);
  
		setRooms(successfulResults);
	  };
  

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
		if (!roomRawData) return;

		console.log("aAAAAAAAAAAA");
		fetchUserName();
		fetchRooms();
		setTrig(false);
	}, [sortingOrder, sortingType, trig, filter, roomRawData]);

	function handleFilter(event) {
		if (event.target.className.startsWith("maxppl")) {
			setfilter((prevFilters) => ({
				...prevFilters,
				maxppl: event.target.value,
			}));
		} else if (event.target.className.startsWith("ensuite")) {
			setfilter((prevFilters) => ({
				...prevFilters,
				ensuite: event.target.value,
			}));
		} else if (event.target.className.startsWith("match")) {
			setfilter((prevFilters) => ({
				...prevFilters,
				match: event.target.value,
			}));
		} else if (event.target.className.startsWith("full")) {
			setfilter((prevFilters) => ({
				...prevFilters,
				full: event.target.checked,
			}));
		}
	}

	const handleSortingOrder = (e) => {
		setSortingOrder(e.target.value);
	};

	const handleSortingType = (e) => {
		setSortingType(e.target.value);
	};

	const handleUserLeave = async () => {
		const q = await query(
			collection(db, "rooms"),
			where("students", "array-contains", user.uid),
		);
		const docz = await getDocs(q);
		if (docz.docs[0]?.data()) {
			console.log("user found = > delete this data");
			let docID = docz.docs[0]?.id;
			let data2 = docz.docs[0].data();
			const updatedStudents = data2.students.filter((id) => id !== user.uid);
			const docRef = await doc(db, "rooms", docID);
			await updateDoc(docRef, {
				students: updatedStudents,
			});
			setUserRoom(false);
			fetchRooms();
			// window.location.reload();
		} else {
			console.log("user not found");
		}
	};

	return (
		<>
			{!questionnaire && (
				<main className="w-[100%] flex flex-col items-center pb-5">
					<p className="text-xl font-bold">Questionnaire not filled in! 🤔</p>
					<p className="max-w-[50vw] max-[671px]:max-w-[90vw] m-6 text-justify ">
						To view and apply for accommodations, users must first fill out a
						brief questionnaire to set their traits and preferences. This step
						is necessary to ensure suitable matches with compatible roommates
						and accommodation. Once completed, the algorithm will match users
						with potential roommates and properties, and they will be notified
						when they can view and apply for accommodations. If there are any
						questions or concerns, users can contact the support team.
					</p>

					<p className="max-w-[50vw] max-[671px]:max-w-[90vw]">
						To complete this step proceed to{" "}
					</p>
					<p className="mt-2 pb-5">
						<NavLink to="/questionnaire" activeclassname={"active"}>
							<span className=" bg-red-400 font-bold text-[white] rounded-2xl shadow-3xl p-3  cursor-pointer whitespace-nowrap">
								&#62;&#62; the questionnaire &#60;&#60;
							</span>
						</NavLink>
					</p>
				</main>
			)}
			{questionnaire && (
				<main className="w-[100%] flex flex-col items-center ">
					<p className="font-bold border-b-2 border-b-red-400 text-center mx-auto">
						-Current Accommodation-
					</p>

					{/* Current Accommodation */}
					{!userRoom && <p className="my-4">No room selected!</p>}
					{userRoom && (
						<div className="flex flex-row my-4 p-4 border-2 justify-center w-[98%] flex-wrap">
							<div className="flex flex-col justify-evenly items-center relative">
								<img
									className="ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl m-2 w-[auto] h-[150px] scale-[1] mx-5"
									src={userRoom.imgs[0]}
								/>
								<p className="absolute top-[18%] left-[50%] py-1 px-4 translate-x-[-50%] translate-y-[-50%] rounded-lg font-bold bg-gradient-to-r from-gray-300 to-white ">
									{userRoom.location}
								</p>
								<div
									className="absolute top-0 right-[-25%] p-3 bg-red-200 rounded-3xl flex z-30"
									id="tempPopup">
									<span className="border-2 border-white p-2 rounded-full my-auto mx-2">
										❔
									</span>
									<div className="flex flex-col">
										<p>Rate </p>
										<p>your</p>
										<p>roomies!</p>
									</div>
									<p className="arrRight text-white font-bold text-5xl">➡</p>
								</div>
							</div>
							<div className="flex flex-row justify-evenly items-center relative">
								<div className="flex flex-col items-center h-[100%] mt-2 w-[90px] animate-fadeUP1">
									<UserRating
										key={crypto.randomUUID()}
										data={userRatings}
										currUser={userRatings}
										roomieUser={userRatings}
										tr={setTriggerRefresh}
										infoOnly={true}
									/>
									<img
										src={namePhoto}
										className="h-[70px] w-[70px] bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.2] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-full"
									/>

									<button
										className="font-bold bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 m-2 py-2 px-5 rounded-xl "
										onClick={handleUserLeave}>
										Leave
									</button>
								</div>
								{userRoom.students.length > 1 && (
									<>
										{userRoom.students.map((student, index) => {
											if (user.uid == student) return;
											return <Roomie key={crypto.randomUUID()} i={student} />;
										})}
									</>
								)}
							</div>
						</div>
					)}
					{/* Filters */}
					<div className="filters flex flex-row flex-wrap justify-center gap-3 border-2 p-1 py-[3rem] relative w-[100%] ">
						<p className="absolute top-[2%] border-b-2 border-[red] font-bold">
							-Filters-
						</p>
						<div className="p-2 border-[1px] rounded-xl flex flex-col text-center">
							<label>Max People</label>
							<select
								className="maxppl cursor-pointer bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 font-bold appearance-none text-center"
								value={filter.maxppl}
								onChange={handleFilter}>
								<option value="All">All</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
							</select>
						</div>

						<div className="p-2 border-[1px] rounded-xl flex flex-col text-center ">
							<label>En-Suite</label>
							<select
								className="ensuite cursor-pointer font-bold bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 appearance-none text-center"
								value={filter.ensuite}
								onChange={handleFilter}>
								<option value="All">All</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>

						<div className="p-2 border-[1px] rounded-xl flex flex-col text-center">
							<label>Match</label>
							<select
								className="match cursor-pointer bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 font-bold appearance-none text-center"
								value={filter.match}
								onChange={handleFilter}>
								<option value="0">All</option>
								<option value="80">over 80%</option>
								<option value="50">over 50%</option>
								<option value="20">over 20%</option>
							</select>
						</div>

						<div className="p-2 border-[1px] rounded-xl flex flex-col text-center">
							<div className="switch-holder">
								<div className="switch-label">
									<span>Hide Full</span>
								</div>
								<div className="switch-toggle">
									<input
										className="full custom-select w-[fit-content]"
										type="checkbox"
										id="hidefullroom"
										value={filter.full}
										onChange={handleFilter}
									/>
									<label htmlFor="hidefullroom"></label>
								</div>
							</div>
						</div>

						<div className="p-2 border-[1px] rounded-xl flex flex-col text-center">
							<label>Sorting</label>
							<div className="flex flex-row gap-[4px]">
								<select
									className="cursor-pointer bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 appearance-none px-2 text-center"
									defaultValue={sortingType}
									onChange={handleSortingType}>
									<option value="location">Location</option>
									<option value="pax">PAX</option>
								</select>
								<select
									className="cursor-pointer bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 appearance-none px-2 text-center"
									defaultValue={sortingOrder}
									onChange={handleSortingOrder}>
									<option value="asc">ASC</option>
									<option value="desc">DESC</option>
								</select>
							</div>
						</div>
					</div>

					{/* Rooms */}
					<div
						ref={roomsRef}
						className="listedRooms flex flex-row flex-wrap gap-4 justify-center pt-[2rem] relative">
						<p className="absolute top-[0%] border-b-2 border-[red] font-bold whitespace-nowrap">
							-Rooms-
						</p>
						{/*start of post of room*/}
						<div
							className="flex flex-row flex-wrap gap-4 justify-center pt-[2rem] relative  pb-[5rem]"
							id="roomsLength">
							{rooms.map((room, i) => (
								<Room
									key={room.uid}
									triggerRefresh={setTrig}
									me={userData}
									data={room}
									aniDelay={i}
									filters={filter}
									userIsInRoom={userRoom.uid}
								/>
							))}
						</div>
					</div>

					<ScrollToTopButton key={crypto.randomUUID()} />
				</main>
			)}
		</>
	);
}

export default Accommodation;

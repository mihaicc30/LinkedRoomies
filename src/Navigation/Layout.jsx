import { NavLink, Outlet } from "react-router-dom";

import React, { useEffect, useState } from "react";
import Nav from "./Nav";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../Config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import LandingPage from "./LandingPage";

function Layout() {

	const [user, loading, error] = useAuthState(auth);
	const [userStatus, setUserStatus] = useState(false);
	
	const fetchUserStatus = async () => {
		if (!user) return;
		try {
			const q = await query(
				collection(db, "users"),
				where("uid", "==", user?.uid),
			);
			const doc = await getDocs(q);

			const data = await doc.docs[0].data();
			if (data.admin == true) return data.admin;
			if (data.admin == undefined) return false;
		} catch (err) {
			console.error(err);
			console.log("An error occured while fetching rooms data");
		}
	};


	useEffect(() => {
		if (loading) return;
		if (user) {
			async function fetchData() {
				setUserStatus(await fetchUserStatus());
			}
			fetchData();
		}
	}, [user, loading, userStatus]);

	return (
		<>
			{user && !userStatus && <Nav />}
			<Outlet />
		</>
	);
}

export default Layout;

import React, { useEffect, useState } from "react";

// Authentification
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../config/firebase.jsx";
import { query, collection, getDocs, where } from "firebase/firestore";

// Components of Dashboard
import Landing from "./Landing";
import About from "./About";
import Attributes from "./Attributes";
import FromTheTeam from "./FromTheTeam";
import Testimonial from "./Testimonial";
import TimelineSteps from "./TimelineSteps";
import HelpSection from "./HelpSection";

import ScrollToTopButton from "../ScrollToTopButton.jsx";

function Dashboard() {
	const fetchUserStatus = async () => {
		if (!user) return;
		try {
			const q = await query(
				collection(db, "users"),
				where("uid", "==", user?.uid),
			);
			const doc = await getDocs(q);

			const data = await doc.docs[0].data();

			return data.admin;
		} catch (err) {
			console.error(err);
			console.log("An error occured while fetching rooms data");
		}
	};

	const navigate = useNavigate();
	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
		if (user) {
			async function fetchData() {
				const userStatus = await fetchUserStatus();
				if (userStatus) {
					navigate("/Admin");
				} else {
					navigate("/dashboard");
				}
			}
			fetchData();
		}
	}, [user, loading]);

	return (
		<main className="w-[100%] flex flex-col ">
			<Landing />
			<Attributes />
			<TimelineSteps />
			<FromTheTeam />
			<Testimonial />
			<HelpSection />

			<ScrollToTopButton />
		</main>
	);
}

export default Dashboard;

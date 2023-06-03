import React from "react";
import { NavLink } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";

export default function Landing({}) {
	return (
		<>
			<div className="flex gap-[1vw] mb-[6rem] max-[888px]:flex-col justify-evenly">
				<div className="flex flex-col justify-center basis-[40%] p-[2vw] mx-auto">
					<p className="animate-fadeDOWN hhtx">
						The most secure and fastest way to find a place to stay.
					</p>
					<p className="animate-fadeUP2 text-xl">
						LinkedRoomies is the perfect app for university students who are
						looking for a compatible roommate to share a living space.
					</p>

					<NavLink
						to="/accommodation"
						activeclassname={"active"}
						className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw] animate-fadeUP3">
						Lookup Rooms ▶
					</NavLink>
				</div>

				<div className="relative flex items-center justify-center basis-[60%] animate-fadeDOWN max-w-[500px] max-h-[500px] mx-auto">
					<img
						className="blur-[1px] rounded-[20px]"
						src="./assets/heroPic2.JPG"
					/>
					<div className="transparency_gradient"></div>
						<img className="transition-all absolute bottom-[-30%] p-[50px] saturate-[0.8] contrast-[1.1] animate-fadeUP3" src="./assets/heroPic.png"/>
				</div>
			</div>
			{/* <p className="text-[2vw] text-sm md:text-base text-center text-red-400 font-bold animate-fadeUP2">
			LinkedRoomies is the perfect app for university students who are looking for a
				compatible roommate to share a living space.
			</p> */}
			{/* 
			<div className="w-[600px] mx-auto max-[600px]:w-[90vw] animate-fadeUP3 bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4">
				<Carousel variant="dark" indicators={false}>
					<Carousel.Item>
						<img
							className="mx-auto h-100 w-100"
							src="./assets/roomie1.JPG"
							alt=""
						/>
						<Carousel.Caption>
							<p className="text-center italic ">
								"LinkedRoomies helped me find my perfect roommates and apartment
								in just a few clicks. Highly recommended!"
							</p>
							<p className="text-center text-sm">Danica Blaese</p>
						</Carousel.Caption>
					</Carousel.Item>

					<Carousel.Item>
						<img
							className="mx-auto h-100 w-100"
							src="./assets/roomie2.JPG"
							alt=""
						/>
						<Carousel.Caption>
							<p className="text-center italic ">
								"LinkedRoomies helped me find my perfect roommates and apartment
								in just a few clicks. Highly recommended!"
							</p>
							<p className="text-center text-sm">Steve Osborne</p>
						</Carousel.Caption>
					</Carousel.Item>

					<Carousel.Item>
						<img
							className="mx-auto h-100 w-100"
							src="./assets/roomie3.JPG"
							alt=""
						/>
						<Carousel.Caption>
							<p className="text-center italic ">
								"LinkedRoomies helped me find my perfect roommates and apartment
								in just a few clicks. Highly recommended!"
							</p>
							<p className="text-center text-sm">Carmen Serrano</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</div> */}
		</>
	);
}

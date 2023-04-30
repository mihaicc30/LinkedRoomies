import React from "react";

// Carousel library
import Carousel from 'nuka-carousel';


export default function Landing({}) {
	return (
		<>
			<p className="text-5xl text-center mt-[3rem] max-[500px]:text-3xl animate-fadeUP1 ">
				LinkedRoomies
			</p>
			<p className="text-[2vw] text-sm md:text-base text-center text-red-400 font-bold animate-fadeUP2">
				is the perfect app for university students who are looking for a
				compatible roommate to share a living space.
			</p>

			<div className="w-[600px] mx-auto max-[600px]:w-[90vw] animate-fadeUP3 bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4">
				<Carousel
					slidesToShow={1}
					autoplay="true"
					wrapAround={true}
					animation="zoom"
					speed="1000"
					autoplayInterval="3000"
					className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl">
					<img src="./assets/roomie1.JPG" />
					<img src="./assets/roomie2.JPG" />
					<img src="./assets/roomie4.JPG" />
					<img src="./assets/roomie3.JPG" />
				</Carousel>
			</div>
		</>
	);
}

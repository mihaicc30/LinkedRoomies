import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Testimonial = () => {
	return (
		<>
			<p className="text-center text-3xl font-bold mb-4">Testimonials</p>
			{/* <div className="flex flex-wrap items-center justify-center mx-4 gap-[4rem] bg-[#dad9d9] animate-fadeUP3 bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4"> */}
			<Carousel variant="dark" indicators={false}>
				<Carousel.Item>
					<img
						className="mx-auto h-20 w-20 rounded-full"
						src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
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
						className="mx-auto h-20 w-20 rounded-full"
						src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
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
						className="mx-auto h-20 w-20 rounded-full"
						src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
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
		</>
	);
};

export default Testimonial;

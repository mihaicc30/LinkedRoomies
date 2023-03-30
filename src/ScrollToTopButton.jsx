import React from "react";
import ScrollTop from './assets/ScrollTop.jsx';

const ScrollToTopButton = () => {
	return (
		<button
			key={crypto.randomUUID()}
			className="fixed bottom-[5%] right-[5%]"
			type="button"
			onClick={() =>
				document.querySelector("main").scrollTo({ top: 0, behavior: "smooth" })
			}
		>
			<ScrollTop key={crypto.randomUUID()}/>
		</button>
	);
};

export default ScrollToTopButton;

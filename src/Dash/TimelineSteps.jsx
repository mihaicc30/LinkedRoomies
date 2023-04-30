import React from "react";

export default function TimelineSteps({}) {
	return (
		<div className="timeline ease-in duration-300 py-2 px-1 w-100 text-center">
			<div className="circle-container">
				<section className="tl no-border"></section>
				<section className="tr no-border"></section>
				<div className="flex items-center justify-center">
					<span className="circle">1</span>
				</div>
				<section className="bl"></section>
				<section className="br"></section>
			</div>

			<section className="info no-border">
				<h2>Step 1: Account</h2>
				<span>
				Creating an account is the first step to join the platform. You will need to provide some basic information such as your name, email address, and password to create an account.
				</span>
			</section>

			<section></section>

			<section></section>
			<section className="info">
				<h2>Step 2: Questionnaire</h2>
				<span>
				After creating an account, you will be asked to complete a questionnaire to help the platform match you with compatible roommates. The questionnaire will ask about your lifestyle, habits, and preferences.
				</span>
			</section>
			<div className="circle-container">
				<section className="tl"></section>
				<section className="tr"></section>
				<div className="flex items-center justify-center">
					<span className="circle">2</span>
				</div>
				<section className="bl"></section>
				<section className="br"></section>
			</div>

			<div className="circle-container">
				<section className="tl"></section>
				<section className="tr"></section>
				<div className="flex items-center justify-center">
					<span className="circle">3</span>
				</div>
				<section className="bl"></section>
				<section className="br"></section>
			</div>
			<section className="info">
				<h2>Step 3: Room</h2>
				<span>
				Once you have completed the questionnaire, you can start searching for available rooms that match your preferences. You can filter your search by pax, en-suite, and other criteria.
				</span>
			</section>
			<section></section>

			<section></section>
			<section className="info">
				<h2>Step 4: Join In!</h2>
				<span>
				When you find a room that you like, you can join in and start communicating with the other roommates. You can ask questions, schedule a visit, and get to know your potential roommates before making a decision.
				</span>
			</section>
			<div className="circle-container">
				<section className="tl"></section>
				<section className="tr"></section>
				<div className="flex items-center justify-center">
					<span className="circle">4</span>
				</div>
				<section className="bl no-border"></section>
				<section className="br no-border"></section>
			</div>
		</div>
	);
}

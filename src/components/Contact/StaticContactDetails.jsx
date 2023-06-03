import React from "react";

export function StaticContactDetails({}) {
	return (
		<div className="w-[80vw] min-h-[150px] overflow-auto flex flex-row gap-[2rem] my-[2rem]">
			<div className="min-w-[400px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 m-2 animate-fadeLEFT1">
				<h5 className="card-title text-xl font-bold text-center">
					General enquiries
				</h5>
				<p className="card-text">Telephone: 012345 123 123</p>
				<p className="card-text">Email: Generalenquiries@linkroomie.co.uk</p>
			</div>
			<div className="min-w-[400px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 m-2 animate-fadeLEFT2">
				<h5 className="card-title text-xl font-bold text-center">
					Cleaning enquiries
				</h5>
				<p className="card-text">Telephone: 023 8001 1722</p>
				<p className="card-text">Email: Cleaningenquiries@linkroomie.co.uk</p>
			</div>
			<div className="min-w-[400px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 m-2 animate-fadeLEFT3">
				<h5 className="card-title text-xl font-bold text-center">
					Press enquiries
				</h5>
				<p className="card-text">Telephone: 023 8201 3040</p>
				<p className="card-text">Email: Pressenquiries@linkroomie.co.uk</p>
			</div>
			<div className="min-w-[400px] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 m-2 animate-fadeLEFT1">
				<h5 className="card-title text-xl font-bold text-center">
					Student Management
				</h5>
				<p className="card-text">Telephone: 023 8001 1722</p>
				<p className="card-text">Email: StudentManagement@linkroomie.co.uk</p>
			</div>
		</div>
	);
}

import React, { useEffect, useState, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { DefaultUser } from "../../assets/DefaultUser.jsx";

const MobileNav2 = ({ namePhoto }) => {
	return (
		<div className="dropdown relative  min-[750px]:hidden">
			{namePhoto !== "" ? (
				<img
					src={`${namePhoto}`}
					className="rounded-xl max-[750px]:basis-1/2 fixed h-[50px] w-[50px] translate-x-[-50%] translate-y-[-64%] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30"
				/>
			) : (
				<DefaultUser />
			)}

			<div className="dropdown-content p-4 rounded-xl absolute translate-y-[11px] translate-x-[-85%]">
				<NavLink
					to="/profile"
					activeclassname={"active"}
					className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw]  my-2">
					Profile
				</NavLink>

				<NavLink
					to="/logout"
					activeclassname={"active"}
					className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw]  my-2">
					Logout
				</NavLink>
			</div>
		</div>
	);
};

export default MobileNav2;

import React, { useEffect, useState, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const MobileNav = () => {
  return (
   
<div className="dropdown relative min-[750px]:hidden">
        
        <label htmlFor="label-check" className="hamburger-label">
            <div className="line1 bg-gradient-to-t from-gray-600 to-black ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl"></div>
            <div className="line2 bg-gradient-to-t from-gray-600 to-black ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl"></div>
            <div className="line3 bg-gradient-to-t from-gray-600 to-black ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl"></div>
            <label></label>
        </label>

        <div className="dropdown-content p-4 rounded-xl absolute translate-y-[-16px] translate-x-[-75%]">
            <NavLink to="/dashboard" activeclassname={"active"} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw] my-2">
                Dash
            </NavLink>

            <NavLink to="/accommodation" activeclassname={"active"} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw] my-2">
                Accommodation
            </NavLink>

            <NavLink to="/contact" activeclassname={"active"} className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-[1vh] px-[2vw] my-2">
                Contact
            </NavLink>
        </div>

  </div>
  )
}

export default MobileNav

import React from 'react'

const About = () => {
    
  return (
    <div className="w-[100%] flex flex-row max-[760px]:flex-col flex-nowrap my-[1rem] items-center justify-center animate-fadeDOWN1 ">
      <img src="/assets/roomie1.JPG" alt="" className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 max-[760px]:w-[90vw] w-[380px] m-3 p-5 border-2 min-[700px]:basis-1/3 animate-fadeRIGHT1"/>
      <p className="m-3 animate-fadeLEFT1 min-[700px]:basis-1/2 "> With <span className="text-red-400">LinkedRoomies</span>, finding your ideal roommate has never been <span className="underline ">easier</span>. <span className="text-red-400">LR</span> is a dynamic React app designed to connect students with compatible roommates and suitable accommodation. The app simplifies the process of finding a roommate who shares similar interests, habits, and preferences, making it easy to find a comfortable and welcoming living space.</p>
    </div> 
  )
}

export default About

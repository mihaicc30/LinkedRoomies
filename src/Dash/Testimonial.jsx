import React from 'react'

const Testimonial = () => {
  return (
    <>
    
    <p className="text-center text-3xl font-bold mt-[3rem]">Testimonial</p>
    <div className="flex flex-wrap items-center justify-center mx-4 gap-[4rem] bg-[#dad9d9] animate-fadeUP3 bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4">
      <div className="w-[300px] h-100px]"><p className="text-center italic ">"LinkedRoomies helped me find my perfect roommates and apartment in just a few clicks. Highly recommended!"</p></div>
      <div className="w-[300px] h-100px]"><p className="text-center italic ">"I was hesitant to try LinkedRoomies at first, but I'm so glad I did. It made finding a roommate stress-free and easy."</p></div>
      <div className="w-[300px] h-100px]"><p className="text-center italic ">"LinkedRoomies made the roommate search process a breeze. The app is user-friendly and efficient. Thank you!"</p></div>
    </div>
    </>
  )
}

export default Testimonial

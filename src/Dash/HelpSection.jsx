import React from 'react'

const HelpSection = () => {
  return (
    <>
    <p className=" text-center text-3xl font-bold mt-[3rem] ">Looking for help?</p>
    <div className="flex flex-wrap items-center justify-center p-4 gap-[4rem] animate-fadeUP3 ">
      <div className="w-[60vw] max-[600px]:w-[90vw] ">
        <p>If you need help, you have two options. You can either use the <span className="text-red-400">contact page</span> to write an email explaining your issue or go onto the <span className="text-red-400">online chat support</span> where a representative will be available to assist you in real-time. The online chat support is a faster and more efficient option if you need immediate assistance, but if you have a more complex issue, emailing might be the better choice. Either way, the support team is ready to help you out!</p>
      </div>
    </div>
    </>
  )
}

export default HelpSection

import React from 'react'

const PrivacyPolicy = ({privacyPolicy}) => {

    
  return (
        <>
        <div className="fixed inset-0 bg-[#00000085] backdrop-blur-sm ease duration-300">
    <div className="fixed overflow-y-scroll inset-[10vw] bg-gray-100 p-5 animate-fadeIN">
      <button className="bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 my-1 rounded-xl py-2 px-6 outline-none font-bold" onClick={()=>privacyPolicy(false)}>X</button>
<p className="font-bold text-start">Privacy Policy for LinkedRoomies 2023</p>

<p className="text-start">Welcome to LinkedRoomies, owned by Mihai Culea ("Owner"). This Privacy Policy explains how we collect, use, and protect your personal data when you use our web app.</p>

<p className="font-bold text-start">Data Collection</p>

<p className="text-start">We collect personal data that you voluntarily provide to us, including your name and email address. We may also collect your photo to personalize your app experience. This data is protected on Google servers.</p>

<p className="font-bold text-start">Data Usage</p>

<p className="text-start">We use your personal data to personalize your experience on LinkedRoomies. We do not share your data with any third parties, except for the Solent University teachers. We may also use your data for analytics and to improve the app experience.</p>

<p className="font-bold text-start">Data Sharing</p>

<p className="text-start">We do not share your personal data with anyone except for Solent University teachers.</p>

<p className="font-bold text-start">Data Security</p>

<p className="text-start">We take appropriate technical and organizational measures to protect your personal data from unauthorized access, accidental loss, or destruction. Your data is protected on Google servers.</p>

<p className="font-bold text-start">User Rights</p>

<p className="text-start">You have the right to access, correct, or delete your personal data. If you would like to make any changes or if you have any questions or concerns regarding your data, please contact us at alemihai25@gmail.com.</p>

<p className="font-bold text-start">Legal Compliance</p>

<p className="text-start">We comply with the General Data Protection Regulation (GDPR) and all other applicable data privacy laws. Please refer to the GDPR website for more information.</p>

<p className="font-bold text-start">Cookies</p>

<p className="text-start">We use non-identifying cookies that Google and Facebook uses to keep track of the user presence on LinkedRoomies.</p>

<p className="font-bold text-start">Contact Information</p>

<p className="text-start">If you have any questions or concerns regarding your data, please contact us at alemihai25@gmail.com.</p>

<p className="font-bold text-start">Changes to This Privacy Policy</p>

<p className="text-start">We reserve the right to update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
    </div>
    </div>
</>
  )
}

export default PrivacyPolicy

import React, { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../config/firebase.jsx";
import { query, collection, getDocs, where, setDoc, doc, updateDoc  } from "firebase/firestore";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import Modal from '../Modals/Modal.jsx'

const Questionnaire = () => {
    const navigate = useNavigate();
    const [ stepz, setCurrentStep ] = useState(0)
    const [finishForm, setFinishForm] = useState(true) // true = disabled , false = null
    const [results, setResults] = useState(false) // false = not ready to show results , true = ready..
    const [user, loading, error] = useAuthState(auth);
	const [modalOpen, setModalOpen] = useState(false);

    useEffect(()=>{
        if(!modalOpen && results) navigate('/accommodation')
    },[modalOpen])

    const questionList = [
        //Clean
        {"How often do you clean your living space?":["Rarely","Occasionally","Often"]},
        {"How organized do you keep your personal belongings?":["Rarely","Occasionally","Often"]},
        //Friendly
        {"How often do you initiate conversations with others?":["Rarely","Occasionally","Often"]},
        {"How often do you actively listen to others?":["Rarely","Occasionally","Often"]},
        //Drinking
        {"How often do you consume alcoholic beverages?":["Rarely","Occasionally","Often"]},
        {"How often do you get drunk?":["Rarely","Occasionally","Often"]},
        //Responsable
        {"How often do you follow through on your commitments?":["Rarely","Occasionally","Often"]},
        {"How often do you take ownership of your mistakes and seek to correct them?":["Rarely","Occasionally","Often"]},
        //Smoking
        {"How often do you smoke cigarettes or other tobacco products?":["Rarely","Occasionally","Often"]},
        {"How often you smoke indoors?":["Rarely","Occasionally","Often"]},
    ]
    
    const [userTraitsCalculated, setUserTraitsCalculated] = useState({
        "Clean":null,
        "Drinking":null,
        "Friendly":null,
        "Responsable":null,
        "Smoking":null,
    })

    const calculateTraits = () =>{

        let Clean = userTraits[1] == 0 ? userTraits[0] - 1 : userTraits[1] == 2 ? userTraits[0] : userTraits[0] + 1
        let Drinking = userTraits[3] == 0 ? userTraits[2] - 1 : userTraits[3] == 2 ? userTraits[2] : userTraits[2] + 1
        let Friendly = userTraits[5] == 0 ? userTraits[4] - 1 : userTraits[5] == 2 ? userTraits[4] : userTraits[4] + 1
        let Responsable = userTraits[7] == 0 ? userTraits[6] - 1 : userTraits[7] == 2 ? userTraits[6] : userTraits[0] + 1
        let Smoking = userTraits[9] == 0 ? userTraits[8] - 1 : userTraits[9] == 2 ? userTraits[8] : userTraits[8] + 1

        Clean = Clean < 0 ? Clean = 0 : Clean > 5 ? Clean = 5 : Clean
        Drinking = Drinking < 0 ? Drinking = 0 : Drinking > 5 ? Drinking = 5 : Drinking
        Friendly = Friendly < 0 ? Friendly = 0 : Friendly > 5 ? Friendly = 5 : Friendly
        Responsable = Responsable < 0 ? Responsable = 0 : Responsable > 5 ? Responsable = 5 : Responsable
        Smoking = Smoking < 0 ? Smoking = 0 : Smoking > 5 ? Smoking = 5 : Smoking


        setUserTraitsCalculated({
            "Clean":Clean,
            "Drinking":Drinking,
            "Friendly":Friendly,
            "Responsable":Responsable,
            "Smoking":Smoking,
        })
    }

    const [userTraits, setUserTraits] = useState({
        0:null,
        1:null,
        2:null,
        3:null,
        4:null,
        5:null,
        6:null,
        7:null,
        8:null,
        9:null,
    })

    useEffect(()=>{
        if (hasNullValues(userTraits)) {
            setFinishForm(true)
          } else {
            calculateTraits()
            setResults(true)
            setFinishForm(false)
          }
    },[userTraits])

    const handleCurrentStep = (stepIndex, answer) =>{
        setUserTraits(prevUserTraits => ({ ...prevUserTraits, [stepIndex]: answer }));
        setCurrentStep(stepIndex+1)
        if(stepIndex+1 == 10) showResults()
    }

    const showResults = () =>{

    }


    const resetForm = () =>{
        setResults(false)
        setCurrentStep(0)
        setFinishForm(true)
        setUserTraits({
            0:null,
            1:null,
            2:null,
            3:null,
            4:null,
            5:null,
            6:null,
            7:null,
            8:null,
            9:null,
        })
    }

    const handleSubmit = async() =>{
        try {
            const q = await query(collection(db, "users"), where("uid", "==", user?.uid));
            const docx = await getDocs(q);

            // const data = await docx.docs[0].data();
            // console.log(docx.docs[0].id);
            const docRef = await doc(db, 'users', docx.docs[0].id)
            await updateDoc(docRef, {
                attr:userTraitsCalculated,
                questionnaire:true,
            })
		    setModalOpen(true)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="w-[100%] p-[1rem] flex flex-col items-center relative">

            <b>User Trait Questionnaire</b>
            <div className="flex">
                {questionList.map((step, index) => (
                    <div key={index} className="flex items-center">
                        <div className={`relative flex items-center justify-center h-4 w-4 rounded-full border-2 ${index == stepz ? 'animate-mPulse scale-[1.4]' : null} ${index < stepz ? 'border-red-400 bg-red-300' : 'border-gray-300 '}`}>
                            {index <= step ? <div className="text-black font-bold text-xl">{index}</div> : null}
                        </div>
                    {index !== questionList.length - 1 && <div className={`h-1 w-[3vw] rounded border-r-0 border-l-0  ${index < stepz ? 'bg-red-400 border-red-400 border-1 py-[2px]' : 'bg-gray-300 border-red-200 border-1 py-[2px]'}`}></div>}
                    </div>
                ))}
            </div>

            {questionList.map((question, index)=>
                 <div key={index} className={`question my-5 text-center ${stepz != index ? "hidden":null}`}>
                    <span className="text-xl">{index+1}. {Object.keys(question)}</span> 
                    <div className="mt-4 flex flex-wrap justify-center gap-[10px] max-[350px]:flex-col">
                        {Object.values(question)[0].map((answerOption, i) => (
                            <button className="bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4" onClick={()=>handleCurrentStep(index,i * 2)}  key={i} value={answerOption}>{answerOption}</button>
                        ))}
                    </div>
               </div>
            )}
           
           {results && 
            <div className="flex flex-col align-center justify-center p-[10px] text-center border-2 rounded-xl shadow-lg shadow-stone-900 max-w-[300px] mt-6">
        
                <>
                <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                    <span className="basis-1/2">Clean</span>
                    <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                        <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:userTraitsCalculated["Clean"] * 20 }}></span>
                    </span>
                </div>
            
                <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                    <span className="basis-1/2">Friendly</span>
                    <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                        <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:userTraitsCalculated["Friendly"] * 20 }}></span>
                    </span>
                </div>
            
                <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                    <span className="basis-1/2">Drinking</span>
                    <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                        <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:userTraitsCalculated["Drinking"] * 20 }}></span>
                    </span>
                </div>
            
                <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                    <span className="basis-1/2">Responsable</span>
                    <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                        <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:userTraitsCalculated["Responsable"] * 20 }}></span>
                    </span>
                </div>
            
                <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                    <span className="basis-1/2">Smoking</span>
                    <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                        <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:userTraitsCalculated["Smoking"] * 20 }}></span>
                    </span>
                </div>
                </>
            </div>
           }


           <div className="flex justify-center gap-[2rem] mt-[3rem] w-[100%]">
                <button onClick={resetForm} className={`bg-gradient-to-t from-gray-200 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 font-bold animate-mPulse`}>Reset Form</button>
                <button disabled={finishForm} onClick={handleSubmit} className={`hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl py-2 px-4 text-center w-[70px] ${finishForm ? 'text-gray-500 bg-red-200 ' : 'text-white bg-red-400 animate-mPulse'}`}>Save Form</button>
            </div>

            {modalOpen && <Modal setOpenModal={setModalOpen} message={"Profile has been updated!"} type={"success"}/>}
        </main>
      );
}

export default Questionnaire


function hasNullValues(obj) {
    for (const prop in obj) {
      if (obj[prop] === null) {
        return true;
      }
    }
    return false;
  }


import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../Config/firebase";
import { query, collection, getDocs, where, setDoc, doc, updateDoc, orderBy, deleteDoc  } from "firebase/firestore";

const AdminMessages = () => {
  const [ messages , setMessages] = useState(false)
  const [ currentMessage , setCurrentMessage] = useState(false)
  
  const handleMarking = async (id, sts) => {
    try {
      const q = await query(collection(db, "messages"), where("uid", "==", id));
      const docx = await getDocs(q);
      const docRef = await doc(db, 'messages', docx.docs[0].id)
      await updateDoc(docRef, {
        status: sts
      })
      console.log(`Set message status to ${sts}.`);
      setCurrentMessage(prevMsg => ({ ...prevMsg, status: sts }));
      getMessages()
    } catch (error) {
      // Log any errors and return an error message
      console.log(error);
      return 'Error';
    }
  };

  const handleDelete = async(id) => {
    console.log(id);
    const collectionRef = collection(db, "messages");
    const q = query(collectionRef, where("uid", "==", id));
    try {
      const querySnapshot = await getDocs(q);
      const docRef = doc(db, "messages", querySnapshot.docs[0].id)
      const deleteQuery = await deleteDoc(docRef);
      console.log("Message successfully deleted!");
      setCurrentMessage();
      getMessages()
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  }



  async function getMessages() {
    const q = query(collection(db, "messages"), orderBy("date", "desc"));
    const docx = await getDocs(q);
    const messageees = docx.docs.map((result) => result.data());

    setMessages(messageees);
  }

  useEffect(() => {
    getMessages();
  }, [currentMessage]);
  
  const handleEvent = (e) => {
    let theID
    if(String(e.target.localName).startsWith("button")) theID = e.target.getAttribute("data-id")
    else if(String(e.target.localName).startsWith("span")) theID = e.target.parentNode.getAttribute("data-id")
    else if(String(e.target.localName).startsWith("svg")) theID = e.target.parentNode.getAttribute("data-id")
    else if(String(e.target.localName).startsWith("path")) theID = e.target.parentNode.parentNode.getAttribute("data-id")
    setTimeout(() => {
      switch (e.target.innerText) {
        case ("Mark as Read"):
          handleMarking(theID, "read")
          break;
          case ("Mark as Unread"):
          handleMarking(theID, "unread")
          break;
    
        case ("Delete"):
          handleDelete(theID)
          break;
        
        default:
          break;
      }
    }, 111);
  }

  if(!messages) return
 
  return (
    <>
    <div className="fixed top-[134px] bottom-0 grow ml-[6px] flex flex-col gap-[1rem]">

      {/* short detailed messages */}
      <div className={`flex flex-col  animate-fadeIN overflow-y-scroll border-2 max-[672px]:w-[86vw] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 ${currentMessage ? "basis-[35%]" : "basis-[90%]"} `} >
      
      <p className="font-bold text-xl">-Current Messages-</p>
      {messages && messages.map((mess,i)=>(
        <div key={crypto.randomUUID()} className={`flex flex-row justify-between divide-y-2 py-2 bg-gradient-to-t from-gray-200 to-transparent scale-[.95] hover:scale-[.97] ease-in duration-300 shadow-md shadow-gray-900/30 ${mess.status == "unread" ? 'font-bold' : ''} max-[671px]:flex-col`} onClick={()=>setCurrentMessage(mess)}>
            <p className="text-start basis-[20%] flex flex-col ">
              <span className="text-sm  eli1">{mess.name}</span>
              <span className="text-sm  eli1">{mess.email}</span>
              <span className="text-xs">{new Date(mess?.date.seconds * 1000).toLocaleString()}</span>
            </p>
            <p className=" basis-[40%] eli23 grow">{mess.message}</p>
            <p className="capitalize basis-[20%] text-center max-[671px]:text-start">{mess.status}</p>
        </div>
        ))
      }
      </div>
      
      {currentMessage && 
      <>
      {/* detailed messages */}
      <div className="animate-fadeIN overflow-y-scroll border-2 p-1 max-[672px]:w-[86vw] bg-gradient-to-t from-gray-200 to-transparent ease-in duration-300 shadow-md shadow-gray-900/30 basis-[60%]">
        <div className="flex justify-between items-center ">
          <p className="font-bold text-xl p-1 ">-Detailed Messages-</p>
          <svg onClick={()=>setCurrentMessage(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[20px] h-[20px] m-2 stroke-[6px] ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="py-1 w-[100%] animate-fadeIN flex max-[671px]:flex-col-reverse">

          <div className="max-w-[80%]  grow max-[671px]:max-w-[99%]">
            <div className="flex flex-col gap-[1px] whitespace-nowrap border-2 p-1 w-[100%] justify-evenly bg-[#f9f5f5]">
              <span className="flex justify-between" title={new Date(currentMessage?.date?.seconds * 1000).toLocaleString()} >{new Date(currentMessage?.date?.seconds * 1000).toLocaleString()} <span title={currentMessage.status} className="font-bold capitalize">{currentMessage.status}</span></span>
              <span title={currentMessage.name} className="capitalize eli3">{currentMessage.name} </span>
              <span title={currentMessage.email} className="capitalize eli3">{currentMessage.email}</span>
              
            </div>
            <div className="mt-4 text-xl border-2 p-4 break-all bg-[#f9f5f5]">
              {currentMessage.message}
            </div>
          </div>

            <div className="w-[20%] flex flex-col justify-start max-[671px]:flex-row max-[671px]:w-[99%] max-[671px]:items-baseline max-[671px]:flex-wrap">
              <button title={currentMessage.status == "unread" ? "Mark as Read" : "Mark as Unread"} className="p-2 mx-2 mb-2  flex justify-center flex-col items-center rounded-xl bg-gradient-to-t from-gray-200 to-transparent hover:contrast-[2] hover:scale-[1.05] hover:brightness-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30" data-id={currentMessage.uid} onClick={handleEvent}>
                  {currentMessage.status == "unread" ? "Mark as Read" : "Mark as Unread"}
              </button>

              <button title="Delete" className="p-2 mx-2 my-2 flex justify-center rounded-xl bg-gradient-to-t from-gray-200 to-transparent hover:contrast-[2] hover:scale-[1.05] hover:brightness-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30" data-id={currentMessage.uid} onClick={handleEvent}>
                  Delete
              </button>

              <a title="Reply" href={`mailto:${currentMessage.email}?subject=Admin Query&body=Your message...`} className="p-2 mx-2 my-2 flex justify-center rounded-xl bg-gradient-to-t from-gray-200 to-transparent hover:contrast-[2] hover:scale-[1.05] hover:brightness-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30">
                  Reply
              </a>

            </div>

            
          </div>
    
      </div>

      </>
        }

    </div>
    </>
  )
}

export default AdminMessages

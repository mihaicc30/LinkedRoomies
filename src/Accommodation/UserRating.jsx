import React , { useState, useEffect }from 'react'
import Loading from '../assets/Loading.jsx'
import {addRating, removeRating} from '../Config/RatingFunction'

const UserRating = ({data, currUser, roomieUser, tr, infoOnly}) => { // data = array of ratings
    const [ avgRating, setAvgRating ] = useState("No Ratings")
    const [ numberOfRatings, setnumberOfRatings ] = useState(false)
    const [ alreadyRated, setAlreadyRated ] = useState(false)
    const [ userRating, setuserRating ] = useState(false) // if already rated

    useEffect(()=>{
        if(!data) return

        data.map((entry,index)=>{

            if(String(entry).split(", ")[0] == currUser ) {
                setuserRating(String(entry).split(", ")[1])
                setAlreadyRated(true)
            }
        })

        if(data.length > 0){
            const ratings = data.map((entry,index)=>{
                return parseFloat(String(entry).split(", ")[1])
            })
            setnumberOfRatings(ratings.length)
            setAvgRating(((ratings.reduce((a, b) => a + b, 0)) / ratings.length).toFixed(2))
            if(((ratings.reduce((a, b) => a + b, 0)) / ratings.length).toFixed(2) >= 4) setStarSymbol("🌟")
        } else {
            setAvgRating("No Ratings")
        }
    },[alreadyRated, avgRating])

    const handleRemoveRating = () =>{
        console.log(`Removing rate : `,roomieUser, currUser, userRating);
        removeRating(roomieUser, currUser, userRating)
        tr(true)
    }

    const handleAddRating = (e) =>{
        console.log(`Add rating of ${e.target.getAttribute("data-v")} from user: ${currUser} to ${roomieUser}`);
        addRating(roomieUser, currUser, e.target.getAttribute("data-v"))

        tr(true)
    }



    const [ starSymbol, setStarSymbol ] = useState("⭐")

    if(infoOnly) {
        // if(currUser=="lwjwppIEsUSf4RP3jAApQuudmtX2") console.log("INFO ONLY");
        return (
            <div className=" font-sm flex flex-col animate-fadeIN text-center relative min-h-[48px]">
                <span className={`${avgRating === "No Ratings" ? "text-sm saturate-0" : ""}`}>{starSymbol}</span>
                <span className={`${avgRating === "No Ratings" ? "text-sm saturate-0" : ""}`}>{avgRating} <span title="Total Ratings">({numberOfRatings ? `${numberOfRatings}` : ""})</span></span>
            </div>
        )
    } else {
        return (
            <div className="userRatings font-sm flex flex-col animate-fadeIN text-center relative min-h-[48px]">
                <span className={`${avgRating === "No Ratings" ? "text-sm saturate-0" : ""}`}>{starSymbol}</span>
                <span className={`${avgRating === "No Ratings" ? "text-sm saturate-0" : ""}`}>{avgRating} <span title="Total Ratings">({numberOfRatings ? `${numberOfRatings}` : ""})</span></span>
                <div className={`${!alreadyRated ? "pt-5": ""} userRatingsAction absolute bg-white p-2 rounded-xl flex flex-row-reverse justify-center`}>
                    {!alreadyRated &&
                      <>
                        <span className="absolute top-0">Rate me!</span>
                        <button onClick={handleAddRating} data-v={5} title={"Awesome"}>⭐</button>
                        <button onClick={handleAddRating} data-v={4} title={"Great"}>⭐</button>
                        <button onClick={handleAddRating} data-v={3} title={"Ok"}>⭐</button>
                        <button onClick={handleAddRating} data-v={2} title={"Bad"}>⭐</button>
                        <button onClick={handleAddRating} data-v={1} title={"Awful"}>⭐</button>
                      </>
                    }
                    {alreadyRated &&
                        <span className="p-2 bg-gradient-to-t from-gray-300 to-transparent hover:scale-[1.05] hover:contrast-[1.2] ease-in duration-300 shadow-md shadow-gray-900/30 rounded-xl" onClick={handleRemoveRating}>Remove Rating</span>
                    }
                </div>
            </div>
        )

    }


  
}

export default UserRating

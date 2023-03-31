import React, { useState, useEffect } from 'react'
import { matchUsers, overallMatch } from "../Config/MatchFunction";
import UserRating from './UserRating'

const StudentCard = ({data, myself}) => {
    const [match, matchState] = useState(0)
    const [triggerRefresh, setTriggerRefresh] = useState(false)
      
    useEffect(() => {
        async function fetchData() {
            if(myself.attr == undefined || myself.attr == "undefined" || !myself.attr) return
            const result = await matchUsers(data.attr, myself.attr)
            matchState(result);
        }
        fetchData();
    }, [data,myself]);

    const nameStyle={
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        height: "50px",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
    }



    return (
    <div key={crypto.randomUUID()} className="flex flex-col align-center justify-center p-[10px] text-center border-2 rounded-xl shadow-lg shadow-stone-900 max-w-[300px] mx-1">
        
        <div className="flex flex-nowrap flex-col items-center max-w-[200px] my-3 animate-fadeUP1" >
            {myself != "x" &&<p>{match} Match</p> }
            <UserRating key={crypto.randomUUID()} data={data.rating} currUser={data.uid} roomieUser={data.uid} tr={setTriggerRefresh} infoOnly={true}/>
            <p className="font-bold text-center " style={nameStyle}>{data.name}</p>
            
            <img className=" p-1 h-[100px] w-[100px] rounded-xl shadow-lg shadow-stone-900" src={data.photo} alt={data.name+" Avatar"}/>
        </div>
        {data.attr && 
        <div>
            <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                <span className="basis-1/2">Clean</span>
                <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                    <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:data.attr["Clean"] * 20 }}></span>
                </span>
            </div>
        
            <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                <span className="basis-1/2">Friendly</span>
                <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                    <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:data.attr["Friendly"] * 20 }}></span>
                </span>
            </div>
        
            <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                <span className="basis-1/2">Drinking</span>
                <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                    <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:data.attr["Drinking"] * 20 }}></span>
                </span>
            </div>
        
            <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                <span className="basis-1/2">Responsable</span>
                <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                    <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:data.attr["Responsable"] * 20 }}></span>
                </span>
            </div>
        
            <div className="flex flex-nowrap whitespace-nowrap w-[200px] items-center animate-fadeUP1">
                <span className="basis-1/2">Smoking</span>
                <span className="basis-1/2 h-[10px] w-[100%] bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 relative rounded-xl">
                    <span className="h-[100%] bg-gradient-to-r from-blue-600 to-green-600 absolute left-0 rounded-xl text-end leading-[9px] text-xs" style={{width:data.attr["Smoking"] * 20 }}></span>
                </span>
            </div>
        </div>
}
    </div>
  )
}


export default StudentCard

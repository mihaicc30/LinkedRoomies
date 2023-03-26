import React, { useState, useEffect } from 'react'

const StudentCard = ({data, myself}) => {
    const [match, matchState] = useState(0)
      
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
    <div className="flex flex-col align-center justify-center p-[10px] text-center border-2 rounded-xl shadow-lg shadow-stone-900 max-w-[300px] mx-1">
        
        <div className="flex flex-nowrap flex-col items-center max-w-[200px] my-3 animate-fadeUP1" >
            {myself != "x" &&<p>{match} Match</p> }
            <p className="font-bold text-center " style={nameStyle}>{data.name}</p>
            <img className=" p-1 h-[100px] w-[100px] rounded-xl shadow-lg shadow-stone-900" src={data.photo} alt={data.name+" Avatar"}/>
        </div>
        {data.attr && 
        <>
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
        </>
}
    </div>
  )
}

async function matchUsers(user1, user2) {
    if(user1 == "x") return
    if(user2 == "x" || user2 == undefined || user2 == "undefined") return
    let weights = {Clean: 1, Drinking: 1, Friendly: 1, Responsable: 1, Smoking: 1}
    let diffSum = 0;
    let maxDiffSum = 0;
    
    // Loop through each quality and calculate the absolute difference
    // multiplied by the corresponding weight
    Object.keys(user1).forEach((quality) => {
        if(user2[quality] == undefined) return
        if(user1[quality] == undefined) return
        let diff = Math.abs(user1[quality] - user2[quality]);
        diffSum += diff * weights[quality];
        maxDiffSum += 5 * weights[quality]; // assuming qualities range from 0 to 5
    });
    // console.log(maxDiffSum, maxDiffSum);
    // Calculate the match percentage by dividing the weighted difference
    // sum by the maximum possible weighted difference sum
    let matchPct = (maxDiffSum - diffSum) / maxDiffSum * 100;
    return matchPct.toFixed(2) + '%';
}

export default StudentCard

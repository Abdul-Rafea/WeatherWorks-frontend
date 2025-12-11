import React, { useState } from "react";
import WeekFrame from './weekFrame.jsx';
import TodayFrame from './todayFrame.jsx'
import PrecipitaionGraph from "./precipitationGraph.jsx";

const weekData = [
    { id: 1, day: 'Mon', temp: 28 },
    { id: 2, day: 'Tue', temp: 30 },
    { id: 3, day: 'Wed', temp: 25 },
    { id: 4, day: 'Thu', temp: 22 },
    { id: 5, day: 'Fri', temp: 26 },
    { id: 6, day: 'Sat', temp: 29 },
    { id: 7, day: 'Sun', temp: 27 },
];

function Rightframe(props){
    const [activeView, setActiveView] = useState('today');

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const todayContent = (
        <>
            <TodayFrame heading = "Air Qulaity Index" aqi = {props.aqi} />
            <TodayFrame heading = "UV Index" uvIndex = {props.uvIndex} />
            <TodayFrame heading = "Pressure" pressure = {props.pressure} />
        </>
    );

    const weekContent = (
        <>
            {weekData.map((data) => (
                <WeekFrame 
                    key={data.id} 
                    day={data.day} 
                    temperature={data.temp} 
                />
            ))}
        </>
    );

    return(
        <div className="w-full h-auto p-5 bg-[#948979] rounded-3xl flex justify-center items-center flex-wrap">
            <div className="w-9/10 h-auto flex justify-left items-center gap-x-5">
                <button onClick={() => handleViewChange('today')} className={`w-auto h-auto text-2xl text-center text-[#ffffff] plus-jakarta-sans font-medium opacity-60 border-b-2 border-transparent cursor-pointer
                    ${activeView === 'today' ? 'opacity-100 border-b-2 border-white' : 
                        'hover:opacity-100 hover:border-b-2 hover:border-white'}`}>Today</button>
                <button onClick={() => handleViewChange('week')} className={`w-auto h-auto text-2xl text-center text-[#ffffff] plus-jakarta-sans font-medium opacity-60 border-b-2 border-transparent cursor-pointer
                    ${activeView === 'week' ? 'opacity-100 border-b-2 border-white' : 
                        'hover:opacity-100 hover:border-b-2 hover:border-white'}`}>Week</button>
            </div>
            <div className="w-full h-auto flex justify-center items-center flex-wrap">
                {activeView === 'today' ? todayContent : weekContent}
            </div>
            <div className="w-full h-auto flex justify-center items-center flex-wrap bg-[#393E46]">
                
            </div>
                <PrecipitaionGraph />
            </div>
    )
}

export default Rightframe;
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
            <TodayFrame heading = "Air Quality Index" aqi = {props.aqi} />
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
        <div className="w-full h-auto p-5 bg-[#412B6B] rounded-3xl flex justify-center items-center flex-wrap">
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
            <div className="w-full h-auto flex justify-center items-center flex-wrap bg-[#5C3E94] rounded-2xl mt-3 p-5 pb-2 shadow-[2px_4px_5px_0_#00000040]">
                <div className="w-9/10 h-auto text-left text-[#ffffff] text-2xl font-bold mb-4">Precipitaion</div>
                <PrecipitaionGraph />
            </div>
            <div className="w-full h-auto flex justify-center items-center flex-wrap bg-[#5C3E94] rounded-2xl mt-3 p-5 shadow-[2px_4px_5px_0_#00000040]">
                <div className="w-9/10 h-auto text-left text-2xl text-[#ffffff] font-bold ">Sunrise & Sunset</div>
                <div className="w-9/10 h-auto flex  justify-center items-center gap-3 t mt-2 mb-2">
                    <svg className="flex-shrink-0 flex"
                        width={50}
                        height={46}
                        viewBox="0 0 48 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                         <path
                            d="M34 34C34 31.3478 32.9464 28.8043 31.0711 26.9289C29.1957 25.0536 26.6522 24 24 24C21.3478 24 18.8043 25.0536 16.9289 26.9289C15.0536 28.8043 14 31.3478 14 34M24 2V16M24 2L16 10M24 2L32 10M8.44 18.44L11.28 21.28M2 34H6M42 34H46M36.72 21.28L39.56 18.44M46 42H2"
                            stroke="#ADADAD"
                            strokeWidth={5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="w-full h-auto flex justify-start items-center flex-wrap">
                        <div className="w-full h-auto text-xl text-[#ADADAD] font-medium">Sunrise</div>
                        <div className="w-full h-auto text-2xl text-[#DBDBDB] font-semibold">{props.sunrise}</div>
                    </div>
                </div>
                <div className="w-9/10 h-auto flex  justify-center items-center gap-3 t mt-2 mb-2">
                    <svg className="flex-shrink-0 flex"
                        width={50}
                        height={46}
                        viewBox="0 0 48 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M34 34C34 31.3478 32.9464 28.8043 31.0711 26.9289C29.1957 25.0536 26.6522 24 24 24C21.3478 24 18.8043 25.0536 16.9289 26.9289C15.0536 28.8043 14 31.3478 14 34M24 16V2M24 16L32 8M24 16L16 8M8.44 18.44L11.28 21.28M2 34H6M42 34H46M36.72 21.28L39.56 18.44M46 42H2"
                            stroke="#adadad"
                            strokeWidth={4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="w-full h-auto flex justify-start items-center flex-wrap">
                        <div className="w-full h-auto text-xl text-[#ADADAD] font-medium">Sunset</div>
                        <div className="w-full h-auto text-2xl text-[#DBDBDB] font-semibold">{props.sunset}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rightframe;
import React, { useState } from "react";
import WeekFrame from './weekFrame.jsx';
import TodayFrame from './todayFrame.jsx'
import PrecipitaionGraph from "./precipitationGraph.jsx";

function Rightframe(props){
    const [activeView, setActiveView] = useState('today');
     
    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const todayContent = (
        <>
            
        </>
    );

    return(
        <div className="w-full h-auto p-5 pb-6 bg-[#1C8EA3] rounded-3xl flex justify-center items-center flex-wrap">
            <div className="w-9/10 h-auto flex justify-left items-center gap-5">
                <button onClick={() => handleViewChange('today')} className={`w-auto h-auto text-2xl text-center text-[#ffffff] plus-jakarta-sans font-medium opacity-60 border-b-2 border-transparent cursor-pointer
                    ${activeView === 'today' ? 'opacity-100 border-b-2 border-white' : 
                        'hover:opacity-100 hover:border-b-2 hover:border-white'}`}>Today</button>
                <button onClick={() => handleViewChange('week')} className={`w-auto h-auto text-2xl text-center text-[#ffffff] plus-jakarta-sans font-medium opacity-60 border-b-2 border-transparent cursor-pointer
                    ${activeView === 'week' ? 'opacity-100 border-b-2 border-white' : 
                        'hover:opacity-100 hover:border-b-2 hover:border-white'}`}>Week</button>
            </div>
            {activeView === 'today' && (
                    <div className="w-full h-auto flex justify-center items center flex-wrap mt-5 gap-3">
                        <TodayFrame heading = "Air Quality Index" aqi = {props.aqi} />
                        <TodayFrame heading = "UV Index" uvIndex = {props.uv} />
                        <TodayFrame heading = "Pressure" pressure = {props.pressure} />
                        <div className="w-full flex justify-center items-center flex-wrap gap-5 bg-[#4CB8CC] rounded-2xl p-5 shadow-[2px_4px_5px_0_#00000040]">
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
                                        stroke="#D9A22B"
                                        strokeWidth={5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="w-full h-auto flex justify-start items-center flex-wrap">
                                    <div className="w-full h-auto text-xl text-[#ffffff] font-medium">Sunrise</div>
                                    <div className="w-full h-auto text-2xl text-[#ffffff] font-semibold">{props.sunrise}</div>
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
                                        stroke="#D9A22B"
                                        strokeWidth={4}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="w-full h-auto flex justify-start items-center flex-wrap">
                                    <div className="w-full h-auto text-xl text-[#ffffff] font-medium">Sunset</div>
                                    <div className="w-full h-auto text-2xl text-[#ffffff] font-semibold">{props.sunset}</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-auto flex justify-center items-center flex-wrap bg-[#4CB8CC] rounded-2xl p-5 pb-2 shadow-[2px_4px_5px_0_#00000040]">
                            <div className="w-9/10 h-auto text-left text-[#ffffff] text-2xl font-bold mb-4">Precipitaion</div>
                            <PrecipitaionGraph precipData = {props.precipData} />
                        </div>
                    </div>
            )}
            {activeView === 'week' && (
                    <div className="w-full flex justify-center items-center flex-wrap gap-5 mt-5">
                    {props.weekData && props.weekData.map((data,index) => (
                        <WeekFrame 
                            key= {index}
                                day = {data.day}
                            icon = {data.icon}
                            temp = {data.avgTempC}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Rightframe;
import React, { useState } from "react";
import Week_frame from './week-frame.jsx';

const weekData = [
    { id: 1, day: 'Mon', temp: 28 },
    { id: 2, day: 'Tue', temp: 30 },
    { id: 3, day: 'Wed', temp: 25 },
    { id: 4, day: 'Thu', temp: 22 },
    { id: 5, day: 'Fri', temp: 26 },
    { id: 6, day: 'Sat', temp: 29 },
    { id: 7, day: 'Sun', temp: 27 },
];

function Rightframe(){
    const [activeView, setActiveView] = useState('today');

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const todayContent = (
        <>
            Today's detailed weather module goes here.
        </>
    );

    const weekContent = (
        <>
            {weekData.map((data) => (
                <Week_frame 
                    key={data.id} 
                    day={data.day} 
                    temperature={data.temp} 
                />
            ))}
        </>
    );

    return(
        <div className="w-full h-auto m-2 mt-0 bg-[#524A79] rounded-3xl flex justify-center items-center flex-wrap">
            <div className="w-9/10 h-auto mt-3 mb-5 ml-3 flex justify-left items-center gap-x-5">
                <button onClick={() => handleViewChange('today')} className={`w-auto h-auto text-2xl text-center text-[#ffffff] plus-jakarta-sans font-medium opacity-60 border-b-2 border-transparent cursor-pointer
                    ${activeView === 'today' ? 'opacity-100 border-b-2 border-white' : 
                        'hover:opacity-100 hover:border-b-2 hover:border-white'}`}>Today</button>
                <button onClick={() => handleViewChange('week')} className={`w-auto h-auto text-2xl text-center text-[#ffffff] plus-jakarta-sans font-medium opacity-60 border-b-2 border-transparent cursor-pointer
                    ${activeView === 'week' ? 'opacity-100 border-b-2 border-white' : 
                        'hover:opacity-100 hover:border-b-2 hover:border-white'}`}>Week</button>
            </div>
            <div className="w-full h-auto flex justify-center items-center flex-wrap mr-2 ml-2 gap-x-3">
                {activeView === 'today' ? todayContent : weekContent}
            </div>

        </div>
    )
}

export default Rightframe;
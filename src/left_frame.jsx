import Light_Rain_Day from './assets/Light_Rain_Day.svg';
import Rain_Icon from './assets/Rain_Icon.svg';
import Min_Temp_Icon from './assets/Min_Temp_Icon.svg';
import Max_Temp_Icon from './assets/Max_Temp_Icon.svg';
import Humidity_Icon from './assets/Humidity_Icon.svg';
import Wind_Speed_Icon from './assets/Wind_Speed_Icon.svg';

import React, { useState } from "react";
import Portal from './SettingPortal.jsx';
import PageSetting from './PageSetting.jsx';

function LeftFrame(){
    const [settingActive, setSettingActive] = useState(false);
    
    const settingOpen = () => setSettingActive(true);
    const settingClose = () => setSettingActive(false); 

    return(
        <div className="w-full h-auto m-2 bg-[#524A79] rounded-3xl flex justify-start items-center flex-col">
            <div className="w-full h-auto flex justify-between items-center p-3">
                <button className="w-3/10 height-auto rounded-full flex justify-center items-center bg-[#ffffff]">
                    Menu_icon
                </button>
                <button onClick={settingOpen} className="w-3/10 height-auto rounded-full flex justify-center items-center bg-[#ffffff]">
                    Setting_icon
                </button>
                    {settingActive && (
                        <Portal>
                            <PageSetting onClose={settingClose} /> 
                        </Portal>
                    )}
            </div>
            <img src={Light_Rain_Day} alt="Light Rain Day" className="w-7/10 h-auto " />
            <div className="w-7/10 h-auto text-center plus-jakarta-sans font-bold text-8xl text-[#ffffff]">30°C</div>
            <div className='w-8/10 height-auto flex justify-between items-center mt-10'>
                <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-4xl text-[#ffffff]">Lahore</div>
                <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-4xl text-[#ffffff]">Monday</div>
            </div>
            <hr className="w-85/100 h-[2px] bg-[#ffffff] mt-3" />
            <div className="w-8/10 h-auto flex justify-center items-center flex-col">
                <div className='w-full h-auto flex justify-left items-center mt-10'>
                    <img src={Rain_Icon} alt="Rain Icon" className="w-auto h-full" />
                    <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Light Rain</div>
                </div>
                <div className='w-full h-auto flex justify-left items-center mt-5 mb-5'>
                    <img src={Min_Temp_Icon} alt="Min Temp Icon" className="w-auto h-full" />
                    <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Min Temp - 25°C</div>
                </div>
                <div className='w-full h-auto flex justify-left items-center mb-10'>
                    <img src={Max_Temp_Icon} alt="Max Temp Icon" className="w-auto h-full" />
                    <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Max Temp - 32°C</div>
                </div>
            </div>
            <div className="w-9/10 h-auto flex justify-between items-center bg-[#3E3245] p-2 mb-5 rounded-xl box-border shadow-[2px_4px_5px_0_#00000040]">
                <div className="w-1/2 h-full flex justify-center items-center">
                    <img src={Humidity_Icon} alt="Humidity Icon" className="w-4/10 h-auto" />
                    <div className="w-6/10 h-auto flex justify-left items-center flex-col">
                        <div className="w-full h-auto text-left text-[#ffffff] text-2xl pl-2 box-border">83%</div>
                        <div className="w-full h-auto text-left text-[#ffffff] text-1xl pl-2  box-border text-extralight">Humidity</div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex justify-center items-center">
                    <img src={Wind_Speed_Icon} alt="Wind Speed Icon" className="w-4/10 h-40%" />
                    <div className="w-6/10 h-auto flex justify-center items-center flex-col">
                        <div className="w-full h-auto text-left text-[#ffffff] text-2xl pl-2 box-border">6km/h</div>
                        <div className="w-full h-auto text-left text-[#ffffff] text-1xl  box-border text-extralight text-nowrap">Wind Speed</div>
                    </div>
                </div>            
            </div>
        </div>
    )
}

export default LeftFrame;
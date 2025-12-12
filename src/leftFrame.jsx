import Button from './button.jsx';
import React, { useState } from "react";
import Portal from './generatePortal.jsx';
import PageSetting from './PageSetting.jsx';

function LeftFrame({temp, city}){

    const [settingActive, setSettingActive] = useState(false);
    
    const delayedOpen = () => setSettingActive(true);
    const settingOpen = () => {setTimeout(delayedOpen,200)}
    const delayedClose = () => setSettingActive(false);
    const settingClose = () => {setTimeout(delayedClose,200)}

    return(
        <div className="w-full h-auto bg-[#412B6B] rounded-3xl flex justify-start items-center flex-col mt-2 mb-2">
            <div className="w-full h-auto flex justify-between items-center p-3">
                <Button text="Menu" customClass="m-4" />
                <Button action={settingOpen} text="Settings" customClass="m-4" />
                    {settingActive && (
                        <Portal styling = "fixed top-0 left-0 z-50 w-screen h-screen bg-[#0F0F0F99] flex justify-center items-center" >
                            <PageSetting onClose={settingClose} /> 
                        </Portal>
                    )}
            </div>
            {/* <img src={Light_Rain_Day} alt="Light Rain Day" className="w-7/10 h-auto " /> */}
            <div className="w-7/10 h-auto text-center plus-jakarta-sans font-bold text-8xl text-[#ffffff]">{temp}°C</div>
            <div className='w-8/10 height-auto flex justify-between items-center mt-10'>
                <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-4xl text-[#ffffff]">{city}</div>
                <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-4xl text-[#ffffff]">Monday</div>
            </div>
            <hr className="w-85/100 h-[2px] bg-[#ffffff] mt-3" />
            <div className="w-8/10 h-auto flex justify-center items-center flex-col">
                <div className='w-full h-auto flex justify-left items-center mt-10'>
                    {/* <img src={Rain_Icon} alt="Rain Icon" className="w-auto h-full" /> */}
                    <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Light Rain</div>
                </div>
                <div className='w-full h-auto flex justify-left items-center mt-5 mb-5'>
                    {/* <img src={Min_Temp_Icon} alt="Min Temp Icon" className="w-auto h-full" /> */}
                    <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Min Temp - 25°C</div>
                </div>
                <div className='w-full h-auto flex justify-left items-center mb-10'>
                    {/* <img src={Max_Temp_Icon} alt="Max Temp Icon" className="w-auto h-full" /> */}
                    <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Max Temp - 32°C</div>
                </div>
            </div>
            <div className="w-9/10 h-auto flex justify-between items-center bg-[#5C3E94] p-393E46 mb-5 rounded-xl box-border shadow-[2px_4px_5px_0_#00000040]">
                <div className="w-1/2 h-full flex justify-center items-center">
                    {/* <img src={Humidity_Icon} alt="Humidity Icon" className="w-4/10 h-auto" /> */}
                    <div className="w-6/10 h-auto flex justify-left items-center flex-col">
                        <div className="w-full h-auto text-left text-[#ffffff] text-2xl pl-2 box-border">83%</div>
                        <div className="w-full h-auto text-left text-[#ffffff] text-1xl pl-2  box-border text-extralight">Humidity</div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex justify-center items-center">
                    {/* <img src={Wind_Speed_Icon} alt="Wind Speed Icon" className="w-4/10 h-40%" /> */}
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
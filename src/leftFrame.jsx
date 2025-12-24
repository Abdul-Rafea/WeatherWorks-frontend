import { Link } from 'react-router-dom';
import { useState } from 'react';
import Portal from './generatePortal.jsx';
import PageSetting from './PageSetting.jsx';
import IconMap from './IconMap.jsx';
import WeatherWorksLogo from "./assets/WeatherWorksLogo.png";
import Search_Icon from "./assets/Search_Icon.png"

function LeftFrame(props){

    const [settingActive, setSettingActive] = useState(false);
    
    const delayedOpen = () => setSettingActive(true);
    const settingOpen = () => {setTimeout(delayedOpen,200)}
    const delayedClose = () => setSettingActive(false);
    const settingClose = () => {setTimeout(delayedClose,200)}

    return(
        <div className="w-full h-auto">
            <header className="w-full h-auto flex justify-evenly items-center rounded-3xl mb-1 mt-1">
                <Link to="/" className="w-2/10 h-auto flex justify-center items-center
                    sm:w-2/10">
                    <svg className="w-full h-aut0"
                        width="490px"
                        height="80px"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                        fill="#D9A22B"
                        />
                    </svg>
                </Link>
                <div className="w-full h-auto bg-[#1C8EA3] rounded-3xl p-2 ml-2 mr-2 flex justify-start items-center shadow-[2px_4px_5px_0_#00000040]
                    sm:rounded-4xl ">
                    <img src={Search_Icon} alt="Search icon" className="w-auto h-full"></img>
                    <div className="w-full h-auto text-left p-2 plus-jakarta-sans font-medium text-[#ffffff80] text-2xl
                        sm:text-4xl sm:p-5">Search City...</div>
                </div> 
            </header>

            <div className="w-full h-auto bg-[#1C8EA3] rounded-3xl flex justify-start items-center flex-col mb-2 mt-1">
                <div className="w-full h-auto flex justify-between items-center p-3
                    sm:p-5">
                    <button className="w-auto h-auto text-center text-3xl text-[#ffffff] font-medium bg-[#D9A22B] rounded-3xl p-3 shadow-[2px_4px_5px_0_#00000040]
                        sm:text-5xl sm:pb-5">Menu</button>
                    <button onClick={settingOpen} className="w-auto h-auto text-center text-3xl text-[#ffffff] font-medium bg-[#D9A22B] rounded-3xl p-3 shadow-[2px_4px_5px_0_#00000040]
                        md:text-5xl sm:pb-5">
                        Settings
                        {settingActive && (
                            <Portal styling = "fixed top-0 left-0 z-50 w-screen h-screen bg-[#0F0F0Fbf] flex justify-center items-center" >
                                <PageSetting onClose={settingClose} /> 
                            </Portal>
                        )}
                    </button>
                </div>
                <div className="w-5/10 h-auto">
                    <IconMap WeatherCode={props.weatherCode} />
                </div>
                <div className="w-full h-auto text-center text-[#ffffff] text-3xl font-semibold
                    sm:text-6xl">{props.weatherCondition}</div>
                <div className="w-7/10 h-auto text-center plus-jakarta-sans font-bold text-7xl text-[#ffffff]
                    sm:text-[8rem]">{props.temp}°C</div>
                <div className='w-8/10 height-auto flex justify-between items-center mt-10'>
                    <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-4xl text-[#ffffff]
                    sm:text-5xl">{props.city}</div>
                    <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-4xl text-[#ffffff]
                    sm:text-5xl">Monday</div>
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
                <div className="w-9/10 h-auto flex justify-between items-center bg-[#D9A22B] p-1 mb-5 rounded-xl box-border shadow-[2px_4px_5px_0_#00000040]">
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
        </div>
    )
}

export default LeftFrame;
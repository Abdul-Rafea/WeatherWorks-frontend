import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { WeatherContext } from "./WeatherContext";
import Portal from './generatePortal.jsx';
import PageSetting from './PageSetting.jsx';
import IconMap from './IconMap.jsx';
import GetCoords from './GetCoords.jsx';

import WeatherWorksLogo from "./assets/WeatherWorksLogo.png";
import Search_Icon from "./assets/Search_Icon.png"

function LeftFrame(props){
    const {setLocationCords, locationCords} = useContext(WeatherContext);

    const [settingActive, setSettingActive] = useState(false);
    const delayedOpen = () => setSettingActive(true);
    const settingOpen = () => {setTimeout(delayedOpen,200)}
    const delayedClose = () => setSettingActive(false);
    const settingClose = () => {setTimeout(delayedClose,200)}


    return(
        <>
            <div className="w-full h-auto">
                <header className="w-full h-auto flex justify-evenly items-center rounded-3xl mb-3 mt-1 ">
                    <Link to="/" className="w-2/10 h-auto flex justify-center items-center
                        sm:w-2/10">
                        <svg className="w-full"
                            width={50}
                            height={50}
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
                        <button className="w-4/10 h-auto text-center text-2xl text-[#ffffff] font-medium bg-[#D9A22B] rounded-3xl p-2 shadow-[2px_4px_5px_0_#00000040]
                            sm:text-5xl sm:pb-5">Menu</button>
                        <button onClick={settingOpen} className="w-4/10 h-auto text-center text-2xl text-[#ffffff] font-medium bg-[#D9A22B] rounded-3xl p-2 shadow-[2px_4px_5px_0_#00000040]
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
                    <div className="w-full h-auto text-center text-[#ffffff] text-3xl font-semibold mb-2
                        sm:text-6xl">{props.weatherCondition}</div>
                    <div className="w-7/10 h-auto text-center plus-jakarta-sans font-bold text-6xl text-[#ffffff]
                        sm:text-[8rem]">{props.temp}°C</div>
                    <div className='w-8/10 height-auto flex justify-between items-center mt-10'>
                        <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-3xl text-[#ffffff]
                        sm:text-5xl">{props.city}</div>
                        <div className="w-auto h-auto text-cneter plus-jakarta-sans font-light text-3xl text-[#ffffff]
                        sm:text-5xl">Monday</div>
                    </div>
                    <hr className="w-85/100 h-[2px] bg-[#ffffff] mt-3" />
                    <div className="w-8/10 h-auto flex justify-center items-center flex-col">
                        <div className='w-full h-auto flex justify-left items-center mt-10'>
                            <svg 
                                width={40}
                                height={40}
                                viewBox="0 0 20 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M10 14.2L8.2 17.2M13 17.2L11.2 20.2M19 7C19 10.3137 16.3137 13 13 13C11.5438 13 9.4 13 9.4 13C9.4 13 7.11306 13 5.8 13C3.14903 13 1 10.851 1 8.2C1 5.54903 3.14903 3.4 5.8 3.4C6.54469 3.4 7.24977 3.56959 7.87873 3.87224C8.9331 2.14953 10.8323 1 13 1C16.3137 1 19 3.68629 19 7Z"
                                    stroke="white"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Light Rain</div>
                        </div>
                        <div className='w-full h-auto flex justify-left items-center mt-5 mb-5'>
                            <svg
                                width={40}
                                height={40}
                                viewBox="0 0 18 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M5.2 16H5.25625M11.35 9.85L13.6 7.6M13.6 7.6L15.85 9.85M13.6 7.6V4M13.6 7.6L10.6 6.1M13.6 7.6L16.6 6.1M9.4 16C9.4 18.3196 7.5196 20.2 5.2 20.2C2.8804 20.2 1 18.3196 1 16C1 14.5728 1.71191 13.3118 2.8 12.5528V3.39843C2.8 2.07295 3.87452 1 5.2 1C6.52548 1 7.6 2.07452 7.6 3.4V12.5528C8.45925 13.3219 9.4 14.7561 9.4 16Z"
                                    stroke="white"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Min Temp - 25°C</div>
                        </div>
                        <div className='w-full h-auto flex justify-left items-center mb-10'>
                            <svg
                                width={40}
                                height={40}
                                viewBox="0 0 17 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M2.8 12.5528L3.3721 13.373C3.64022 13.186 3.8 12.8797 3.8 12.5528H2.8ZM7.6 12.5528H6.6C6.6 12.8373 6.72113 13.1082 6.93309 13.2979L7.6 12.5528ZM5.2 15C4.64772 15 4.2 15.4477 4.2 16C4.2 16.5523 4.64772 17 5.2 17V15ZM5.25625 17C5.80853 17 6.25625 16.5523 6.25625 16C6.25625 15.4477 5.80853 15 5.25625 15V17ZM8.4 16C8.4 17.7673 6.96731 19.2 5.2 19.2V21.2C8.07188 21.2 10.4 18.8719 10.4 16H8.4ZM5.2 19.2C3.43269 19.2 2 17.7673 2 16H0C0 18.8719 2.32812 21.2 5.2 21.2V19.2ZM2 16C2 14.9134 2.54063 13.953 3.3721 13.373L2.2279 11.7326C0.883186 12.6706 0 14.2321 0 16H2ZM6.93309 13.2979C7.27794 13.6066 7.6596 14.0702 7.95026 14.5879C8.2462 15.115 8.4 15.6123 8.4 16H10.4C10.4 15.1438 10.0834 14.302 9.69418 13.6088C9.29965 12.9061 8.78131 12.2681 8.26691 11.8077L6.93309 13.2979ZM6.6 3.4V12.5528H8.6V3.4H6.6ZM3.8 12.5528V3.39843H1.8V12.5528H3.8ZM5.2 2C5.9732 2 6.6 2.6268 6.6 3.4H8.6C8.6 1.52223 7.07777 0 5.2 0V2ZM5.2 0C3.32308 0 1.8 1.51981 1.8 3.39843H3.8C3.8 2.62608 4.42595 2 5.2 2V0ZM5.2 17H5.25625V15H5.2V17ZM14.4 5.8C14.4 6.5732 13.7732 7.2 13 7.2V9.2C14.8778 9.2 16.4 7.67777 16.4 5.8H14.4ZM13 7.2C12.2268 7.2 11.6 6.5732 11.6 5.8H9.6C9.6 7.67777 11.1222 9.2 13 9.2V7.2ZM11.6 5.8C11.6 5.0268 12.2268 4.4 13 4.4V2.4C11.1222 2.4 9.6 3.92223 9.6 5.8H11.6ZM13 4.4C13.7732 4.4 14.4 5.0268 14.4 5.8H16.4C16.4 3.92223 14.8778 2.4 13 2.4V4.4Z"
                                    fill="white"
                                />
                            </svg>

                            <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Max Temp - 32°C</div>
                        </div>
                    </div>
                    <div className="w-9/10 h-auto flex justify-between items-center bg-[#D9A22B] p-1 mb-5 rounded-xl box-border shadow-[2px_4px_5px_0_#00000040]">
                        <div className="w-1/2 h-full flex justify-center items-center">
                            <svg
                                width={60}
                                height={60}
                                viewBox="0 0 47 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M0.105441 0.923661C0.406701 0.17051 1.26147 -0.19582 2.01462 0.105441L7.17645 2.17017C8.22695 2.59037 9.39883 2.59037 10.4493 2.17017L13.4292 0.978209C15.1801 0.277877 17.1332 0.277876 18.884 0.978209L21.8639 2.17017C22.9144 2.59037 24.0863 2.59037 25.1368 2.17017L28.1167 0.978209C29.8676 0.277877 31.8207 0.277876 33.5715 0.978209L36.5514 2.17017C37.6019 2.59037 38.7738 2.59037 39.8243 2.17017L44.9862 0.105441C45.7393 -0.19582 46.5941 0.17051 46.8953 0.923661C47.1966 1.67681 46.8303 2.53158 46.0771 2.83284L40.9153 4.89757C39.1645 5.59791 37.2113 5.5979 35.4605 4.89757L32.4806 3.70561C31.4301 3.28541 30.2582 3.28541 29.2077 3.70561L26.2278 4.89757C24.477 5.59791 22.5238 5.5979 20.773 4.89757L17.7931 3.70561C16.7426 3.28541 15.5707 3.28541 14.5202 3.70561L11.5403 4.89757C9.78946 5.59791 7.83632 5.5979 6.08549 4.89757L0.923661 2.83284C0.17051 2.53158 -0.19582 1.67681 0.105441 0.923661ZM0.105441 9.73616C0.406701 8.98301 1.26147 8.61668 2.01462 8.91794L7.17645 10.9827C8.22695 11.4029 9.39883 11.4029 10.4493 10.9827L13.4292 9.79071C15.1801 9.09038 17.1332 9.09038 18.884 9.79071L21.8639 10.9827C22.9144 11.4029 24.0863 11.4029 25.1368 10.9827L28.1167 9.79071C29.8676 9.09038 31.8207 9.09038 33.5715 9.79071L36.5514 10.9827C37.6019 11.4029 38.7738 11.4029 39.8243 10.9827L44.9862 8.91794C45.7393 8.61668 46.5941 8.98301 46.8953 9.73616C47.1966 10.4893 46.8303 11.3441 46.0771 11.6453L40.9153 13.7101C39.1645 14.4104 37.2113 14.4104 35.4605 13.7101L32.4806 12.5181C31.4301 12.0979 30.2582 12.0979 29.2077 12.5181L26.2278 13.7101C24.477 14.4104 22.5238 14.4104 20.773 13.7101L17.7931 12.5181C16.7426 12.0979 15.5707 12.0979 14.5202 12.5181L11.5403 13.7101C9.78946 14.4104 7.83632 14.4104 6.08549 13.7101L0.923661 11.6453C0.17051 11.3441 -0.19582 10.4893 0.105441 9.73616ZM0.105441 18.5487C0.406701 17.7955 1.26147 17.4292 2.01462 17.7304L7.17645 19.7952C8.22695 20.2154 9.39883 20.2154 10.4493 19.7952L13.4292 18.6032C15.1801 17.9029 17.1332 17.9029 18.884 18.6032L21.864 19.7952C22.9144 20.2154 24.0863 20.2154 25.1368 19.7952L28.1167 18.6032C29.8676 17.9029 31.8207 17.9029 33.5715 18.6032L36.5514 19.7952C37.6019 20.2154 38.7738 20.2154 39.8243 19.7952L44.9862 17.7304C45.7393 17.4292 46.5941 17.7955 46.8953 18.5487C47.1966 19.3018 46.8303 20.1566 46.0771 20.4578L40.9153 22.5226C39.1645 23.2229 37.2113 23.2229 35.4605 22.5226L32.4806 21.3306C31.4301 20.9104 30.2582 20.9104 29.2077 21.3306L26.2278 22.5226C24.477 23.2229 22.5238 23.2229 20.773 22.5226L17.7931 21.3306C16.7426 20.9104 15.5707 20.9104 14.5202 21.3306L11.5403 22.5226C9.78946 23.2229 7.83632 23.2229 6.08549 22.5226L0.923661 20.4578C0.17051 20.1566 -0.19582 19.3018 0.105441 18.5487ZM0.105441 27.3612C0.406701 26.608 1.26147 26.2417 2.01462 26.5429L7.17645 28.6077C8.22695 29.0279 9.39883 29.0279 10.4493 28.6077L13.4292 27.4157C15.1801 26.7154 17.1332 26.7154 18.884 27.4157L21.864 28.6077C22.9144 29.0279 24.0863 29.0279 25.1368 28.6077L28.1167 27.4157C29.8676 26.7154 31.8207 26.7154 33.5715 27.4157L36.5514 28.6077C37.6019 29.0279 38.7738 29.0279 39.8243 28.6077L44.9862 26.5429C45.7393 26.2417 46.5941 26.608 46.8953 27.3612C47.1966 28.1143 46.8303 28.9691 46.0771 29.2703L40.9153 31.3351C39.1645 32.0354 37.2113 32.0354 35.4605 31.3351L32.4806 30.1431C31.4301 29.7229 30.2582 29.7229 29.2077 30.1431L26.2278 31.3351C24.477 32.0354 22.5238 32.0354 20.773 31.3351L17.7931 30.1431C16.7426 29.7229 15.5707 29.7229 14.5202 30.1431L11.5403 31.3351C9.78946 32.0354 7.83632 32.0354 6.08549 31.3351L0.923661 29.2703C0.17051 28.9691 -0.19582 28.1143 0.105441 27.3612Z"
                                    fill="white"
                                />
                            </svg>
                            <div className=" h-auto flex justify-left items-center flex-col">
                                <div className="w-full h-auto text-left text-[#ffffff] text-2xl pl-2 box-border">83%</div>
                                <div className="w-full h-auto text-left text-[#ffffff] text-1xl pl-2  box-border text-extralight">Humidity</div>
                            </div>
                        </div>
                        <div className="w-1/2 h-full flex justify-center items-center">
                            <svg
                                width={60}
                                height={60}
                                viewBox="0 0 48 42"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M37.5 3C33.3579 3 30 6.35786 30 10.5C30 11.3284 29.3284 12 28.5 12C27.6716 12 27 11.3284 27 10.5C27 4.70101 31.701 0 37.5 0C43.299 0 48 4.70101 48 10.5C48 16.299 43.299 21 37.5 21H1.5C0.671573 21 0 20.3284 0 19.5C0 18.6716 0.671573 18 1.5 18H37.5C41.6421 18 45 14.6421 45 10.5C45 6.35786 41.6421 3 37.5 3ZM16.5 6C14.8431 6 13.5 7.34315 13.5 9C13.5 9.82843 12.8284 10.5 12 10.5C11.1716 10.5 10.5 9.82843 10.5 9C10.5 5.68629 13.1863 3 16.5 3C19.8137 3 22.5 5.68629 22.5 9C22.5 12.3137 19.8137 15 16.5 15H1.5C0.671573 15 0 14.3284 0 13.5C0 12.6716 0.671573 12 1.5 12H16.5C18.1569 12 19.5 10.6569 19.5 9C19.5 7.34315 18.1569 6 16.5 6ZM0 25.5C0 24.6716 0.671573 24 1.5 24H31.625C36.5956 24 40.625 28.0294 40.625 33C40.625 37.9706 36.5956 42 31.625 42C26.6544 42 22.625 37.9706 22.625 33C22.625 32.1716 23.2966 31.5 24.125 31.5C24.9534 31.5 25.625 32.1716 25.625 33C25.625 36.3137 28.3113 39 31.625 39C34.9387 39 37.625 36.3137 37.625 33C37.625 29.6863 34.9387 27 31.625 27H1.5C0.671573 27 0 26.3284 0 25.5Z"
                                fill="white"
                                />
                            </svg>
                            <div className=" h-auto flex justify-center items-center flex-col">
                                <div className="w-full h-auto text-left text-[#ffffff] text-2xl pl-2 box-border">6km/h</div>
                                <div className="w-full h-auto text-left text-[#ffffff] text-1xl  box-border text-extralight text-nowrap">Wind Speed</div>
                            </div>
                        </div>            
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftFrame;
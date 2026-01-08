import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { WeatherContext } from "./WeatherContext";
import Portal from './generatePortal.jsx';
import PageSetting from './PageSetting.jsx';
import IconMap from './IconMap.jsx';
import GetCoords from './GetCoords.jsx';

import WeatherWorksLogo from "./assets/WeatherWorksLogo.png";
import Search_Icon from "./assets/Search_Icon.png";

function LeftFrame(props){
    const {setLocationCords, locationCords} = useContext(WeatherContext);
    const [settingActive, setSettingActive] = useState(false);
    const [iconDay, setIconDay] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuOpen = ()=> {
        if (isMenuOpen == false){
                setIsMenuOpen(true);
        }
        else{
            setIsMenuOpen(false);
        }
    }
    const delayedOpen = () => setSettingActive(true);
    const settingOpen = () => {setTimeout(delayedOpen,200)}
    const delayedClose = () => setSettingActive(false);
    const settingClose = () => {setTimeout(delayedClose,200)}

    return(
        <>
            <div className="w-full h-auto">
                <header className="w-full flex justify-between items-center rounded-3xl mt-1 mb-1 pl-3 pr-3">
                    <div className="flex gap-5">  
                        <div className="relative"> 
                            <button onClick={menuOpen} className="flex justify-center items-center cursor-pointer
                                sm:w-2/10">
                                    <svg
                                        width={50}
                                        height={50}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M4 6H20M4 12H20M4 18H20"
                                        stroke="#D9A22B"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />
                                    </svg>
                            </button>
                            {isMenuOpen && (
                                <div className="absolute bg-[#1C8EA3] rounded-xl p-2 border-2 border-[#000000]">
                                    <ul className="flex flex-wrap text-2xl text-[#ffffff] font-bold gap-2">
                                        <li>
                                            <Link to="/" className="flex items-center gap-2">
                                                <svg
                                                    width={30}
                                                    height={30}
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    {...props}
                                                    >
                                                    <path d="M1 6v9h5v-4a2 2 0 114 0v4h5V6L8 0 1 6z" fill="#D9A22B" />
                                                </svg>
                                                <p>Home</p>
                                            </Link>
                                        </li>
                                        <div className="w-full h-1 bg-[#000000] mt-1 rounded-2xl"></div>
                                        <li>
                                            <div className="flex items-center gap-1.5 cursor-pointer">
                                                <svg
                                                    width={35}
                                                    height={35}
                                                    viewBox="3.5 4 16.5 16.5"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    {...props}
                                                >
                                                    <path
                                                        clipRule="evenodd"
                                                        d="M11.018 19a.736.736 0 01-.721-.627.806.806 0 00-.535-.623 5.686 5.686 0 01-.66-.28.763.763 0 00-.795.052.704.704 0 01-.926-.077l-.967-.992a.787.787 0 01-.08-.995.857.857 0 00.062-.837 5.883 5.883 0 01-.22-.576.851.851 0 00-.65-.6.786.786 0 01-.651-.776v-1.241a.902.902 0 01.741-.9.981.981 0 00.722-.607c.037-.089.076-.177.117-.264.165-.327.142-.72-.06-1.024a.923.923 0 01.092-1.169l.71-.729a.994.994 0 011.307-.11l.022.016a1.05 1.05 0 001.018.1c.358-.132.62-.447.694-.829l.01-.034c.08-.506.506-.878 1.006-.878h.857c.514 0 .952.38 1.036.9l.015.07c.07.366.32.67.66.8.328.144.705.107 1-.1l.049-.036a1.02 1.02 0 011.342.111l.654.672c.328.338.37.87.098 1.257a1.11 1.11 0 00-.071 1.089l.042.1c.136.341.432.589.786.658a.975.975 0 01.803.966V12.6a.86.86 0 01-.706.854.938.938 0 00-.71.648 6.281 6.281 0 01-.153.4.939.939 0 00.076.9.855.855 0 01-.085 1.083l-.908.932a.736.736 0 01-.967.081.798.798 0 00-.839-.05c-.19.097-.386.183-.585.257a.834.834 0 00-.538.641.76.76 0 01-.74.654h-1.352z"
                                                        stroke="#D9A22B"
                                                        strokeWidth={1.5}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        clipRule="evenodd"
                                                        d="M13.975 12c0 1.289-1.019 2.333-2.275 2.333S9.425 13.289 9.425 12c0-1.289 1.019-2.333 2.275-2.333s2.275 1.044 2.275 2.333z"
                                                        stroke="#D9A22B"
                                                        strokeWidth={1.5}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <p>Settings</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <button className="cursor-pointer">
                            <svg
                                fill="#D9A22B"
                                width={40}
                                height={40}
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                {...props}
                                >
                                <path
                                    d="M12.027 9.92L16 13.95 14 16l-4.075-3.976A6.465 6.465 0 016.5 13C2.91 13 0 10.083 0 6.5 0 2.91 2.917 0 6.5 0 10.09 0 13 2.917 13 6.5a6.463 6.463 0 01-.973 3.42zM1.997 6.452c0 2.48 2.014 4.5 4.5 4.5 2.48 0 4.5-2.015 4.5-4.5 0-2.48-2.015-4.5-4.5-4.5-2.48 0-4.5 2.014-4.5 4.5z"
                                    fillRule="evenodd"
                                />                                </svg>
                        </button>
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
                            {props.isDay == 0 ?
                                <>
                                    <svg
                                    width={40}
                                    height={40}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.39703 11.6315C3.39703 16.602 7.42647 20.6315 12.397 20.6315C15.6858 20.6315 18.5656 18.8664 20.1358 16.23C16.7285 17.3289 12.6922 16.7548 9.98282 14.0455C7.25201 11.3146 6.72603 7.28415 7.86703 3.89293C5.20697 5.47927 3.39703 8.38932 3.39703 11.6315ZM21.187 13.5851C22.0125 13.1021 23.255 13.6488 23 14.5706C21.7144 19.2187 17.4543 22.6315 12.397 22.6315C6.3219 22.6315 1.39703 17.7066 1.39703 11.6315C1.39703 6.58874 4.93533 2.25845 9.61528 0.999986C10.5393 0.751502 11.0645 1.99378 10.5641 2.80935C8.70026 5.84656 8.83194 10.0661 11.397 12.6312C13.9319 15.1662 18.1365 15.3702 21.187 13.5851Z"
                                    fill="#ffffff"
                                    />
                                </svg>
                                <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Night</div>
                            </>
                            : <>
                                <svg
                                    width={50}
                                    height={50}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                                    stroke="#ffffff"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Day</div>
                            </>}
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
                            <div className="pl-3 plus-jakarta-sans font-light text-3xl text-[#ffffff]">Feels Like:&nbsp;{props.feelsLike}°C</div>
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
                                <div className="w-full h-auto text-left text-[#ffffff] text-2xl pl-2 box-border">{props.humidity}%</div>
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
                                <div className="w-full h-auto text-left text-[#ffffff] text-2xl pl-2 box-border">{props.windSpeed}km/h</div>
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
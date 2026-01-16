import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6"

import ShowcaseFrame from './DescriptionBox';
import DescriptionBox from './DescriptionBox';

import DashboardScreenImg from "./assets/DashboardScreenShot.png"
import DashboardScreenImg2 from "./assets/DashboardScreenShot2.png"
import WeatherWorksLogo from "./assets/WeatherWorksLogo.png";

function LandingPage() {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <header className="w-full flex justify-center items-center pr-4">
                <nav className="w-full flex justify-between items-center">
                    <div className="w-1/4 flex justify-center items-cemter flex-wrap">
                        <img src="src\assets\Wasabi X logo.png" alt="Wasabi X logo" className="w-1/2"/>
                        <h2 className="font-iceberg text-base relative bottom-2">Wasabi X</h2>
                    </div>
                    <div className=" w-3/4 flex justify-end items-center gap-3">
                        {/* <Link to= "/dashboard" className="w-auto h-auto bg-[#D9A22B] rounded-2xl p-2 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#FBC354]
                            sm:p-4 sm:rounded-3xl xl:p-3 xl:rounded-2xl">
                            <button className="w-full h-auto text-center text-xl text-[#F2F2F2] plus-jakarta-sans font-medium
                                sm:text-3xl xl:text-2xl">Dashboard</button>
                        </Link> */}
                        <a className="text-sm font-iceberg">Features</a>
                        <a className="text-sm font-iceberg">Community</a>
                        <a className="text-sm font-iceberg">Download</a>
                        <Link to="/login" className="w-auto h-auto bg-midGreen rounded-2xl p-1 pl-2 pr-2 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#7FDEF1]
                            sm:p-4 sm:rounded-3xl xl:p-3 xl:rounded-2xl">
                            <button className="w-full h-auto text-center text-base text-offWhite font-iceberg
                                sm:text-3xl xl:text-2xl">Login</button>
                        </Link>
                    </div>
                </nav>
            </header>
                <div className="w-full h-auto flex justify-center items-center flex-col bg-lightGreen p-3 pt-10 pb-15">
                    <h1 className="text-4xl font-iceberg">CONNECT, COMMENT, CLOUD.</h1>
                    <h2 className="w-full text-3xl font-sans font-base">Your Social Weather App.</h2>
                    <h3 className="w-full text-xl font-sans font-light text-darkGreen">See the waether through everyone's eyes.</h3>
                    <img src="src\assets\Spiral graphics.png" alt="Spiral graphics" className="w-full mt-10 mb-10" />
                    <div className="flex justify-center items-center flex-col gap-2">
                        <button className="bg-darkGreen text-offWhite rounded-2xl p-1 pl-3 pr-3 text-2xl font-iceberg">Start Browsing on Web</button>
                        <p className="text-3xl text-center">OR</p>
                        <button className="bg-midGreen text-offWhite rounded-2xl p-1 pl-3 pr-3 text-2xl font-iceberg">Download for Android / iOS</button>
                    </div>
                </div>
                <div className="-mt-1 w-full flex justify-center items-center flex-wrap pl-3 pr-3 bg-gradient-to-b from-lightGreen from-50% to-midGreen to-50% gap-3">
                    <h1 className="w-full text-2xl font-iceberg">What poeple are saying: -</h1>
                    <DescriptionBox
                        icon = {<svg
                            width={50}
                            height={50}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_8_53)">
                            <path
                                d="M16 12C15.87 12.0016 15.7409 11.9778 15.62 11.93C15.4971 11.8781 15.3852 11.8035 15.29 11.7101C15.2001 11.6179 15.1287 11.5092 15.08 11.39C15.0296 11.266 15.0025 11.1338 15 11C15.0011 10.7376 15.1053 10.4863 15.29 10.3C15.3825 10.2033 15.4952 10.1282 15.62 10.0801C15.8031 10.0047 16.0044 9.98535 16.1984 10.0245C16.3924 10.0637 16.5705 10.1596 16.71 10.3C16.8947 10.4863 16.9989 10.7376 17 11C16.9975 11.1338 16.9704 11.266 16.92 11.39C16.8713 11.5092 16.7999 11.6179 16.71 11.7101C16.6166 11.8027 16.5057 11.876 16.3839 11.9258C16.2621 11.9755 16.1316 12.0007 16 12Z"
                                fill="#000000"
                            />
                            <path
                                d="M12 12C11.87 12.0016 11.7409 11.9778 11.62 11.93C11.4971 11.8781 11.3852 11.8035 11.29 11.7101C11.2001 11.6179 11.1287 11.5092 11.08 11.39C11.0296 11.266 11.0025 11.1338 11 11C11.0011 10.7376 11.1053 10.4863 11.29 10.3C11.3825 10.2033 11.4952 10.1282 11.62 10.0801C11.8031 10.0047 12.0044 9.98535 12.1984 10.0245C12.3924 10.0637 12.5705 10.1596 12.71 10.3C12.8947 10.4863 12.9989 10.7376 13 11C12.9975 11.1338 12.9704 11.266 12.92 11.39C12.8713 11.5092 12.7999 11.6179 12.71 11.7101C12.6166 11.8027 12.5057 11.876 12.3839 11.9258C12.2621 11.9755 12.1316 12.0007 12 12Z"
                                fill="#000000"
                            />
                            <path
                                d="M8 12C7.86999 12.0016 7.74091 11.9778 7.62 11.93C7.49713 11.8781 7.38519 11.8035 7.29001 11.7101C7.20006 11.6179 7.12873 11.5092 7.07999 11.39C7.0296 11.266 7.0025 11.1338 7 11C7.0011 10.7376 7.10526 10.4863 7.29001 10.3C7.3825 10.2033 7.49516 10.1282 7.62 10.0801C7.80305 10.0047 8.00435 9.98535 8.19839 10.0245C8.39244 10.0637 8.57048 10.1596 8.70999 10.3C8.89474 10.4863 8.9989 10.7376 9 11C8.9975 11.1338 8.9704 11.266 8.92001 11.39C8.87127 11.5092 8.79994 11.6179 8.70999 11.7101C8.61655 11.8027 8.50575 11.876 8.38391 11.9258C8.26207 11.9755 8.13161 12.0007 8 12Z"
                                fill="#000000"
                            />
                            </g>
                            <path
                            d="M4.99951 16.55V19.9C4.99922 20.3102 5.11905 20.7114 5.34418 21.0542C5.56931 21.397 5.88994 21.6665 6.26642 21.8292C6.6429 21.9919 7.05875 22.0408 7.46271 21.9698C7.86666 21.8989 8.24103 21.7113 8.53955 21.4301L11.1495 18.9701H12.0195C17.5395 18.9701 22.0195 15.1701 22.0195 10.4701C22.0195 5.77009 17.5395 1.97009 12.0195 1.97009C6.49953 1.97009 2.01953 5.78009 2.01953 10.4701C2.042 11.6389 2.32261 12.7882 2.84125 13.8358C3.35989 14.8835 4.10373 15.8035 5.01953 16.53L4.99951 16.55Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                            <defs>
                            <clipPath id="clip0_8_53">
                                <rect width={10} height={2} fill="white" transform="translate(7 10)" />
                            </clipPath>
                            </defs>
                            </svg>} 
                        heading = "Community Forecasts"
                        description = "Real-time weather insights from people right where you are."
                    />
                    <DescriptionBox
                        icon = {<svg
                            fill="#000000"
                            width={50}
                            height={50}
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z" />
                        </svg>}
                        heading = "Local Updates"
                        description = "Hyper-local weather alerts tailored to your exact neighborhood." 
                    />
                    <DescriptionBox
                    icon = {<svg
                            fill="#000000"
                            width={50}
                            height={50}
                            viewBox="-1.5 -2.5 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMinYMin"
                            className="jam jam-refresh-reverse"
                        >
                            <path d="M4.859 5.308l1.594-.488a1 1 0 0 1 .585 1.913l-3.825 1.17a1 1 0 0 1-1.249-.665L.794 3.413a1 1 0 1 1 1.913-.585l.44 1.441C5.555.56 10.332-1.035 14.573.703a9.381 9.381 0 0 1 5.38 5.831 1 1 0 1 1-1.905.608A7.381 7.381 0 0 0 4.86 5.308zm12.327 8.195l-1.775.443a1 1 0 1 1-.484-1.94l3.643-.909a.997.997 0 0 1 .61-.08 1 1 0 0 1 .84.75l.968 3.88a1 1 0 0 1-1.94.484l-.33-1.322a9.381 9.381 0 0 1-16.384-1.796l-.26-.634a1 1 0 1 1 1.851-.758l.26.633a7.381 7.381 0 0 0 13.001 1.25z" />
                        </svg>}
                    heading = "Share & Discover"
                    description = "Leave comments on the current forecast, and discover new places through the eyes of others."
                />
                </div>
                <div className="-mt-1 w-full h-auto flex justify-center items-center flex-col bg-midGreen p-3 gap-3
                    sm:p-5">
                        
                </div>

            <footer className="w-full bg-[#00000045] flex itmes-center flex-wrap rounded-2xl p-3">
                <div className="w-auto flex items-center flex-wrap gap-1 mb-5">
                    <h2 className="w-full text-xl text-[#000000] font-medium
                        sm:text-2xl">Credits: -</h2>
                    <p className="w-auto h-auto text-2xl text-[#000000] font-bold
                        sm:text-3xl">LastShadow</p>
                    <nav className="w-auto h-auto ml-3">
                        <a href="https://github.com/Abdul-Rafea" target="_blank" rel="noopener noreferrer" className="text-3xl text-[#000000] text-center
                            sm:text-5xl">
                            <FaGithub />
                        </a>
                    </nav>
                </div>
                <div className="w-auto h-auto flex items-center flex-wrap gap-1 mb-5">
                    <h2 className="w-full h-auto text-xl text-[#000000] font-medium mb-2
                        sm:text-2xl">Feedback/Support: -</h2>
                    <p className="w-auto h-auto text-xl text-[#000000] font-bold
                        sm:text-3xl">abdulrafea97@gmail.com</p>
                </div>

                <div className="w-full h-1 bg-[#1C8EA3] rounded-full
                    sm:h-2 ml-3 mr-3"></div>
                <div className="w-full h-auto flex items-center flex-wrap">
                    <img src={WeatherWorksLogo} alt="WeatherWorks Logo" className="w-1/4 h-auto
                        sm:w-1/5 xl:w-5/50"/>
                    <p className="w-full h-auto text-xl text-[#000000] font-medium ml-2
                    sm:text-2xl">&copy; 2026 WeatherWorks, All rights reserved</p>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage;
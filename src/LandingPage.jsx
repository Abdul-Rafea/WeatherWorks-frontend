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
            <header className="w-full flex justify-center items-center pt-1 pb-1 sm:pb-2">
                <nav className="w-full flex justify-between items-center">
                    <div className="w-1/4 grid grid-rows-auto place-items-center xl:w-1/8">
                        <img src="src\assets\Wasabi X logo.png" alt="Wasabi X logo" className="w-1/2 row-span-1"/>
                        <h2 className="font-iceberg text-base row-span-1 -mt-1
                            sm:text-xl sm:bottom-5">Wasabi X</h2>
                    </div>
                    <div className="flex justify-end items-center gap-3 mr-3 sm:gap-7">
                        <a className="text-sm font-iceberg sm:text-lg">Features</a>
                        <a className="text-sm font-iceberg sm:text-lg">Community</a>
                        <a className="text-sm font-iceberg sm:text-lg">Download</a>
                        <Link className="w-auto h-auto bg-midGreen rounded-3xl p-1 pl-2 pr-2 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#7FDEF1]
                            sm:p-3">
                            <button className="w-full h-auto text-center text-sm text-offWhite font-iceberg
                                sm:text-xl xl:text-2xl">Login</button>
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="w-full flex justify-center items-center flex-col flex-wrap bg-lightGreen p-3 pt-10 pb-15 xl:flex-row">
                <div className="flex-justify-center items-center flex-col">
                    <h1 className="w-full text-4xl font-iceberg text-wrap sm:text-5xl xl">CONNECT, COMMENT, CLOUD.</h1>
                    <h2 className="w-full text-3xl font-sans font-base sm:text-4xl">Your Social Weather App.</h2>
                    <h3 className="w-full text-xl font-sans font-light text-darkGreen sm:text-2xl">See the waether through everyone's eyes.</h3>
                </div>
                <img src="src\assets\Spiral graphics.png" alt="Spiral graphics" className="w-full mt-10 mb-10 sm:w-2/3 xl:w-1/3" />
                <div className="flex justify-center items-center flex-col gap-2">
                    <button className="bg-darkGreen text-offWhite rounded-3xl p-1 pl-3 pr-3 text-2xl font-iceberg sm:text-3xl sm:p-2 sm:pl-4 sm:pr-4">Start Browsing on Web</button>
                    <p className="text-3xl text-center font-iceberg sm:text-">OR</p>
                    <button className="bg-midGreen text-offWhite rounded-3xl p-1 pl-3 pr-3 text-2xl font-iceberg sm:text-3xl sm:p-2 sm:pl-4 sm:pr-4">Download for Android / iOS</button>
                </div>
            </div>
            <div className="-mt-1 w-full flex justify-center items-center flex-wrap pl-3 pb-2 pr-3 bg-gradient-to-b from-lightGreen from-50% to-midGreen to-50% gap-3">
                <h1 className="w-full text-2xl font-iceberg sm:text-3xl">What poeple are saying: -</h1>
                <DescriptionBox
                    icon = {<svg
                        fill="#000000"
                        width={50}
                        height={50}
                        viewBox="0 0 32 32"
                        id="icon"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                        <style
                            dangerouslySetInnerHTML={{
                            __html: "\n      .cls-1 {\n        fill: none;\n      }\n    "
                            }}
                        />
                        </defs>
                        <path d="M28.2261,22.812a13.9664,13.9664,0,0,0,0-13.624L28.4141,9a2.0021,2.0021,0,0,0,0-2.8281l-2.5857-2.586a2.0028,2.0028,0,0,0-2.8284,0l-.1877.1875a13.9687,13.9687,0,0,0-13.6243,0L9,3.5859a2.0024,2.0024,0,0,0-2.8284,0L3.5859,6.1719A2.0021,2.0021,0,0,0,3.5859,9l.1878.1875a13.97,13.97,0,0,0,0,13.625L3.5859,23a2.0021,2.0021,0,0,0,0,2.8281l2.5857,2.586a2.0021,2.0021,0,0,0,2.8284,0l.188-.188a13.9687,13.9687,0,0,0,13.6243.0005L23,28.4141a2.0021,2.0021,0,0,0,2.8284,0l2.5857-2.586a2.0021,2.0021,0,0,0,0-2.8281ZM28,16a11.973,11.973,0,0,1-1.2546,5.3315l-3.8948-3.895a6.9808,6.9808,0,0,0,0-2.873l3.8948-3.895A11.973,11.973,0,0,1,28,16ZM27,7.5859l-4.9346,4.9346A7.0434,7.0434,0,0,0,19.48,9.9346L24.4143,5ZM16,21a5,5,0,1,1,5-5A5.0057,5.0057,0,0,1,16,21ZM21.3154,5.2705,17.4365,9.1494a6.9808,6.9808,0,0,0-2.873,0L10.6846,5.2705A12.2484,12.2484,0,0,1,21.3154,5.2705ZM7.5859,5l4.9346,4.9346a7.0449,7.0449,0,0,0-2.5859,2.5859L5,7.5859ZM4,16a11.9716,11.9716,0,0,1,1.2546-5.3311l3.8948,3.8946a6.9808,6.9808,0,0,0,0,2.873L5.2546,21.3311A11.9716,11.9716,0,0,1,4,16ZM7.5857,27,5,24.4141,9.9346,19.48a7.0434,7.0434,0,0,0,2.5859,2.5859Zm3.0989-.27,3.8789-3.8789a6.9808,6.9808,0,0,0,2.873,0L21.3154,26.73A12.2484,12.2484,0,0,1,10.6846,26.73Zm13.73.27L19.48,22.0654A7.0449,7.0449,0,0,0,22.0654,19.48L27,24.4141Z" />
                        <rect
                        id="_Transparent_Rectangle_"
                        data-name="<Transparent Rectangle>"
                        className="cls-1"
                        width={32}
                        height={32}
                        />
                    </svg>}
                    color = "grey"
                    heading = "The Commuter's Lifesaver" 
                    heading2 = "No more suprise rain!"
                    description = "I was about to leave for work, but a neighbor's comment on Wasabi X warned me about a sudden downpour two blocks away"
                />     
                <DescriptionBox
                    icon = {<svg
                        width={50}
                        height={50}
                        viewBox="-22.02 0 186.194 186.194"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g
                        id="Group_3294"
                        data-name="Group 3294"
                        transform="translate(-1105.783 -70.864)"
                        >
                        <path
                            id="Path_1749"
                            data-name="Path 1749"
                            d="M1164.19,212.059v40.5a2,2,0,0,0,2,2h21.333a2,2,0,0,0,2-2v-40.5"
                            fill="none"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <path
                            id="Path_1750"
                            data-name="Path 1750"
                            d="M1244.71,209.049l-27.455-20.532a1.671,1.671,0,0,1,1-3.01h12.809a1.672,1.672,0,0,0,1.068-2.958l-24.855-20.638a1.672,1.672,0,0,1,1.068-2.958H1218.5a1.672,1.672,0,0,0,1.157-2.878l-21.67-20.8a1.672,1.672,0,0,1,1.157-2.878h6.888a1.672,1.672,0,0,0,1.281-2.746l-17.666-21.061a1.672,1.672,0,0,1,1.281-2.746h2.754a1.672,1.672,0,0,0,1.448-2.507L1178.307,74.2a1.672,1.672,0,0,0-2.9,0l-16.823,29.139a1.672,1.672,0,0,0,1.448,2.507h2.754a1.672,1.672,0,0,1,1.281,2.746l-17.666,21.061a1.672,1.672,0,0,0,1.281,2.746h6.888a1.672,1.672,0,0,1,1.157,2.878l-21.67,20.8a1.672,1.672,0,0,0,1.157,2.878h10.154a1.672,1.672,0,0,1,1.068,2.958l-24.855,20.638a1.672,1.672,0,0,0,1.068,2.958h12.809a1.671,1.671,0,0,1,1,3.01l-27.455,20.532a1.672,1.672,0,0,0,1,3.01h133.7A1.67,1.67,0,0,0,1244.71,209.049Z"
                            fill="#E7E7E7"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_110"
                            data-name="Line 110"
                            x1="6.37"
                            y2="7.597"
                            transform="translate(1165.57 119.124)"
                            fill="#E7E7E7"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_111"
                            data-name="Line 111"
                            x1="6.04"
                            y1="10.458"
                            transform="translate(1177.52 88.77)"
                            fill="#E7E7E7"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_112"
                            data-name="Line 112"
                            x1="14.1"
                            y1="10.551"
                            transform="translate(1188.16 191.756)"
                            fill="#E7E7E7"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_113"
                            data-name="Line 113"
                            x1="12.22"
                            y2="10.148"
                            transform="translate(1156.46 169.189)"
                            fill="#E7E7E7"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_114"
                            data-name="Line 114"
                            x1="24.88"
                            y2="18.604"
                            transform="translate(1140.57 185.506)"
                            fill="#E7E7E7"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_115"
                            data-name="Line 115"
                            x1="9.92"
                            y1="11.832"
                            transform="translate(1175.58 113.483)"
                            fill="#E7E7E7"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_116"
                            data-name="Line 116"
                            x1="17.36"
                            y2="16.653"
                            transform="translate(1163.9 137.35)"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_117"
                            data-name="Line 117"
                            x1="31.98"
                            y1="26.553"
                            transform="translate(1175.58 158.953)"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_118"
                            data-name="Line 118"
                            y1="42.498"
                            transform="translate(1172.19 212.059)"
                            fill="none"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_119"
                            data-name="Line 119"
                            y1="16.267"
                            transform="translate(1181.19 238.29)"
                            fill="none"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        <line
                            id="Line_120"
                            data-name="Line 120"
                            y1="19.957"
                            transform="translate(1181.19 212.059)"
                            fill="none"
                            stroke="#000000"
                            strokeMiterlimit={10}
                            strokeWidth={5}
                        />
                        </g>
                        </svg>}
                    color = "grey"
                    heading = "The Outdoor Enthusiast"
                    heading2 = "Perfect for hiking plans"
                    description = "Generic apps said it was sunny, but the local Wasabi community shared photos of a thick fog at the trailhead"
                />  
                <DescriptionBox
                    icon = {<svg
                        width={50}
                        height={50}
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path d="M640 608h-64V416h64v192zm0 160v160a32 32 0 01-32 32H416a32 32 0 01-32-32V768h64v128h128V768h64zM384 608V416h64v192h-64zm256-352h-64V128H448v128h-64V96a32 32 0 0132-32h192a32 32 0 0132 32v160z" />
                        <path d="M220.8 256l-71.232 80 71.168 80H768V256H220.8zm-14.4-64H800a32 32 0 0132 32v224a32 32 0 01-32 32H206.4a32 32 0 01-23.936-10.752l-99.584-112a32 32 0 010-42.496l99.584-112A32 32 0 01206.4 192zm678.784 496l-71.104 80H266.816V608h547.2l71.168 80zm-56.768-144H234.88a32 32 0 00-32 32v224a32 32 0 0032 32h593.6a32 32 0 0023.936-10.752l99.584-112a32 32 0 000-42.496l-99.584-112A32 32 0 00828.48 544z" />
                        </svg>}
                    color = "grey"
                    heading = "The Local Guide"
                    heading2 = "Finally, a weather app that talks back"
                    description = "I love being able to ask if the local park is too windy for a picnic and getting a reply from someone actually sitting there right now. It's brilliant"
                />
            </div>
            <div className="-mt-1 w-full h-auto flex justify-center items-center flex-col flex-wrap bg-midGreen p-3 gap-3 pt-10 sm:p-5 xl:flex-row">
                 <h1 className="w-full text-2xl text-offWhite font-iceberg sm:text-3xl">Dive Deeper Into Features: -</h1>
                <DescriptionBox
                icon = {<svg
                    width={50}
                    height={50}
                    viewBox="0 0 24 24"                        fill="none"
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
                    color = "offWhite"
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
                    color = "offWhite"
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
                color = "offWhite"
                heading = "Share & Discover"
                description = "Leave comments on the current forecast, and discover new places through the eyes of others."
                />
            </div>
            <footer className="w-full bg-lightGreen flex justify-center items-center flex-wrap gap-3 p-3">
                <h1 className="text-2xl text-center font-iceberg sm:text-3xl">Get it on: -</h1>
                <div className="w-full flex justify-center items-center flex-wrap gap-5">
                    <button className="w-1/2 flex justify-center items-center bg-midGreen p-2 rounded-3xl gap-2 sm:w-1/3 xl:w-1/4">
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
                            d="M15.939.186a1 1 0 011.137.796c.197 1.332.25 2.721-.18 4.016.336.038.691.118 1.065.251 1.705.608 2.716 1.974 3.288 3.362A1 1 0 0120.2 9.985c-1.36-.171-2.2 1.304-2.2 2.487 0 1.194.862 2.686 2.234 2.483a1 1 0 011.089 1.324c-.919 2.59-2.71 5.09-4.81 6.345a2.361 2.361 0 01-1.82.276c-.465-.112-.888-.34-1.303-.567-.591-.324-.972-.511-1.39-.511-.418 0-.799.187-1.39.51-.415.229-.838.456-1.303.568a2.36 2.36 0 01-1.82-.276c-1.539-.92-2.9-2.5-3.871-4.262C2.64 16.595 2 14.543 2 12.615c0-1.13.184-2.634.755-4.014.573-1.385 1.583-2.746 3.284-3.353 1.972-.704 3.408.082 4.4.709.013-.952.172-2.265.897-3.3C12.34 1.223 14.251.451 15.94.185zM6.71 7.133c1.157-.413 1.898.027 2.91.676.722.464 1.49.932 2.379.932s1.657-.468 2.379-.932c1.012-.65 1.753-1.089 2.91-.676.584.208 1.06.577 1.442 1.065C17.078 8.81 16 10.585 16 12.472c0 1.963 1.167 3.806 2.934 4.343-.863 1.782-2.934 3.977-3.447 4.092-.398.09-.844-.168-1.136-.328-.734-.403-1.496-.758-2.351-.758-.972 0-1.768.437-2.294.727-.312.17-.823.58-1.193.36-1.151-.69-2.291-1.963-3.146-3.513C4.514 15.85 4 14.13 4 12.615c0-.947.159-2.176.603-3.249C5.045 8.3 5.72 7.486 6.71 7.133zm7.978-2.128c-.51.729-1.423 1.117-2.245 1.382-.032-.863.02-1.854.53-2.583.51-.728 1.424-1.117 2.246-1.382.032.863-.02 1.854-.53 2.583z"
                            className="fill-offWhite"
                        />
                        </svg>
                        <h2 className="text-lg text-offWhite font-iceberg sm:text-xl">iOS</h2>
                    </button>
                    <button className="w-1/2 bg-midGreen p-2 rounded-3xl flex justify-center items-center gap-2 sm:w-1/3 xl:w-1/4">
                        <svg
                            width={40}
                            height={40}
                            viewBox="0 0 192 192"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                        <path d="M0 0h192v192H0z" fill="none" />
                        <path
                            d="M156.84 109.93L54.96 167.87c-10.68 6.07-23.94-1.64-23.94-13.93V38.06c0-12.29 13.26-20 23.94-13.93l101.88 57.94c10.8 6.14 10.8 21.71 0 27.85z"
                            strokeMiterlimit={10}
                            strokeWidth="12px"
                            fill="none"
                            className="stroke-offWhite"
                        />
                        <path
                            d="M35 33l88 90m-88 34.61L124 67"
                            fill="none"
                            strokeLinecap="round"
                            strokeMiterlimit={10}
                            strokeWidth="12px"
                            className="stroke-offWhite"
                        />
                        </svg>
                        <h2 className="text-lg text-offWhite font-iceberg text-xl">Google Play</h2>
                    </button>
                    <button className="w-1/2 bg-darkGreen p-2 rounded-3xl flex justify-center items-center gap-2 sm:w-1/3 xl:w-1/4">
                            <svg
                                width={40}
                                height={40}
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-offWhite"
                                >
                                <path d="M0 15.656v-.031C.281 12 1.594 9.281 3.875 7.562c2.25-1.75 4.688-2.594 7.344-2.594 2.781-.031 5.375.906 7.688 2.781 2.344 1.844 3.5 4.594 3.5 8.156v.219c0 3.594-1.156 6.281-3.5 8.125-2.344 1.875-4.938 2.813-7.719 2.813h-.125c-2.719-.031-5.219-.969-7.531-2.844-2.313-1.844-3.5-4.688-3.531-8.563zm10.531-4.906V5.812h-.75c-.156.188-.281.406-.406.594S9.125 6.781 9 7a6.796 6.796 0 00-.375.625 3.595 3.595 0 00-.313.594 8.406 8.406 0 00-.469.906 6.164 6.164 0 00-.375.813c.188.125.406.281.656.375.281.094.563.188.844.25.313.063.594.094.844.125.281.031.531.063.719.063zm1.313-4.937v4.906c.156 0 .344.031.531 0 .188 0 .406-.031.594-.063.344-.063.75-.156 1.063-.25.344-.125.656-.281.875-.469-.375-.906-.781-1.625-1.188-2.313s-.875-1.281-1.375-1.781v-.031h-.5zm-3.375.281v-.031c-.219.094-.438.25-.688.344-.219.094-.5.219-.719.344-.438.219-.875.469-1.313.75-.406.281-.813.594-1.156.906.125.125.281.25.406.344s.281.219.438.344c.125.063.281.156.438.281.156.094.344.219.531.344.25-.563.5-1.156.813-1.688.313-.563.656-1.094 1-1.563a.66.66 0 01.125-.188c.031-.031.063-.125.125-.188zm9.562 2.312v-.031c-.781-.594-1.469-1.094-2.156-1.406s-1.375-.625-2-.875c.5.5.938 1.125 1.219 1.719.313.625.625 1.281.875 1.906.125-.063.281-.125.469-.25.156-.094.375-.188.563-.281.188-.125.344-.25.531-.375.188-.156.375-.281.5-.406zm-.531 6.969h3.594c0-1.156-.25-2.25-.719-3.375a8.173 8.173 0 00-1.844-2.781v-.031c-.156.25-.375.469-.594.625-.25.156-.469.281-.719.406-.156.094-.313.219-.469.281-.156.094-.375.156-.531.25.125.25.25.531.375.781.094.281.25.594.313.875.188.5.313 1.031.438 1.563.094.469.156.969.156 1.406zM6.188 10.75v-.031c-.25-.125-.531-.219-.75-.344-.219-.156-.438-.313-.625-.438-.188-.094-.375-.219-.531-.344s-.281-.25-.406-.375c-.813.781-1.406 1.656-1.781 2.688a12.894 12.894 0 00-.813 3.438h3.844c0-.875.125-1.719.344-2.563a8.35 8.35 0 01.719-2.031zm4.343 4.594V11.75c-.25.031-.563.031-.844 0a4.224 4.224 0 01-.906-.219c-.25-.063-.563-.125-.813-.219a2.926 2.926 0 01-.781-.313 5.006 5.006 0 00-.469 1.094c-.156.375-.25.781-.344 1.156-.063.375-.094.781-.125 1.125s-.063.688-.063.969h4.344zm1.313-3.531v3.531h4.625c0-.188 0-.406-.031-.656-.063-.219-.094-.5-.125-.75-.094-.375-.188-.781-.313-1.156-.125-.344-.25-.688-.406-.969-.063-.156-.125-.344-.188-.469-.094-.156-.188-.25-.25-.344-.344.25-.813.406-1.375.531-.531.125-1.156.25-1.719.281h-.219zm-6.719 4.562H1.281c0 .531.094 1.125.25 1.844.156.75.469 1.438.813 2.188.156.375.344.75.531 1.125.219.344.469.719.719 1.063.188-.125.375-.219.531-.313.188-.094.406-.219.594-.313.219-.094.438-.188.688-.313.219-.094.5-.219.781-.344-.25-.781-.531-1.531-.719-2.375a9.515 9.515 0 01-.344-2.531v-.031zm5.406 3.656v-3.656H6.187c0 .25.031.625.094 1 .031.375.125.781.188 1.188.125.438.219.875.344 1.25s.25.688.375.969a12.9 12.9 0 011.5-.469c.406-.125.781-.219 1.156-.25h.344c.125-.031.25-.031.344-.031zm1.313-3.656V20c.219.031.469.063.719.094.281.031.625.094.906.156l.469.094c.156.063.344.094.5.125.188.063.375.094.563.156.156.063.313.094.438.156.406-1.031.656-1.875.813-2.594a8.103 8.103 0 00.219-1.781v-.031h-4.625zm9.25.031v-.031H17.5v.188a17.383 17.383 0 01-.25 2c-.125.688-.406 1.5-.781 2.5.5.25.969.5 1.344.75s.719.531.969.781c.531-.531 1-1.25 1.406-2.188.406-.906.688-1.844.844-2.844.031-.188.031-.375.063-.563v-.594zm-10.563 9.5v-4.875c-.781.125-1.438.281-1.938.406s-.875.25-1.125.375c.188.469.375.875.563 1.25.188.344.406.719.594 1.031.063.125.188.25.281.406.094.125.156.281.25.406.094.156.188.344.281.531.125.156.219.344.344.469h.75zm1.313 0h.719c.281-.219.563-.531.781-.875.25-.344.531-.75.719-1.094.219-.406.438-.781.625-1.156s.344-.719.469-.969c-.344-.125-.813-.25-1.281-.375s-1.125-.25-2.031-.375v4.844zm6.187-2.562v-.031c-.063-.094-.188-.219-.281-.313s-.25-.219-.406-.313c-.125-.094-.281-.188-.469-.281s-.438-.219-.656-.344c-.125.25-.344.688-.656 1.281-.281.594-.781 1.313-1.406 2.094a5.818 5.818 0 002.094-.781 6.924 6.924 0 001.781-1.313zm-11.625-1v-.031c-.219.125-.563.281-.906.438a6.746 6.746 0 00-1.156.594c.219.188.438.375.625.5.188.156.406.281.594.406.344.219.75.438 1.156.625s.906.375 1.531.563c-.219-.25-.375-.563-.531-.813s-.344-.5-.5-.75-.281-.531-.406-.781c-.156-.25-.281-.5-.406-.75z" />
                                </svg>
                        <h2 className="text-lg text-offWhite font-iceberg text-xl">Web</h2>
                    </button>
                </div>
                <div className="w-9/10 h-1 bg-darkGreen mt-5 mb-5"></div>
                <div className="w-full flex justify-start items-center gap-5">
                    <img src="src\assets\Wasabi X logo.png" alt="wasabi X logo" className="w-1/5 sm:w-1/7 xl:w-1/11" />
                    <div>
                        <h3 className="text-xl sm:text-2xl">&copy;Wasabi X</h3>
                        <h3 className="text-xl sm:text-2xl">All rights reserved.</h3>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage;
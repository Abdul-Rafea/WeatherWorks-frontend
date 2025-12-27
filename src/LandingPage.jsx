import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6"

import ShowcaseFrame from './LandingPageShowcase';

import DashboardScreenImg from "./assets/DashboardScreenShot.png"
import DashboardScreenImg2 from "./assets/DashboardScreenShot2.png"
import WeatherWorksLogo from "./assets/WeatherWorksLogo.png";

function LandingPage() {
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-2 pb-0">
            <header className="w-full h-auto flex justify-center items-center">
                <nav className="w-full h-auto flex justify-between items-center">
                    <Link to= "/dashboard" className="w-auto h-auto bg-[#D9A22B] rounded-3xl p-3 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#FBC354]
                        sm:p-5 xl:p-4">
                        <button className="w-full h-auto text-center text-xl text-[#F2F2F2] plus-jakarta-sans font-medium
                            sm:text-3xl xl:text-2xl">Dashboard</button>
                    </Link>
                    <div className="w-auto h-auto flex justify-center itmes-center gap-2">
                        <Link to="/signup" className="w-auto h-auto bg-[#1C8EA3] rounded-3xl p-3 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#7FDEF1]
                            sm:p-5 xl:p-4">
                            <button className="w-full h-auto text-center text-xl text-[#F2F2F2] plus-jakarta-sans font-medium
                                sm:text-3xl xl:text-2xl">Sign Up</button>
                        </Link>
                        <Link to="/Login" className="w-auto h-auto bg-[#00000045] rounded-3xl p-3 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#FBFDF8]\
                            sm:p-5 xl:p-4">
                            <button className="w-full h-auto text-center text-xl text-[#000000] plus-jakarta-sans font-medium
                                sm:text-3xl xl:text-2xl">Login</button>
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="w-full h-auto flex justify-center items-center flex-col bg-[#00000045] rounded-3xl p-3 pb-15 gap-10">
                <div className="w-9/10 h-auto flex justify-center items-center gap-5">
                    <img src={WeatherWorksLogo} className="w-1/4 h-full
                        xl:w-1/13" alt="WeatherWorks Logo" />
                    <h1 className="text-center text-[#000000] text-3xl font-semibold ml-2
                        sm:text-5xl xl:text-3xl">Welcome to WeatherWorks</h1>
                </div>
                <div className="flex items-center flex-wrap justify-center gap-15
                    xl:flex-nowrap xl:pl-25">
                    <div className="w-2/3 h-auto relative sm:w-13/30
                        xl:w-1/5">
                        <img src={DashboardScreenImg} alt="Dashboard Screen Image" className="w-full h-auto rounded-2xl relative z-2 right-5 rotate-353 transition duration-300 ease-in-out hover:scale-110
                            sm:rotate-345"/>
                        <img src={DashboardScreenImg2} alt="Dashboard Screen Image" className="w-full h-auto rounded-2xl absolute z-1 top-0 left-5 rotate-7 hover:z-3 transition duration-300 ease-in-out hover:scale-110
                            sm:rotate-15"/>
                    </div>
                    <div className="flex justify-center items-center flex-wrap gap-5
                        xl:w-4/5">
                        <p className=" w-full text-center text-wrap plus-jakarta-sans font-medium text-2xl text-[#000000]
                            sm:text-4xl xl:text-2xl">Weatherworks is a weather application with social features to help understand weather conditions from community-based insights provided by its users.</p>
                        <Link className="bg-[#1C8EA3] rounded-3xl p-3 mb-5 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#7FDEF1]
                            sm:p-4 xl:p-3">
                            <button className="w-auto h-autotext-center text-2xl text-[#F2F2F2] plus-jakarta-sans font-medium
                                sm:text-4xl xl:text-2xl">Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto flex justify-center items-center flex-col bg-[#00000045] rounded-3xl p-3 gap-3
                sm:p-5">
                <ShowcaseFrame img= {DashboardScreenImg} heading= "Real-Time Data" description= "WeatherWorks uses the WeatherAPI which provides real-time data ensuring the data is accurate atall times" hr= {true} />
                <ShowcaseFrame img= {DashboardScreenImg2} heading= "Social Connectivity" description= "WeatherWorks social feature allows you to leave a comment on the currnet weather you are looking at, this comments stays there for 24hrs" hr= {true} />
                <ShowcaseFrame img= {DashboardScreenImg} heading= "Customization / Accessibility" description= "WeatherWorks enables the user to change username, metric units, pin weathers for quicker accesss, etc with ease" hr={false} />
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
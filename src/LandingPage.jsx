import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6"
import DashboardScreenImg from "./assets/DashboardScreenShot.png"
import DashboardScreenImg2 from "./assets/DashboardScreenShot2.png"
import WeatherWorksLogo from "./assets/WeatherWorksLogo.png";

function LandingPage() {
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-2 p-1 pb-0">
            <header className="w-full h-auto flex justify-center items-center">
                <nav className="w-full h-auto flex justify-between items-center">
                    <Link to= "/dashboard" className="w-auto h-auto bg-[#FBC354] rounded-3xl p-3 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#D9A22B]">
                        <button className="w-full h-auto text-center text-xl text-[#000000] plus-jakarta-sans font-medium">Dashboard</button>
                    </Link>
                    <div className="w-auto h-auto flex justify-center itmes-center gap-2">
                        <Link to="/SignUp" className="w-auto h-auto bg-[#7FDEF1] rounded-3xl p-3 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#3AABBF]">
                            <button className="w-full h-auto text-center text-xl text-[#000000] plus-jakarta-sans font-medium">Sign Up</button>
                        </Link>
                        <Link to="/Login" className="w-auto h-auto bg-[#FBFDF8] rounded-3xl p-3 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#B6B6B6]">
                            <button className="w-full h-auto text-center text-xl text-[#000000] plus-jakarta-sans font-medium">Login</button>
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="w-full h-auto flex justify-center items-center flex-col bg-[#00000045] rounded-3xl p-3 gap-3">
                <div className="w-full h-auto flex justify-center items-center mb-2">
                    <img src={WeatherWorksLogo} className="w-1/4 h-full" alt="WeatherWorks Logo" />
                    <h1 className="w-auto h-auto text-center text-[#000000] text-3xl font-semibold ml-2">Welcome to WeatherWorks</h1>
                </div>
                <div className="w-2/3 h-auto relative">
                    <img src={DashboardScreenImg} alt="Dashboard Screen Image" className="w-full h-auto rounded-2xl relative z-2 right-5 rotate-353 transition duration-300 ease-in-out hover:scale-110"/>
                    <img src={DashboardScreenImg2} alt="Dashboard Screen Image" className="w-full h-auto rounded-2xl absolute z-1 top-0 left-5 rotate-7 hover:z-3 transition duration-300 ease-in-out hover:scale-110"/>
                </div>
                <p className="text-center text-wrap plus-jakarta-sans font-medium text-2xl text-[#000000]">Weatherworks is a weather application with social features to help understand weather conditions from community-based insights provided by its users.</p>
                <Link className="w-auto h-auto bg-[#7FDEF1] rounded-3xl p-3 shadow-[2px_4px_5px_0_#00000040] cursor-pointer hover:bg-[#3AABBF]">
                    <button className="w-auto h-auto text-center text-2xl text-[#000000] plus-jakarta-sans font-medium">Get Started</button>
                </Link>
            </div>
            <div className="w-full h-auto flex justify-center items-center flex-col bg-[#00000045] rounded-3xl p-3 gap-3">
                <div className="w-full h-auto flex justify-center items-center flex-wrap gap-2 mb-2">
                    <h2 className="w-full h-auto text-center text-[#] text-3xl font-semibold">Real-time Accuracy</h2>
                    <div className="w-full h-auto flex justify-center items-center">
                        <img src={DashboardScreenImg} alt="Dashboard Screen Image" className="w-1/3 h-auto rounded-xl"></img>
                            <p className=" w-2/3 h-auto plus-jakarta-sans font-medium text-2xl text-[#000000] ml-2">WeatherWorks uses the WeatherAPI which provides real-time data ensuring the data is accurate atall times</p>
                    </div>
                </div>
                <div className="w-9/10 h-1 bg-[#7FDEF1] rounded-full"></div>
                <div className="w-full h-auto flex justify-center items-center flex-wrap gap-1 mb-2">
                    <h2 className="w-full h-auto text-center text-[#000000] text-3xl font-semibold">Social Connectivity</h2>
                    <div className="w-full h-auto flex justify-center items-center">
                        <img src={DashboardScreenImg} alt="Dashboard Screen Image" className="w-1/3 h-auto rounded-xl"></img>
                            <p className=" w-2/3 h-auto plus-jakarta-sans font-medium text-2xl text-[#000000] ml-2">WeatherWorks social feature allows you to leave a comment on the currnet weather you are looking at, this comments stays there for 24hrs</p>
                    </div>
                </div>
                <div className="w-9/10 h-1 bg-[#7FDEF1] rounded-full"></div>
                <div className="w-full h-auto flex justify-center items-center flex-wrap gap-1 mb-2">
                    <h2 className="w-full h-auto text-center text-wrap text-[#000000] text-3xl font-semibold">Customization and Accessibility</h2>
                    <div className="w-full h-auto flex justify-center items-center">
                        <img src={DashboardScreenImg} alt="Dashboard Screen Image" className="w-1/3 h-auto rounded-xl"></img>
                        <p className=" w-2/3 h-auto plus-jakarta-sans font-medium text-2xl text-[#000000] ml-2">WeatherWorks enables the user to change username, metric units, pin weathers for quicker accesss, etc with ease</p>
                    </div>
                </div>
            </div>

            <footer className="w-full h-auto bg-[#00000045] flex itmes-center flex-wrap rounded-2xl p-3">
                <div className="w-auto h-auto flex items-center flex-wrap mb-5">
                    <h2 className="w-full h-auto text-xl text-[#000000] font-medium mb-2">Credits: -</h2>
                    <p className="w-auto h-auto text-2xl text-[#000000] font-bold ">LastShadow</p>
                    <nav className="w-auto h-auto ml-3">
                        <a href="https://github.com/Abdul-Rafea" target="_blank" rel="noopener noreferrer" className="text-3xl text-[#000000] text-center">
                            <FaGithub />
                        </a>
                    </nav>
                </div>
                <div className="w-auto h-auto flex items-center flex-wrap mb-5">
                    <h2 className="w-full h-auto text-xl text-[#000000] font-medium mb-2">Feedback/Support: -</h2>
                    <p className="w-auto h-auto text-xl text-[#000000] font-bold ">abdulrafea97@gmail.com</p>
                </div>

                <div className="w-9/10 h-1 bg-[#7FDEF1] rounded-full"></div>
                <div className="w-full h-auto flex items-center flex-wrap">
                    <img src={WeatherWorksLogo} alt="WeatherWorks Logo" className="w-1/4 h-auto"/>
                    <p className="w-full h-auto text-xl text-[#000000] font-medium ml-2">&copy; 2026 WeatherWorks, All rights reserved</p>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage;
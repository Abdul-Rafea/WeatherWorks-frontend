import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6";
import { WeatherContext } from './WeatherContext';

//shadcn components: -
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

//lucide components: -
import { 
    ArrowUpRightIcon,
    LogOut,
    Menu,
    X,
} from "lucide-react";


//main components: -
import WasabiX_Logo from "./assets/WasabiX_Logo.webp";
import { useMediaQuery } from './useMediaQuery';
import testImage from "./assets/Default_Profile_Pic.jpg";
import CommentFrame from "./CommentFrame.jsx";
import DefaultProfilePic from "./assets/Default_Profile_Pic.jpg";
import Header from './Header';

function LandingPage() {
    const navigate = useNavigate();

    const {
        isLoading,
        isLoggedIn,
        globalAvatar, setGlobalAvatar,
        setGlovbalUsername,
        setIsLoggedIn,
        setShowNotification,
        setNotificationMsg,
        setNotificationError
    } = useContext(WeatherContext);
    
    const [menuOpen, setMenuOpen] = useState(false);
    let isMobile = useMediaQuery("(max-width: 648px");
    let isTablet = useMediaQuery("(min-width: 640px)");
    const isLaptop = useMediaQuery("(min-width: 1024px)");
    if(isLaptop == true){
        isMobile = false;
        isTablet = false;
    }

    useEffect(() =>{
        if(!isLoading && !isLoggedIn){
            navigate("/");
        }
    }, []);

    const handleLogOut = () =>{
        localStorage.removeItem('token');

        setIsLoggedIn(false);
        setGlobalAvatar(null);
        setGlovbalUsername("");

        setShowNotification(true);
        setNotificationMsg("Loged Out Sucessfully");
        setNotificationError(false);
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-bgMain">
            <Header type="main" />
            <section id="home" className="w-full flex justify-center items-center">
                <div className="relative w-full min-h-screen flex justify-center items-center flex-col gap-2">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex gap-2 items-center">
                            <h2 className="text-2xl text-white font-Andika font-medium">Meet</h2>
                            <h1 className="text-4xl text-Wasabi font-Andika font-medium text-shadow-md text-shadow-Wasabi">WasabiX</h1>  
                        </div>
                        <h3 className="text-lg text-blue-500 font-Andika">Where it always rains</h3>
                    </div>
                    <div className="w-8/10">
                        <p className="text-xl text-white font-Andika font-medium text-center">Weather powered by people. Join the community that is changing how the world experiences forecasts</p>
                    </div>
                    <div className={`w-7/10 mt-3 flex ${isLoggedIn? "justify-center" : "justify-between"} items-center`}>
                        <button 
                            className="p-0.5 pl-4 pr-4 bg-Wasabi rounded-full font-Andika text-lg text-black font-semibold shadow-md shadow-black"
                            href="#features"
                        >
                            See Features
                        </button>
                        {!isLoggedIn && (
                            <button 
                                className="p-0.5 pl-4 pr-4 bg-Wasabi rounded-full font-Andika text-lg text-black font-semibold shadow-md shadow-black"
                                onClick={() => navigate("/signup")}
                            >
                                SignUp
                            </button>
                        )}    
                    </div> 
                    <div className="absolute bottom-5 w-9/10 bg-Wasabi rounded-xl flex justify-between items-center p-4 shadow-centerBlack">
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="text-black text-lg font-Andika font-semibold">Registred Users</h3>
                            <p className="text-black text-2xl font-Andika">0+</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="text-black text-lg font-Andika">Total Comments</h3>
                            <p className="text-black text-2xl font-Andika">0+</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="liveFeed" className="mt-20 w-full flex flex-col justify-center items-center mb-30 gap-5">
                <h2 className="text-2xl text-Wasabi font-Andika font-medium text-shadow-md text-shadow-Wasabi">Live Feed</h2>
                <div className="w-9/10 pt-5 pb-5 bg-bgMain flex flex-col justify-center items-center gap-5 rounded-xl shadow-centerBlack">
                    <CommentFrame
                        type = "feed"
                        avatar = {DefaultProfilePic}
                        username = "Hamza_Ali"
                        message = "Too hot today in Joahr town, take water with you"
                        location = "Johar Town, Lahore"
                        time = "6 hours ago"
                    />
                    <CommentFrame
                        type = "feed"
                        avatar = {DefaultProfilePic}
                        username = "Ahmed_Raza123"
                        message = "Traffic jam and snowfall in manchester today."
                        location = "Manchester, UK"
                        time = "10 hours ago"
                    />
                    <CommentFrame
                        type = "feed"
                        avatar = {DefaultProfilePic}
                        username = "Ella98"
                        message = "light rain in NYC today, perfect weather to go out"
                        location = "New York City, USA"
                        time = "18 hours ago"
                    />       
                </div>
            </section>
            <section id="features" className="w-full flex justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <div className="w-8/10 flex flex-col justify-between items-center gap-2">
                        <h2 className="text-2xl font-Andika font-medium text-Wasabi text-shadow-sm text-shadow-Wasabi">Features</h2>
                        <p className="text-xl text-white font-Andika font-medium text-center">WasabiX combines weather tools with social features so you always know what is happening overhead.</p>
                    </div>
                    
                    <div className="w-full flex justify-center items-center gap-4 p-2">
                        <img src={testImage} alt="Showcase Image 1" className="size-40 rounded-xl shadow-centerBlack" />
                        <div>
                            <h3 className="text-lg text-Wasabi font-Andika font-medium underline text-shadow-xs text-shadow-Wasabi">Live Weather Data</h3>
                            <p className="text-base text-white font-Andika font-medium">Get forecasts with real-time data, 7-day outlooks for any location worldwide.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center gap-4 p-2">
                        <img src={testImage} alt="Showcase Image 1" className="size-40 rounded-xl shadow-centerBlack" />
                        <div>
                            <h3 className="text-lg text-Wasabi font-Andika font-medium underline text-shadow-xs text-shadow-Wasabi">Community Comments</h3>
                            <p className="text-base text-white font-Andika font-medium">Share your weather experience, post updates, and discuss conditions with people in your area or around the globe.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center gap-4 p-2">
                        <img src={testImage} alt="Showcase Image 1" className="size-40 rounded-xl shadow-centerBlack" />
                        <div>
                            <h3 className="text-lg text-Wasabi font-Andika font-medium underline text-shadow-xs text-shadow-Wasabi">Verified Reports</h3>
                            <p className="text-base text-white font-Andika font-medium">Our community-driven verification system ensures the weather updates you see are accurate and trustworthy.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center gap-4 p-2">
                        <img src={testImage} alt="Showcase Image 1" className="size-40 rounded-xl shadow-centerBlack" />
                        <div>
                            <h3 className="text-lg text-Wasabi font-Andika font-medium underline text-shadow-xs text-shadow-Wasabi">Location Feeds</h3>
                            <p className="text-base text-white font-Andika font-medium">Follow cities and regions to see what the weather is really like, straight from locals on the ground.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <footer className="mt-10 w-full flex flex-wrap justify-start items-center gap-2 p-3 backdrop-blur-md bg-black/50 border-t-2 border-white">
                <div className="mt-5 w-full flex justify-start items-center gap-2">
                    <img src={WasabiX_Logo} alt="Wasabi X logo" className="size-10 rounded-lg
                        sm:w-0.5/12 lg:w-0.5/20" />
                    <h2 className="font-Andka text-Wasabi4 font-medium text-2xl text-shadow-sm text-shadow-Wasabi
                        sm:text-3xl lg:text-2xl">WasabiX</h2>
                </div>
                <p className="w-8/10 text-base font-Andika font-medium text-offWhite
                    sm:text-lg lg:text-base">Weather is better together. Join the community that is changing how the world experiences forecasts.</p>
                <div className="mt-4 w-full flex flex-col gap-5">
                    <div className="w-0.5/2 flex flex-col text-offWhite font-Andika font-medium text-lg
                        sm:text-xl lg:text-base">
                        <h2 className="text-Wasabi font-extrabold">Product</h2>
                        <a href="#features" className="w-min hover:bg-Wasabi">Features</a>
                    </div>
                    <div className="w-full flex flex-col text-offWhite font-Andika font-medium text-lg
                        sm:text-xl lg:text-lg">
                        <h2 className="text-Wasabi font-semibold">Legal</h2>
                        <button className="w-min text-nowrap hover:bg-Wasabi" >Privacy Policy</button>
                        <button className="w-min text-nowrap hover:bg-Wasabi">Terms and Conditions</button>
                    </div>
                    <div className="w-full flex flex-col text-offWhite font-Andika font-medium text-lg
                        sm:text-xl lg:text-lg">
                            <h2 className="text-Wasabi font-extrabold">Report a bug / issue</h2>
                            <button className="w-min text-nowrap hover:bg-Wasabi" >abdulrafea97@gmail.com</button>
                    </div>
                </div>
                <div className="mt-4 w-full flex flex-col items-center text-base font-Andika font-medium text-offWhite
                    sm:text-lg lg:text-base">
                    <h2>&copy;2026 WasabiX. All rights reserved.</h2>
                    <div className="flex gap-5">
                        <a href="" className="hover:bg-Wasabi">Github</a>
                        <a href="" className="hover:bg-Wasabi">Linkdein</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage;
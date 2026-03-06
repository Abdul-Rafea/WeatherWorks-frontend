//Required imports: -
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { FaGithub } from "react-icons/fa6";
import { WeatherContext } from './WeatherContext';

//shadcn components: -
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpRightIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

//main components: -
import api from './api';
import DescriptionBox from './DescriptionBox';
import WasabiXlogo from './assets/WasabiX_Logo.webp';
import NotificationFrame from './NotificationFrame';
import CloudSvg from './CloudSvg';
import WasabiX_Logo from "./assets/WasabiX_Logo.png"; 

function LandingPage() {
    const navigate = useNavigate();
    
    const {isLoggedIn, setIsLoggedIn,
        showNotification, setShowNotification,
        setNotificationMsg}= useContext(WeatherContext);

    const [ProfMenuOpen, setProfMenuOpen] = useState(false);
    const [navUnderline, setNavUnderline] = useState("community");
    const [userCount, setUserCount] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(()=>{
            async()=>{
            try{
                const response = await api.get("/user-count");
                setUserCount(response.data.totalUsers);
            }
            catch (err){
                console.error(err);
            }
        }
    }, [])
    const handleProfileMenu = () =>{
        if (ProfMenuOpen){
            setProfMenuOpen(false);
        }
        else{
            setProfMenuOpen(true);
        }
    }
    
    const handleLogOut = () =>{
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setNotificationMsg("Logged out successfully");
        setShowNotification(true);
    }

    const handleNav = (value) =>{
        if ( value === 0 ){
            setNavUnderline("features");
        }
        else if( value === 1 ){
            setNavUnderline("community");
        }
        else if(value === 2){
            setNavUnderline("download");
        }
        else{
            setNavUnderline("community");
        }
    }

    return (
        <>
            {showNotification && <NotificationFrame />}
            <div className="w-full relative flex flex-col justify-center items-center bg-[url(./assets/WasabiX_Background.webp)] bg-cover bg-left bg-fixed">
                <header className="z-50 fixed top-0 w-full flex justify-between items-center p-2 backdrop-blur-md bg-black/70 border-b-2 border-white">
                    <div className="w-2/5 flex  justify-center items-center gap-2">
                        <img src={WasabiX_Logo} alt="Wasabi X logo" className="w-1/4 rounded-lg" />
                        <h2 className="font-Andka text-Wasabi4 font-bold text-2xl">WasabiX</h2>
                    </div>
                    <nav className="w-9/10 justify-center items-center flex-wrap gap-2 -mt-1 text-White text-base font-Andika font-semibold hidden sm:flex ">
                        <a onClick={() => handleNav(0)} className="w-1/4 flex flex-wrap justify-center items-center">
                            Features
                            {navUnderline == "features"? (
                                <div className="w-full h-0.5 bg-Wasabi2 rounded-full">&nbsp;</div>
                            ):
                            (
                                <></>
                            )}
                        </a>
                        <a onClick={() => handleNav(1)} className="w-1/4 flex flex-wrap justify-center items-center">
                            Community
                            {navUnderline == "community"? (
                                <div className="w-full h-0.5 bg-Wasabi2 rounded-full">&nbsp;</div>
                            ):
                            (
                                <></>
                            )}
                        </a>
                        <a onClick={() => handleNav(2)} className="w-1/4 flex flex-wrap justify-center items-center">
                            Download
                            {navUnderline == "download"? (
                                <div className="w-full h-0.5 bg-Wasabi2 rounded-full">&nbsp;</div>
                            ):
                            (
                                <></>
                            )}
                        </a>
                    </nav>
                    <div className="w-3/5 flex justify-end gap-2">
                        <DropdownMenu onOpenChange={setMenuOpen} >
                            <DropdownMenuTrigger>
                                <Button asChild size="sm" className="bg-Wasabi4 hover:bg-Wasabi sm:hidden">
                                    { menuOpen? (
                                        <svg
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                                <path
                                                    d="M6.995 7.006a1 1 0 000 1.415l3.585 3.585-3.585 3.585a1 1 0 101.414 1.414l3.585-3.585 3.585 3.585a1 1 0 001.415-1.414l-3.586-3.585 3.586-3.585a1 1 0 00-1.415-1.415l-3.585 3.585L8.41 7.006a1 1 0 00-1.414 0z"
                                                    fill="#0F0F0F"
                                                />
                                        </svg>
                                    ):
                                    (
                                        <svg
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4 6h16M4 12h16M4 18h16"
                                                stroke="#000"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )
                                    }
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black/70 backdrop-blur-md text-white">
                                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                <DropdownMenuItem>Features</DropdownMenuItem>
                                <DropdownMenuItem>Community</DropdownMenuItem>
                                <DropdownMenuItem>How it Works</DropdownMenuItem>
                                <DropdownMenuItem className="bg-Wasabi4 hover:bg-Wasabi text-black">
                                    <Button to="/login" asChild size="sm" variant="ghost" className="font-semibold">
                                        <Link className="w-full">Log In</Link>
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {isLoggedIn ? (
                            <div className="relative flex justify-end items-center gap-1">
                                <Link to="/dashboard" className="text-center text-md text-Main1 font-Andika rounded-3xl p-0.5 pl-3 pr-3 bg-Wasabi ">Dashboard</Link>
                                <button     onClick={handleProfileMenu} className="w-1/5">
                                    <img src="src\assets\prof pic all plat.png" alt="User Avatar" className="rounded-full border-2 border-Wasabi"></img>
                                </button>
                                { ProfMenuOpen && (
                                    <div className="absolute right-0 top-full mt-1 bg-Wasabi text-Wasabi text-lg text-center text-nowrap font-Andika p-2 rounded-xl">
                                        <ul className="w-min flex flex-wrap justify-end items-center gap-2">
                                            <li>
                                                <Link to="/user-settings" className="bg-Main1 rounded-3xl p-0.5 pl-3 pr-3">User Settings</Link>
                                            </li>
                                            <li>
                                                <button onClick={handleLogOut} className="bg-Main1 rounded-3xl p-0.5 pl-3 pr-3">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) :
                        (
                            <div className="flex items-center justify-center gap-2">
                                <Button asChild size="sm" variant="ghost" className="hover:bg-Wasabi font-Andika font-bold hidden">
                                    <Link >Log In</Link>
                                </Button>
                                <Button asChild size="sm" className="bg-Wasabi4 text-black hover:bg-Wasabi font-Andika font-bold">
                                    <Link to="/signup" >Sign Up</Link>
                                </Button>
                            </div>
                        ) }
                    </div>
                </header>
                <section className="section-style flex justify-center items-start">
                    <div className="section-basic-blur h-8/10">
                        <div className="flex justify-center items-center flex-col gap-5 text-center">
                            <div className="section-title">CONNECT, COMMENT, CLOUD</div>
                            <h1 className="section-heading">Weather Powered by People.</h1>
                            <p className="section-text">Track real-time weather, share your sky, and connect with a community that cares about the forecast as much as you do.</p>
                        </div>
                        <div className="mt-10 w-full flex justify-center items-center flex-col gap-3">
                            <Button size="lg" className="bg-Wasabi4 hover:bg-Wasabi text-black font-bold font-Andika border border-black" >
                                <Link to="signup">Get Started</Link>
                                <ArrowUpRightIcon />
                                </Button>
                            <Button size="lg" className="bg-white hover:bg-Wasabi2 text-black font-bold font-Andika border border-black">See Features</Button>
                        </div>
                    </div>
                </section>
                <section className="section-style">
                    <div className="section-basic-blur">
                        <h2 className="section-title">Features</h2>
                        <h1 className="section-heading">Everything you need in one sky</h1>
                        <p className="section-text">WasabiX combines powerful weather tools with social features so you always know what is happening overhead.</p>
                        <Carousel className="w-8/10 aspect-square shadow-lg shadow-black rounded-2xl">
                            <CarouselContent>
                                <CarouselItem>
                                    <DescriptionBox id={1} svgWidth={50} heading="Live Weather Data" text="Get hyper-local forecasts with real-time data, 3-day outlooks for any location worldwide." />
                                </CarouselItem>
                                <CarouselItem>
                                    <DescriptionBox id={2} svgWidth={50} heading="Community Comments" text="Share your weather experience, post updates, and discuss conditions with people in your area or around the globe." />
                                </CarouselItem>
                                <CarouselItem>
                                    <DescriptionBox id={3} svgWidth={50} heading="Location Feeds" text="Follow cities and regions to see what the weather is really like, straight from locals on the ground." />
                                </CarouselItem>
                                <CarouselItem>
                                    <DescriptionBox id={4} svgWidth={50} heading="Smart Alerts" text="Get notified about severe weather, trending discussions, and replies to your posts. Stay safe, stay connected." />
                                </CarouselItem>
                                <CarouselItem>
                                    <DescriptionBox id={6} svgWidth={50} heading="Verified Reports" text="Our community-driven verification system ensures the weather updates you see are accurate and trustworthy." />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </section>
                <section className="section-style">
                    <div className="section-basic-blur">
                        <h2 className="section-title">Community</h2>
                        <h1 className="section-heading">See what people are saying</h1>
                        <p className="section-text">Real weather updates from real people. Join the conversation and share your sky.</p>
                    </div>
                </section>
                <footer></footer>
            </div>
        </>
    )
}

export default LandingPage;
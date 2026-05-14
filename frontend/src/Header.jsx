import { useNavigate, Link } from "react-router-dom";
import { WeatherContext } from "./WeatherContext";
import { useContext } from "react";

//lucide componnets: -
import { ChevronLeft } from "lucide-react";

//main components: -
import WasabiX_Logo from "./assets/WasabiX_Logo.webp";
import { div } from "framer-motion/client";
import { LiaGlobeAsiaSolid } from "react-icons/lia";

function Header(props){
    const navigate = useNavigate();

    const {
        isLoggedIn,
        globalUsername,
        globalAvatar,
    } = useContext(WeatherContext);
    
    if(props.type === "auth"){
        return(
            <header className="z-20 fixed top-1 w-9/10 p-2 pl-4 pr-4 flex justify-between items-center bg-black/80 rounded-full">
                <Link 
                    className="p-0.5 text-lg text-black font-Andika bg-Wasabi flex gap-2 rounded-full shadow-sm shadow-Wasabi"
                    to="/"
                >
                    <ChevronLeft className="size-8" />
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-Andika font-medium text-Wasabi text-shadow-sm text-shadow-Wasabi">WasabiX</h1>
                    <img src={WasabiX_Logo} alt="WasabiX Logo" className="size-10" />
                </div>
            </header>
        );
    }
    else if(props.type === "dashboard"){
        return(
            <header className="z-20 fixed top-0 w-full p-2 pl-3 pr-3 flex justify-between items-center bg-bgMain rounded-b-4xl shadow-lg shadow-black">
                 <Link 
                    className="p-0.5 text-lg text-black font-Andika bg-Wasabi flex gap-2 rounded-full shadow-md shadow-black"
                    to="/"
                >
                    <ChevronLeft className="size-8" />
                </Link>
                <div className="flex items-center gap-3">
                    <h2 className="text-lg text-Wasabi font-Andika text-shadow-xs text-shadow-Wasabi">{globalUsername}</h2>
                    <button>
                        <img src={globalAvatar} alt="Avatar" className="size-10 rounded-full border-2 border-Wasabi" />
                    </button>
                </div>
            </header>
        );
    }
    else{
        return(
            <header className="z-20 fixed top-0 w-full p-2 pl-3 pr-3 flex justify-between items-center bg-bgMain rounded-b-4xl shadow-lg shadow-black">
                <div className="flex items-center gap-3">
                    <img src={WasabiX_Logo} alt="WasabiX Logo" className="size-10" />
                    <h1 className="text-xl font-Andika font-medium text-Wasabi text-shadow-sm text-shadow-Wasabi">WasabiX</h1>
                </div>
                {isLoggedIn ? (
                    <div className="flex items-center gap-1">
                        <Link 
                            className="p-1 pl-4 pr-4 bg-Wasabi flex rounded-full text-base font-Andika shadow-md shadow-black"
                            to="/dashboard"
                        >
                            Dashboard
                        </Link>
                        <button>
                            <img src={globalAvatar} alt="Avatar" className="size-10 rounded-full border-2 border-Wasabi" />
                        </button>
                    </div>
                ):
                (
                    <button 
                        className="p-0.5 pl-4 pr-4 text-lg text-black font-Andika bg-Wasabi rounded-full shadow-sm shadow-Wasabi"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                )}
                
            </header>
        );
    }
}

export default Header;
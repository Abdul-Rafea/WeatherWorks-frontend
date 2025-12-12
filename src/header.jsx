import WeatherWorks_logo from "./assets/WeatherWorks_logo.png";
import Search_Icon from "./assets/Search_Icon.png"

function Header(){
    return(
        <div className="w-full h-auto flex justify-evenly items-center bg-[#412B6B] rounded-3xl p-3">
            <button className="w-15/100 h-auto flex justify-center items-center ml-2 mr-3">
                <img src={WeatherWorks_logo} alt="WeatherWorks Logo" className="w-full h-auto" />
            </button>
            <div className="w-full h-auto bg-[#5C3E94] rounded-3xl p-3 mr-2 flex justify-start items-center shadow-[2px_4px_5px_0_#00000040]">
                <img src={Search_Icon} alt="Search icon" className="w-auto h-full"></img>
                <div className='w-full h-auto text-left pl-3 plus-jakarta-sans font-medium text-[#ffffff80] text-1xl'>Search City...</div>
            </div> 
        </div>
    )
}

export default Header;
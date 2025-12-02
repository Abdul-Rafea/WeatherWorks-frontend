import Light_Rain_Day from './assets/Light_Rain_Day.svg';
import Light_Rain_Night from './assets/Light_Rain_Night.svg';
import Heavy_Rain from './assets/Heavy_Rain.svg';
//import Windy_Day from './assets/Windy_Day.svg';
import Windy_Night from './assets/Windy_Night.svg';
import Thunderstrom from './assets/Thunderstorm.svg';
import Clear_Day from './assets/Clear_Day.svg';
import CLear_NIght from './assets/Clear_Night.svg';
import Cloudy from './assets/Cloudy.svg';
import Windy_CLoudy from './assets/Windy_Cloudy.svg';

function Weekframe(){
    const Weather = Windy_Night;
    const Day = "Mon";
    const Temp = "28°C";

    return(
        <div className="w-30/100 h-auto p-3 mb-5 bg-[#3E3245] rounded-xl flex justify-center items-center flex-col box-border shadow-[2px_4px_5px_0_#00000040]">
            <div className='w-auto h-auto text-center text-2xl text-[#ffffff] plus-jakarta-sans font-medium'>{Day}</div>
            <img src={Weather} alt="Weather Icon" className="w-full h-auto mt-2 mb-2" />
            <div className='w-auto h-auto text-center text-2xl text-[#ffffff] plus-jakarta-sans font-medium'>{Temp}</div>
        </div>
    )
}
export default Weekframe;
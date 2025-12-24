import ClearDay from "./assets/Clear_Day.png";
import ClearNight from "./assets/Clear_Night.png";
import Cloudy from "./assets/Cloudy.png";
import LightRainDay from "./assets/Light_Rain_Day.png";
import LightRainNight from "./assets/Light_Rain_Night.png";
import HeavyRain from "./assets/Heavy_Rain.png";
import Thunderstorm from "./assets/Thunderstorm.png";

function IconMap(props){
    let WeatherStatus = null

    if (props.WeatherCode === 1000){
        if (props.isDay ===0){
            WeatherStatus = ClearNight;
        }
        else {
            WeatherStatus = ClearDay;
        }
    }
    else if(props.WeatherCode > 1000 && props.WeatherCode <= 1135){
        WeatherStatus = Cloudy;
    }
    else if(props.WetherCode > 1135 && props.WeatherCode <=1189){
        if (props.isDay ===0){
            WeatherStatus = LightRainNight;
        }
        else {
            WeatherStatus = LightRainDay;
        }
    }
    else if(props.WeatherCode >1189 && props.WeatherCode <= 1201){
        WeatherStatus = HeavyRain;
    }
    else if (props.WeatherCode >= 1273){
        WeatherStatus = Thunderstorm;
    }
    else{
        WeatherStatus = "Unknown";
    }

    return(
        <img src={WeatherStatus} alt="Weather Icon" className="w-full h-auto" />
    );
}

export default IconMap;
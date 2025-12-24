import AQI_icon from "./assets/Air_Quality_Icon.png";
import UV_icon from "./assets/UV_Icon.png";
import Pressure_icon from "./assets/Pressure_Icon.png";

function todayFrame(props){
    let aqi = props.aqi;
    let uvIndex = props.uvIndex;
    let pressure = props.pressure;
    let aqiValue = null;
    let uvValue = null;
    let pressureValue = null;
    let Quality = null;
    let textColor = null;
    let image = null;
    let value = null;

    if (props.aqi) {
        aqiValue = aqi;
        image = AQI_icon;
        value = aqi;
    }
    else if (props.pressure){ // there is a weird bug here when pressure is put at else
        pressureValue = pressure;
        image = Pressure_icon;
        value = pressure;
    }
    else {
        uvValue = uvIndex;
        image = UV_icon;
        value = uvIndex;
    }

    if (aqiValue){
        if (aqiValue <= 50){
            Quality = "Good";
            textColor = "text-[#009966]";
        }
        else if (aqiValue > 50 && aqi <= 100 ){
            Quality = "Moderate";
            textColor = "text-[#009966]";
        }
        else if (aqiValue > 100 && aqi <= 150 ){
            Quality = "Poor";
            textColor = "text-[#f5cd2f]";
        }
        else if (aqiValue > 150 && aqi <= 200){
            Quality = "Very Poor";
            textColor = "text-[#f5cd2f]";
        }
        else if (aqiValue > 200 && aqi <= 300){
            Quality = "Extemely Poor";
            textColor = "text-[#ee4b2b]";
        }
        else{
            Quality = "Hazardous";
            textColor = "text-[#ee4b2b]";
        }
    }
    else if (uvValue) {
        if (uvValue >= 0 && uvValue <= 2){
            Quality = "Low";
            textColor = "text-[#009966]";
        }
        else if (uvValue > 2 && uvValue <= 5 ){
            Quality = "Moderate";
            textColor = "text-[#009966]";
        }
        else if (uvValue > 5 && uvValue <= 7 ){
            Quality = "High";
            textColor = "text-[#f5cd2f]";
        }
        else if (uvValue > 7 && uvValue <= 10){
            Quality = "Very High";
            textColor = "text-[#ee4b2b]";
        }
        else{
            Quality = "Extreme";
            textColor = "text-[#ee4b2b]";
        }
    }
    else {
        if (pressureValue >= 1009){
            Quality = "Normal";
            textColor = "text-[#009966]";
        }
        else {
            Quality = "Low";
            textColor = "text-[#f5cd2f]";
        }        
    }
    
return(
        <div className="w-full h-auto mt-3 p-5 flex justify-center items-center flex-wrap bg-[#4CB8CC] rounded-2xl shadow-[2px_4px_5px_0_#00000040]">
            <div className="w-9/10 h-auto flex justify-left items-center text-2xl font-semibold text-[#ffffff]">{props.heading}</div>
            <div className="w-9/10 h-auto mt-2 mb-2 text-left text-5xl font-bold text-[#ffffff]">{value}</div>
            <div className={`w-9/10 h-auto text-left text-4xl font-semibold ${textColor}`}>{Quality}</div>
            <div className="w-9/10 h-auto flex justify-end">
                <img src={image} alt="Air Quality Icon" className="w-1/3 h-auto" />
            </div>
        </div>
)
}

export default todayFrame;
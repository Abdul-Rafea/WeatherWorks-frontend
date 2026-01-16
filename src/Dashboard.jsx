import LeftFrame from "./leftFrame";
import RightFrame from "./rightFrame";
import FetchData from "./fetchData";
import Portal from "./generatePortal";
import LoadingFrame from "./loadingFrame";
import GetCoords from "./GetCoords";

import { useState, useEffect, useContext } from "react";
import { WeatherContext } from "./WeatherContext";


function Dashboard(){
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setcityName] = useState("");
    const {locationCoords, setLocationCoords} = useContext(WeatherContext);
    const [fetchType, setFetchType] = useState("weather");
    const [getCoords, setGetCoords] = useState(false);
    const [getLocation, setGetLocation] = useState(false);

    const openGetCoords = () => {
        setGetCoords(true);
    }
    const closeGetCoords = (Coords) => {
        setGetCoords(false);
        setLocationCoords({lat: Coords.latitude, lon: Coords.longitude});
        setGetLocation(true);
    }
    
    const changeFetchType = () => {
        if (fetchType === "weather"){
        setFetchType("city-search");
        }
        else {
            setFetchType("weather");
        }
    };


    useEffect(() => {
        const fetchData = async() =>{
            if (!locationCoords || locationCoords.lat === null || locationCoords.lon === null){
                return;
            }
            try{
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/${fetchType}?latitude=${locationCoords.lat}&longitude=${locationCoords.lon}`);
                const WeatherData = await response.json();
                setWeatherData(WeatherData);
                setIsLoading(false);
            }
            catch(error){
                setIsLoading(false);
                console.error(error);
            }
        };
        fetchData();
    }, [locationCoords]);

    return (
        <>
            {isLoading && (
                <Portal styling = "fixed top-0 left-0 z-50 w-screen h-screen bg-[#0F0F0Fbf] flex justify-center items-center">
                    <LoadingFrame />
                </Portal>
            )}
            {getCoords &&(
                <GetCoords onClose={closeGetCoords} />
            )}
            {!getLocation &&(
                <Portal styling = "fixed top-0 left-0 z-50 w-screen h-screen bg-[#0F0F0Fbf] flex justify-center items-center">
                    <div className="w-9/10 bg-[#1C8EA3] rounded-2xl flex justify-center items-center flex-wrap gap-5 p-2">
                        <h2 className="text-2xl text-[#ffffff] text-center">Where are you?</h2>
                        <input className="w-9/10 bg-[#D9A22B] text-3xl text-[#ffffff] rounded-2xl p-2"
                            type="text"
                            placeholder="Search City"
                            value = {cityName}
                            onChange={(e) =>{setcityName(e.target.value)}}
                            ></input>
                        <h1 className="w-full text-3xl text-center text-[#ffffff]">OR</h1>
                        <h2 className="w-full text-2xl text-center text-[#ffffff]">Get you current location</h2>
                        <button onClick={openGetCoords} className=" bg-[#D9A22B] text-2xl text-[#ffffff] rounded-2xl p-2">My location</button>
                    </div>
                </Portal>
            )}
            {weatherData &&(
               <>
                <LeftFrame 
                    temp = {weatherData.tempC} 
                    city = {weatherData.city} 
                    weather_condition = {weatherData.weatherText} 
                    feels_like = {weatherData.feelsLikeC} 
                    humidity = {weatherData.humidity} 
                    wind_speed = {weatherData.windKPH}
                    is_day = {weatherData.timeOfDay}
                    day = {weatherData.day}
                    icon = {weatherData.icon}
                 />
                <RightFrame 
                    aqi = {weatherData.aqi} 
                    uvIndex = {null} 
                    pressure = {weatherData.pressure} 
                    sunrise = {weatherData.sunrise} 
                    sunset = {weatherData.sunset}
                    uv = {weatherData.uv}
                    precipData = {weatherData.precipData}
                    weekData = {weatherData.weekData}
                    />
                </>
            )}
        </>
    )
}
export default Dashboard;
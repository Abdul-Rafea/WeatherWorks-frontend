import LeftFrame from "./leftFrame";
import RightFrame from "./rightFrame";
import FetchData from "./fetchData";
import { useState } from "react";

function Dashboard() {
    const [weatherProps, setWeatherProps] = useState(
        {tempC: null, city: null, aqi: null, uvIndex: null, pressure: null, sunrise: null, sunset: null, weatherCode: null, weatherCondition: null}
     );

    const getData = (data) => {
        setWeatherProps(data);
    }
    
    return (
        <>
            <FetchData onDataFetch={getData} />
            <LeftFrame temp = {weatherProps.tempC} city = {weatherProps.city} weatherCode = {weatherProps.weatherCode} weatherCondition = {weatherProps.weatherCondition} />
            <RightFrame aqi = {weatherProps.aqi} uvIndex = {weatherProps.uvIndex} pressure = {weatherProps.pressure} sunrise = {weatherProps.sunrise} sunset = {weatherProps.sunset} />
        </>
    )
}
export default Dashboard;
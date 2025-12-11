import LeftFrame from "./leftFrame";
import RightFrame from "./rightFrame";
import Header from "./header";
import FetchData from "./fetchData";
import React, { useState } from "react";

function App() {
    const [weatherProps, setWeatherProps] = useState({tempC: null, city: null, aqi: null, uvIndex: null, pressure: null});
    const getData = (data) => {
        setWeatherProps(data);
    }
    
    return (
        <>
            <FetchData onDataFetch={getData} />
            <Header />
            <LeftFrame temp = {weatherProps.tempC} city = {weatherProps.city} />
            <RightFrame aqi = {weatherProps.aqi} uvIndex = {weatherProps.uvIndex} pressure = {weatherProps.pressure} />
        </>
    )
}

export default App;
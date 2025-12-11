import Portal from "./generatePortal";
import LoadingFrame from "./loadingFrame";

import React, { useState, useEffect } from 'react';


const weatherAPI_key = import.meta.env.VITE_WEATHER_API_KEY;
const aqiAPI_key = import.meta.env.VITE_AQI_API_KEY;
const city = "London"

function FetchData({onDataFetch}) {
    const [weatherData, setWeatherData] = useState(null);
    const [aqiData, setAqiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const weatherAPI_URL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI_key}&q=${city}`;
        const aqiAPI_URL = `https://api.waqi.info/feed/${city}/?token=${aqiAPI_key}`;
        async function fetchData() {
            try{
                const response = await fetch(weatherAPI_URL);  
                const aqiResponse = await fetch(aqiAPI_URL);  

                if(!response.ok && !aqiResponse.ok){
                    throw new Error(`Http eror! status: ${response.status}`);
                    throw new Error(`Http eror! status: ${aqiResponse.status}`);

                }

                const data1 = await response.json();
                const data2 = await aqiResponse.json();
                setWeatherData(data1);
                setAqiData(data2);

            }
            catch(e){
                setError(e.message);
            }
            finally{
                setLoading(false);
            }
        }
        
        fetchData();

    }, [onDataFetch]);

    useEffect(() => {

        if (weatherData && aqiData) {
            const tempC = Math.round(weatherData?.current.temp_c);
            const aqi = aqiData?.data.aqi;
            const unIndex = weatherData?.current.uv;
            const pressure = weatherData?.current.pressure_mb;
            const processedData = {
                tempC: tempC,
                city: city,
                aqi: aqi,
                uvIndex: unIndex,
                pressure: pressure
            };
            onDataFetch(processedData);
        }

   
    }, [weatherData]);


    return (
        
        loading && (
            <Portal styling = "fixed top-0 left-0 z-50 w-screen h-screen bg-[#0F0F0F99] flex justify-center items-center">
                <LoadingFrame />
            </Portal>
        )
    )


} 

export default FetchData;
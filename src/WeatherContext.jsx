import { Children, createContext, useState } from 'react';

export const WeatherContext = createContext();

export function WeatherProvider({children}){
    const [locationCoords, setLocationCoords] = useState({lat: null, lon: null});
    const [weatherData, setWeatherData] = useState(null);
    
    return(
        <WeatherContext.Provider value={{locationCoords, setLocationCoords, weatherData, setWeatherData}}>
            {children}
        </WeatherContext.Provider>
    );
}
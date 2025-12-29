import { Children, createContext, useState } from 'react';

export const WeatherContext = createContext();

export function WeatherProvider({children}){
    const [locationCords, setLocationCords] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    
    return(
        <WeatherContext.Provider value={{locationCords, setLocationCords, weatherData, setWeatherData}}>
            {children}
        </WeatherContext.Provider>
    );
}
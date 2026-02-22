import { createContext, useState, useEffect } from 'react';

import DefautAvatar from "./assets/Default_Profile_Pic.jpg";
export const WeatherContext = createContext();

export function WeatherProvider({children}){

    const [locationCoords, setLocationCoords] = useState({lat: null, lon: null});
    const [weatherData, setWeatherData] = useState(null);
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState("");
    const [isError, setIsError] = useState(false);
    const [globalAvatar, setGlobalAvatar] = useState(DefautAvatar);
    const [userName, setUserName] = useState(() =>{
        const savedUsername = localStorage.getItem("username");
        return savedUsername;
    });

    useEffect(() =>{
        localStorage.setItem("username", userName);
    }, [userName])

    useEffect(() =>{
        const token = localStorage.getItem('token');
        
        if (token){
            setIsLoggedIn(true);
        }
    }, [userName])
    return(
        <WeatherContext.Provider value={{
            locationCoords, setLocationCoords, 
            weatherData, setWeatherData,
            isConfirmPage, setIsConfirmPage,
            isLoggedIn, setIsLoggedIn,
            showNotification, setShowNotification,
            notificationMsg, setNotificationMsg,
            isError, setIsError,
            globalAvatar, setGlobalAvatar,
            userName, setUserName,

            }}>
            {children}
        </WeatherContext.Provider>
    );
}
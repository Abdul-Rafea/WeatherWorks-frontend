import { createContext, useState, useEffect } from 'react';

//main componnets: -
import DefautAvatar from "./assets/Default_Profile_Pic.jpg";
import api from './api';

//Creating Context: -
    //eslint-disable-next-line
export const WeatherContext = createContext();
export function WeatherProvider({children}){
    const [isLoading, setIsLoading] = useState(false);
    const [locationCoords, setLocationCoords] = useState({lat: null, lon: null});
    const [weatherData, setWeatherData] = useState(null);
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState("Error");
    const [notificationError, setNotificationError] = useState(false);
    const [globalAvatar, setGlobalAvatar] = useState(() =>{
        return localStorage.getItem("avatar") || DefautAvatar;
    });
    const [globalUsername, setGlobalUsername] = useState("Username");
    const [tempUnit, setTempUnit] = useState("C");

    useEffect(() =>{
        setIsLoading(true);

        api.get('/verify-session')
        .then((res) =>{
            setIsLoggedIn(true);
            setGlobalUsername(res.data.username);
        })
        .catch((error) =>{
            console.error(error);
        });
        
        setIsLoading(false);
        //eslint-disable-next-line
    }, []);

    useEffect(() =>{
        if(globalAvatar && globalAvatar != DefautAvatar){
            localStorage.setItem('avatar', globalAvatar);
        }
    }, [globalAvatar])

    return(
        <WeatherContext.Provider value={{
            isLoading, setIsLoading,
            locationCoords, setLocationCoords, 
            weatherData, setWeatherData,
            isConfirmPage, setIsConfirmPage,
            isLoggedIn, setIsLoggedIn,
            showNotification, setShowNotification,
            notificationMsg, setNotificationMsg,
            notificationError, setNotificationError,
            globalAvatar, setGlobalAvatar,
            globalUsername, setGlobalUsername,
            tempUnit, setTempUnit,
            }}>
            {children}
        </WeatherContext.Provider>
    );
}
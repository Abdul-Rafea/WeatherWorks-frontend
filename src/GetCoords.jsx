import { useState, useEffect } from "react";

function GetCoords({onClose}){
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation){
            setError("Geolocation is not supported please type city name")
            return;
        }

        const handleSucess = (pos) => {
            const {latitude, longitude} = pos.coords;
            onClose({latitude, longitude});
        };

        const handleError = (err) => {
            setError(err.message);
            onClose(null);
        };

        navigator.geolocation.getCurrentPosition(handleSucess, handleError);
    }, []);

    
}

export default GetCoords;
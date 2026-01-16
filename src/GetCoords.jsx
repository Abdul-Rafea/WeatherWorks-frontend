import { useEffect } from "react";

function GetCoords({onClose}){
    useEffect(() => {
        if (!navigator.geolocation){
            setError("Geolocation is not supported please type city name")
            return;
        }

        const handleSucess = (pos) => {
            const {latitude, longitude} = pos.coords;
            onClose({latitude, longitude});
        };

        navigator.geolocation.getCurrentPosition(handleSucess);
    }, [onClose]);

    
}

export default GetCoords;
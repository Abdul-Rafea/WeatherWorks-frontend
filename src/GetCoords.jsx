import { useState, useEffect } from "react";

function GetCoords({onClose}){
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
            onClose({ latitude:null, longitude:null });
        };

        navigator.geolocation.getCurrentPosition(handleSucess, handleError);
    }, [onClose]);

    
}

export default GetCoords;
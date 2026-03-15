import { useState, useEffect } from "react";

export function useMediaQuery(query){
    const [output, setOutput] = useState(false);

    useEffect(() =>{
        const media = window.matchMedia(query);
        setOutput(media.matches);

        const listener = (e) => setOutput(e.matches);
        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, [query]);

    return output;
}
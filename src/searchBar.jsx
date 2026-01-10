import { useState } from "react";

function searchBar(){
    const [cityName, setCityName] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    
    

    return(
            <input  className="absolute right-0 z-1 p-3 w-4/5 bg-[#1C8EA3] rounded-3xl text-2xl text-[#ffffff] font-medium"
                type="search"
                placeholder="Search City"
                value = {cityName}
                onChange={(e) => setCityName(e.target.value)}
            >
            </input>
    );
}

export default searchBar;
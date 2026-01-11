import { useState, useRef, useEffect } from "react";

function searchBar(props){
    const [cityName, setCityName] = useState("");
    const [cityData, setCityData] = useState(null);
    const searchTimeout = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData =  async(cityValue) => {
        try{
            const response = await fetch(`http://localhost:5000/city-search?cityText=${cityValue}`);
            setIsLoading(true);
            const cityData = await response.json();
            setCityData(cityData);
            setIsLoading(false);
        }
        catch(error){
            console.error(error);
            setIsLoading(false);
        }
    };

    const onChange = (e) => {
        const newValue = e.target.value;
        setCityName(e.target.value)
        clearTimeout(searchTimeout.current);

        searchTimeout.current = setTimeout(() => {
            if (newValue.length > 2){
               fetchData(newValue);
            }
        }, 500);
    }

    return(
            <div className={props.styling}>
                <input className="w-full realtive p-3 rounded-3xl"
                    type="search"
                    placeholder="Search City"
                    value = {cityName}
                    onChange={(e) => {onChange(e)}}
                >
                </input>
            {Array.isArray(cityData) && (
                <ul className="w-full absolute left-0 text-[#ffffff] flex justify-center itmes-center flex-col gap-2 bg-[#1C8EA3] rounded-xl p-2 border-2 border-[#ffffff] border-t-0">
                    {cityData.map((item, index) => (
                    <li key={index} className=" w-full bg-[#D9A22B] rounded-xl p-1 shadow-[2px_4px_5px_0_#00000040]">
                        <button className="w-full flex items-center flex-col">
                            <p className="text-2xl text-wrap">{item.city}</p>
                            <p className="text-base w-full">{item.country}</p>
                        </button>
                    </li>
                    ))}
                </ul>
            )}
            </div>
    );
}

export default searchBar;
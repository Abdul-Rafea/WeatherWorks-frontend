import { useState, useEffect, useContext, useRef } from "react";
import { WeatherContext } from "./WeatherContext";

//shadcn components: -
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

//lucide components: -
import {
    LocateFixed, 
    Menu,
    Info,
    MessageSquareText, 
    Thermometer, 
    ThermometerSnowflake,
    Umbrella,
    SprayCan,
    Waves,
    Gauge,
    Wind,
    Sun,
    Moon,
    Search,
    X,
    RotateCcw,
} from "lucide-react";

//motion components: -
// eslint-disable-next-line
import { motion, AnimatePresence } from "motion/react";

//react-icons components: -
import { 
  WiDaySunny,
  WiNightClear,
  WiRain,
  WiSnow, 
  WiSleet, 
  WiStrongWind, 
  WiFog, 
  WiCloudy, 
  WiDayCloudy, 
  WiNightAltCloudy,
  WiThunderstorm, 
  WiRainMix, 
  WiDust,
} from "react-icons/wi";

//main components: -
import Portal from "./generatePortal";
import Header from "./header";
import api from "./api";

const iconMap = (index, Class) =>{
    const maping = {
        "clear-day": <WiDaySunny className={`${Class} text-yellow-400`} />,
        "clear-night": <WiNightClear className={`${Class} text-blue-200`} />,
        "rain": <WiRain className={`${Class} text-blue-400`} />,
        "snow": <WiSnow className={`${Class} text-white`} />,
        "sleet": <WiSleet className={`${Class} text-cyan-200`}  />,
        "wind": <WiStrongWind className={`${Class} text-gray-300`} />,
        "fog": <WiFog className={`${Class} text-gray-300`} />,
        "cloudy": <WiCloudy className={`${Class} text-gray-400`} />,
        "partly-cloudy-day": <WiDayCloudy className={`${Class} text-yellow-200`} />,
        "partly-cloudy-night": <WiNightAltCloudy className={`${Class} text-gray-500`} />,
        "thunderstorm": <WiThunderstorm className={`${Class} text-purple-500`} />,
        "hail": <WiRainMix className={`${Class} text-blue-100`} />,
        "smoke": <WiDust className={`${Class} text-orange-200`} />,
        "dust": <WiDust className={`${Class} text-orange-300`} />
    };

    return maping[index];
}

const iconToTitle = {
  "clear-day": "Clear",
  "clear-night": "Clear",
  "rain": "Rainy",
  "snow": "Snowy",
  "sleet": "Sleet",
  "wind": "Windy",
  "fog": "Foggy",
  "cloudy": "Cloudy",
  "partly-cloudy-day": "Partly Cloudy",
  "partly-cloudy-night": "Partly Cloudy",
  "thunderstorm": "Thunderstorm",
  "hail": "Hail",
};

function Dashboard(){

    const {
        setIsLoading,
        setShowNotification,
        setNotificationMsg,
        setNotificationError,
        tempUnit,
    } = useContext(WeatherContext);
    
    const [searchPopUp, setSearchPopUp] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [weatherData, setWeatherData] = useState(() =>{
        const lastWeather = localStorage.getItem("lastWeather");
        return lastWeather ? JSON.parse(lastWeather) : null;
    });
    const [weatherInfo, setWeatherInfo] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchRef = useRef(null);
    const [city, setCity] = useState(() =>{
        const lastCity = localStorage.getItem("lastCity");
        return lastCity || null;
    });
    const [lat, setLat] = useState(() =>{
        const storedLat = localStorage.getItem("lat");
        return storedLat ? parseFloat(storedLat) : null;
    });
    const [lon, setLon] = useState(() =>{
        const storedLon = localStorage.getItem("lon");
        return storedLon ? parseFloat(storedLon) : null;
    });

    const aqiMessage = weatherData?.currentData?.aqiMessage;
    let aqiTextColor = "";
    if(aqiMessage === "Good") aqiTextColor= "text-green-500";
    else if(aqiMessage === "Moderate") aqiTextColor = "text-yellow-500";
    else if (aqiMessage === "Unhealthy") aqiTextColor = "text-red-500";
    else if(aqiMessage === "Very Unhealthy") aqiTextColor = "text-purple-500";
    else if(aqiMessage === "Hazardous")aqiTextColor = "text-blue-500";
    else aqiTextColor = "text-offWhite";

    const uvMessage = weatherData?.currentData?.uvMessage;
    let uvTextColor = "";
    if(uvMessage === "Low") uvTextColor = "text-green-500";
    else if(uvMessage === "Moderate") uvTextColor = "text-yellow-500";
    else if(uvMessage === "High") uvTextColor = "text-red-500";
    else if(uvMessage === "Very High") uvTextColor = "text-purple-500";
    else if(uvMessage === "Extreme") uvTextColor = "text-blue-500";
    else uvTextColor = "text-black";

    const mainTemp = weatherData?.currentData?.temp;
    let tempColor = "";
    if(mainTemp <=10) tempColor = "text-blue-500";
    else if(mainTemp <=30) tempColor = "text-yellow-500";
    else if(mainTemp >30) tempColor = "text-red-500";
    else tempColor = "text-offWhite";

    const rainChance = weatherData?.currentData?.rainChance;
    let rainChanceColor = "";
    if(rainChance <= 50) rainChanceColor = "text-green-500";
    else if(rainChance > 50) rainChanceColor = "text-red-500"

    useEffect(() =>{
        const handleClickOutside = (event) =>{
            if(searchRef.current && !searchRef.current.contains(event.target)){
                setShowSearchResults(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() =>{
        if(!weatherData) setSearchPopUp(true);
    }
    , [weatherData]);

    const handleMoreInfo = () =>{
        if(weatherInfo){
            setWeatherInfo(false);
        }
        else{
            setWeatherInfo(true);
        }
    }

    const openSidebar = () =>{
        if(showSidebar){
            setShowSidebar(false);
        }
        else{
            setShowSidebar(true);
        }
    }

    useEffect(() =>{
        if(!searchQuery || searchQuery.trim().length < 2){
            setSearchResults(null);
            return;
        }

        const searchDelay = setTimeout(() =>{
            handleSearch();
        }, 2000);

        return () => clearTimeout(searchDelay);
        // eslint-disable-next-line
    }, [searchQuery]);

    const handleSearch = async() =>{
        try{
            setSearchLoading(true);

            const response = await api.post("/city-search", { searchQuery });
            const result = await response.data;
            setSearchResults(result);

            console.log(result);
        }
        catch(error){
            setNotificationError(true);
            setNotificationMsg(error.response?.data?.message || "Cant connect to server");
            setShowNotification(true);
        }
        finally{
            setSearchLoading(false);
        }
    }

    const getCoords = () =>{
        setIsLoading(true);
        
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(
            (position) =>{
                const {latitude, longitude} = position.coords;

                console.log("Location obtained:", latitude, longitude);
                fetchWeatherData(latitude, longitude, true);

                localStorage.setItem("lat", latitude);
                localStorage.setItem("lon", longitude);
            },
            (error) =>{
                setIsLoading(false);
                setShowNotification(true);
                setNotificationError(true);
                if (error.code === 1){
                    setNotificationMsg("Please enable location in browser settings.");
                }            
                else if (error.code === 2){
                    setNotificationMsg("Location unavailable. Try searching manually.");
                }
                else if (error.code === 3){
                    setNotificationMsg("Location request timed out.");
                }
                else{
                    setNotificationMsg("Can't acess your location, please search mannually");
                }
            }, options);
    }

    const fetchWeatherData = async (lat, lon, reverseGeocoding = false) =>{
        if(lat == null || lon == null){
            setShowNotification(true);
            setNotificationMsg("Cannot acess yout location, please search mannually");
            setNotificationError(true);
            
            return;
        }

        try{
            setIsLoading(true);

            const response = await api.post("/weather", {
                lat: lat,
                lon: lon,
                reverseGeocoding: reverseGeocoding,
                unit: tempUnit || "C",
            });
            const result = await response.data;
            console.log("weather data fetching sucess!");

            setWeatherData(result);
            setLat(lat);
            setLon(lon);
            if(reverseGeocoding){
                setCity(result?.geoDataInfo?.city + ", " + result?.geoDataInfo?.country || null);
            }

            localStorage.setItem("lastWeather", JSON.stringify(result));
            console.log(result);

            if(searchPopUp) setSearchPopUp(false);
        }
        catch(error){
            setIsLoading(false);
            setShowNotification(true);
            setNotificationMsg(error.response?.data?.message || "Server error, please try again later");
            setNotificationError(true);

            console.error("Error fetching weather data:", error);
        }
                                
        finally{
            setIsLoading(false);
        }
    }

    const SearchBar = () =>{
        return(
            <div 
                ref={searchRef}
                className="relative w-9/10 flex flex-col items-center"
            >
                {searchLoading ? (
                    <Spinner className="absolute size-6 text-Wasabi3 z-20 right-3 top-1/2 -translate-y-1/2" />
                ):
                (
                    <Search className="absolute size-6 text-Wasabi3 z-20 right-3 top-1/2 -translate-y-1/2" />
                )}
                <Input 
                    type="text" 
                    placeholder="Type city here" 
                    className="z-10 bg-black/60"
                    value={searchQuery}
                    onFocus={() => setShowSearchResults(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                >
                </Input>
                {searchResults && showSearchResults && (
                    <div className="absolute translate-y-full bottom-0 left-0 p-2 w-full bg-Wasabi3 flex flex-col items-start gap-2 rounded-b-lg">
                        {searchResults?.results?.map((index) =>{
                            return(
                                <button 
                                    key={index.lat}
                                    className="text-black text-base font-Andika rounded-sm p-1"
                                    onClick={()=>{
                                        setLat(index.lat);
                                        setLon(index.lon);
                                        setCity(index.city + ", " + index.country);
                                        fetchWeatherData(index.lat, index.lon);

                                        localStorage.setItem("lat", index.lat);
                                        localStorage.setItem("lon", index.lon);
                                        localStorage.setItem("lastCity", index.city + ", " + index.country);

                                        setShowSearchResults(false);   
                                    }}
                                >
                                    {"-  " + index.city + ", " + index.country}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen relative flex justify-start items-center flex-col">
            <Header isDashboard={true} />
            <motion.div
                initial={{ x: "-85%" }}
                animate={{ x: showSidebar? 0 : "-85%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-60 h-screen fixed left-0 z-50 mt-13 bg-black/80"

            >
                <div className="w-full flex justify-end pt-1 pr-1">
                <button onClick={openSidebar}>
                    <Menu className="size-8 text-offWhite" />
                </button>
                </div>
            </motion.div>
            <div className="mt-15 ml-9 p-2 w-full flex flex-col items-center">
                {SearchBar()}
            </div>
            <section className="ml-9 p-2 w-full flex flex-col items-center">
                {searchPopUp? (
                    <div className="w-9/10 h-1/2-screen p-3 flex flex-col items-center gap-3 bg-black/50 rounded-xl">
                        <p className="text-lg text-offWhite font-Andika text-nowrap">
                            Search Soemthing to get startted
                        </p>
                        {SearchBar()}
                        <Button 
                            size="sm" 
                            className="bg-Wasabi text-black text-lg font-Andika border border-black"
                            onClick={getCoords}
                        >
                            <LocateFixed className="size-5" />
                            Use Current Location
                        </Button>
                    </div>
                ):
                (
                    <div className="p-3 w-9/10 bg-black/70 rounded-lg flex flex-col justify-center items-center">
                        <div className="w-full text-sm text-gray-400 font-Andika flex justify-between">
                            <p>last updated: {weatherData?.currentData?.time + ", " + weatherData?.currentData?.date || "Not found"}</p>
                            <button onClick={()=>{
                                if(city) fetchWeatherData(lat, lon)
                                else getCoords();
                                }}
                            >
                                <RotateCcw />
                            </button>
                        </div>
                        <div className="mb-3 pl-1 w-full text-offWhite text-lg font-Andika">
                                {city || weatherData?.geoDataInfo?.city + ", " + weatherData?.geoDataInfo?.country}
                        </div>
                        <div>
                            {iconMap(weatherData?.currentData?.icon, "size-30") || iconMap("clear-day", "size-30")}
                        </div>
                        <div className="-mt-3 mb-1 pl-2 pr-2 w-full text-Wasabi3 text-xl font-Andika flex justify-between">
                            <div className="flex gap-2">
                                {weatherData?.currentData?.timeOfDay === "day"? (
                                    <>
                                        <Sun className="size-7" />
                                        Day
                                    </>
                                ):
                                (
                                    <>
                                        <Moon className="size-7" />
                                        Night        
                                    </>
                                )}
                            </div>
                            <div>
                                {iconToTitle[weatherData?.currentData?.icon] || iconToTitle["clear-day"]}
                            </div>
                        </div>
                        <h1 className="text-5xl text-offWhite font-Andika">
                            {(weatherData?.currentData?.temp ?? "Not found") + " " + tempUnit }
                        </h1>
                        <p className="mt-3 mb-5 w-9/10 text-sm text-center text-Wasabi font-Andika flex justify-center">
                            {weatherData?.weekData[0]?.summary || "Not found"}
                        </p>
                        <div className="w-8/10 flex flex-col items-start gap-1">
                            <div className="text-base font-Andika text-offWhite flex gap-2">
                                <ThermometerSnowflake />
                                Feels Like: {(weatherData?.currentData?.feelsLike ?? "Not Foumd") + " " + tempUnit}
                            </div>
                            <div className="text-base font-Andika text-offWhite flex gap-2 text-nowrap">
                                <Umbrella />
                                Rain Chance: {weatherData?.currentData?.rainChance ?? "(Not found)"}%
                            </div>
                            <div className={`text-lg font-Andika ${aqiTextColor} flex gap-2`}>
                                <SprayCan />
                                Air Quality: {weatherData?.currentData?.aqiMessage || "Not found"}
                            </div>
                        </div>
                        <AnimatePresence>
                            {weatherInfo && (
                                <motion.div
                                    initial={{ y: "-100%", opacity: 0 }}
                                    animate={{ y: weatherInfo? 0 : "-100%", opacity: 1 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    exit = {{y: "-100", opacity: 0}}
                                    className="mt-2 w-9/10 rounded-md bg-Wasabi3 text-base text-black font-Andika p-2 flex flex-col items-start gap-1"
                                >
                                    <div className="text-base font-Andika texct-black flex gap-2">
                                        <Waves />
                                        Humidity: {weatherData?.currentData?.humidity || "Not found"}%
                                    </div>
                                    <div className="text-base font-Andika texct-black flex gap-2">
                                        <Gauge />
                                        Pressure: {weatherData?.currentData?.pressure || "Not found"} hPa
                                    </div>
                                    <div className="text-base font-Andika texct-black flex gap-2">
                                        <Wind />
                                        Wind Speed: {weatherData?.currentData?.windSpeed || "Not found"}{tempUnit === "C"? "kph" : "mph"}
                                    </div>
                                    <div className={`text-base font-Andika text-${uvTextColor} flex gap-2`}>
                                        <Sun />
                                        UV Index: {weatherData?.currentData?.uvMessage || "Not found"}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="mt-5 w-full flex justify-start">
                            <Button 
                                size="sm" 
                                className="bg-Wasabi text-sm text-black"
                                onClick={handleMoreInfo}    
                            >
                                {weatherInfo? (
                                    <X />
                                ):
                                (
                                    <>
                                        <Info />
                                        See more details
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )
                }
            </section>
            <section className="ml-9 p-3 w-full flex flex-col items-center">
                <div className="w-85/100 bg-black/60 rounded-lg p-3">
                    <Carousel 
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="ml-0 gap-3">
                            {weatherData?.weekData?.slice(1).map((dayData) =>{
                                return(
                                    <CarouselItem
                                        key={dayData.day}
                                        className=" p-1 basis-1/2 bg-black/80 flex flex-col items-center gap-1 rounded-xl border-2 border-Wasabi"
                                    >
                                        <p className="text-offWhite text-lg1 font-Andika">{dayData.day || "Not Found"}</p>
                                        <div className="w-full flex justify-center items-center">
                                            {iconMap(dayData.icon, "size-15") || iconMap("clear-day", "size-20")}
                                        </div>
                                        <p className="-mt-4 text-Wasabi3 text-lg">{iconToTitle[dayData.icon] ||iconToTitle["clear-day"] }</p>
                                        <p className="text-offWhite text-2xl font-Andika">{(dayData.avgTemp || "0") + " " + tempUnit}</p>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <CarouselPrevious className="size-7 left-0 -translate-x-full" />
                        <CarouselNext className="size-7 right-0 translate-x-full" />
                    </Carousel>
                </div>
            </section>
        </div>
    );
}
export default Dashboard;
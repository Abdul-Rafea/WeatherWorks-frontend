import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { BsSunrise } from 'react-icons/bs';
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/weather', async (req, res) => {
    try{
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;
        const weatherAPI_key = process.env.WEATHER_API_KEY;
        const aqiAPI_key = process.env.AQI_API_KEY;
        const Days = 3;
    
        const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPI_key}&q=${latitude},${longitude}&days=${Days}&aqi=no&alerts=no`);
        console.log("Weather API: Sucess")

        const aqiResponse = await axios.get(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqiAPI_key}`);
        console.log("Aqi API: Sucess")

        //Week data handling: -
        const allForecastDays = weatherResponse.data.forecast.forecastday;
        const futureForecastDays = allForecastDays.slice(1, 3);

        const forecastData = futureForecastDays.map((item) => {
            let dateStr = item.date;
            let dateValue = new Date(dateStr);
            let dayName = dateValue.toLocaleDateString('en-US', { weekday: 'short' });

            return {    
                day: dayName,
                avgTempC: Math.round(item.day.avgtemp_c),
                abgTempF: Math.round(item.date.avgtemp_f),
                text: item.day.condition.text,
                icon: item.day.condition.icon,
            };
        });

        //current day: -
        const dateStr = weatherResponse.data.location.localtime;
        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        //precipitation data handling: -
        const precipData = weatherResponse.data.forecast.forecastday[0].hour.map((item) => ({
            time: item.time.split(' ')[1],
            precip: item.precip_mm
        }))        

        //Final data/JSON response: -
        res.json({
            city: weatherResponse.data.location.name,
            aqi: aqiResponse.data.data.aqi,
            weatherCode: weatherResponse.data.forecast.forecastday[0].day.condition.code,
            weatherText: weatherResponse.data.forecast.forecastday[0].day.condition.text,
            tempC: Math.round(weatherResponse.data.current.temp_c),
            tempF: Math.round(weatherResponse.data.current.temp_f),
            windSpeedMPH: weatherResponse.data.current.wind_mph,
            windSpeedKPH:weatherResponse.data.current.wind_kph,
            pressure: weatherResponse.data.current.pressure_mb,
            humidity: Math.round(weatherResponse.data.current.humidity),
            feelsLikeC: Math.round(weatherResponse.data.current.feelslike_c),
            feelsLikeF: Math.round(weatherResponse.data.current.feelslike_f),
            windKPH: Math.round(weatherResponse.data.current.wind_kph),
            windMPH: Math.round(weatherResponse.data.current.wind_mph),
            uv: weatherResponse.data.current.uv,
            timeOfDay: weatherResponse.data.current.is_day,
            day: dayName,
            icon: weatherResponse.data.current.condition.icon,
            precipData: precipData,
            sunrise: weatherResponse.data.forecast.forecastday[0].astro.sunrise,
            sunset: weatherResponse.data.forecast.forecastday[0].astro.sunset,
            weekData: forecastData,
        });
    }
    catch (error){
        console.error(error.message);
        res.status(500).json({message: "API error"});
    }
    });

app.get('/city-search', async (req, res) => {
    try{
        const geoAPI_key = process.env.GEO_API_KEY;
        const cityText = req.query.cityText;
        
        const geoResponse = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${cityText}&limit=5&format=json&apiKey=${geoAPI_key}`);
        
        const loactaions = geoResponse.data.results.map((item) => ({
            city: item.city,
            country: item.country,
            lat: item.lat,
            lon: item.lon,
        }));
        
        res.json(loactaions);
    }
    catch (error){
        console.error(error.message);
        res.status(500).json({message: "City search failed"});
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)});
// netstat -ano | findstr :5000
// taskkill /F /PID 1234 
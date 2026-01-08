import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/weather', async (req, res) => {
    try{
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;
        console.log(latitude);
        const weatherAPI_key = process.env.WEATHER_API_KEY;
        const aqiAPI_key = process.env.AQI_API_KEY;
    
        const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPI_key}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`);
        console.log("Weather API: Sucess")

        const aqiResponse = await axios.get(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqiAPI_key}`)
        console.log("Aqi API: Sucess")

        //week Data handling: -
        const forecastData = weatherResponse.data.forecast.forecastday.map((item) => ({
            date: item.date,
            avgTempC: item.day.avgtemp_c,
            abgTempF: item.date.avgtemp_f,
            text: item.day.condition.text,
            code: item.day.condition.text,
        }))
        
        res.json({
            city: weatherResponse.data.location.name,
            aqi: aqiResponse.data.data.aqi,
            weatherCode: weatherResponse.data.forecast.forecastday[0].day.condition.code,
            weatherText: weatherResponse.data.forecast.forecastday[0].day.condition.text,
            tempC: weatherResponse.data.current.temp_c,
            tempF: weatherResponse.data.current.temp_f,
            windSpeedMPH: weatherResponse.data.current.wind_mph,
            windSpeedKPH:weatherResponse.data.current.wind_kph,
            pressure: weatherResponse.data.current.pressure_mb,
            humidity: weatherResponse.data.current.humidity,
            feelsLikeC: weatherResponse.data.current.feelslike_c,
            feelsLikeF: weatherResponse.data.current.feelslike_f,
            windKPH: weatherResponse.data.current.wind_kph,
            windMPH: weatherResponse.data.current.wind_mph,
            uv: weatherResponse.data.current.uv,
            timeOfDay: weatherResponse.data.current.is_day
        });
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({message: "API error"});
    }
    });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)});

// netstat -ano | findstr :5000
// taskkill /F /PID 1234 
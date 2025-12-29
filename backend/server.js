import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5000

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try{
        const city = "London"
        const weatherAPI_key = process.env.WEATHER_API_KEY;
        const aqiAPI_key = process.env.AQI_API_KEY;
    
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPI_key}&q=${city}&days=1&aqi=no&alerts=no`);
        console.log("Weather API: Sucess")

        const aqiResponse = await axios.get(`https://api.waqi.info/feed/${city}/?token=${aqiAPI_key}`)
        console.log("Aqi API: Sucess")
        
        res.json({
            weather: response.data,
            aqi: aqiResponse.data
        });
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({message: "found or API error"});
    }
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)});

// netstat -ano | findstr :5000
// taskkill /F /PID 1234 
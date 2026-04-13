import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import pool from './db.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from "path";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { json } from 'stream/consumers';
import { get } from 'http';
import { time } from 'console';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {filesize: 2 * 1024 * 1024 }, //computer only understand bytes :(
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png/; // Regex/search pattren
        const mimetype = filetypes.test(file.mimetype); // checks internal lable aka mimetype
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // checks actual extension

        if (mimetype && extname){
            return cb(null, true);
        } 

        cb(new Error("Error: file upload only supports images (jpeg, jpg, png), or make sure file size is under 2 mb"));
    }
});

//JWT token verifier: -
const auth = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        return res.status(401);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedPayload) =>{
        if (error){
            return res.status(403);
        }

        req.user = decodedPayload;
        next();
    });
}

app.get('/', (req, res) => {
    res.send("Wasabi X Backend is running successfully!");
});

app.post('/weather', async (req, res) => {
    const {
        lat,
        lon,
        reverseGeocoding,
        unit,
    } = req.body;

    const aqiAPI_key = process.env.AQI_API_KEY;
    const weatherAPI_key = process.env.WEATHER_API_KEY;

    //units handling: -
    let units = null;
    if (unit === "F"){
        units = "us";
    }
    else{
        units = "ca";
    }
    
    try{
        const weatherResponse = await axios.get(`https://api.pirateweather.net/forecast/${weatherAPI_key}/${lat},${lon}?units=${units}&exclude=minutely,hourly&version=2`);
        const weatherData = weatherResponse.data;
        console.log("Weather API response: True");
        if(!weatherData){
            console.error("Weather API response: False");
            res.status(404).json({message: "Weather data not found"});
        }
        
        let geoData = null;
        if(reverseGeocoding){
            const geoResponse = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.GEO_API_KEY}`);
            geoData = geoResponse.data;
            console.log("Reverse geocoding API response: True");
            if(!geoData){
                console.error("Reverse geocoding API response: False");
            }
        }
        
        const aqiResponse = await axios.get(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${aqiAPI_key}`);
        const aqiData = aqiResponse.data;
        console.log("AQI API response: True");
        if(!aqiData){
            console.error("AQI API response: False");
        }
        
        //handling current data:-
        const time = weatherData?.currently?.time * 1000;
        const sunriseTime = weatherData?.daily?.data[0]?.sunriseTime * 1000;
        const sunsetTime = weatherData?.daily?.data[0]?.sunsetTime * 1000;
        const aqi = aqiData?.data?.aqi;
        const uvIndex = weatherData?.currently?.uvIndex;
        let aqiMessage = "";
        let uvMessage = "";
        let timeOfDay = "";
        let geoDataInfo = null;

        const getDayName = (dateString) => {
            const date = new Date(dateString * 1000);
            return date.toLocaleDateString('en-US', { weekday: 'long' });
        };

        const getTime = (dateString) => {
            const time = new Date(dateString * 1000);
            return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }

        const getDate = (dateString) => {
            const date = new Date(dateString * 1000);
            return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
        
        if(time >= sunriseTime && time < sunsetTime) timeOfDay = "Day";
        else if(time >= sunsetTime) timeOfDay = "Night";
        else timeOfDay = "Unknown";
        console.log("Time handling: True");
        
        if(aqi <= 50) aqiMessage = "Good";
        else if(aqi > 50 && aqi <= 150) aqiMessage = "Moderate";
        else if(aqi > 150 && aqi <= 200) aqiMessage = "Unhealthy";
        else if(aqi > 200 && aqi <= 300) aqiMessage = "Very Unhealthy";
        else if(aqi > 300) aqiMessage = "Hazardous";
        else aqiMessage = "Unknown";
        console.log("AQI handling: True");

        if(uvIndex >= 0 && uvIndex < 3) uvMessage = "Low";
        else if(uvIndex >= 3 && uvIndex < 6) uvMessage = "Moderate";
        else if(uvIndex >= 6 && uvIndex < 8) uvMessage = "High";
        else if(uvIndex >= 8 && uvIndex < 11) uvMessage = "Very High";
        else if(uvIndex >= 11) uvMessage = "Extreme";
        else uvMessage = "Unknown";

        console.log("UV index handling: True");

        const currentData = {
            time: getTime(weatherData?.currently?.time),
            date: getDate(weatherData?.currently?.time),
            day: getDayName(weatherData?.currently?.time),
            temp: weatherData?.currently?.temperature,
            feelsLike: weatherData?.currently?.feelsLike,
            icon: weatherData?.currently?.icon,
            rainChance: (weatherData?.currently?.precipProbability) * 100,
            humidity: (weatherData?.currently?.humidity) * 100,
            pressure: weatherData?.currently?.pressure,
            windSpeed: weatherData?.currently?.windSpeed,
            uvMessage: uvMessage,
            timeOfDay: timeOfDay, 
            aqiMessage: aqiMessage,
        };
        console.log("Current data handling: True");
        
        if(geoData?.features[0]?.properties.city && geoData?.features[0]?.properties.country){
            geoDataInfo = {
                city: geoData?.features[0]?.properties?.city || "Unknown",
                country: geoData?.features[0]?.properties?.country || "Unknown",
            }
        }
        console.log("Geo data handling: True");

        //handling week data: - 
        let aqiWeekData = null;

        const weekData = weatherData?.daily?.data.map((day) => {
            const avgTemp = (day.temperatureMax + day.temperatureMax) / 2;

            return {
                summary: day.summary,
                day: getDayName(day.time),
                icon: day.icon,
                sunrise: getTime(day.sunriseTime),
                sunset: getTime(day.sunsetTime),
                rainChance: day.precipProbability * 100,
                hyumidity: day.humidity * 100,
                pressure: day.pressure,
                windSpeed: day.windSpeed,
                uvIndex: day.uvIndex,
                avgTemp: avgTemp,
                minTep: day.temperatureMin,
                maxTemp: day.temperatureMax,
            }
        });
        console.log("Week data handling: True");

        if(aqiData?.data?.forecast?.daily?.pm25){
            const today = new Date().toISOString().split('T')[0];
                aqiWeekData = aqiData?.data?.forecast?.daily?.pm25.filter((index) =>(index.day >= today)).map((dayObject) =>{
                return {
                    aqi: dayObject.avg,
                }
            })
        }
        console.log("AQI week data handling: True");

        return res.status(200).json({
            currentData: currentData,
            weekData: weekData,
            aqiWeekData: aqiWeekData,
            aqiMessage: aqiMessage,
            uvMessage: uvMessage,
            geoData: geoDataInfo,
        });
    }
    catch (error){
        console.error(error.message);
        return res.status(500).json({message: "Failed to fetch weather data" });
    }
    });

app.post('/city-search', async (req, res) => {
    try{
        const geoAPI_key = process.env.GEO_API_KEY;
        const { searchQuery } = req.body;
        
        const geoResponse = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchQuery}&limit=5&format=json&apiKey=${geoAPI_key}`);        
        
        const searchResults = geoResponse?.data?.results?.map((index) => ({
            country: index.country,
            city: index.city,
            lat: index.lat,
            lon: index.lon,
        }));
        
        res.status(200).json({
            results: searchResults,    
        });
    }
    catch (error){
        console.error(error.message);
        res.status(500).json({message: "Failed to indentify city" });
    }
});

app.post('/signup', async (req, res) => {
    const {email, password, username, terms} = req.body;
    const sqlQuery = `
            INSERT INTO users (email, password, username, terms)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, created_at, username;
        `;
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(sqlQuery, [email, hashedPassword, username, terms]);
        const userData = result.rows[0];

        //Creating a JWT token here: -
        const payload = {
            userId: userData.id,
            username: username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "5h"});

        res.status(201).json({
            token: token,
            userId: userData.id,
            username: userData.username,
            message: "User sucessfully registred",
        });
    }
    catch (err){
        let errorMessage = "";

        console.error(err);

        if(err.code == '23505'){
            errorMessage = "Email or username already exists";
        }
        else{
            errorMessage = "Unable to register User";
        }

        res.status(500).json({
            message: errorMessage,
        });
    }
});

app.post('/login', async (req, res) => { 
    const {email, password, username, useEmail} = req.body;
    let value = null;
    let userQuery = null;
    let isPasswordValid = false;

    if (useEmail){
        userQuery = `SELECT * FROM users WHERE email = $1`;
        value = email;
    }
    else{
        userQuery = `SELECT * FROM users WHERE username = $1`;
        value = username;
    }
    
    try{
        const result = await pool.query(userQuery, [value]);

        if (result.rows.length === 0){
            return res.status(401).json({
                message: "User does not exist",
            });
        }

        const user = result.rows[0];

        if (user){
            isPasswordValid = await bcrypt.compare(password, user.password);
        }

        if (!isPasswordValid){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        
        //Creating a JWT token: -
        const payload = {
            userId: user.id,
            userName: user.username
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "24h"});
        
        //converting avatar back: -
        let imageBase64 = null;
        if(user.avatar_path){
            imageBase64 = `data:image/png;base64,${user.avatar_path.toString('base64')}`;
        }

        res.status(200).json({
            username: user.username,
            token: token,
            message: "Loged In successfully",
            avatar: imageBase64,
        });
    }
    catch (err){
        console.error(err.message);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

app.post('/change-avatar', auth, upload.single('avatar'), async (req, res) =>{
    try{
        const avatar = req.file.buffer;
        const userId = req.user.userId;

        const result = await pool.query(`
            UPDATE users
            SET avatar_path = $1 WHERE id = $2
            RETURNING avatar_path;
        `, [avatar, userId]);

        const user = result.rows[0];
        
        if(!user){
            res.status(404).jsom({
                message: "User not found",
            });
        }

        let imageBase64 = null;
        if(user.avatar_path){
            imageBase64 = `data:image/png;base64,${user.avatar_path.toString('base64')}`;
        }
        res.status(200).json({
            message: "Avatar sucessfully changed",
            avatar: imageBase64,
        });
    }
    catch (err){
        console.error(err);
        res.status(500).json({
            message: "Failed to change avatar",
        });
    }
});

app.post('/update-username', auth, async (req, res) =>{
    try{
        const username = req.user.userName;
        const newUsername = req.body.newUsername;
        const password = req.body.password;

        const result = await pool.query(`SELECT password_hash FROM users WHERE username = $1`, [username]);
        
        if (result.rows.length === 0){
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        const checkPasswordHash = await bcrypt.compare(password, result.rows[0].password_hash);
        
        if (!checkPasswordHash){
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        const result2 = await pool.query(`UPDATE users SET username = $1 WHERE username = $2
            RETURNING username`, [newUsername, username]);

        //Updating JWT token with new username: -
        const newToken = jwt.sign({
            userId: req.user.userId,
            userName: result2.rows[0].username,
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: "24h"}
        );
        
        res.status(200).json({
            message: "Username updated successfully",
            newUsername: result2.rows[0].username,
            token: newToken,
        });
    }
    catch (err){
        console.error(err);
        res.status(500).json({
            message: "Failed to change username",
        });
    }
});

// app.get('/user-count', async (res, req) =>{
//     try{
//         const result = await pool.query(`SELECT COUNT(*) FROM users`);
//         const totalUsers = result.rows[0].count;
        
//         res.status(200).json({
//             totalUsers: parseInt(totalUsers)
//         });
//     }
//     catch (err){
//         console.error("Failed to fetch user count:", err.message);
//         res.status(500).json({
//             message:"Server Error"
//         });
//     }

// });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)});


// netstat -ano | findstr :5000
// taskkill /F /PID 1234
import 'dotenv/config';

import express from 'express';
const app = express();
app.use(express.json());

import cors from 'cors';
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));

import cookieParser from 'cookie-parser';
app.use(cookieParser());

import axios from 'axios';
import bcrypt from 'bcryptjs';
import pool from './db.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from "path";
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

const port = process.env.PORT;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {filesize: 2 * 1024 * 1024 }, //computer only understand bytes :(
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png/; // Regex/search pattren
        const mimetype = filetypes.test(file.mimetype); // checks internal label aka mimetype
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // checks actual extension

        if (mimetype && extname){
            return cb(null, true);
        } 

        cb(new Error("Error: file upload only supports images (jpeg, jpg, png), or make sure file size is under 2 mb"));
    }
});

//JWT verificafion middleware: -
const auth = (req, res, next) =>{
    console.log("Authorization: ");

    const token = req.cookies.token || null;

    if(!token){
        console.error("   -no token found!");
        return res.status(401).json({
            message: "Authorization denied",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedPayload) =>{
        if (error){
            console.error("   -expired token: ", error);
            return res.status(403).json({
                message: "Expired Session"
            });
        }

        req.user = decodedPayload;
        next();
    });

    console.log("   ---authorization sucessfull");
}

app.get('/', (req, res) => {
    res.send("Wasabi X Backend is running successfully!");
});

app.get('/verify-session', auth, (req, res) =>{
    res.status(200).json({
        loggedIn: true,
        username: req.user.username,
    });
});

app.post('/signup', async (req, res) => {
    console.log("Signup: ");

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

        if(!userData.id && !userData.username){
            res.status(400).json({
                message: "Database Error"
            });
            console.error("   -database error!");
        }

        //Creating JWT token and cookie: -
        const payload = {
            userId: userData.id,
            username: username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "5h"});
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 6 * 60 * 60 * 1000,
            sameSite: 'lax',
        });

        console.log("   ---signup suncess");
        res.status(201).json({
            token: token,
            userId: userData.id,
            username: userData.username,
            message: "User sucessfully registred",
        });
    }
    catch (error){
        let errorMessage = "";


        if(err.code == '23505'){
            errorMessage = "Email or username already exists";
        }
        else{
            errorMessage = "Unable to register User";
        }

        console.error("   ---signup failed: ", error);

        res.status(500).json({
            message: errorMessage,
        });

    }
});

app.post('/change-avatar', auth, upload.single('avatar'), async (req, res) =>{
    console.log("Change Avatar: ");

    try{
        const avatar = req.file.buffer;
        const userId = req.user.userId;

        const result = await pool.query(`
            UPDATE users
            SET avatar_path = $1 WHERE id = $2
            RETURNING avatar_path;
        `, [avatar, userId]);

        const user = result.rows[0];
        
        if(!user && !user.avatar_path){
            console.error("   -datbase error!")
            res.status(404).json({
                message: "User not found",
            });
        }

        let imageBase64 = null;
        if(user.avatar_path){
            imageBase64 = `data:image/png;base64,${user.avatar_path.toString('base64')}`;
        }
        
        console.log("   ---avatar change sucessfull")
        res.status(200).json({
            message: "Avatar sucessfully changed",
            avatar: imageBase64,
        });
    }
    catch (err){
        console.error("   ---avatar change failed: ",err);
        res.status(500).json({
            message: "Failed to change avatar",
        });
    }
});

app.post('/login', async (req, res) => { 
    console.log("Login: ");

    const {email, password, username, useEmail} = req.body;
    let value = null;
    let userQuery = null;

    if (useEmail){
        userQuery = `SELECT * FROM users WHERE email = $1`;
        value = email;
    }
    else if(username){
        userQuery = `SELECT * FROM users WHERE username = $1`;
        value = username;
    }
    else{
        console.error("   -username and email not found");
        res.status(400).json({
            message: "Server Error!"
        });
    }
    
    try{
        const result = await pool.query(userQuery, [value]);
        const user = result.rows[0];

        if (user && result.rows.length === 0 && user.password){
            console.error("   -database error!");
            return res.status(401).json({
                message: "User does not exist",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            console.error("   -invalid password");
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        
        //converting avatar back to imageBase64: -
        let imageBase64 = null;
        if(user.avatar_path){
            imageBase64 = `data:image/png;base64,${user.avatar_path.toString('base64')}`;
        }

        //Creating a JWT token and cookie: -
        const payload = {
            userId: user.id,
            userName: user.username
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "24h"});
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 6 * 60 * 60 * 1000,
            sameSite: 'lax',
        });

        res.status(200).json({
            username: user.username,
            token: token,
            message: "Loged In successfully",
            avatar: imageBase64,
        });

        console.log("   ---login sucessfull");
    }
    catch (error){
        console.error("   ---login failed: ",error);
        res.status(500).json({
            message: "Failed to log in user",
        });
    }
});

app.post('/weather',auth, async (req, res) => {
    console.log("Weather Data: ");

    const aqiAPI_key = process.env.AQI_API_KEY;
    const weatherAPI_key = process.env.WEATHER_API_KEY;
    const {
        lat,
        lon,
        reverseGeocoding,
        unit,
    } = req.body;

    let units = null;
    if (unit === "F"){
        units = "us";
    }
    else{
        units = "ca";
    }

    let weatherData = null;
    let geoData = null;
    let aqiData = null;

    try{
        const weatherResponse = await axios.get(`https://api.pirateweather.net/forecast/${weatherAPI_key}/${lat},${lon}?units=${units}&exclude=minutely,hourly&version=2`,{
            headers: { "User-Agent": 'Mozilla/5.0'}
        });
        if(weatherResponse?.data?.currently && weatherResponse?.data?.daily && weatherResponse?.data?.daily?.data){
            weatherData = weatherResponse.data;
        }
        console.log("   -weather API sucess: ", weatherData.status);

        if(reverseGeocoding){
            try{
                const geoResponse = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.GEO_API_KEY}`, {
                    timeout: 5000,
                    headers: { "User-Agent": 'Mozilla/5.0'}
                });
                if(geoResponse?.data?.features && geoResponse?.data?.features[0]?.country && geoResponse?.data?.features[0]?.city){
                    geoData = geoResponse.data;
                }
                console.log("   -reverGeocoding API sucess: ", geoData.status); 
            }
            catch(error){
                console.error("   -reverseGeocoding API error:", error);
            }
        }
        
        try{
            const aqiResponse = await axios.get(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${aqiAPI_key}`, {
                timeout: 5000,
                family: 4,
                headers: { "User-Agent": 'Mozilla/5.0'}
            });
            if(aqiResponse?.data?.data && aqiResponse?.data?.data?.aqi && aqiResponse?.data?.data?.forecast && aqiResponse?.data?.data?.forecast?.daily && aqiResponse?.data?.data?.forecast?.daily?.pm25){
                aqiData = aqiResponse.data;
            }
            console.log("   -aqi API sucess: ", aqiData.status);
        }
        catch(error){
            console.error("   -aqi API error: ", error);
        }

        //handling current data:-
        const time = weatherData?.currently?.time * 1000;
        const sunriseTime = weatherData?.daily?.data[0]?.sunriseTime * 1000;
        const sunsetTime = weatherData?.daily?.data[0]?.sunsetTime * 1000;
        let aqi = null;
        if(aqiData){
            aqi = aqiData?.data?.aqi;
        }
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
            return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        }
        
        if(time >= sunriseTime && time < sunsetTime) timeOfDay = "Day";
        else if(time >= sunsetTime) timeOfDay = "Night";
        else timeOfDay = "Unknown";
        
        if(aqi === 0 || aqi == null) aqiMessage = "Unknown";
        else if(aqi <= 50) aqiMessage = "Good";
        else if(aqi > 50 && aqi <= 150) aqiMessage = "Moderate";
        else if(aqi > 150 && aqi <= 200) aqiMessage = "Unhealthy";
        else if(aqi > 200 && aqi <= 300) aqiMessage = "Very Unhealthy";
        else if(aqi > 300) aqiMessage = "Hazardous";
        else aqiMessage = "Unknown";

        if(uvIndex >= 0 && uvIndex < 3) uvMessage = "Low";
        else if(uvIndex >= 3 && uvIndex < 6) uvMessage = "Moderate";
        else if(uvIndex >= 6 && uvIndex < 8) uvMessage = "High";
        else if(uvIndex >= 8 && uvIndex < 11) uvMessage = "Very High";
        else if(uvIndex >= 11) uvMessage = "Extreme";
        else uvMessage = "Unknown";

        const currentData = {
            time: getTime(weatherData?.currently?.time),
            date: getDate(weatherData?.currently?.time),
            day: getDayName(weatherData?.currently?.time),
            temp: Math.round(weatherData?.currently?.temperature),
            feelsLike: Math.round(weatherData?.currently?.feelsLike),
            icon: weatherData?.currently?.icon,
            rainChance: Math.round((weatherData?.currently?.precipProbability) * 100),
            humidity: Math.round((weatherData?.currently?.humidity) * 100),
            pressure: Math.round(weatherData?.currently?.pressure),
            windSpeed: Math.round(weatherData?.currently?.windSpeed),
            uvMessage: uvMessage,
            timeOfDay: timeOfDay, 
            aqiMessage: aqiMessage,
        };

        if(geoData){
            geoDataInfo = {
                city: geoData?.features[0]?.properties?.city,
                country: geoData?.features[0]?.properties?.country,
            }
        }

        console.log("   -current data sucessfully processed");
        
        //handling week data: - 
        let aqiWeekData = null;

        const weekData = weatherData?.daily?.data.map((day) => {
            const avgTemp = Math.round((day.temperatureMax + day.temperatureMax) / 2);

            return {
                summary: day.summary,
                day: getDayName(day.time),
                icon: day.icon,
                sunrise: getTime(day.sunriseTime),
                sunset: getTime(day.sunsetTime),
                rainChance: Math.round(day.precipProbability * 100),
                hyumidity: Math.round(day.humidity * 100),
                pressure: Math.round(day.pressure),
                windSpeed: Math.round(day.windSpeed),
                uvIndex: day.uvIndex,
                avgTemp: avgTemp,
                minTep: Math.round(day.temperatureMin),
                maxTemp: Math.round(day.temperatureMax),
            }
        });

        if(aqiData){
            const today = new Date().toISOString().split('T')[0];
                aqiWeekData = aqiData?.data?.forecast?.daily?.pm25.filter((index) =>(index.day >= today)).map((dayObject) =>{
                return {
                    aqi: dayObject.avg,
                }
            })
        }

        console.log("   -week data sucessfully processed");

        console.log("   ---weather data sucessfully processed");
        return res.status(200).json({
            currentData: currentData,
            weekData: weekData,
            aqiWeekData: aqiWeekData,
            geoData: geoDataInfo,
        });
    }
    catch (error){
        console.error("   ---failed to process waether data: ",error);
        return res.status(500).json({
            message: "Failed to fetch weather data",
        });
    }
    });

app.post('/city-search', auth,  async (req, res) => {
    console.log("Searching For Cities: ");
    
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
        
        console.log("   ---city searching sucess");
        res.status(200).json({
            results: searchResults,    
        });
    }
    catch (error){
        console.error("   ---city searching failed: ",error);
        res.status(500).json({message: "No City Found" });
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
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import pool from './db.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from "path";
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { json } from 'stream/consumers';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// S3 Client setup: -
const s3 = new S3Client({
    endpoint: `https://${process.env.B2_ENDPOINT}`,
    region: process.env.B2_REGION,
    credentials: {
        accessKeyId: process.env.B2_KEY_ID,
        secretAccessKey: process.env.B2_APPLICATION_KEY,
    },
});

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

//reuseable JWT token verifier: -
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

app.get('/weather', async (req, res) => {
    try{
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;
        const weatherAPI_key = process.env.WEATHER_API_KEY;
        const aqiAPI_key = process.env.AQI_API_KEY;
        const Days = 3;
    
        const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPI_key}&q=${latitude},${longitude}&days=${Days}&aqi=no&alerts=no`);
        const aqiResponse = await axios.get(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqiAPI_key}`);

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
});

app.post('/signup', async (req, res) => {
    const {email, password, userName, privacyPolicy, updates} = req.body;
    const sqlQuery = `
            INSERT INTO users (email, password_hash, username, accepted_privacy, news_updates)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, created_at, username, profile_pic_path;
        `;
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const values = [email, hashedPassword, userName, privacyPolicy, updates];

        const result = await pool.query(sqlQuery, values);
        const userData = result.rows[0];

        //Creating a JWT token here: -
        const payload = {
            userId: userData.id,
            userName: userName,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "24h"});
        console.log(token);

        console.log("User registred sucessfully");
        res.status(201).json({
            token: token,
            userId: userData.id,
        });
    }
    catch (err){
        console.error("User registration failed", err);
        res.status(500).json({
            error: "Database connection failed"
        });
    }
});

app.post('/login', async (req, res) => { 
    const {email, password, username, useEmail} = req.body;
    const value = useEmail ? [email] : [username];
    let userQuery = ``;
    let isPasswordValid = false;

    if (useEmail){
        userQuery = `SELECT * FROM users WHERE email = $1`;
    }
    else{
        userQuery = `SELECT * FROM users WHERE username = $1`;
    }
    
    try{
        const result = await pool.query(userQuery, value);

        if (result.rows.length === 0){
            console.log("Invalid Email");
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const user = result.rows[0];

        if (user){
            isPasswordValid = await bcrypt.compare(password, user.password_hash);
        }

        if (!isPasswordValid){
            console.log("Invalid Password");
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        
        //Creating a JWT token here: -
        const payload = {
            userId: user.id,
            userName: user.username
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "24h"});

        console.log("Login Sucessfull");
        res.status(200).json({
            username: user.username,
            token: token,
            message: "Login successful",
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
        const file = req.file;
        const userId = req.user.userId;

        if(!req.file){
            await pool.query(`
                SELECT profile_pic_path FROM users WHERE id = $1
                RETURNING profile_pic_path;`
                ,["default_profile_pic", userId]);
            return res.status(201).json({
                message: "Avatar sucessfully changed",
                code: "default_profile_pic",
            })
        }

        const extension = path.extname(file.originalname).toLowerCase();
        const fileName = `avatars/${userId}-${Date.now()}${extension}`;
        
        await s3.send(new PutObjectCommand({
            Bucket: process.env.B2_BUCKET_NAME,
            Key: fileName, 
            Body: file.buffer,
            ContentType: file.mimetype,
        }));

        await pool.query(sqlQuery, [fileName, userId]);

        console.log("Avatar sucessfully changed");
        res.status(201),json({
            message: "Avatar sucessfully changed",
        });
    }
    catch (err){
        console.error(err);
        res.status(500);
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
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)});


// netstat -ano | findstr :5000
// taskkill /F /PID 1234
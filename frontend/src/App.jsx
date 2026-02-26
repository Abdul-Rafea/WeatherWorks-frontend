import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherContext, WeatherProvider } from "./WeatherContext";

import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import SetProfilePic from "./SetProfilePic";
import UserSettings from "./UserSettings";

function App() {
    const {setIsLoggedIn} = useContext(WeatherContext);

    useEffect(() =>{
        if (localStorage.getItem("token")){
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn])

    return(
        <WeatherProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                    <Route path="/update-avatar" element={<SetProfilePic />} />
                    <Route path="/user-settings" element={<UserSettings />} />
                </Routes>
            </Router>
        </WeatherProvider>
    )   
}
export default App;
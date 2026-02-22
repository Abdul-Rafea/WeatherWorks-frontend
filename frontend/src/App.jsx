import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import SetProfilePic from "./SetProfilePic";
import UserSettings from "./UserSettings";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherProvider } from "./WeatherContext";

function App() {
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
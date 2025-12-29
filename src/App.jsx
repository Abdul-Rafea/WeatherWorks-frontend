import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherProvider } from "./WeatherContext";

function App() {
    return(
        <WeatherProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
        </WeatherProvider>
    )   
}
export default App;
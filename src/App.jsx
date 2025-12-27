import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    )   
}
export default App;
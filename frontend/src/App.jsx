import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherContext } from "./WeatherContext";

//shadcn components: -
import { Spinner } from "@/components/ui/spinner";

//motion components: -
import { AnimatePresence } from "motion/react";

import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import UserSettings from "./UserSettings";
import NotificationFrame from "./NotificationFrame";
import Portal from "./generatePortal";

function App() {
    const {
        IsLoggedIn,
        showNotification,
        isLoading,
    } = useContext(WeatherContext);


    return(
        <>
            <AnimatePresence>
                {showNotification && <NotificationFrame />}
            </AnimatePresence>
            {isLoading && (
                <Portal>
                    <Spinner className="text-Wasabi size-25" />
                </Portal>
            )}
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                    <Route path="/user-settings" element={<UserSettings />} />
                </Routes>
            </Router>
        </>
    )   
}
export default App;
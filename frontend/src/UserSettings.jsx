import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { WeatherContext } from "./WeatherContext";
import api from "./api";

import LoadingFrame from "./loadingFrame";
import NotificationFrame from "./NotificationFrame";

function UserSettings(){
    const {userName, setUserName,
        showNotification, setShowNotification,
        setNotificationMsg,
        setIsError,
        globalAvatar, setGlobalAvatar,
    } = useContext(WeatherContext);

    const [accountSettings, setAccountSettings] = useState(true);
    const [dashboardSettings, setDashboardSettings] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAccountSettings = () =>{
        setAccountSettings(true);
        setDashboardSettings(false);
    }
    const handleDashboardSettings = () =>{
        setAccountSettings(false);
        setDashboardSettings(true);
    }

    const handleUpdateUsername = async () =>{
        try{
            setIsLoading(true);

            const response = await api.post("/update-username", {
                password: password,
                newUsername: username,
            });
            const result = response.data;
            
            localStorage.setItem("token", result.token);
            setNotificationMsg(result.message);
            setUserName(result.newUsername);
            setIsError(false);
        }
        catch (err){
            console.error(err);
            setIsError(true);

            if (err.response && err.response.data){
                setNotificationMsg(err.response.data.message);
            }
            else{
                setNotificationMsg("Cant connect to server!");
            }
        }
        finally{
            setIsLoading(false);
            setShowNotification(true);
            setUsername("");
            setPassword("");
        }
    }

    const handleChangeAvatar = async (e) =>{
        const file = e.target.files[0];
        if(!file){
            setNotificationMsg("No file selected");
            setShowNotification(true);
            return console.error("No file selected");
        }
        
        try{
            setIsLoading(true);
            const formData = new FormData();
            formData.append("avatar", file);

            const response = await api.post("/change-avatar", formData);
            const result = response.data;

            setGlobalAvatar(result.avatarUrl);
            setNotificationMsg(result.message);
            setIsError(false);
            localStorage.setItem("AvatarUrl", result.avatarUrl);
        }
        catch (err){
            console.error("failed to change avatar: ", err);
            setIsError(true);
            
            if (err.response && err.response.data){
                setNotificationMsg(err.response.data.message);
            }
            else{
                setNotificationMsg("Cant connect to server!");
            }
        }
        finally{
            setShowNotification(true);
            setIsLoading(false);
        }
    }

    return(
        <>
            {isLoading && <LoadingFrame />}
            {showNotification && <NotificationFrame />}
            <div className="w-full h-screen flex flex-col gap-2 bg-lightGreen p-2">
                <Link to="/" className="flex self-start">
                    <svg className="fill-darkGreen hover:scale-120 transition ease-in-out "
                        xmlns="http://www.w3.org/2000/svg"
                        width={50}
                        height={50}
                        viewBox="0 0 1200 1200"
                        xmlSpace="preserve"
                        >
                        <path d="M808.969 133.929v257.06H942.94v267.899H417.981V508.763L0 787.417l417.982 278.654V915.946H1200V133.928H808.969v.001z" />
                    </svg>
                </Link>
                <div className="flex items-center h-full">
                    <nav className="w-1/3 h-full flex flex-col items-center text-center text-darkGreen text-base bg-offWhite p-2 rounded-xl rounded-r-none">
                        <ul className="flex flex-col gap-3 items-center">
                            <li>
                                <button onClick={handleAccountSettings}>Account Settings</button>
                            </li>
                            <div className="w-9/10 h-0.5 bg-darkGreen"></div>
                            <li>
                                <button onClick={handleDashboardSettings}>Dashboard Settings</button>
                            </li>
                        </ul>
                    </nav>
                    <div className="w-2/3 bg-midGreen h-full rounded-xl rounded-l-none">
                        {accountSettings && (
                            <>
                                <div className="p-2 flex flex-col gap-2">
                                    <h1 className="text-offWhite text-xl text-center font-iceberg">Username Info</h1>
                                    <div>
                                        <h2 className="text-offWhite text-lg">Current username: -</h2>
                                        <div className="w-4/5 bg-offWhite text-darkGreen text-center text-base p-1 rounded-xl">{userName} </div>
                                    </div>
                                    <div>
                                        <h2 className="text-offWhite text-lg">Update username: -</h2>
                                        <div className="flex flex-col gap-3">
                                            <input className="w-4/5 outline-none placeholder:text-[#00000080] bg-offWhite text-darkGreen text-center text-base p-1 rounded-xl" 
                                                type="text"
                                                placeholder="New username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                            <input className="w-4/5 outline-none placeholder:text-[#00000080] bg-offWhite text-darkGreen text-center text-base p-1 rounded-xl" 
                                                type="password"
                                                placeholder="Current password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button onClick={handleUpdateUsername} className="bg-lightGreen w-min p-2 rounded-xl text-lg text-darkGreen font-iceberg">Update</button>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-offWhite text-center font-iceberg text-xl">Avatar info</h1>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-offWhite text-lg">Current avatar: -</h2>
                                            <img src={globalAvatar} className="w-3/4 rounded-full" alt="Current Avatar" />
                                            <input
                                                type="file"
                                                id = "upload-avatar"
                                                className="hidden"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={handleChangeAvatar}
                                            />
                                            <label htmlFor="upload-avatar"
                                                className="bg-lightGreen w-min p-2 rounded-xl text-nowrap text-lg text-darkGreen font-iceberg">Change Avatar</label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserSettings;
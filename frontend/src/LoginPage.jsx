import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';
import { WeatherContext } from './WeatherContext';

import LoadingFrame from './loadingFrame';
import NotificationFrame from './NotificationFrame';

function LoginPage(){
    const navigate = useNavigate();

    const {setIsLoggedIn,
        setNotificationMsg,
        showNotification, setShowNotification,
        setIsError,
        setUserName,
    } = useContext(WeatherContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [useEmail, setUseEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const changeType = () =>{
        if (useEmail){
            setUseEmail(false);
        }
        else{
            setUseEmail(true);
        }
    }
        
    const userData ={
        email: email,
        password: password,
        username: username,
        useEmail: useEmail,
    }

    const handleLogin = async () =>{
        try{
            setIsLoading(true);

            const response = await api.post("/login", userData);
            const result = response.data;
            localStorage.setItem("token", result.token);

            setIsError(false);
            setUserName(result.username);
            setNotificationMsg(result.message);
            navigate("/");
        }
        catch(err){
            console.error(err);
            setIsError(true);
            if (err.response && err.response.data){
                setNotificationMsg(err.response.data.message );
            }
            else{
                setNotificationMsg("Could not connect to server");
            }
        }
        finally{
            setIsLoading(false);
            setShowNotification(true);
            setIsLoggedIn(true);
        }
    }

    return(
        <>
            {showNotification && <NotificationFrame />}
            {isLoading && <LoadingFrame />}
            
            <div className="w-full min-h-screen bg-lightGreen p-5 flex justify-start items-center flex-col pb-5">
                <Link to="/" className="mb-10 flex self-start">
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
                <div className="w-full flex justify-center items-center flex-col gap-10">
                    <h1 className="text-4xl text-darkGreen font-iceberg">Welcome Back!</h1>
                    <div className="w-full flex justify-center items-center flex-wrap gap-1">
                        {useEmail ? (
                            <>
                                <label className="w-full text-2xl text-midGreen font-semibold font-iceberg">Email</label>
                                <input className="w-full text-2xl text-offWhite plus-jakarta-sans font-medium rounded-xl p-2 outline-none placeholder:text-[#ffffff80]"
                                    type="email"
                                    placeholder="enter your email here"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                        </>
                        ) : (
                            <>
                                <label className="w-full text-2xl text-midGreen font-semibold font-iceberg">Username</label>
                                <input className="w-full text-2xl text-offWhite plus-jakarta-sans font-medium rounded-xl p-2 outline-none placeholder:text-[#ffffff80]"
                                    type="text"
                                    placeholder="enter your username here"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </>
                        )}
                        
                        <div className="w-full h-1 bg-midGreen"></div>
                    </div>
                    <div className="w-full flex justify-center items-center flex-wrap gap-1">
                        <label className="w-full text-2xl text-midGreen font-semibold font-iceberg">Password</label>
                        <input className="w-full text-2xl text-offWhite plus-jakarta-sans font-medium rounded-xl p-2 outline-none placeholder:text-[#ffffff80]"
                            type="password"
                            placeholder="Enter your password here"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="w-full h-1 bg-midGreen"></div>
                    </div>
                    <button onClick={handleLogin} className="bg-darkGreen text-2xl text-offWhite font-bold rounded-2xl p-2 pl-5 pr-5">Login</button>
                    <button onClick={changeType} className="text-2xl text-darkGreen font-bold underline">
                        {useEmail ? ("Login with username instead")
                        : ("Login with email instead")}
                    </button>
                    <Link to="/signUp" className="w-full">
                            <p className="w-full text-2xl text-center text-midGreen font-iceberg">Dont have an account yet?</p>
                            <p className="w-full text-2xl text-center text-darkGreen font-bold">SignUp</p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LoginPage;
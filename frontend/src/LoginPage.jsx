import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';
import { WeatherContext } from './WeatherContext';

// shadcn/lucide components: -
import { CornerUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// main components: -
import LoadingFrame from './loadingFrame';
import NotificationFrame from './NotificationFrame';
import WasabiX_Logo from "./assets/WasabiX_Logo.png";

function LoginPage(){
    const navigate = useNavigate();

    const {setIsLoggedIn,
        setNotificationMsg,
        showNotification, setShowNotification,
        setIsError,
        setUserName,
    } = useContext(WeatherContext);

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
            <div className="authBack">
                <div className="w-9/10 mt-5 mb-5">
                    <Button asChild size="sm" className="bg-Wasabi hover:bg-Wasabi2 text-black/80 text-lg font-Andika border border-black">
                        <Link to="/">
                            <CornerUpLeft className="size-7"/>
                            Return
                        </Link>    
                    </Button>
                </div>
                <div className="authMain">
                    <img src={WasabiX_Logo} alt="WasaiX Avatar" className="w-1/4 rounded-md " />
                    <div className="authHeader">
                        <h2 className="authTagline">Welcome Back!</h2>
                        <h1 className="authHeading">Please Log In to continue</h1>
                    </div>
                    <FieldSet className="w-full">
                        <FieldGroup>
                            {useEmail ? (
                                <Field>
                                    <FieldLabel htmlFor="email" className="text-lg text-offWhite font-Andika font-bold">Email</FieldLabel>
                                    <Input className="text-lg font-Andika text-white placeholder:text-Wasabi4"
                                        id="email" 
                                        type="email" 
                                        placeholder="Enter your email"
                                        autoComplete="off" 
                                    />
                                </Field>
                            ):
                            (
                                <Field>
                                    <FieldLabel htmlFor="username" className="text-lg text-offWhite font-Andika font-bold">Username</FieldLabel>
                                    <Input className="text-lg font-Andika text-white placeholder:text-Wasabi4"
                                        id="username" 
                                        type="text" 
                                        placeholder="Enter your username"
                                        autoComplete="off" 
                                    />
                                </Field>
                            )}
                            <Field>
                                <FieldLabel htmlFor="password" className="text-lg text-offWhite font-Andika font-bold">Password</FieldLabel>
                                <Input className="text-lg font-Andika text-white placeholder:text-Wasabi4"
                                    id="password"
                                    type="password" 
                                    placeholder="Enter your password"
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <div className="w-full flex flex-col items-center gap-2">
                        <Button onClick={handleLogin} size="sm" className="bg-Wasabi hover:bg-Wasabi2 text-black/80 text-lg font-Andika border border-black">Log In</Button>
                        <button onClick={changeType}  className="text-xl text-black/80 font-Andika">
                            {useEmail ? ("Or log in with username")
                            : ("Or log in with email")}
                        </button>
                    </div>
                    <Link to="/signUp" className="text-xl text-black/80 font-Andika underline">Create an Account</Link>
                </div>
            </div>
        </>
    )
}

export default LoginPage;
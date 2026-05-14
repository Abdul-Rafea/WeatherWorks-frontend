import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';
import { WeatherContext } from './WeatherContext';

//shadcn components: -
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

//lucide components: -
import { CornerUpLeft } from "lucide-react";

// main components: -
import Header from './Header';

function LoginPage(){
    const navigate = useNavigate();

    const {
        setIsLoading,
        setIsLoggedIn,
        setNotificationMsg,
        setShowNotification,
        setNotificationError,
        setGlobalUsername,
        setGlobalAvatar,
    } = useContext(WeatherContext);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [useEmail, setUseEmail] = useState(true);

    let fieldError = false; 


    const changeType = () =>{
        if (useEmail){
            setUseEmail(false);
        }
        else{
            setUseEmail(true);
        }
    }


    const handleLogin = async () =>{
        if(useEmail == true){
            if(email == ""){
                setEmailError(true);
                fieldError = true;
            }
        }
        
        if(useEmail == false){
            if(username == ""){
                setUsernameError(true);
                fieldError = true;
            }
        }
        
        if(password == ""){
            setPasswordError(true);
            fieldError = true
        }

        if(fieldError == true){
            setShowNotification(true);
            setNotificationMsg("Please fill are the required fields");
            setNotificationError(true);
            return;
        }
        else{
            setEmailError(false);
            setUsernameError(false);
            setPasswordError(false);
        }

        const userData = {
            email: email,
            username:username,
            password: password,
            useEmail: useEmail,
        }

        try{
            setIsLoading(true);

            const response = await api.post("/login", userData);
            const result = response.data;

            localStorage.setItem("token", result.token);
            localStorage.setItem("loginFlag", true);

            setGlobalAvatar(result.avatar);
            setGlobalUsername(result.username);
            setIsLoggedIn(true);
            setShowNotification(true);
            setNotificationMsg(result.message);
            setNotificationError(false);

            navigate("/");
        }
        catch(err){
            console.error(err);
            
            setShowNotification(true);
            if (err.response && err.response.data){
                setNotificationMsg(err.response.data.message );
            }
            else{
                setNotificationMsg("Could not connect to server");
            }
            setNotificationError(true);
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <>
            <div className="w-full min-h-screen bg-bgMain flex flex-col justify-center items-center gap-10 p-5">
                <Header type="auth" />
                <div className="w-full flex flex-col items-center gap-2 rounded-2xl p-5">
                    <div className="authHeader">
                        <h2 className="text-3xl text-Wasabi font-Andika font-medium text-shadow-md text-shadow-Wasabi">Welcome Back!</h2>
                        <h1 className="text-lg text-white font-Andika font-medium text-shadow-xs text-shadow-white">Please Login to continue</h1>
                    </div>
                    <FieldSet className="w-full">
                        <FieldGroup>
                            {useEmail ? (
                                <Field>
                                    <FieldLabel
                                        htmlFor="email" 
                                        className={`${emailError ? "text-red-500" : "text-white"} text-base font-Andika font-bold`}
                                    >
                                        Email
                                    </FieldLabel>
                                    <Input 
                                        className="text-lg text-Wasabi font-Andika font-medium placeholder:text-Wasabi"
                                        aria-invalid={emailError}
                                        id="email" 
                                        type="email" 
                                        value={email}
                                        onChange={(e) =>{setEmail(e.target.value)}}
                                        placeholder="Enter your email"
                                        autoComplete="off" 
                                    />
                                </Field>
                            ):
                            (
                                <Field>
                                    <FieldLabel 
                                        htmlFor="username" 
                                        className={`${usernameError? "text-red-500" : "text-white"} text-base font-Andika font-bold`}
                                    >
                                        Username
                                    </FieldLabel>
                                    <Input 
                                        className="text-lg text-Wasabi font-Andika font-medium"
                                        aria-invalid={usernameError}
                                        id="username" 
                                        type="text"
                                        value={username}
                                        onChange={(e) =>{setUsername(e.target.value)}} 
                                        placeholder="Enter your username"
                                        autoComplete="off" 
                                    />
                                </Field>
                            )}
                            <Field>
                                <FieldLabel 
                                    htmlFor="password" 
                                    className={`${passwordError? "text-red-500" : "text-white"} text-base font-Andika font-bold`}
                                >
                                    Pa
                                    ssword
                                </FieldLabel>
                                <Input 
                                    className="text-lg text-Wasabi font-Andika font-medium"
                                    aria-invalid={passwordError}
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>{setPassword(e.target.value)}} 
                                    placeholder="Enter your password"
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <button
                        className="mt-5 mb-5 p-1 pl-6 pr-6 bg-Wasabi text-lg text-black font-Andika rounded-full"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <div className="w-full flex flex-col items-center gap-5">
                        <button
                            className="text-xl text-white font-Andika font-medium underline"
                            onClick={changeType}  
                        >
                            {useEmail ? ("Or log in with username")
                            : ("Or log in with email")}
                        </button>
                        <Link 
                            className="text-xl text-Wasabi font-Andika"
                            to="/signUp"
                        >
                            Create an Account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, use } from 'react';
import { WeatherContext } from './WeatherContext';
import api from './api';

//shadcn components: -
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

//lucide components: -
import { CornerUpLeft } from "lucide-react";

//motion componnets: -
import { AnimatePresence } from "motion/react";

// main components: -
import NotificationFrame from './NotificationFrame';
import WasabiX_Logo from "./assets/WasabiX_Logo.png";
import LoadingFrame from './loadingFrame';
import Portal from "./generatePortal";
import PrivacyPolicy from "./PrivacyPolicy";

function SignUpPage(){
    const navigate = useNavigate();

    const {
        setIsLoggedIn,
        showNotification, setShowNotification,
        notificationMsg, setNotificationMsg,
        setNotificationError,
    } = useContext(WeatherContext);

    const [isLoading, setisLoading] = useState(null);
    const [userName, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setpasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [terms, setTerms] = useState(false);
    const [termsError, setTermsError] = useState(false);
    
    let fieldMissing = false;

    const handleTerms = () =>{
        if(terms == true ){
            setTerms(false);
        }
        else{
            setTerms(true);
            setTermsError(false);
        }
    }

    const fieldError = () =>{
        setShowNotification(true);
        setNotificationMsg("Please fill all the required feilds");
        setNotificationError(true);
    }
    const handlSignUp = async () => {
        if(userName == ""){
            setUsernameError(true);
            fieldError();
            fieldMissing = true;
        }

        if(email == ""){
            setEmailError(true);
            fieldError();
            fieldMissing = true;
        }

        if(password == ""){
            setpasswordError(true);
            fieldError();
            fieldMissing = true;
        }

        if(confirmPassword == ""){
            setConfirmPasswordError(true);
            fieldError();
            fieldMissing = true;
        }
        
        if(password != confirmPassword){
            setConfirmPasswordError(true);
            setShowNotification(true);
            setNotificationMsg("Passwords do not match")
            setNotificationError(true);
            fieldMissing = true;
        }

        if(terms == false){
            setTermsError(true);
            setShowNotification(true);
            setNotificationMsg("You must accept the terms and conditions");
            setNotificationError(true);
            fieldMissing = true;
        }

        if(fieldMissing == true){
            return;
        }
        else{
            setUsernameError(false);
            setEmailError(false);
            setpasswordError(false);
            setConfirmPasswordError(false);
            setTermsError(false);
        }
        
        const userData = {
            email: email,
            password: password,
            userName: userName,
            terms: terms,
        };
        
        try{
            setisLoading(true);

            const response = await api.post("/signup", userData);
            const data = response.data;
            localStorage.setItem('token', data.token);
                
            navigate("/update-avatar");
        }
        catch(error){
            console.error('Error during sign up:', error);
        }
        finally{
            setisLoading(false);
        }
    }
    return(
        <>           
            <AnimatePresence>
                {showNotification && <NotificationFrame />}    
            </AnimatePresence>                                                                                                           
            {isLoading && (
                <LoadingFrame />
            )}
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
                        <h2 className="authTagline">WasabiX</h2>
                        <h1 className="authHeading">Join the community today</h1>
                    </div>
                    <FieldSet className="w-full">
                        <FieldGroup>
                            <Field>
                                <FieldLabel 
                                    className={`${usernameError ? "authLabelError" : "authLabel"}`}
                                    htmlFor="username"
                                >
                                    Username
                                </FieldLabel>
                                <Input 
                                    className="authInput" 
                                    aria-invalid={usernameError}
                                    id="username" 
                                    type="text" 
                                    value={userName}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    autoComplete="off"
                                />
                            </Field>
                            <Field>
                                <FieldLabel
                                    className={`${emailError? "authLabelError" : "authLabel"}`} 
                                    htmlFor="email" 
                                >
                                    Email
                                </FieldLabel>
                                <Input 
                                    className="authInput"
                                    aria-invalid={emailError}
                                    id="email" 
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email" 
                                    autoComplete="off"
                                />
                            </Field>
                            <Field>
                                <FieldLabel
                                    className={`${passwordError? "authLabelError" : "authLabel"}`} 
                                    htmlFor="password"
                                >
                                    Password
                                </FieldLabel>
                                <Input 
                                    className="authInput"
                                    aria-invalid={passwordError}
                                    id="passowrd" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password" 
                                />
                            </Field>
                            <Field>
                                <FieldLabel
                                    className={`${confirmPasswordError? "authLabelError" : "authLabel"}`} 
                                    htmlFor="confirmPassword"
                                >
                                    Confirm Password
                                </FieldLabel>
                                <Input 
                                    className="authInput"
                                    aria-invalid={emailError}
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter passowrd" 
                                />
                            </Field>
                            <Field orientation="horizontal" data-invalid>
                                <Checkbox className="size-5" 
                                    aria-invalid = {termsError}
                                    id="terms" 
                                    name="terms" 
                                    checked={terms}
                                    onCheckedChange={(checked) => setTerms(checked)}
                                />
                                <FieldLabel htmlFor="terms" 
                                    className={` ${termsError ? "text-lg text-red-500 font-Andika font-bold" : "authLabel"}`}>
                                    Accept terms and conditions
                                </FieldLabel>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <Button 
                        size="sm"
                        onClick={handlSignUp} 
                        className="bg-Wasabi hover:bg-Wasabi2 text-black/80 text-lg font-Andika border border-black">Sign Up</Button>
                    <Link to="/login" className="text-xl text-black/80 font-Andika underline">Already have an account?</Link>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;
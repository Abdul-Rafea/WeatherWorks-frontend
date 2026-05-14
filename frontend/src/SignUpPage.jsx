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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

//lucide components: -


// main components: -
import WasabiX_Logo from "./assets/WasabiX_Logo.webp";
import Portal from "./generatePortal";
import DefaultPic from "./assets/Default_Profile_Pic.jpg";
import Header from './Header';

function SignUpPage(){
    const navigate = useNavigate();

    const {
        setIsLoggedIn,
        showNotification, setShowNotification,
        notificationMsg, setNotificationMsg,
        setNotificationError,
        setIsLoading,
        setGlobalAvatar,
        setGlobalUsername,
    } = useContext(WeatherContext);

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
    
    const [uploadAvatar, setUplaodAvatar] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(DefaultPic);

    let fieldMissing = false;

    const handleSignUp = async () => {
        if(userName == ""){
            setUsernameError(true);
            fieldMissing = true;
        }

        if(email == ""){
            setEmailError(true);
            fieldMissing = true;
        }

        if(password == ""){
            setpasswordError(true);
            fieldMissing = true;
        }

        if(confirmPassword == ""){
            setConfirmPasswordError(true);
            fieldMissing = true;
        }
        
        if(terms == false){
            setTermsError(true);
            fieldMissing = true;
        }

        if(fieldMissing == true){
            setShowNotification(true);
            setNotificationMsg("Please fill all the required feilds");
            setNotificationError(true);
            return;
        }
        else if(password != confirmPassword){
            setConfirmPasswordError(true);
            setShowNotification(true);
            setNotificationMsg("Passwords do not match")
            setNotificationError(true);
            return;
        }
        else if(terms == false){
            setShowNotification(true);
            setNotificationMsg("You must accept the terms and conditions");
            setNotificationError(true);
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
            username: userName,
            terms: terms,
        };
        
        try{
            setIsLoading(true);

            const response = await api.post("/signup", userData);
            const result = response.data;
            
            localStorage.setItem('token', result.token);
            localStorage.removeItem('lastweather');
            localStorage.setItem("loginFlag", true);

            setGlobalUsername(result.username);
            setUplaodAvatar(true);
            setIsLoggedIn(true);

            setShowNotification(true);
            setNotificationMsg(result.message)
            setNotificationError(false);
        }
        catch(error){
            console.error(error);

            setShowNotification(true);
            setNotificationError(true);
            if(error.response && error.response.data){
                setNotificationMsg(error.response.data.message);
            }
            else{
                setNotificationMsg("Server Error");
            }
        }
        finally{
            setIsLoading(false);
        }
    }

    const handleUpload = (e) =>{
        const file = e.target.files[0];
        if (file){
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    }

    const handleChangeAvatar = async () =>{
        if(avatar == null){
            setUplaodAvatar(false);
            navigate("/");
        }

        const formData = new FormData();
        formData.append("avatar", avatar);

        try{
            setIsLoading(true);
            const response = await api.post("/change-avatar", formData);
            const result = response.data;
            
            if (result && result.avatar){
                setGlobalAvatar(result.avatar);
            }

            setShowNotification(true);
            setNotificationMsg(result.message);
            setNotificationError(false);
            setUplaodAvatar(false);
            navigate("/");
        }
        catch (err){
            console.error("Failed to change avatar: ", err);
            
            if(err.response && err.response.data){
                setShowNotification(true);
                setNotificationMsg(err.response.message);
                setNotificationError(true);
            }

            setAvatar(DefaultPic);
            setAvatarPreview(DefaultPic);
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <>                                   
            {uploadAvatar && (
                <Portal>
                    <div className="w-8/10 bg-Wasabi rounded-xl p-5 flex justify-center items-center flex-col gap-5">
                        <h1 className="text-2xl text-black/80 font-Andika">Upload an Avatar!</h1>
                        <img src={avatarPreview} alt="Avatar" className="w-4/5 rounded-full"></img>
                        <input
                            type="file"
                            id = "avatar-upload"
                            className="hidden"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleUpload}
                        />
                        <div className="flex justify-center items-center flex-col gap-2">
                            <Button size="sm" className="bg-offWhite text-black text-base">
                                <label htmlFor="avatar-upload">Upload Avatar</label>
                            </Button>
                            <Button size="sm" onClick={handleChangeAvatar} className="bg-black font-Andika text-offWhite text-base">
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Portal>
            )}       
            <div className="w-full pt-20 min-h-screen bg-bgMain flex flex-col justify-center items-center gap-10 p-5">
                <Header type="auth" />
                <div className="w-full flex flex-col items-center gap-2 rounded-2xl p-5">
                    <div className="authHeader">
                        <h2 className="text-3xl text-Wasabi font-Andika font-medium text-shadow-md text-shadow-Wasabi">Join the Community</h2>
                        <h1 className="text-lg text-white font-Andika font-medium text-shadow-xs text-shadow-white">Please enter your details for signup</h1>
                    </div>
                    <FieldSet className="w-full">
                        <FieldGroup>
                            <Field>
                                <FieldLabel 
                                    className={`${usernameError ? "text-red-500" : "text-white"} text-base font-Andika font-bold`}
                                    htmlFor="username"
                                >
                                    Username
                                </FieldLabel>
                                <Input 
                                    className="text-lg text-Wasabi font-Andika font-medium placeholder:text-Wasabi" 
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
                                    className={`${emailError? "text-red-500" : "text-white"} text-base font-Andika font-bold`} 
                                    htmlFor="email" 
                                >
                                    Email
                                </FieldLabel>
                                <Input 
                                    className="text-lg text-Wasabi font-Andika font-medium placeholder:text-Wasabi"
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
                                    className={`${passwordError? "text-red-500" : "text-white"} text-base font-Andika font-bold`} 
                                    htmlFor="password"
                                >
                                    Password
                                </FieldLabel>
                                <Input 
                                    className="text-lg text-Wasabi font-Andika font-medium placeholder:text-Wasabi"
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
                                    className={`${confirmPasswordError? "text-red-500" : "text-white"} text-base font-Andika font-bold`} 
                                    htmlFor="confirmPassword"
                                >
                                    Confirm Password
                                </FieldLabel>
                                <Input 
                                    className="text-lg text-Wasabi font-Andika font-medium placeholder:text-Wasabi"
                                    aria-invalid={confirmPasswordError}
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter passowrd" 
                                />
                            </Field>
                            <Field orientation="horizontal" data-invalid>
                                <Checkbox className="size-6 rounded-sm" 
                                    aria-invalid = {termsError}
                                    id="terms" 
                                    name="terms" 
                                    checked={terms}
                                    onCheckedChange={(checked) => setTerms(checked)}
                                />
                                <FieldLabel htmlFor="terms" 
                                    className={` ${termsError ? "text-red-500" : "text-white"} text-base font-Andika font-bold`}>
                                    Accept terms and conditions
                                </FieldLabel>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <button
                        className="mt-5 mb-5 p-1 pl-6 pr-6 bg-Wasabi text-lg text-black font-Andika rounded-full"
                        onClick={handleSignUp}
                    >
                        Signup
                    </button>
                        <Link 
                            className="text-xl text-Wasabi font-Andika"
                            to="/login"
                        >
                            Create an Account
                        </Link>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { WeatherContext } from './WeatherContext';
import api from './api';

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
import { Checkbox } from "@/components/ui/checkbox"

// main components: -
import NotificationFrame from './NotificationFrame';
import WasabiX_Logo from "./assets/WasabiX_Logo.png";
import LoadingFrame from './loadingFrame';
import Portal from "./generatePortal";
import PrivacyPolicy from "./PrivacyPolicy";

function SignUpPage(){
    const navigate = useNavigate();

    const {setIsLoggedIn} = useContext(WeatherContext);

    const [isLoading, setisLoading] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUsername] = useState("");
    const [terms, setTerms] = useState(false);
    const [termsError, setTermsError] = useState(true);

    const handleTerms = () =>{
        if(terms == true ){
            setTerms(false);
        }
        else{
            setTerms(true);
            setTermsError(false);
        }
    }
    const handleFetch = async () => {
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
                                <FieldLabel htmlFor="username" className="authLabel">Username</FieldLabel>
                                <Input className="authInput" 
                                    id="username" 
                                    type="text" 
                                    placeholder="Enter username"
                                    autoComplete="off"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email" className="authLabel">Email</FieldLabel>
                                <Input className="authInput"
                                    id="email" 
                                    type="text" 
                                    placeholder="Enter your email" 
                                    autoComplete="off"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password" className="authLabel">Password</FieldLabel>
                                <Input className="authInput"
                                    id="passowrd" 
                                    type="password" 
                                    placeholder="Enter password" 
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirmPassword" className="authLabel">Confirm Password</FieldLabel>
                                <Input className="authInput"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Re-enter passowrd" 
                                />
                            </Field>
                            { termsError ? (
                                <Field orientation="horizontal" data-invalid>
                                    <Checkbox className="size-5" 
                                        aria-invalid 
                                        id="terms" 
                                        name="terms" 
                                    />
                                    <FieldLabel htmlFor="terms" className="text-lg text-red-500 font-Andika font-bold">Accept terms and conditions</FieldLabel>
                                </Field>    
                            ):
                            (
                                <Field orientation="horizontal">
                                    <Checkbox id="terms" name="terms" className="size-5"/>
                                    <FieldLabel htmlFor="terms" className="authLabel">Accept terms and conditions</FieldLabel>
                                </Field>
                            )}
                        </FieldGroup>
                    </FieldSet>
                    <Button size="sm" className="bg-Wasabi hover:bg-Wasabi2 text-black/80 text-lg font-Andika border border-black">Sign Up</Button>
                    <Link to="/login" className="text-xl text-black/80 font-Andika underline">Already have an account?</Link>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;
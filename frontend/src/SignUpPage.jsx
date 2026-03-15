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
    const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(null);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [borderRadius1, setBorderRadius1] = useState(2);
    const [borderRadius2, setBorderRadius2] = useState(2);

    const handleFetch = async () => {
        const userData = {
            email: email,
            password: password,
            userName: userName,
            privacyPolicy: isChecked1,
            updates: isChecked2,
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
    
    const setChecked = () =>{
        if (isChecked1){
            setIsChecked1(false);
            setBorderRadius1(2);
        }
        else{
            setIsChecked1(true);
            setBorderRadius1(0);
        }
    }

    const setChecked2 = () =>{
        if (isChecked2){
            setIsChecked2(false);
            setBorderRadius2(2);
        }
        else{
            setIsChecked2(true);
            setBorderRadius2(0);
        }
    }

    const handlePolicy = () =>{
        if (privacyPolicyOpen){
            setPrivacyPolicyOpen(false);
        }
        else{
            setPrivacyPolicyOpen(true);
        }
    }
    
    return(
        <>                                                                                                                          
            {isLoading && (
                    <LoadingFrame />
            )}
            {privacyPolicyOpen && (
                <Portal>
                    <PrivacyPolicy onClose = {handlePolicy} />
                </Portal>
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
                    
                </div>
            </div>
            <div className="w-full bg-lightGreen p-5 flex justify-center items-center flex-col pb-5 gap-5">
                <Link to="/" className="mb-5 flex self-start">
                    <svg className="fill-darkGreen hover:scale-120 transition ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width={50}
                        height={50}
                        viewBox="0 0 1200 1200"
                        xmlSpace="preserve"
                        >
                        <path d="M808.969 133.929v257.06H942.94v267.899H417.981V508.763L0 787.417l417.982 278.654V915.946H1200V133.928H808.969v.001z" />
                    </svg>
                </Link>
                <h1 className="text-4xl text-darkGreen font-iceberg">Join the Community!</h1>
                <div className="w-full flex justify-center items-center flex-wrap gap-1">
                    <label className="w-full text-2xl text-midGreen font-semibold font-iceberg">Username</label>
                    <input className="w-full text-2xl text-offWhite font-medium rounded-xl p-2 outline-none placeholder:text-[#ffffff80]"
                        type="text"
                        placeholder="Create a username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="w-full h-1 bg-midGreen"></div>
                </div>
                <div className="w-full flex justify-center items-center flex-wrap gap-1">
                    <label className="w-full text-2xl font-iceberg text-midGreen font-semibold">Email</label>
                    <input className="w-full text-2xl text-offWhite plus-jakarta-sans font-medium rounded-xl p-2 outline-none placeholder:text-[#ffffff80]"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="w-full h-1 bg-midGreen"></div>
                </div>
                <div className="w-full flex justify-center items-center flex-wrap gap-1">
                    <label className="w-full text-2xl font-iceberg text-midGreen font-semibold">Password</label>
                    <input className="w-full text-2xl text-offWhite font-medium rounded-xl p-2 outline-none placeholder:text-[#ffffff80]"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="w-full h-1 bg-midGreen"></div>
                </div>
                <div className="w-full flex justify-center items-center flex-wrap gap-1">
                    <label className="w-full text-2xl font-iceberg text-midGreen font-semibold">Confirm Password</label>
                    <input className="w-full text-2xl text-offWhite font-medium rounded-xl p-2 outline-none placeholder:text-[#ffffff80]"
                        type="password"
                        placeholder="Retype passowrd"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="w-full h-1 bg-midGreen"></div>
                </div>
                <button onClick={handleFetch} className="bg-darkGreen text-2xl text-offWhite font-bold rounded-2xl p-2 pl-5 pr-5">SignUp</button>
                <div className="flex flex-wrap gap-3 mb-4">
                    <div className="w-full flex justify-center items-center rounded-xl p-2 pl-4 gap-4">
                        <button onClick={setChecked} className={`w-7 h-7 bg-offWhite rounded-md aspect-square flex justify-center items-center border-${borderRadius1} border-midGreen`}>
                            {isChecked1 && (
                                    <svg className="fill-midGreen"
                                        width={30}
                                        height={30}
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path d="M0 26.016v-20Q0 3.52 1.76 1.76T6.016 0h20q2.464 0 4.224 1.76T32 6.016v20q0 2.496-1.76 4.224T26.016 32h-20Q3.52 32 1.76 30.24T0 26.016zm4 0q0 .832.576 1.408t1.44.576h20q.8 0 1.408-.576T28 26.016v-20q0-.832-.576-1.408T26.016 4h-20q-.832 0-1.44.608T4 6.016v20zM7.584 16q0-.832.608-1.408t1.408-.576 1.408.576l2.848 2.816 7.072-7.04q.576-.608 1.408-.608t1.408.608.608 1.408-.608 1.408l-8.48 8.48q-.576.608-1.408.608t-1.408-.608l-4.256-4.256q-.608-.576-.608-1.408z" />
                                    </svg>
                            )}
                        </button>
                        <p className="text-2xl text-darkGreen font-iceberg">
                            Accept the&nbsp;
                            <button onClick={handlePolicy} className="font-bold">privacy policy.</button>
                        </p>
                    </div>
                    <div className="w-full flex justify-center items-center p-2 pl-4 gap-4">
                        <button onClick={setChecked2} className={`w-7 h-7 bg-offWhite rounded-md aspect-square flex justify-center items-center border-${borderRadius2} border-midGreen`}>
                            {isChecked2 && (
                                    <svg className="fill-midGreen"
                                        width={30}
                                        height={30}
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path d="M0 26.016v-20Q0 3.52 1.76 1.76T6.016 0h20q2.464 0 4.224 1.76T32 6.016v20q0 2.496-1.76 4.224T26.016 32h-20Q3.52 32 1.76 30.24T0 26.016zm4 0q0 .832.576 1.408t1.44.576h20q.8 0 1.408-.576T28 26.016v-20q0-.832-.576-1.408T26.016 4h-20q-.832 0-1.44.608T4 6.016v20zM7.584 16q0-.832.608-1.408t1.408-.576 1.408.576l2.848 2.816 7.072-7.04q.576-.608 1.408-.608t1.408.608.608 1.408-.608 1.408l-8.48 8.48q-.576.608-1.408.608t-1.408-.608l-4.256-4.256q-.608-.576-.608-1.408z" />
                                    </svg>
                            )}
                        </button>
                        <p className="text-2xl text-darkGreen font-iceberg">Do you want to know the latest updates on Wasabi X?</p>
                    </div>
                </div>
                 <Link to="/login" className="w-full">
                        <p className="w-full text-2xl text-center text-midGreen font-iceberg">Alredy have an account?</p>
                        <p className="w-full text-2xl text-center text-darkGreen font-bold">Login</p>
                </Link>
            </div>
        </>
    );
}

export default SignUpPage;
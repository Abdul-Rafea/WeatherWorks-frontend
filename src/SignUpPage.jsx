import { Link } from 'react-router-dom';
import { useState } from 'react';

import LoadingFrame from './loadingFrame';
import Portal from "./generatePortal";
import PrivacyPolicy from "./PrivacyPolicy";

function SignUpPage(){
    const [isLoading, setisLoading] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUsername] = useState("");
    const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(null);

    const policyOpen = () =>{
        setPrivacyPolicyOpen(true);
    }
    const policyClose = () =>{
        setPrivacyPolicyOpen(false);
    }
    const handleSignUp = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password,
            userName: userName,
        };

        try{
            setisLoading(true);
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            setisLoading(false);
        }
        catch(error){
            console.error('Error during sign up:', error);
        }
    }

    return(
        <>
            {isLoading && (
                <Portal styling = "fixed top-0 left-0 z-50 w-screen h-screen bg-[#0F0F0Fbf] flex justify-center items-center">
                    <LoadingFrame />
                </Portal>
            )}
            {privacyPolicyOpen && (
                <Portal styling= "fixed top-0 left-0 z-50 w-screen h-screen bg-[#0F0F0Fbf] flex justify-center items-center">
                    <PrivacyPolicy onClose = {policyClose} />
                </Portal>
            )}
            <div className="w-full bg-[#1C8EA3] rounded-3xl p-5 flex justify-center items-center flex-wrap pb-5 gap-5">
                <Link to="/" className="w-full hover:scale-110 transition ease-in-out">
                    <svg className="mb-5"
                        fill="#ffffff"
                        width={50}
                        height={50}
                        viewBox="0 0 200 200"
                        data-name="Layer 1"
                        id="Layer_1"
                       xmlns="http://www.w3.org/2000/svg"
                    >
                        <title />
                        <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165ZM116.5,57.5a9.67,9.67,0,0,0-14,0L74,86a19.92,19.92,0,0,0,0,28.5L102.5,143a9.9,9.9,0,0,0,14-14l-28-29L117,71.5C120.5,68,120.5,61.5,116.5,57.5Z" />
                    </svg>
                </Link>
                <div className="w-full flex justify-center items-center flex-wrap gap-1">
                    <label className="w-full text-2xl plus-jakarta-sans text-[#ffffff] font-semibold">Username</label>
                    <input className="w-full text-2xl text-[#ffffff] plus-jakarta-sans font-medium bg-[#D9A22B] rounded-xl p-2"
                        type="text"
                        placeholder="Create a username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                </div>
                <div className="w-full flex justify-center items-center flex-wrap gap-1">
                    <label className="w-full text-2xl plus-jakarta-sans text-[#ffffff] font-semibold">Email</label>
                    <input className="w-full text-2xl text-[#ffffff] plus-jakarta-sans font-medium bg-[#D9A22B] rounded-xl p-2"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div className="w-full flex justify-center items-center flex-wrap gap-1">
                    <label className="w-full text-2xl plus-jakarta-sans text-[#ffffff] font-semibold">Password</label>
                    <input className="w-full text-2xl text-[#ffffff] plus-jakarta-sans font-medium bg-[#D9A22B] rounded-xl p-2"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </div>
                <div className="w-full flex justify-center items-center flex-wrap gap-1">
                    <label className="w-full text-2xl plus-jakarta-sans text-[#ffffff] font-semibold">Confirm Password</label>
                    <input className="w-full text-2xl text-[#ffffff] plus-jakarta-sans font-medium bg-[#D9A22B] rounded-xl p-2"
                        type="password"
                        placeholder="Confirm passowrd"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                </div>
                <button onClick={handleSignUp} className="bg-[#D9A22B] text-2xl text-[#ffffff] font-bold rounded-2xl p-2 pl-5 pr-5">SignUp</button>
                <div className="w-full flex flex-wrap gap-3 mb-4">
                    <div className="w-full flex justify-center items-center bg-[#D9A22B] rounded-xl p-2 pl-4 gap-4">
                        <button className=""></button>
                        <p className="text-2xl text-[#ffffff]">
                            Accept the privacy policy:&nbsp;
                            <button onClick={policyOpen} className="text-xl font-bold">Privacy Policy</button>
                        </p>
                    </div>
                    <div className="w-full flex justify-center items-center bg-[#D9A22B] rounded-xl p-2 pl-4 gap-4">
                        <button className=""></button>
                        <p className="text-2xl text-[#ffffff]">Do you want to know the latest updates?</p>
                    </div>
                </div>
                <Link to="/login" className="w-full">
                        <p className="w-full text-2xl text-center text-[#ffffff]">Already have an account? Login</p>
                </Link>
            </div>
        </>
    );
}

export default SignUpPage;
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp(){
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("")
    return(
        <div className="w-full bg-[#1C8EA3] rounded-3xl p-2 flex justify-center items-center flex-wrap">
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
            <div className="w-full pl-2 pr-2 flex justify-center items-center flex-wrap gap-1 mb-5">
                <label className="w-full text-2xl plus-jakarta-sans text-[#ffffff] font-semibold">Email</label>
                <input className="w-full text-2xl text-[#ffffff] plus-jakarta-sans font-medium bg-[#D9A22B] rounded-xl p-2"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </div>
            <div className="w-full pl-2 pr-2 flex justify-center items-center flex-wrap gap-1 mb-5">
                <label className="w-full text-2xl plus-jakarta-sans text-[#ffffff] font-semibold">Password</label>
                <input className="w-full text-2xl text-[#ffffff] plus-jakarta-sans font-medium bg-[#D9A22B] rounded-xl p-2"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <button className="bg-[#D9A22B] text-2xl text-[#ffffff] font-bold rounded-2xl mb-2 p-2 pl-5 pr-5">LogIn</button>
        </div>
    )
}

export default SignUp
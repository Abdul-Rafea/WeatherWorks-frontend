import { useState , useContext, useEffect} from "react";
import { WeatherContext } from "./WeatherContext";
import api from "./api";

import DefaultPic from "./assets/Default_Profile_Pic.jpg";
import LoadingFrame from "./loadingFrame";

function SetProfilePic(){
    const { setIsLoggedIn, setGlobalAvatar } = useContext(WeatherContext);
    useEffect(() =>{
        setIsLoggedIn(true);
    }, []);

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(DefaultPic);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePic = async () =>{
        if (!avatar){
            const formData = new FormData();
            formData.append("avatar", avatar);
        }

        try{
            setIsLoading(true);
            const response = await api.post("/change-avatar", formData);
            console.log("Upload Sucessfull", response.data);
            
            if (response.data && response.data.code === "default_profile_pic"){
                setGlobalAvatar(null);
            }
        }
        catch (err){
            console.error("Cant chnage avatar: ", err);
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

    return(
        <>
            {isLoading && (
                <LoadingFrame />
            )}
            <div className="w-9/10 bg-lightGreen rounded-xl p-5 flex justify-center items-center flex-col gap-5">
                <h1 className="text-3xl text-darkGreen font-iceberg">Upload an Avatar!</h1>
                <img src={avatarPreview} alt="Avatar" className="w-full rounded-full"></img>
                <input
                    type="file"
                    id = "file-upload"
                    className="hidden"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleUpload}
                />
                <div className="flex justify-center items-center flex-col gap-2">
                    <label 
                        htmlFor="file-upload"
                        className="bg-midGreen text-offWhite text-xl p-2 pl-3 pr-3 rounded-3xl">
                        Change Avatar
                    </label>
                    <button onClick={handleChangePic} className="bg-midGreen text-offWhite text-xl p-2 pl-3 pr-3 rounded-3xl">
                        Confirm
                    </button>
                </div>
            </div>
        </>
    );
}

export default SetProfilePic;
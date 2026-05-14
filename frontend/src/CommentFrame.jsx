import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

function CommentFrame(props){    
    const [isLoading, setIsLoading] = useState(props.isLoading);
    const [isPublished, setIsPublished] = useState(props.isPublished);  
    
    const timeAgo = formatDistanceToNow(new Date(props.time), { addSuffix: true });

        if(props.type === "feed"){
            return(
                <div className="w-9/10 flex flex-col justify-end items-center rounded-xl">
                    <div className="w-full flex items-center gap-2">
                        <img src={props.avatar} alt="Avatar" className="size-10 rounded-full" />
                        <div className="flex flex-col justify-start">
                            <h3 className="text-sm text-offWhite font-Andika">{props.username}</h3>
                            <h4 className="-mt-1 text-sm text-blue-400 font-Andika font-medium">{props.location}</h4>
                            <h4 className="-mt-1 w-full text-xs text-offWhite font-Andika font-medium">{timeAgo}</h4>
                        </div>
                    </div>
                    <p className="pl-3 text-sm text-Wasabi font-Andika">{props.message}</p>
                </div>        
            );
        }
        else if(props.type === "user"){
            return(
                <div className="w-9/10 flex flex-col justify-end items-center rounded-xl">
                    <div className="w-full flex items-center gap-2">
                        <img src={props.avatar} alt="Avatar" className="size-10 rounded-full" />
                        <div className="flex flex-col justify-start">
                            <h3 className="text-sm text-offWhite font-Andika">{props.username}</h3>
                            <h4 className="-mt-1 text-sm text-blue-400 font-Andika font-medium">{props.location}</h4>
                            <h4 className="-mt-1 w-full text-xs text-offWhite font-Andika font-medium">{timeAgo}</h4>
                        </div>
                    </div>
                    <p className="pl-3 text-sm text-Wasabi font-Andika">{props.message}</p>
                </div>
            );
        }
}

export default CommentFrame;
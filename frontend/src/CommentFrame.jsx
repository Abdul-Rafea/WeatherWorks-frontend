function CommentFrame(props){
        if(props.type === "feed"){
            return(
                <div className="w-9/10 flex flex-col items-center rounded-xl">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <img src={props.avatar} alt="Avatar" className="size-10 rounded-full" />
                            <div className="flex flex-col justify-start">
                                <h3 className="text-sm text-offWhite font-Andika">{props.username}</h3>
                                <h4 className="ml-auto -mt-0.5 text-[14px] text-blue-400 font-Andika font-medium">{props.location}</h4>
                            </div>
                        </div>
                        <h4 className="text-sm text-offWhite font-Andika font-medium">{props.time}</h4>
                    </div>
                    <p className="pl-3 text-lg text-Wasabi font-Andika">{props.message}</p>
                </div>        
            );
        }
        else if(props.type === "user"){
            return(
                <div>

                </div>
            );
        }
}

export default CommentFrame;
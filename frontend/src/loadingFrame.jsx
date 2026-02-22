import Portal from "./generatePortal";

function LoadingFrame(){
    return(
        <Portal>
            <div className="w-1/2 rounded-full flex justify-center items-center flex-wrap">
                <div className="w-30 h-30 rounded-full flex justify-center items-center overflow-hidden">
                    <div className="z-1 w-30 h-30 rounded-t-full bg-midGreen flex justify-end animate-spin">
                        <div className="w-30 h-20 bg-lightGreen"></div>
                    </div>
                    <div className=" absolute rounded-full z-2 w-20 h-20 bg-offWhite"></div>
                </div>
            </div>
        </Portal>
    )
}

export default LoadingFrame;
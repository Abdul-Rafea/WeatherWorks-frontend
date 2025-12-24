function LoadingFrame(){
    return(
        <div className="w-1/2 rounded-full flex justify-center items-center flex-wrap">
            <div className="w-30 h-30 rounded-full bg-[#ffffff] flex justify-center items-center overflow-hidden">
                <div className="z-1 w-30 h-30 rounded-t-full bg-[#5C3E94] flex justify-end animate-spin">
                    <div className="w-30 h-20 bg-[#adadad]"></div>
                </div>
                <div className=" absolute rounded-full z-2 w-20 h-20 bg-[#ffffff]"></div>
            </div>
        </div>
    )
}

export default LoadingFrame;
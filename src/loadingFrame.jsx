function LoadingFrame(){
    return(
        <div className="w-1/2 aspect-square flex justify-center items-center flex-wrap">
            <div className="w-1/3 aspect-square bg-[#005B41] animate-spin"></div>
            <div className="w-full h-auto text-3xl text-[#ffffff] font-bold text-center">Loading.....</div>
        </div>
    )
}

export default LoadingFrame;
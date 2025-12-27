function Showcase(props){
    return(
        <>
            <div className="w-full h-auto flex justify-center items-center flex-wrap mb-5 gap-10">
            <h2 className="w-full text-center text-[#000000] text-3xl font-semibold mt-5
                sm:text-5xl xl:text-3xl">{props.heading}</h2>
                <div className="w-full h-auto flex justify-center items-center">
                    <img src={props.img} alt="Dashboard Screen Image" className="w-1/3 h-auto rounded-xl
                        sm:w-1/2 xl:w-5/30"></img>
                    <p className=" w-2/3 h-auto plus-jakarta-sans font-medium text-2xl text-[#000000] ml-2
                        sm:text-4xl sm:ml-5 xl:25/30 xl:text-3xl">{props.description}</p>
                </div> 
            </div>
            {props.hr && (
                <div className="w-9/10 h-1 bg-[#1C8EA3] rounded-full
                        sm:h-2"></div>
            )}
            
        </>
    )
}

export default Showcase;
import Cloud from "./assets/cloud.png";

function RainAnimation(){
    return(
        <div className="z-10 fixed top-0 w-full min-h-screen flex pointer-events-none">
                <img src={Cloud} alt="" className="size-40 -ml-10" />
                <img src={Cloud} alt="" className="size-40 -ml-15 rotate-180" />
                <img src={Cloud} alt="" className="size-40 -ml-10" />
                <img src={Cloud} alt="" className="size-40 -ml-15 rotate-180" />
                <div className="absolute w-full h-screen overflow-hidden flex justify-between pointer-events-none -rotate-15">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-blue-400 w-0.5 h-4 rain-drop rounded-full"
                            style={{ 
                                //eslint-disable-next-line
                                animationDelay: `${Math.random() * 2}s`,
                                left: `${i * 5}%` 
                            }}
                        ></div>
                    ))}
                </div>
            </div>
    );
}

export default RainAnimation;
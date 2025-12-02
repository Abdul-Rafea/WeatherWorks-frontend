
function PageSetting({onClose}){
    return(
        <div className="w-full h-auto flex justify-center items-center">
            <div className="w-full h-auto flex flex-col">
                <div className="w-full h-auto flex justify-left items-center">
                    <button onClick={onClose} className="w-3/10 h-auto text-2xl text-[#ffffff] bg-[#524A79] cursor-pointer">Go Back</button>
                </div>
                <div className="w-full h-auto flex justify-center items-center flex-col">
                    <div className="w-full h-auto text-3xl text-[#3E3245]">Value Settings</div>
                    <div className="w-auto h-auto">
                        <div>Degree/Farenheight</div>
                        <button className="w-2/10 h-auto"></button>
                    </div>
                </div>
            </div>
        </div>
    )    
}
export default PageSetting;
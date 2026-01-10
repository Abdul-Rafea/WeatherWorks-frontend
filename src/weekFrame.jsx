function Weekframe(props){
    return(
        <div className="p-4 bg-[#4CB8CC] rounded-xl flex justify-center items-center flex-col box-border shadow-[2px_4px_5px_0_#00000040]">
            <div className='w-auto h-auto text-center text-2xl text-[#D9A22B] plus-jakarta-sans font-bold'>{props.day}</div>
                <img src={props.icon} alt="Weather Icon" className="w-full mt-2 mb-2" />
            <div className='w-auto h-auto text-center text-2xl text-[#ffffff] plus-jakarta-sans font-medium'>{props.temp}°C</div>
        </div>
    )
}
export default Weekframe;
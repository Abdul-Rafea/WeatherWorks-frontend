function DescriptionBox(props){

    const colorVar = {
        offWhite: "bg-offWhite",
        grey: "bg-[#E7E7E7]", 
    }
    return(
        <div className={`w-2/3 ${colorVar[props.color]} flex justify-center items-center flex-col p-3 rounded-2xl sm:w-1/2 xl:w-1/3`}>
            {props.icon}
            <h2 className="w-full text-xl font-iceberg text-center sm:text-2xl">{props.heading}</h2>
            {props.heading2 && (
                <h3 className="w-full text-lg text-center font-iceberg sm:text-2xl">{props.heading2}</h3>
            )}
            <p className="w-full text-base font-sans text-center text-midGreen text-wrap text-center text-lg"><q>{props.description}</q></p>
        </div>
    );
}

export default DescriptionBox;
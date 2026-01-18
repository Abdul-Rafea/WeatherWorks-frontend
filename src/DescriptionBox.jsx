function DescriptionBox(props){

    const colorVar = {
        offWhite: "bg-offWhite",
        grey: "bg-[#E7E7E7]", 
    }
    return(
        <div className={`w-2/3 ${colorVar[props.color]} flex justify-center items-center flex-col p-3 rounded-2xl`}>
            {props.icon}
            <h2 className="text-xl font-iceberg">{props.heading}</h2>
            {props.heading2 && (
                <h3 className="text-lg font-iceberg">{props.heading2}</h3>
            )}
            <p className="text-base font-sans text-midGreen text-wrap text-center"><q>{props.description}</q></p>
        </div>
    );
}

export default DescriptionBox;
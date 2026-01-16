function DescriptionBox(props){
    return(
        <div className="w-2/3 bg-[#E7E7E7] flex justify-center items-center flex-col p-3 rounded-2xl">
            {props.icon}
            <h2 className="text-xl font-iceberg">{props.heading}</h2>
            <p className="text-base font-sans text-midGreen text-wrap text-center">{props.description}</p>
        </div>
    );
}

export default DescriptionBox;
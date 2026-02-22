function ErrorFrame(props){
    return(
        <div className="w-9/10 flex justify-center items-center">
            <h2>{props.heading}</h2>
            <p>{props.description}</p>
        </div>
    );
}

export default ErrorFrame;
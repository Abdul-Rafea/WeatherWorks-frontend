import './button.css';

function Button(props){
    return(
        <button onClick={props.action} className={`main-button ${props.customClass}`}>
            <div className="button-top bg-[#ffffff] text-[#000000] text-2xl font-medium p-3 pb-4">
                {props.text}
            </div>
            <div className="button-bottom"></div>
        </button>
    );
}
export default Button;
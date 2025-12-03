import Button from "./button";

function PageSetting({onClose}){
    return(
        <div className="w-[90vw] h-auto bg-[#232D3F] flex justify-center items-center flex-col">
            <div className="w-full h-auto flex justify-left items-center">
                <Button action={onClose} text="Back" customClass="m-4"/>
            </div>
            <div className="w-auto h-auto text-4xl font-bold text-[#ffffff] text-center plus-jakarta-sans border-b-2">
                Value Settings
            </div>
            <div className="w-full h-auto flex justify-center items-center flex-col">
                <div className="w-full h-auto flex justify-between items-center pr-5 pl-5 mt-5 mb-5">
                    <div className="w-auto h-auto text-2xl text-[#ffffff] plus-jakarta-sans">Degree/Farenheight</div>
                    <Button text="°C" customClass="mr-3" />
                </div>
            </div>
        </div>
    )    
}
export default PageSetting;

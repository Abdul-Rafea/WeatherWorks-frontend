function PrivacyPolicy({onClose}){
    return(
        <div className="w-8/10 bg-[#1C8EA3] p-3 rounded-2xl flex items-center flex-wrap gap-5">
            <button onClick={onClose}>
                <svg className="h-8"
                    fill="#000000"
                    width={50}
                    height={50}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
                    fillRule="evenodd"
                    />
                </svg>
            </button>
            <h1 className="w-full text-center text-3xl text-[#ffffff]">Privacy Policy</h1>
            <p className="w-full text-center text-2xl text-[#ffffff]">Nothing to see here now for now</p>
        </div>
    );
}

export default PrivacyPolicy;
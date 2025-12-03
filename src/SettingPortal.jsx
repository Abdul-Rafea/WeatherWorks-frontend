import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function SettingPortal({ children }) {
        const portalRef = useRef(null);
        const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!portalRef.current){
            portalRef.current = document.createElement('div');
        }

        const settingContainer = portalRef.current;
        settingContainer.className = 'fixed top-0 left-0 z-50 w-screen h-screen bg-[#0F0F0F99] flex justify-center items-center'

        document.body.appendChild(settingContainer);
        setIsMounted(true); 

        return () => {
                if (settingContainer && document.body.contains(settingContainer)) {
                    document.body.removeChild(settingContainer);
                }

                setIsMounted(false);
        };
    }, []);

    if (!isMounted || !portalRef.current) {
        return null;
    }

    return ReactDOM.createPortal(
        children,
        portalRef.current
    );
}

export default SettingPortal;

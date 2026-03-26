import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function SettingPortal({ children }, props) {
        const portalRef = useRef(null);
        const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!portalRef.current){
            portalRef.current = document.createElement('div');
        }

        const settingContainer = portalRef.current;
        settingContainer.className ="fixed top-0 left-0 z-50 w-screen h-screen bg-black/50 flex justify-center items-center";

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

    return createPortal(
        children,
        portalRef.current
    );
}

export default SettingPortal;

import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function SettingPortal({ children }) {
        const portalRef = useRef(null);
        const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!portalRef.current){
            const settingContainer = document.createElement('div');
        }
        
        settingContainer.style.position = 'fixed';
        settingContainer.style.top = '0';
        settingContainer.style.left = '0';
        settingContainer.style.width = '100vw';
        settingContainer.style.height = '100vh';
        settingContainer.style.zIndex = '9999';
        settingContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent backdrop
        settingContainer.style.display = 'flex';
        settingContainer.style.justifyContent = 'center';
        settingContainer.style.alignItems = 'center';

        document.body.appendChild(settingContainer);
        setIsMounted(true); 

        return () => {
                if (settingContainer && document.body.contains(portalRef.current)) {
                    document.body.removeChild(settingContainer);
                }

                setIsMounted(false);
        };
    }, []);

    if (!portalRef.current || !isMounted) {
        return null;
    }

    return ReactDOM.createPortal(
        children,
        portalRef.current
    );
}

export default SettingPortal;

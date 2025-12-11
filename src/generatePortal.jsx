import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function SettingPortal({ children, styling }) {
        const portalRef = useRef(null);
        const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!portalRef.current){
            portalRef.current = document.createElement('div');
        }

        const settingContainer = portalRef.current;
        settingContainer.className = styling;

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

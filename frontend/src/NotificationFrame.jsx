import React, { useContext, useEffect } from 'react';
import { WeatherContext } from './WeatherContext';

//lucide components: -
import { CircleCheck,
    CircleX
} from 'lucide-react';

//motion components: -
import { motion } from "motion/react";

function NotificationFrame(){
    const {
        notificationMsg,
        setShowNotification,
        notificationError,
    } = useContext(WeatherContext);

    useEffect(() =>{
        const timer = setTimeout(() =>{
            setShowNotification(false);
        }, 3000);
        return() =>{
            clearTimeout(timer);
        }
    }, [setShowNotification])
    
    return(
        <div className="w-full flex justify-center">
            <motion.div 
                className="bg-Wasabi w-8/10 z-100 fixed top-0 flex justify-center items-center gap-2 p-3 pt-5 pb-5 rounded-b-xl border-2 border-black border-t-0"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100, opacity: 0}}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <div className="w-1/4 flex justify-center items-center">
                    { notificationError? (
                        <CircleX className="text-red-500 size-8" />
                    ):
                    (
                        <CircleCheck className="text-blue-900 size-8" />
                    )
                    }
                </div>
                <div className="w-3/4">
                    <h2 className="text-black font-Andika font-medium text-2xl text-wrap">{notificationMsg}</h2>
                </div>
            </motion.div>
        </div>
    );
}

export default NotificationFrame;
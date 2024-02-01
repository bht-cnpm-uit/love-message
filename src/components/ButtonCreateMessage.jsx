import React, { useState, useEffect } from "react";
import owl_img from "../Assets/owl.png"
import "./style.css"

const ButtonCreateMessage = ({ isOpenCreateMessage, setIsOpenCreateMessage }) => {
    const [showTooltip, setShowTooltip] = useState(true);

    const handleOpenCreateMessage = () => {
        setIsOpenCreateMessage(!isOpenCreateMessage);
    };

    useEffect(() => {
        let intervalId;

        const toggleTooltip = () => {
            setShowTooltip(prevShowTooltip => !prevShowTooltip);
        };

        const setTimer = () => {
            if (showTooltip) {
                // If showTooltip is true, set a 10-second timer
                intervalId = setInterval(toggleTooltip, 10000);
            } else {
                // If showTooltip is false, set a 60-second timer
                intervalId = setInterval(toggleTooltip, 60000);
            }
        };
        setTimer();
        return () => clearInterval(intervalId); 

    }, [showTooltip]); 
    return (
        <div className="">
            <img
                src={owl_img}
                className="fixed object-cover w-14 bottom-20 z-[200] right-5 cursor-pointer transition-transform duration-300 hover:transform hover:-rotate-6 hover:origin-bottom"
                alt="bee support"
                onClick={handleOpenCreateMessage}
            />
            {showTooltip && (
                <div className="fixed z-[300] bg-pink-400 rounded-md pb-14 md:bottom-40 right-12 w-52 md:w-52 flex text-center">
                    <div className="absolute">
                        <span className="tooltip text-sm text-white text-right">
                            Hãy gửi những lời yêu thương cùng cú nào !!!
                        </span>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ButtonCreateMessage;

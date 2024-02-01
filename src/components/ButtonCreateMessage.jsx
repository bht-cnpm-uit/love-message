import React, { useState, useEffect, useRef } from "react";
import owl_img from "../Assets/owl.png"
import music from "../Assets/music.mp3"
import "./style.css"

const ButtonCreateMessage = ({ isOpenCreateMessage, setIsOpenCreateMessage }) => {
    const [showTooltip, setShowTooltip] = useState(true);
    const [isShowButton, setIsShowButton] = useState(false);
    const [isOpenMusic, setIsOpenMusic] = useState(false);
    const audioRef = useRef(null);
    const handleOpenCreateMessage = () => {
        setIsOpenCreateMessage(!isOpenCreateMessage);
    };
    const handleClickOwl = () => {
        setIsShowButton(!isShowButton)
    }

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
    const handleMusic = () => {
        setIsOpenMusic(!isOpenMusic)
        if (!isOpenMusic) {
            audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
    }
    return (
        <div className="">
            <button
                type="button"
                className={`${isShowButton?"":"hidden"} fixed z-[300] right-5 bottom-52 text-pink-700 border border-pink-700 hover:bg-pink-700 hover:text-white focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:focus:ring-pink-800 dark:hover:bg-pink-500`}
                onClick={handleMusic}
                >
                {
                    isOpenMusic ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>

                }

            </button>
            <audio ref={audioRef} src={music} controls hidden />
            <button
                type="button"
                className={`${isShowButton?"":"hidden"} fixed z-[300] right-5 bottom-36 text-pink-700 border border-pink-700 hover:bg-pink-700 hover:text-white focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:focus:ring-pink-800 dark:hover:bg-pink-500`}
                onClick={handleOpenCreateMessage}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <button
                type="button"
                className={`${isShowButton?"":"hidden"} fixed z-[300] right-5 bottom-20 text-pink-700 border border-pink-700 hover:bg-pink-700 hover:text-white focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:focus:ring-pink-800 dark:hover:bg-pink-500`}
                onClick={handleClickOwl}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <img
                src={owl_img}
                className={`${isShowButton ? "hidden":""} fixed object-cover w-14 bottom-20 z-[200] right-5 cursor-pointer animate-rotate`}
                alt="bee support"
                onClick={handleClickOwl}
            />
            {showTooltip && !isShowButton && (
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

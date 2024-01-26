import React, { useState } from "react";
import AddMessage from "./AddMessage";

const ButtonCreateMessage = ({ isOpenCreateMessage, setIsOpenCreateMessage }) => {

    const handleOpenCreateMessage = () => {
        setIsOpenCreateMessage(!isOpenCreateMessage);
    };

    return (
        <button
            type="button"
            className="fixed right-5 bottom-20 text-pink-700 border border-pink-700 hover:bg-pink-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-pink-500 dark:text-pink-500 dark:hover:text-white dark:focus:ring-pink-800 dark:hover:bg-pink-500"
            onClick={handleOpenCreateMessage}

        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    );
};

export default ButtonCreateMessage;

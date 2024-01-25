import React, { useState } from "react";
import AddMessage from "./AddMessage";

const BoxCreateMessage = ({ isOpenCreateMessage, setIsOpenCreateMessage }) => {

    const handleOpenCreateMessage = () => {
        setIsOpenCreateMessage(!isOpenCreateMessage);
    };

    return (
        <div className="w-full h-20 flex justify-center items-center bg-transparent">
            <button
                className="w-2/5 h-4/5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                onClick={handleOpenCreateMessage} // Make sure handleOpenCreateMessage is defined
            >
                <div className="flex items-center justify-between w-full h-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:text-gray-900 rounded-md group-hover:bg-opacity-0">
                    <span className="">
                        Send love message..
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>

                </div>
            </button>

        </div>
    );
};

export default BoxCreateMessage;

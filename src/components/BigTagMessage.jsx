import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import UpdateMessage from './UpdateMessage';
import DeleteMessage from './DeleteMessage';
const BigTagMessage = ({
    dataBigTag,
    setIsShowBigTag,
    setIsOpenDeleteMessage,
    setIsOpenUpdateMessage,
    isOpenUpdateMessage,
    isOpenDeleteMessage,
}) => {
    const [data, setData] = useState({
        ...dataBigTag,
    });

    const handleCancel = () => {
        setIsShowBigTag(false);
    };

    const handleClickOpenUpdateMessage = () => {
        setIsOpenUpdateMessage(true);
    };
    const handleClickOpenDeleteMessage = () => {
        setIsOpenDeleteMessage(true);
    };

    return (
        <div className={``}>
        <div className="flex font-bold overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100% - 1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className={`${data.color.bg_color} ${data.color.border_color} relative  border-4  rounded-lg shadow-md`}>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4">
                            <div className="mb-4">
                                <div className="relative">
                                    <p
                                        className="w-full border-b-2 text-center border-gray-300 py-2 px-3 text-gray-700 leading-tight bg-white"
                                        style={{ fontFamily: 'Dancing Script' }}
                                    >
                                        {data.nickname}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="relative">
                                    <p
                                        className="w-full border-b-2 border-gray-300 py-2 px-4 text-gray-700 leading-tight bg-white text-base"
                                        id="message"
                                        style={{ fontFamily: 'monospace' }}
                                    >
                                        {data.message}
                                    </p>
                                </div>
                            </div>
                            <br />
                            <div className={`tools flex items-center justify-end `}>
                                <div className="mr-3">
                                    <button
                                        className="text-pink-700 border-2 border-pink-700 hover:bg-pink-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-110 ease-in duration-200"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClickOpenUpdateMessage();
                                        }}
                                        style={{ fontFamily: 'Dancing Script' }}
                                    >
                                        Sửa
                                    </button>
                                </div>

                                <div className="mr-3">
                                    <button
                                        className="text-pink-700 border-2 border-pink-700 hover:bg-pink-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-110 ease-in duration-200"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClickOpenDeleteMessage();
                                        }}
                                        style={{ fontFamily: 'Dancing Script' }}
                                    >
                                        Xóa
                                    </button>
                                </div>

                                <div>
                                    <button
                                        className="bg-[#B7AE91] hover:bg-[#A7A181] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-110 ease-in duration-200"
                                        type="button"
                                        onClick={handleCancel}
                                        style={{ fontFamily: 'Dancing Script' }}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default BigTagMessage;

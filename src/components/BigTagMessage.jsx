import React, { useState, useEffect } from 'react';
import ColorPicker from './ColorPicker';
import moment from 'moment';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc  } from 'firebase/firestore';
import { db } from '../config/firebase';
const BigTagMessage = ({
    dataBigTag,
    setDataBigTag,
    setIsShowBigTag,
    setIsOpenDeleteMessage,
    setIsOpenUpdateMessage,
    isOpenUpdateMessage,
    isOpenDeleteMessage,
}) => {
    const [data, setData] = useState({
        ...dataBigTag,
    });

    const [currentReacts, setCurrentReacts] = useState(dataBigTag.reacts);
    const handleCancel = () => {
        setIsShowBigTag(false);
    };

    const handleClickOpenUpdateMessage = () => {
        setIsOpenUpdateMessage(true);
    };
    const handleClickOpenDeleteMessage = () => {
        setIsOpenDeleteMessage(true);
    };

    useEffect(() => {
        if (currentReacts !== dataBigTag.reacts) {
            setCurrentReacts(dataBigTag.reacts);
        }
    }, [dataBigTag.reacts, currentReacts]);
    const updateReacts = async (reacts) => {
        try {
            // Tạo reference đến document muốn cập nhật
            const docRef = doc(db, 'messages', data.id);
            // Lấy dữ liệu hiện tại của document
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                // Cập nhật dữ liệu trong document với dữ liệu mới
                const updateData = {
                    reacts: reacts,
                };
                await updateDoc(docRef, updateData, { merge: true });
                const updatedDocSnapshot = await getDoc(docRef);
                const updatedData = updatedDocSnapshot.data();
                setDataBigTag(updatedData)
            } else {
                console.log('Document does not exist!');
            }
            setIsOpenUpdateMessage(false);
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };
    const handleUpdateReact = (id) => {
        setCurrentReacts({
            ...currentReacts,
            [id]: (currentReacts[id] || 0) + 1,
        });
        updateReacts({
            ...currentReacts,
            [id]: (currentReacts[id] || 0) + 1,
        });
        
    };
    return (
        <div className="flex h-screen font-bold overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100% - 1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-lg max-h-full">
                <div className={`${dataBigTag.color.bg_color} ${dataBigTag.color.border_color} relative  border-4  rounded-lg shadow-md`}>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4">
                            <div className="mb-1">
                                <div className="relative ">
                                    <p
                                        className="underline bg-transparent w-full text-xl font-extrabold text-center py-2 px-3 text-gray-700 leading-tight"
                                        style={{ fontFamily: 'Dancing Script' }}
                                    >
                                        {dataBigTag.nickname}
                                    </p>
                                </div>
                            </div>
                            <span className={`pl-4 text-xs italic font-thin text-zinc-700`}>
                                    {moment.unix(dataBigTag.createdTime?.seconds).format('HH:mm DD/MM/YYYY')}
                            </span>
                            <div className="mb-2">
                                <div className="relative">
                                    <p
                                        className="text-wrap break-words w-full py-1 px-4 text-gray-700 leading-tight text-base"
                                        id="message"
                                        style={{ fontFamily: 'monospace' }}
                                    >
                                        {dataBigTag.message}
                                    </p>
                                </div>
                            </div>

                            <div className={`flex justify-center w-full`}>
                                <div
                                    className="cursor-pointer ml-3 flex flex-col justify-center items-center"
                                    onClick={(e) => {
                                        handleUpdateReact('heart');
                                    }}
                                >
                                    <svg
                                        className="inline opacity-80 transition-transform ease-in duration-200 animate-scaleUpDown-1s"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M32 16.0028C32 24.8468 24.8608 31.986 16.0168 31.986C7.17274 31.986 0.0335693 24.8468 0.0335693 16.0028C0.0335693 7.1587 7.17274 0.0195312 16.0168 0.0195312C24.8608 0.0195312 32 7.1587 32 16.0028Z"
                                            fill="#FFDD67"
                                        />
                                        <path
                                            d="M31.8935 5.98672C31.6271 4.54823 30.8279 3.37613 29.496 3.00319C28.0575 2.63025 26.7788 3.16302 25.5534 4.44168C24.8608 2.52369 23.7953 1.0852 22.0904 0.33932C20.3855 -0.406564 18.6807 0.12621 17.6151 1.45815C16.4963 2.84336 16.0701 5.02773 17.2422 7.85143C18.361 10.5153 23.3158 15.843 23.4756 16.0029C23.6887 15.8963 29.2296 12.4333 30.5615 10.7284C31.8935 9.07681 32.1598 7.42521 31.8935 5.98672ZM14.4185 1.45815C13.3529 0.12621 11.648 -0.406564 9.94317 0.33932C8.23829 1.0852 7.17275 2.52369 6.48014 4.44168C5.20148 3.2163 3.92282 2.63025 2.48433 3.05647C1.20568 3.42941 0.353239 4.60151 0.0868517 6.04C-0.179535 7.42521 0.140129 9.13009 1.41879 10.7817C2.804 12.4333 8.34485 15.8963 8.55796 16.0029C8.71779 15.843 13.6726 10.5153 14.7914 7.85143C15.9635 5.02773 15.5373 2.89663 14.4185 1.45815Z"
                                            fill="#F46767"
                                        />
                                        <path
                                            d="M25.0739 19.2528C25.0739 18.8266 24.8075 18.2938 24.1149 18.134C22.2502 17.7611 19.5331 17.4414 16.0168 17.4414C12.5004 17.4414 9.7833 17.8143 7.91859 18.134C7.1727 18.2938 6.95959 18.8266 6.95959 19.2528C6.95959 23.1421 9.94313 27.0313 16.0168 27.0313C22.0904 26.9781 25.0739 23.0888 25.0739 19.2528Z"
                                            fill="#664E27"
                                        />
                                        <path
                                            d="M22.783 19.3594C21.6109 19.1463 19.1601 18.8267 16.0168 18.8267C12.8734 18.8267 10.4226 19.1463 9.25053 19.3594C8.55793 19.466 8.50465 19.7324 8.55793 20.1586C8.61121 20.3717 8.61121 20.6914 8.71776 21.011C8.77104 21.3307 8.87759 21.4905 9.41037 21.4373C10.4226 21.3307 21.6642 21.3307 22.6764 21.4373C23.2092 21.4905 23.2625 21.3307 23.369 21.011C23.4223 20.6914 23.4756 20.425 23.5289 20.1586C23.5289 19.7324 23.4756 19.466 22.783 19.3594Z"
                                            fill="white"
                                        />
                                    </svg>
                                    <span className="text-sky-700">{currentReacts.heart}</span>
                                </div>
                                <div
                                    className={`cursor-pointer ml-3 flex flex-col justify-center items-center`}
                                    onClick={(e) => {
                                        handleUpdateReact('fighting');
                                    }}
                                >
                                    <svg
                                        className="inline opacity-80 transition-transform ease-in duration-200 animate-scaleUpDown-2s"
                                        width="32"
                                        height="30"
                                        viewBox="0 0 32 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.0664299 20.341C-0.413101 16.7178 1.82471 10.9102 2.89033 3.07787C3.10346 1.69256 10.3497 0.200684 13.7597 0.200684C14.6122 0.200684 15.3581 4.19677 15.145 5.58208C14.9852 6.59442 13.5466 6.32802 13.5466 6.32802C13.067 7.66005 11.6284 7.12723 11.6284 7.12723C11.2022 8.24614 9.92345 7.71333 9.92345 7.71333C9.39063 8.77895 8.21845 8.24614 8.21845 8.24614C7.15282 12.8816 9.12423 12.4553 10.5628 19.4352C10.5628 19.4352 10.9891 19.3819 12.108 17.0908C16.6902 7.87317 32.7811 10.8036 31.822 20.7139C31.6089 22.8985 33.9533 26.5216 25.2684 29.2389C18.3952 31.3702 9.97673 27.2675 9.97673 27.2675C7.09954 28.1733 1.50502 28.12 1.34518 25.9888C1.18533 23.4845 0.332836 22.2058 0.0664299 20.341Z"
                                            fill="#FFDD67"
                                        />
                                        <path
                                            d="M31.8753 20.7135C32.0884 18.3691 31.3957 16.451 30.117 15.0657C30.8629 16.3444 31.2359 17.8896 31.076 19.7011C30.8629 21.8856 33.2073 25.5088 24.5225 28.2261C17.6492 30.3573 9.23077 26.2547 9.23077 26.2547C6.99296 26.9474 3.05015 27.0539 1.39844 26.0416C1.61156 28.1195 7.1528 28.1728 10.03 27.267C10.03 27.267 18.4484 31.3697 25.3217 29.2384C33.9532 26.5211 31.6621 22.898 31.8753 20.7135ZM7.63233 8.19238C6.3003 13.6271 8.48483 13.4139 9.92342 20.2872L10.6694 19.488C9.60374 12.5614 7.79218 13.4139 8.21843 8.29895C7.89874 8.29895 7.63233 8.19238 7.63233 8.19238Z"
                                            fill="#EBA352"
                                        />
                                        <path
                                            d="M14.5056 23.6979C18.928 25.3496 25.5881 23.6446 29.3711 21.8863C27.7194 25.8824 18.928 28.0136 14.5056 23.6979ZM12.3211 1.69274C12.0014 1.10665 11.362 1.15993 10.9358 1.31977C10.9891 0.680398 12.5342 0.200868 12.3211 1.69274Z"
                                            fill="#EBA352"
                                        />
                                        <path
                                            d="M15.571 3.98361C15.4111 2.81142 15.0381 1.63924 14.3455 0.680176C14.7185 1.69252 14.9316 2.75814 14.9316 3.82376C14.9316 4.30329 15.0381 6.00829 14.1856 5.79517C13.6528 5.63532 13.6528 5.20907 13.493 4.72954C13.2799 3.98361 12.8536 3.18439 12.9069 2.43845C12.6938 3.18439 12.9602 4.09017 13.0135 4.83611C13.0667 5.26236 13.3864 6.48782 12.8003 6.64767C12.4807 6.75423 12.1077 6.5411 11.8413 6.38126C11.7347 6.32798 11.6814 5.90173 11.6282 5.74189C11.415 4.99595 10.9888 4.14345 11.0421 3.34423C10.8289 4.03689 11.0421 4.88939 11.0953 5.63532C11.1486 6.06157 11.3617 7.07392 10.8289 7.28704C10.1896 7.60673 10.1363 6.86079 10.0297 6.48782C9.81659 5.79517 9.49691 4.99595 9.49691 4.25001C9.28378 5.15579 9.55019 6.22142 9.55019 7.1272C9.55019 7.60673 8.53785 7.9797 8.16488 7.71329C7.57878 7.28704 7.47222 6.22142 7.36566 5.52876C7.5255 5.74189 7.79191 6.06157 8.1116 6.00829C7.84519 5.68861 7.68535 5.20907 7.5255 4.83611C7.36566 4.51642 6.99269 3.82376 6.56644 3.82376C6.61972 3.93033 6.99269 4.83611 6.93941 4.88939C6.77957 5.15579 6.61972 5.47548 6.4066 5.74189C6.24676 5.95501 5.76723 6.70095 5.39426 6.48782C4.96801 6.22142 4.86145 5.58204 4.75488 5.15579C4.80816 5.68861 4.75488 6.48782 5.28769 6.80751C5.76722 7.1272 6.35332 6.64767 6.673 6.32798C6.77957 7.3936 7.2591 8.83219 8.59113 8.72563C8.85753 8.72563 9.17722 8.61907 9.44363 8.51251C9.65675 8.40594 9.92316 8.13954 10.1363 8.2461C10.7224 8.40594 11.3085 8.29938 11.7347 7.87313C11.9478 7.66001 11.8946 7.55345 12.161 7.60673C12.4807 7.66001 12.8003 7.71329 13.0667 7.60673C13.3332 7.55345 13.5463 7.3936 13.7061 7.18048C13.8127 7.07392 13.866 6.96735 13.9192 6.80751C14.0258 6.59438 14.1324 6.70095 14.3455 6.70095C15.7308 6.70095 15.6775 4.94267 15.571 3.98361Z"
                                            fill="#EBA352"
                                        />
                                        <path
                                            d="M14.2391 0.946262C13.9194 0.36017 13.2801 0.413451 12.8538 0.573294C12.9071 -0.0127986 14.5055 -0.492329 14.2391 0.946262ZM10.7758 2.49142C10.4562 1.90532 9.81679 1.9586 9.39054 2.11845C9.44382 1.47907 10.989 0.999543 10.7758 2.49142ZM8.96429 3.34391C8.6446 2.75782 8.00523 2.8111 7.57898 2.97095C7.63226 2.33157 9.23069 1.85204 8.96429 3.34391Z"
                                            fill="#EBA352"
                                        />
                                    </svg>
                                    <span className="text-sky-700">{currentReacts.fighting}</span>
                                </div>

                                <div
                                    className={`cursor-pointer ml-3 flex flex-col justify-center items-center`}
                                    onClick={(e) => {
                                        handleUpdateReact('sad');
                                    }}
                                >
                                    <svg
                                        className="inline opacity-80 transition-transform ease-in duration-200 animate-scaleUpDown-3s"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                                            fill="#FFDD67"
                                        />
                                        <path
                                            d="M20.5865 23.6802C17.7065 22.3468 14.2932 22.3468 11.4132 23.6802C10.7198 24.0002 11.5732 25.9202 12.3198 25.5468C14.2398 24.6402 17.0665 24.3202 19.7332 25.5468C20.4265 25.8668 21.3332 24.0535 20.5865 23.6802Z"
                                            fill="#664E27"
                                        />
                                        <path
                                            d="M27.7333 15.4665C27.7333 18.1332 25.6 20.2665 22.9333 20.2665C20.2666 20.2665 18.1333 18.1332 18.1333 15.4665C18.1333 12.7998 20.2666 10.6665 22.9333 10.6665C25.6 10.6665 27.7333 12.7998 27.7333 15.4665Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M22.9333 18.6666C24.7006 18.6666 26.1333 17.2339 26.1333 15.4666C26.1333 13.6993 24.7006 12.2666 22.9333 12.2666C21.166 12.2666 19.7333 13.6993 19.7333 15.4666C19.7333 17.2339 21.166 18.6666 22.9333 18.6666Z"
                                            fill="#664E27"
                                        />
                                        <path
                                            d="M23.7867 19.573C24.6114 19.573 25.28 18.8089 25.28 17.8663C25.28 16.9238 24.6114 16.1597 23.7867 16.1597C22.9619 16.1597 22.2933 16.9238 22.2933 17.8663C22.2933 18.8089 22.9619 19.573 23.7867 19.573Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M21.7602 16.4798C22.2315 16.4798 22.6135 16.0261 22.6135 15.4665C22.6135 14.9068 22.2315 14.4531 21.7602 14.4531C21.2889 14.4531 20.9069 14.9068 20.9069 15.4665C20.9069 16.0261 21.2889 16.4798 21.7602 16.4798Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M13.8667 15.4665C13.8667 18.1332 11.7334 20.2665 9.06672 20.2665C6.40006 20.2665 4.26672 18.1332 4.26672 15.4665C4.26672 12.7998 6.40006 10.6665 9.06672 10.6665C11.7334 10.6665 13.8667 12.7998 13.8667 15.4665Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M9.0667 18.6666C10.834 18.6666 12.2667 17.2339 12.2667 15.4666C12.2667 13.6993 10.834 12.2666 9.0667 12.2666C7.29939 12.2666 5.8667 13.6993 5.8667 15.4666C5.8667 17.2339 7.29939 18.6666 9.0667 18.6666Z"
                                            fill="#664E27"
                                        />
                                        <path
                                            d="M9.92034 19.573C10.7451 19.573 11.4137 18.8089 11.4137 17.8663C11.4137 16.9238 10.7451 16.1597 9.92034 16.1597C9.09559 16.1597 8.427 16.9238 8.427 17.8663C8.427 18.8089 9.09559 19.573 9.92034 19.573Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M7.89349 16.4798C8.36478 16.4798 8.74683 16.0261 8.74683 15.4665C8.74683 14.9068 8.36478 14.4531 7.89349 14.4531C7.42221 14.4531 7.04016 14.9068 7.04016 15.4665C7.04016 16.0261 7.42221 16.4798 7.89349 16.4798Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M23.9999 18.1333C21.2799 21.76 19.7333 25.0666 19.7333 27.7866C19.7333 30.1333 21.6533 32 23.9999 32C26.3466 32 28.2666 30.1333 28.2666 27.7866C28.2666 25.0666 26.6666 21.7066 23.9999 18.1333Z"
                                            fill="#65B1EF"
                                        />
                                        <path
                                            d="M27.3067 9.97312C25.6 8.53312 23.3067 7.89312 21.0667 8.31979C20.7467 8.37312 20.48 7.25312 20.8534 7.14645C23.4134 6.66645 26.08 7.41312 28.0534 9.06645C28.3734 9.33312 27.52 10.1865 27.3067 9.97312ZM10.9334 8.21312C8.69338 7.83978 6.40005 8.42645 4.69338 9.86645C4.48005 10.0798 3.62672 9.22645 3.94672 8.95978C5.92005 7.25312 8.58672 6.55978 11.1467 7.03978C11.52 7.14645 11.2534 8.26645 10.9334 8.21312Z"
                                            fill="#917524"
                                        />
                                    </svg>
                                    <span className="text-sky-700">{currentReacts.sad}</span>
                                </div>

                                <div
                                    className={`cursor-pointer ml-3 flex flex-col justify-center items-center`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateReact('haha');
                                    }}
                                >
                                    <svg
                                        className="inline opacity-80 transition-transform ease-in duration-200 animate-scaleUpDown-2s"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                                            fill="#FFDD67"
                                        />
                                        <path
                                            d="M26.5066 9.28021C26.8266 9.44021 26.6666 9.81354 26.4 9.86688C24.96 10.0802 23.4666 10.3469 21.9733 11.1469C24.1066 11.5202 25.8133 12.5869 26.7733 13.7069C26.9866 13.9735 26.72 14.2935 26.5066 14.2402C23.9466 13.3335 21.3333 12.8002 18.08 13.1735C17.8133 13.1735 17.6 13.0669 17.6533 12.8002C18.5066 8.90688 23.4666 7.46688 26.5066 9.28021ZM5.49329 9.28021C5.17329 9.44021 5.33329 9.81354 5.59996 9.86688C7.03996 10.0802 8.53329 10.3469 10.0266 11.1469C7.89329 11.5202 6.18662 12.5869 5.22662 13.7069C5.01329 13.9735 5.27996 14.2935 5.49329 14.2402C8.05329 13.3335 10.6666 12.8002 13.92 13.1735C14.1866 13.1735 14.4 13.0669 14.3466 12.8002C13.4933 8.90688 8.53329 7.46688 5.49329 9.28021ZM25.44 17.2802C25.2266 17.0135 24.8533 17.0669 24.4266 17.0669H7.57329C7.14662 17.0669 6.77329 17.0135 6.55996 17.2802C4.47996 19.9469 6.93329 27.7335 16 27.7335C25.0666 27.7335 27.52 19.9469 25.44 17.2802Z"
                                            fill="#664E27"
                                        />
                                        <path
                                            d="M16.9601 21.1733C16.6401 21.1733 16.1601 21.44 16.3734 22.24C16.4801 22.6133 17.0134 23.0933 17.0134 23.7333C17.0134 25.0133 14.9867 25.0133 14.9867 23.7333C14.9867 23.0933 15.5201 22.6667 15.6267 22.24C15.7867 21.4933 15.3067 21.1733 15.0401 21.1733C14.1867 21.1733 12.8534 22.08 12.8534 23.6267C12.8534 25.3333 14.2934 26.72 16.0534 26.72C17.8134 26.72 19.2534 25.3333 19.2534 23.6267C19.2001 22.1333 17.8134 21.2267 16.9601 21.1733Z"
                                            fill="#4C3526"
                                        />
                                        <path
                                            d="M11.8932 25.9736C13.0665 26.5069 14.4532 26.7736 15.9999 26.7736C17.5465 26.7736 18.9332 26.4536 20.1065 25.9736C18.9865 25.3869 17.5999 25.0669 15.9999 25.0669C14.3999 25.0669 13.0132 25.3869 11.8932 25.9736Z"
                                            fill="#FF717F"
                                        />
                                        <path
                                            d="M24 18.1333H8.05333C6.93333 18.1333 6.93333 20.2666 8 20.2666H24C25.0667 20.2666 25.0667 18.1333 24 18.1333Z"
                                            fill="white"
                                        />
                                    </svg>
                                    <span className="text-sky-700">{currentReacts.haha}</span>
                                </div>
                            </div>
                            <div className={`tools flex items-center justify-end `}>
                                <div className="mr-3">
                                    <button
                                        className="text-pink-700 border-2 border-pink-700 hover:bg-pink-700 hover:text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline hover:scale-110 ease-in duration-200"
                                        type="button"
                                        onClick={(e) => {
                                            handleClickOpenUpdateMessage();
                                        }}
                                        style={{ fontFamily: 'Dancing Script' }}
                                    >
                                        Sửa
                                    </button>
                                </div>

                                <div className="mr-3">
                                    <button
                                        className="text-pink-700 border-2 border-pink-700 hover:bg-pink-700 hover:text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline hover:scale-110 ease-in duration-200"
                                        type="button"
                                        onClick={(e) => {
                                            handleClickOpenDeleteMessage();
                                        }}
                                        style={{ fontFamily: 'Dancing Script' }}
                                    >
                                        Xóa
                                    </button>
                                </div>

                                <div>
                                    <button
                                        className="bg-[#87857f] hover:bg-[#ff5959] text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline hover:scale-110 ease-in duration-200"
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
    );
};

export default BigTagMessage;

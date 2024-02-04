import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app, auth, db } from '../config/firebase';
const minLength = 50;

const AddMessage = ({ isOpenCreateMessage, setIsOpenCreateMessage, setIsOpenQR }) => {
    const [data, setData] = useState({
        nickname: '',
        password: '',
        message: '',
        color : {
            bg_color : "bg-yellow-100/75",
            border_color : "border-yellow-300"
        },
        reacts: {
            heart: 0,
            haha: 0,
            sad: 0,
            fighting:0,
        },
        updatedTime: serverTimestamp(),
    });
    //password status: initial, writing, empty, error
    const [passwordStatus, setPasswordStatus] = useState('initial');
    const [messageStatus, setMessageStatus] = useState('initial');
    const [nameStatus, setNameStatus] = useState('initial');
    const [isshowRcmNickname, setIsshowRcmNickname] = useState(false)

    const handleCreateMessage = async () => {
        try {
            let bug = false;
            if (data.nickname.length > 15) {
                setNameStatus('error');
                bug = true;
            }

            if (data.password == '') {
                setPasswordStatus('empty');
                bug = true;
            }

            if (data.message.length < 50) {
                setMessageStatus('error');
                bug = true;
            }
            if (bug) return;

            const docRef = await addDoc(collection(db, 'messages'), {
                nickname: data.nickname == '' ? 'Cú ẩn danh' : data.nickname,
                password: data.password,
                message: data.message,
                color: data.color,
                reacts: data.reacts,
                createdTime: serverTimestamp(),
                updatedTime: serverTimestamp(),
            });
            setIsOpenCreateMessage(false);
            setIsOpenQR(true);
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleCancel = () => {
        setIsOpenCreateMessage(false);
        // Xử lý logic khi nhấn nút Hủy
        console.log('Bạn đã hủy bỏ việc cập nhật');
    };

    return (
        <div class="flex h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100% - 1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
        <div class={`${data.color.bg_color} ${
                    data.color.border_color 
                } border-4 relative rounded-lg shadow-md`}>
            <div class="p-4 md:p-5">
            <form
                className={`space-y-4`}
            >
                <div className="mb-4">
                    <div className="relative flex flex-row">
                        <input
                            className="w-4/5 border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight rounded-lg"
                            id="displayName"
                            type="text"
                            placeholder="Tên hiển thị"
                            value={data.nickname}
                            onChange={(e) => {
                                setData({ ...data, nickname: e.target.value });
                                setNameStatus('writing');
                            }}
                            style={{ fontFamily: 'Dancing Script' }}
                        />
                        <div className="ml-2 recommend-nickname">

                    <div className="recommend-nickname"
                        onMouseEnter={() => setIsshowRcmNickname(true)}
                        onMouseLeave={() => setIsshowRcmNickname(false)}
                    >
                        <button
                            className="text-white bg-pink-700 hover:bg-pink-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                            type="button"
                        >
                            Nickname
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>

                        {isshowRcmNickname && (
                            <div id="dropdownHover" className="z-10 fixed bg-white divide-y divide-gray-100 rounded-lg shadow cursor-pointer dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                    <li
                                        onClick={() => {data.nickname = "Cú ẩn danh"; setIsshowRcmNickname(false)}}
                                    >
                                        <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cú ẩn danh</span>
                                    </li>
                                    <li
                                        onClick={() => {data.nickname = "Cú truyền thông"; setIsshowRcmNickname(false)}}
                                    >
                                        <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cú truyền thông</span>
                                    </li>
                                    <li
                                        onClick={() => {data.nickname = "Cú in lít"; setIsshowRcmNickname(false)}}
                                    >
                                        <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cú in lít</span>
                                    </li>
                                    <li
                                        onClick={() => {data.nickname = "Cú học thuật"; setIsshowRcmNickname(false)}}
                                    >
                                        <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cú học thuật</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                    </div>
                    {nameStatus === 'error' && (
                        <span style={{ color: 'red', fontStyle: 'italic' }}>
                            Tên phải nhỏ hơn 15 ký tự
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <input
                            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight rounded-lg"
                            id="password"
                            type="password"
                            placeholder="Mật khẩu"
                            value={data.password}
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value });
                                setPasswordStatus('writing');
                                if (e.target.value == '') setPasswordStatus('empty');
                                console.log(passwordStatus);
                            }}
                            style={{ fontFamily: 'Dancing Script' }}
                        />
                    </div>
                    {passwordStatus === 'empty' && (
                        <span style={{ color: 'red', fontStyle: 'italic' }}>
                            Vui lòng nhập mật khẩu
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <textarea
                            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight rounded-lg"
                            id="message"
                            placeholder="Lời nhắn"
                            value={data.message}
                            onChange={(e) => {
                                setData({ ...data, message: e.target.value });
                                setMessageStatus('writing');
                            }}
                            style={{ fontFamily: 'Dancing Script' }}
                            rows={5}
                        ></textarea>
                    </div>
                    {messageStatus === 'error' && (
                        <span style={{ color: 'red', fontStyle: 'italic' }}>
                            Tin nhắn phải lớn hơn 50 kí tự
                        </span>
                    )}
                </div>

                <ColorPicker data={data} setData={setData} />
                <br />

                <div className="flex items-center justify-end">
                    <button
                        className="text-pink-700 border-2 border-pink-700 hover:bg-pink-700 hover:text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline mr-4 hover:scale-110 ease-in duration-200"
                        type="button"
                        onClick={handleCreateMessage}
                        style={{ fontFamily: 'Dancing Script' }}
                    >
                        Gửi lời nhắn
                    </button>
                    <button
                        className="bg-[#adaa9d] hover:bg-[#ff5959] text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline hover:scale-110 ease-in duration-200"
                        type="button"
                        onClick={handleCancel}
                        style={{ fontFamily: 'Dancing Script' }}
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
        </div>
        </div>
        </div>
    );
};

export default AddMessage;

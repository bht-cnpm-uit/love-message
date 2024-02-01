import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app, auth, db } from '../config/firebase';
import { Fa500Px } from 'react-icons/fa';

const mapColor = {
    '#ff0000': ['bg-red-100/75', 'border-red-300'],
    '#00ff00': ['bg-green-100/75', 'border-green-300'],
    '#0000ff': ['bg-blue-100/75', 'border-blue-300'],
    '#ffff00': ['bg-yellow-100/75', 'border-yellow-300'],
};

const minLength = 50;

const AddMessageTest = ({ isOpenCreateMessage, setIsOpenCreateMessage }) => {
    const [data, setData] = useState({
        nickname: '',
        password: '',
        message: '',
        color: '#ff0000',
        reacts: {
            heart: 0,
            haha: 0,
            sad: 0,
        },
        updatedTime: serverTimestamp(),
    });
    //password status: initial, writing, empty, error
    const [passwordStatus, setPasswordStatus] = useState('initial');
    const [messageStatus, setMessageStatus] = useState('initial');
    const [nameStatus, setNameStatus] = useState('initial');

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
                nickname: data.nickname == '' ? 'Ẩn danh' : data.nickname,
                password: data.password,
                message: data.message,
                color: data.color,
                reacts: {
                    heart: 0,
                    haha: 0,
                    sad: 0,
                },
                createdTime: serverTimestamp(),
                updatedTime: serverTimestamp(),
            });
            setIsOpenCreateMessage(false);
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
        <div className="max-w-96 mx-auto my-8">
            <form
                className={`${mapColor[data.color][0]} ${
                    mapColor[data.color][1]
                } border-8 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4 w-96`}
            >
                <div className="mb-4">
                    <div className="relative">
                        <input
                            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight rounded-lg"
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
                        className="bg-[#E4BE4A] hover:bg-[#D4AE3E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                        type="button"
                        onClick={handleCreateMessage}
                        style={{ fontFamily: 'Dancing Script' }}
                    >
                        Gửi lời nhắn
                    </button>
                    <button
                        className="bg-[#B7AE91] hover:bg-[#A7A181] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleCancel}
                        style={{ fontFamily: 'Dancing Script' }}
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMessageTest;

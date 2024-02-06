import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const UpdateMessage = ({ isOpenUpdateMessage, setIsOpenUpdateMessage, data, setDataBigTag }) => {
    const [password, setPassword] = useState('');
    const [newMessage, setNewMessage] = useState(data.message);
    //password status: initial, writing, error, empty
    const [passwordStatus, setPasswordStatus] = useState('initial');
    const [tempDataForChangeColor, setTempDataForChangeColor] = useState({
        nickname: '',
        password: '',
        message: '',
        color: data.color,
        reacts: {
            heart: 0,
            haha: 0,
            sad: 0,
            fighting: 0,
        },
        updatedTime: '',
    });

    const handleUpdate = async () => {
        if (data.password !== password) {
            // console.log('Sai mật khẩu: ' + password + '; id: ' + data.id);
            setPasswordStatus('error');
            return;
        }
        if (data.message === newMessage) {
            // console.log('Không thay đổi gì');
            return;
        }

        try {
            // Tạo reference đến document muốn cập nhật
            const docRef = doc(db, 'messages', data.id);
            // Lấy dữ liệu hiện tại của document
            const docSnapshot = await getDoc(docRef);
            console.log(docSnapshot);
            if (docSnapshot.exists()) {
                // Cập nhật dữ liệu trong document với dữ liệu mới
                const updateData = {
                    message: newMessage,
                    updatedTime: serverTimestamp(),
                    color: tempDataForChangeColor.color,
                };
                await updateDoc(docRef, updateData, { merge: true });
                const updatedDocSnapshot = await getDoc(docRef);
                const updatedData = updatedDocSnapshot.data();
                const documentId = updatedDocSnapshot.id;
                setDataBigTag({
                    ...updatedData,
                    id: documentId
                });
                console.log('Document updated successfully!');
            } else {
                console.log('Document does not exist!');
            }
            setIsOpenUpdateMessage(false);
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleCancel = () => {
        setIsOpenUpdateMessage(false);
    };

    return (
        <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100% - 1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className={`${data.color.bg_color} ${
                    data.color.border_color 
                } relative border-4 rounded-lg shadow-md`}>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4">
                            <div className="relative">
                                <input
                                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight"
                                    id="password"
                                    type="password"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordStatus('writing');
                                        if (e.target.value == '') setPasswordStatus('empty');
                                        console.log(passwordStatus);
                                    }}
                                    style={{ fontFamily: 'Dancing Script' }}
                                />
                            </div>
                            {passwordStatus === 'error' && 'Sai mật khẩu'}
                            {passwordStatus === 'empty' && 'Vui lòng nhập mật khẩu'}

                            <div className="mb-4">
                                <div className="relative">
                                    <textarea
                                        className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight"
                                        id="message"
                                        value={newMessage}
                                        onChange={(e) => {
                                            setNewMessage(e.target.value);
                                        }}
                                        style={{ fontFamily: 'Dancing Script' }}
                                        rows={5}
                                    ></textarea>
                                    {/* Đường kẻ dưới input khi được focus */}
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <button
                                    className="text-pink-700 border-2 border-pink-700 hover:bg-pink-700 hover:text-white font-bold py-1.5 px-5 rounded focus:outline-none focus:shadow-outline mr-4 hover:scale-110 ease-in duration-200"
                                    type="button"
                                    onClick={handleUpdate}
                                    style={{ fontFamily: 'Dancing Script' }}
                                >
                                    Cập nhật
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

export default UpdateMessage;

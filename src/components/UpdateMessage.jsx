import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const UpdateMessage = ({ isOpenUpdateMessage, setIsOpenUpdateMessage, data, id }) => {
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
            console.log('Sai mật khẩu: ' + password + '; id: ' + data.id);
            setPasswordStatus('error');
            return;
        }
        if (data.message === newMessage && data.color === tempDataForChangeColor.color) {
            console.log('Không thay đổi gì');
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
                <div className={`relative bg-white border-4  rounded-lg shadow-md ${data.color.border_color}`}>
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
                            <ColorPicker
                                data={tempDataForChangeColor}
                                setData={setTempDataForChangeColor}
                            />
                            <br />
                            <div className="flex items-center justify-end">
                                <button
                                    className="bg-[#E4BE4A] hover:bg-[#D4AE3E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                                    type="button"
                                    onClick={handleUpdate}
                                    style={{ fontFamily: 'Dancing Script' }}
                                >
                                    Cập nhật
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
                </div>
            </div>
        </div>
    );
};

export default UpdateMessage;

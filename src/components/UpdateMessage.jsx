import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const UpdateMessage = ({ isOpenUpdateMessage, setIsOpenUpdateMessage, data, id }) => {
    const [password, setPassword] = useState('');
    const [newMessage, setNewMessage] = useState(data.data.message);
    const [tempDataForChangeColor, setTempDataForChangeColor] = useState({
        nickname: '',
        password: '',
        message: '',
        color: data.data.color,
        reacts: {
            heart: 0,
            haha: 0,
            sad: 0,
        },
        updatedTime: '',
    });

    const handleUpdate = async () => {
        if (data.data.password !== password) {
            console.log('Sai mật khẩu: ' + password + '; id: ' + data.data.id);
            return;
        }
        if (data.data.message === newMessage) return;

        try {
            // Tạo reference đến document muốn cập nhật
            const docRef = doc(db, 'messages', data.data.id);
            // Lấy dữ liệu hiện tại của document
            const docSnapshot = await getDoc(docRef);
            console.log(docSnapshot);
            if (docSnapshot.exists()) {
                // Cập nhật dữ liệu trong document với dữ liệu mới
                const updateData = {
                    message: newMessage,
                    updatedTime: serverTimestamp(),
                    color: tempDataForChangeColor.color
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
        <div className="max-w-md mx-auto my-8">
            <form className="bg-white border-yellow-500 border-8 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <div className="relative">
                        <input
                            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight"
                            id="password"
                            type="password"
                            placeholder="Mật khẩu"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            style={{ fontFamily: 'Dancing Script' }}
                        />
                        {/* Đường kẻ dưới input khi được focus */}
                    </div>
                </div>

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
                        ></textarea>
                        {/* Đường kẻ dưới input khi được focus */}
                    </div>
                </div>
                <ColorPicker data={tempDataForChangeColor} setData={setTempDataForChangeColor}/>
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
    );
};

export default UpdateMessage;

import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const mapColor = {
    '#ff0000': ['bg-red-100/75', 'border-red-300'],
    '#00ff00': ['bg-green-100/75', 'border-green-300'],
    '#0000ff': ['bg-blue-100/75', 'border-blue-300'],
    '#ffff00': ['bg-yellow-100/75', 'border-yellow-300'],
};

const AddMessage = ({ isOpenCreateMessage, setIsOpenCreateMessage }) => {
    const [data, setData] = useState({
        nickname: "",
        password: "",
        message: "",
        color: "#ff0000",
        reacts: {
            heart: 0,
            haha: 0,
            sad: 0
        },
        updatedTime: serverTimestamp()
    });

    const handleUpdate = () => {
        setIsOpenCreateMessage(!isOpenCreateMessage);
        // Xử lý logic khi nhấn nút Cập nhật
        console.log('Thông tin đã được cập nhật:', {
            displayName: data.nickname,
            password: data.password,
            message: data.message,
            selectedColor: data.color,
        });
    };

    const handleCreateMessage = async () => {
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                nickname: data.nickname,
                password: data.password,
                message: data.message,
                color: data.color,
                reacts: {
                    heart: 0,
                    haha: 0,
                    sad: 0
                },
                createdTime: serverTimestamp(),
                updatedTime: serverTimestamp()
            });
        setIsOpenCreateMessage(false);
        } catch (e) {
            console.log(e.message)
        }
    };

    const handleCancel = () => {
        setIsOpenCreateMessage(false);
        // Xử lý logic khi nhấn nút Hủy
        console.log('Bạn đã hủy bỏ việc cập nhật');
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <form
                className={`${mapColor[data.data.color][0]} ${
                    mapColor[data.data.color][1]
                } border-8 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4`}
            >
                <div className="mb-4">
                    <div className="relative">
                        <input
                            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight"
                            id="displayName"
                            type="text"
                            placeholder="Tên hiển thị"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            style={{ fontFamily: 'Dancing Script' }}
                        />
                        {/* Đường kẻ dưới input khi được focus */}
                    </div>
                </div>

                    <div className="mb-4">
                        <div className="relative">
                            <input
                                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight"
                                id="password"
                                type="password"
                                placeholder="Mật khẩu"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                style={{ fontFamily: 'Dancing Script' }}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="relative">
                            <textarea
                                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 py-2 px-3 text-gray-700 leading-tight"
                                id="message"
                                placeholder="Lời nhắn"
                                value={data.message}
                                onChange={(e) => setData({ ...data, message: e.target.value })}
                                style={{ fontFamily: 'Dancing Script' }}
                            ></textarea>
                        </div>
                    </div>

                    <ColorPicker data = {data} setData = {setData}/>
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
            </div>
        </div>
        </div>
    );
};

export default AddMessage;

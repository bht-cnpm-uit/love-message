import React, { useState } from 'react';
import ColorPicker from './ColorPicker';


const AddMessage = ({ isOpenCreateMessage, setIsOpenCreateMessage }) => {
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = () => {
        setIsOpenCreateMessage(!isOpenCreateMessage)
        // Xử lý logic khi nhấn nút Cập nhật
        console.log('Thông tin đã được cập nhật:', {
            displayName,
            password,
            message,
            selectedColor,
        });
    };

    const handleCancel = () => {
        setIsOpenCreateMessage(!isOpenCreateMessage)
        // Xử lý logic khi nhấn nút Hủy
        console.log('Bạn đã hủy bỏ việc cập nhật');
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <form className="bg-white border-yellow-500 border-8 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            placeholder="Lời nhắn"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ fontFamily: 'Dancing Script' }}
                        ></textarea>
                        {/* Đường kẻ dưới input khi được focus */}
                    </div>
                </div>
                <ColorPicker />
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

export default AddMessage;

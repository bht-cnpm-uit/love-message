import React, { useState } from 'react';
import { doc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const DeleteMessage = ({ isOpenDeleteMessage, setIsOpenDeleteMessage, data, id }) => {
    const [password, setPassword] = useState('');
    const [passwordStatus, setPasswordStatus] = useState('initial');

    const handleDelete = async () => {
        if (data.password !== password) {
            console.log('Sai mật khẩu: ' + password + '; id: ' + data.id);
            setPasswordStatus('error');
            return;
        }

        try {
            // Tạo reference đến document muốn xóa
            const docRef = doc(db, 'messages', data.id);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                //Xóa
                await deleteDoc(docRef);
                console.log('Document deleted successfully!');
            } else {
                console.log('Document does not exist!');
            }
            setIsOpenDeleteMessage(false);
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    const handleCancel = () => {
        setIsOpenDeleteMessage(false);
    };

    return (
        <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100% - 1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white border-4 border-yellow-300 rounded-lg shadow-md">
            <div className="p-4 md:p-5">
                <form className="space-y-4">
                <div className="mb-4">
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
                                if(e.target.value == '')
                                    setPasswordStatus('empty');
                                console.log(passwordStatus);
                            }}
                            style={{ fontFamily: 'Dancing Script' }}
                        />
                        {/* Đường kẻ dưới input khi được focus */}
                    </div>
                    {passwordStatus === 'error' && "Sai mật khẩu"}
                    {passwordStatus === 'empty' && "Vui lòng nhập mật khẩu"}
                </div>

                <br />
                <div className="flex items-center justify-end">
                    <button
                        className="bg-[#E4BE4A] hover:bg-[#D4AE3E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                        type="button"
                        onClick={handleDelete}
                        style={{ fontFamily: 'Dancing Script' }}
                    >
                        Xóa
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

export default DeleteMessage;

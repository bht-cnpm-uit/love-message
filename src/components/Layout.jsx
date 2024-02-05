import React, { useEffect, useState, useMemo, useRef } from 'react';
import StackGrid from 'react-stack-grid';
import Background from '../../src/Assets/header_center.png';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import BoxCreateMessage from './BoxCreateMessage';
import Footer from './Footer';
import AddMessage from './AddMessage';
import ButtonCreateMessage from './ButtonCreateMessage';
import DeleteMessage from './DeleteMessage';
import BigTagMessage from './BigTagMessage';
import TagMessage from './TagMessage';
import QRComponet from './QRComponent';
import UpdateMessage from './UpdateMessage';
import Navigator from './Navigator';
import Snowfall from 'react-snowfall';
import hoadao from '../Assets/hoa_dao.png';
import hoamai from '../Assets/hoa_mai.png';
const Layout = () => {
    const [isOpenCreateMessage, setIsOpenCreateMessage] = useState(false);
    const [isShowBigTag, setIsShowBigTag] = useState(false);
    const [isOpenDeleteMessage, setIsOpenDeleteMessage] = useState(false);
    const [isOpenUpdateMessage, setIsOpenUpdateMessage] = useState(false);
    const [currentBigTag, setcurrentBigTag] = useState('');
    const [isOpenQR, setIsOpenQR] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [messages, setMessages] = useState([]);
    const dbMessages = collection(db, 'messages');
    useEffect(() => {
        // Subscribe to the 'messages' collection using onSnapshot
        const unsubscribe = onSnapshot(dbMessages, (snapshot) => {
            const messageData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(messageData);
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => {
            unsubscribe();
        };
    }, []);

    const images = useMemo(() => {
        const flower1 = document.createElement('img');
        flower1.src = hoadao;
        const flower2 = document.createElement('img');
        flower2.src = hoamai;
        return [flower1, flower2];
    }, [hoadao, hoamai]);

    const handleSortChange = (option) => {
        setSortBy(option);
    };

    const sortByDate = (messages) => {
        const copyMessages = messages.slice();
        return copyMessages.sort((a, b) => {
            const dateA = new Date(
                a.updatedTime.seconds * 1000 + a.updatedTime.nanoseconds / 1000000,
            );
            const dateB = new Date(
                b.updatedTime.seconds * 1000 + b.updatedTime.nanoseconds / 1000000,
            );
            return dateB - dateA;
        });
    };

    // Hàm sắp xếp theo số lượng tổng react
    const sortByReact = (messages) => {
        const copyMessages = messages.slice();
        return copyMessages.sort((a, b) => {
            const totalReactA = Object.values(a.reacts).reduce((acc, curr) => acc + curr, 0);
            const totalReactB = Object.values(b.reacts).reduce((acc, curr) => acc + curr, 0);
            return totalReactB - totalReactA;
        });
    };

    const getSortedMessages = () => {
        if (sortBy === 'date') {
            // Sắp xếp theo ngày mới nhất
            return sortByDate(messages);
        } else if (sortBy === 'interactions') {
            // Sắp xếp theo số lượng tương tác nhiều nhất
            return sortByReact(messages);
        } else {
            // Mặc định hiển thị mảng messages không sắp xếp
            return messages;
        }
    };

    return (
        <div className="bg-gradient-to-b from-yellow-200 from-5% via-red-300 via-60% to-blue-200 to-90%">
            <Snowfall
                color="red"
                snowflakeCount={40}
                images={images}
                radius={[10.0, 20.0]}
                wind={[-0.5, 2.0]}
                style={{
                    position: 'fixed',
                    width: '100vw',
                }}
            />
            <div
                className="bg-cover h-40 xl:h-96 lg:h-80 md:h-64 sm:h-48"
                style={{
                    backgroundImage: `url(${Background})`,
                }}
            ></div>
            <BoxCreateMessage
                isOpenCreateMessage={isOpenCreateMessage}
                setIsOpenCreateMessage={setIsOpenCreateMessage}
            />
            <Navigator handleSortChange={handleSortChange}/>

            {isOpenCreateMessage && (
                <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <AddMessage
                        isOpenCreateMessage={isOpenCreateMessage}
                        setIsOpenCreateMessage={setIsOpenCreateMessage}
                        setIsOpenQR={setIsOpenQR}
                    />
                </div>
            )}
            <ButtonCreateMessage
                isOpenCreateMessage={isOpenCreateMessage}
                setIsOpenCreateMessage={setIsOpenCreateMessage}
            />
            <div className="max-w-[1400px] px-4 mx-auto mt-14">
                <StackGrid
                    monitorImagesLoaded={true}
                    StackGrid
                    gutterHeight={24}
                    gutterWidth={24}
                    
                    columnWidth={300}
                >
                    {getSortedMessages().map((element, index) => (
                        <TagMessage
                            key={index}
                            data={element}
                            isShowBigTag={isShowBigTag}
                            setIsShowBigTag={setIsShowBigTag}
                            currentBigTag={currentBigTag}
                            setcurrentBigTag={setcurrentBigTag}
                            isOpenDeleteMessage={isOpenDeleteMessage}
                            setIsOpenDeleteMessage={setIsOpenDeleteMessage}
                            isOpenUpdateMessage={isOpenUpdateMessage}
                            setIsOpenUpdateMessage={setIsOpenUpdateMessage}
                        />
                    ))}
                </StackGrid>
            </div>
            {isShowBigTag && !isOpenCreateMessage && currentBigTag && (
                <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <BigTagMessage
                        dataBigTag={currentBigTag}
                        setDataBigTag = {setcurrentBigTag}
                        setIsShowBigTag={setIsShowBigTag}
                        isOpenDeleteMessage={isOpenDeleteMessage}
                        setIsOpenDeleteMessage={setIsOpenDeleteMessage}
                        isOpenUpdateMessage={isOpenUpdateMessage}
                        setIsOpenUpdateMessage={setIsOpenUpdateMessage}
                    />
                </div>
            )}
            {isOpenQR && !isOpenCreateMessage && (
                <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <QRComponet setIsOpenQR={setIsOpenQR} />
                </div>
            )}
            {isOpenDeleteMessage && (
                <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="absolute w-full h-full bg-gray-800 opacity-75"></div>
                    <div className="relative z-10 w-1/2">
                        <DeleteMessage
                            isOpenUpdateMessage={isOpenDeleteMessage}
                            setIsOpenDeleteMessage={setIsOpenDeleteMessage}
                            data={currentBigTag}
                            setDataBigTag = {setcurrentBigTag}
                        />
                    </div>
                </div>
            )}
            {isOpenUpdateMessage && (
                <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <UpdateMessage
                        isOpenUpdateMessage={isOpenUpdateMessage}
                        setIsOpenUpdateMessage={setIsOpenUpdateMessage}
                        data={currentBigTag}
                        setDataBigTag = {setcurrentBigTag}
                    />
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Layout;

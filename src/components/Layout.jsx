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
import Snowfall from 'react-snowfall';
import hoadao from '../Assets/hoa_dao.png';
import hoamai from '../Assets/hoa_mai.png';
const Layout = (props) => {
    const [isOpenCreateMessage, setIsOpenCreateMessage] = useState(false);
    const [isShowBigTag, setIsShowBigTag] = useState(false);
    const [isOpenDeleteMessage, setIsOpenDeleteMessage] = useState(false);
    const [isOpenUpdateMessage, setIsOpenUpdateMessage] = useState(false);
    const [currentBigTag, setcurrentBigTag] = useState('');
    const [isOpenQR, setIsOpenQR] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    // const [scrollY, setScrollY] = useState(false);
    const [messages, setMessages] = useState([]);
    const dbMessages = collection(db, 'messages');
    const { width } = props;
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

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setScrollY(window.scrollY > 500);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    const images = useMemo(() => {
        const flower1 = document.createElement('img');
        flower1.src = hoadao;
        const flower2 = document.createElement('img');
        flower2.src = hoamai;
        return [flower1, flower2];
    }, [hoadao, hoamai]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
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
            <div className="flex justify-start mb-4 items-center ml-16">
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={handleSortChange}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Mặc định</option>
                        <option value="date">Ngày mới nhất</option>
                        <option value="interactions">Tương tác nhiều nhất</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M0 0h20v20H0z" fill="none" />
                            <path
                                d="M7 7l3-3 3 3M7 13l3 3 3-3M10 18v-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {isOpenCreateMessage && (
                <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <AddMessage
                        isOpenCreateMessage={isOpenCreateMessage}
                        setIsOpenCreateMessage={setIsOpenCreateMessage}
                        setIsOpenQR={setIsOpenQR}
                    />
                </div>
            )}
            {/* {scrollY && (
                <ButtonCreateMessage
                    isOpenCreateMessage={isOpenCreateMessage}
                    setIsOpenCreateMessage={setIsOpenCreateMessage}
                />
            )} */}
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
                    />
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Layout;

import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Background from '../../src/Assets/header.png';
import { FaEllipsisV } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { app, db, auth } from '../config/firebase';
import BoxCreateMessage from './BoxCreateMessage';
import Footer from './Footer';
import AddMessageTest from './AddMessageTest';
import ButtonCreateMessage from './ButtonCreateMessage';
import TagMessage from './TagMessage';

const Layout = () => {
    const [isOpenCreateMessage, setIsOpenCreateMessage] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [messages, setMessages] = useState([]);
    const dbMessages = collection(db, 'messages');

    const getData = async () => {
        const data = await getDocs(dbMessages);
        const messageData = data.docs.map((doc) => ({
            id: doc.id, // Lấy key của document
            ...doc.data(), // Lấy dữ liệu của document
        }));
        setMessages(messageData);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <header
                className="bg-cover"
                style={{
                    height: '400px',
                    backgroundImage: `url(${Background})`,
                }}
            ></header>
            <BoxCreateMessage
                isOpenCreateMessage={isOpenCreateMessage}
                setIsOpenCreateMessage={setIsOpenCreateMessage}
            />
            {isOpenCreateMessage && (
                <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="absolute w-full h-full bg-gray-800 opacity-75"></div>
                    <div className="relative z-10 w-1/2">
                        <AddMessageTest
                            isOpenCreateMessage={isOpenCreateMessage}
                            setIsOpenCreateMessage={setIsOpenCreateMessage}
                            getData={getData}
                        />
                    </div>
                </div>
            )}
            {scrollY > 500 && (
                <ButtonCreateMessage
                    isOpenCreateMessage={isOpenCreateMessage}
                    setIsOpenCreateMessage={setIsOpenCreateMessage}
                />
            )}
            <div className="max-w-[1000px] px-4 mx-auto mt-4">
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                    <Masonry gutter="16px">
                        {messages.map((element, index) => (
                            <TagMessage key={index} data={element}/>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
            <Footer />
        </>
    );
};

export default Layout;

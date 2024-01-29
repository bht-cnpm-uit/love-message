import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Background from '../../src/Assets/header.png';
import { collection, onSnapshot } from 'firebase/firestore';
import {db } from '../config/firebase';
import BoxCreateMessage from './BoxCreateMessage';
import Footer from './Footer';
import AddMessageTest from './AddMessageTest';
import ButtonCreateMessage from './ButtonCreateMessage';
import TagMessage from './TagMessage';
import Snowfall from 'react-snowfall'
import hoadao from "../Assets/hoa_dao.png"
import hoamai from "../Assets/hoa_mai.png"
const Layout = () => {
    const [isOpenCreateMessage, setIsOpenCreateMessage] = useState(false);
    const [scrollY, setScrollY] = useState(false);
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

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const flower1 = document.createElement('img')
    flower1.src = hoadao
    const flower2 = document.createElement('img')
    flower2.src = hoamai

    const images = [flower1, flower2]

    return (
        <>
        <Snowfall 
            color="red"
            snowflakeCount={40}
            images={images}
            radius={[10.0, 20.0]}
            wind = {[-0.5, 2.0]}
            style={{
                position: 'fixed',
                width: '100vw',
              }}
        />
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
                        />
                    </div>
                </div>
            )}
            {scrollY && (
                <ButtonCreateMessage
                    isOpenCreateMessage={isOpenCreateMessage}
                    setIsOpenCreateMessage={setIsOpenCreateMessage}
                />
            )}
            <div className="max-w-[1400px] px-4 mx-auto mt-14">
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 , 1000:4}}>
                    <Masonry gutter="32px">
                        {messages.map((element, index) => (
                            <TagMessage key={index} data={element}/>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Layout;

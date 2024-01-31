import React, { useEffect, useState, useMemo  } from 'react';
import StackGrid from "react-stack-grid";
import Background from '../../src/Assets/header_center.png';
import { collection, onSnapshot } from 'firebase/firestore';
import {db } from '../config/firebase';
import BoxCreateMessage from './BoxCreateMessage';
import Footer from './Footer';
import AddMessage from './AddMessage';
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

    const images = useMemo(() => {
        const flower1 = document.createElement('img');
        flower1.src = hoadao;
        const flower2 = document.createElement('img');
        flower2.src = hoamai;
        return [flower1, flower2];
      }, [hoadao, hoamai]);
    
    return (
        <div className="bg-gradient-to-b from-yellow-200 from-5% via-red-300 via-60% to-red-400 to-90%">
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
            {isOpenCreateMessage && 
            (
                <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <AddMessage
                        isOpenCreateMessage={isOpenCreateMessage}
                        setIsOpenCreateMessage={setIsOpenCreateMessage}
                    />
                </div>
            )
            }
            {scrollY && (
                <ButtonCreateMessage
                    isOpenCreateMessage={isOpenCreateMessage}
                    setIsOpenCreateMessage={setIsOpenCreateMessage}
                />
            )}
            <div className="max-w-[1400px] px-4 mx-auto mt-14">
               
                    <StackGrid
                        gutterHeight={32}
                        gutterWidth={32}
                        columnWidth = {300}
                    >
                        {messages.map((element, index) => (
                            <TagMessage  key={index} data={element}/>
                        ))}
                    </StackGrid>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
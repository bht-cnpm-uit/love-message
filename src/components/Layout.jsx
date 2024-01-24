import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Background from '../../src/Assets/header.png';
import { FaEllipsisV } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { app, db, auth } from "../config/firebase";
import BoxCreateMessage from "./BoxCreateMessage";
import Footer from "./Footer";
import AddMessageTest from "./AddMessageTest";
import ButtonCreateMessage from "./ButtonCreateMessage"

const Layout = () => {
    const [isOpenCreateMessage, setIsOpenCreateMessage] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [messages, setMessages] = useState([]);
    const dbMessages = collection(db, "messages");

    const getData = async () => {
        const data = await getDocs(dbMessages);
        const messageData = data.docs.map(doc => doc.data());
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
        console.log(messages)
    }, []);

    return (
        <>
            <header
                className="bg-cover"
                style={{
                    height: "400px",
                    backgroundImage: `url(${Background})`
                }}
            >
            </header>
            <BoxCreateMessage isOpenCreateMessage={isOpenCreateMessage} setIsOpenCreateMessage={setIsOpenCreateMessage}/>
            {
                isOpenCreateMessage &&
                (
                    <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="absolute w-full h-full bg-gray-800 opacity-75"></div>
                        <div className="relative z-10">
                            <AddMessageTest isOpenCreateMessage={isOpenCreateMessage} setIsOpenCreateMessage={setIsOpenCreateMessage}  getData = {getData} />
                        </div>
                    </div>
                )
            }
            {
                scrollY > 500 &&
                <ButtonCreateMessage isOpenCreateMessage={isOpenCreateMessage} setIsOpenCreateMessage={setIsOpenCreateMessage} />
            }
            <div className="max-w-[1000px] px-4 mx-auto mt-4">
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry gutter="16px">
                            {messages.map((element, index) => (
                                <div key={index} className="tagMessage">
                                    <div className="relative justify-center items-center p-4 bg-amber-100/75 text-black rounded-[25px] border-4 border-amber-300">
                                        <span className='text-xs inline '>Hà Mi 5:00 20/01/2024</span>
                                        <button className='float-right inline text-xs '><FaEllipsisV /></button>
                                        <p className='block mt-4 mb-10 font-semibold'>{element.message}</p>
                                        <div className="absolute bottom-4 right-8 ">
                                        <svg className="inline mr-4" width="30" height="30" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M40.3697 20.1849C40.3697 31.3325 31.3325 40.3697 20.1849 40.3697C9.03721 40.3697 0 31.3325 0 20.1849C0 9.03721 9.03721 0 20.1849 0C31.3325 0 40.3697 9.03721 40.3697 20.1849Z" fill="#FFCC4D" />
                                        <path d="M20.1849 24.5011C16.8589 24.5011 14.6509 24.1131 11.9214 23.5827C11.2968 23.4638 10.0846 23.5827 10.0846 25.4195C10.0846 29.092 14.3044 33.6829 20.1849 33.6829C26.0654 33.6829 30.2852 29.092 30.2852 25.4195C30.2852 23.5827 29.0718 23.4627 28.4483 23.5827C25.7189 24.1131 23.512 24.5011 20.1849 24.5011Z" fill="#664500" />
                                        <path d="M18.671 3.6793C17.7077 0.953223 14.7193 -0.477659 11.9921 0.483365C10.3369 1.06648 9.16506 2.40205 8.70866 3.96413C7.37309 3.03451 5.62374 2.73061 3.97082 3.31373C1.24587 4.27588 -0.187259 7.2666 0.776007 9.99268C0.912816 10.3784 1.09448 10.7362 1.3053 11.067C3.49311 15.0838 9.81434 17.9074 13.6416 17.9422C16.5987 15.5121 19.7487 9.34676 18.9323 4.84778C18.8897 4.45754 18.8056 4.06506 18.671 3.6793ZM21.6987 3.6793C22.662 0.953223 25.6516 -0.477659 28.3777 0.483365C30.0329 1.06648 31.2047 2.40205 31.6622 3.96413C32.9978 3.03451 34.7471 2.73061 36.4001 3.31373C39.125 4.27588 40.557 7.2666 39.596 9.99268C39.4581 10.3784 39.2775 10.7362 39.0656 11.067C36.8778 15.0838 30.5565 17.9074 26.7281 17.9422C23.7711 15.5121 20.6222 9.34676 21.4386 4.84778C21.4801 4.45754 21.5642 4.06506 21.6987 3.6793Z" fill="#DD2E44" />
                                    </svg>

                                    <svg className="inline" width="30" height="30" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M40 19.4758C40 30.2319 31.0456 38.9516 20 38.9516C8.95444 38.9516 0 30.2319 0 19.4758C0 8.71976 8.95444 0 20 0C31.0456 0 40 8.71976 40 19.4758Z" fill="#FFCC4D" />
                                        <path d="M24.4444 29.2138C24.4444 32.2033 22.4544 32.4598 20 32.4598C17.5444 32.4598 15.5556 32.2033 15.5556 29.2138C15.5556 26.2264 17.5444 22.7218 20 22.7218C22.4544 22.7218 24.4444 26.2264 24.4444 29.2138ZM33.3333 16.2299C33.1956 16.2299 33.0556 16.205 32.9211 16.152C27.1111 13.8896 24.73 10.4813 24.6311 10.3374C24.29 9.83967 24.4278 9.16775 24.9389 8.83666C25.4489 8.50557 26.1356 8.63758 26.4778 9.13313C26.4989 9.16234 28.6222 12.1465 33.7456 14.1417C34.3156 14.3646 34.5933 14.9932 34.3656 15.5482C34.1911 15.9724 33.7733 16.2299 33.3333 16.2299ZM6.66667 16.2299C6.22556 16.2299 5.80889 15.9724 5.63445 15.5493C5.40667 14.9943 5.68333 14.3646 6.25333 14.1427C11.3778 12.1476 13.5011 9.16342 13.5222 9.13421C13.8644 8.64082 14.5544 8.5099 15.0633 8.84207C15.5711 9.17533 15.7089 9.84291 15.3689 10.3385C15.27 10.4824 12.8889 13.8906 7.08 16.1531C6.94445 16.205 6.80445 16.2299 6.66667 16.2299Z" fill="#664500" />
                                        <path d="M26.6667 17.3118H31.1111V37.8696L26.6667 37.8199V17.3118ZM8.88892 37.8696L13.3334 37.8199V17.3118H8.88892V37.8696Z" fill="#5DADEC" />
                                        <path d="M16.6655 19.4758C16.4988 19.4758 16.3288 19.439 16.1699 19.3622C12.2677 17.4622 8.31435 19.3427 8.27546 19.3622C7.72546 19.6316 7.0588 19.412 6.78435 18.8785C6.50991 18.344 6.73213 17.6938 7.28102 17.4265C7.48324 17.3291 12.2788 15.0494 17.1644 17.4265C17.7132 17.6938 17.9355 18.344 17.661 18.8785C17.4655 19.2572 17.0732 19.4758 16.6655 19.4758ZM32.221 19.4758C32.0544 19.4758 31.8843 19.439 31.7255 19.3622C27.8221 17.4622 23.8699 19.3427 23.831 19.3622C23.2821 19.6305 22.6155 19.413 22.3399 18.8785C22.0655 18.344 22.2877 17.6938 22.8366 17.4265C23.0388 17.3291 27.8377 15.0504 32.7199 17.4265C33.2688 17.6938 33.491 18.344 33.2166 18.8785C33.021 19.2572 32.6288 19.4758 32.221 19.4758Z" fill="#664500" />
                                        <path d="M20 38.9517C31.0457 38.9517 40 37.9828 40 36.7877C40 35.5926 31.0457 34.6237 20 34.6237C8.9543 34.6237 0 35.5926 0 36.7877C0 37.9828 8.9543 38.9517 20 38.9517Z" fill="#5DADEC" />
                                        <path d="M20 31.3777C21.8409 31.3777 23.3333 30.4089 23.3333 29.2137C23.3333 28.0186 21.8409 27.0497 20 27.0497C18.159 27.0497 16.6666 28.0186 16.6666 29.2137C16.6666 30.4089 18.159 31.3777 20 31.3777Z" fill="#E75A70" />
                                    </svg>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>
            <Footer />
        </>
    );
}

export default Layout;

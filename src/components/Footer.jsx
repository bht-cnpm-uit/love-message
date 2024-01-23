import React from "react";
import ImageFooter from '../../src/Assets/5.png';

const Footer = () => {
    return (
        <div className="w-full h-20 flex justify-end">
            <div
                className="w-20 h-full"
                style={{
                    backgroundImage: `url(${ImageFooter})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            ></div>
        </div>
    );
};

export default Footer;

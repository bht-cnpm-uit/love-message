const QRComponent = ({ setIsOpenQR }) => {
    return (
        <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-black p-8 rounded-md z-50 flex flex-col items-center`}
            style={{ fontFamily: 'Dancing Script' }}
        >
            <p className="text-black text-xl mb-4">
                Gửi lời nhắn đến mọi người thành công &#10084;&#65039;
            </p>
            <p className="text-black text-xl mb-4" style={{fontStyle: "italic"}}>
                Mã QR lì xì sẽ xuất hiện từ 0h-12h ngày 10/02(nhằm mùng 1 Tết)
            </p>
            {/* <img
                src="src/Assets/1.png" // Thay đổi đường dẫn đến hình ảnh QR của bạn
                alt="Lì xì"
                style={{ maxWidth: '100%', height: 'auto' }}
            /> */}
            <button
                className="bg-[#B7AE91] hover:bg-[#A7A181] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                    setIsOpenQR(false);
                }}
            >
                OK
            </button>
        </div>
    );
};

export default QRComponent;

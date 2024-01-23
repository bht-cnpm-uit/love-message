import React, { useState } from 'react';

const ColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState(null);

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex space-x-4">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`w-8 h-8 rounded-full cursor-pointer ${
                            selectedColor === color ? 'border-2 border-yellow-500' : ''
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorClick(color)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;
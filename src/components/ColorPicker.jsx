import React, { useState } from 'react';

const colorList = [
  ['bg-red-100/75', 'border-red-500'],
  ['bg-green-100/75', 'border-green-500'],
  ['bg-blue-100/75', 'border-blue-500'],
  ['bg-yellow-100/75', 'border-yellow-500'],
];

const ColorPicker = ({ data, setData }) => {
  const [selectedColor, setSelectedColor] = useState(data.color);

  const handleColorClick = (color) => {
    setSelectedColor({
      bg_color: color[0],
      border_color: color[1],
    });
    setData({ ...data, color: {
        bg_color: color[0],
        border_color: color[1],
      } });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-4">
        {colorList.map((color, index) => (
          <div
            key={index}
            className={`${
              selectedColor.bg_color === color[0] ? 'border-solid' : 'opacity-50 border-dashed' 
            } hover:opacity-100 h-10 w-10 cursor-pointer border-2 rounded-full ${color[0]} ${color[1]}`}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;

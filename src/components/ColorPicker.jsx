import React, { useState } from 'react';

const colorList = [
  ['bg-red-100/75', 'border-red-300'],
  ['bg-green-100/75', 'border-green-300'],
  ['bg-blue-100/75', 'border-blue-300'],
  ['bg-yellow-100/75', 'border-yellow-300'],
];

const ColorPicker = ({ data, setData }) => {
  const [selectedColor, setSelectedColor] = useState(data.color);

  const handleColorClick = (color) => {
    setSelectedColor({
      bg_color: color[0],
      border_color: color[1],
    });
    setData({ ...data, color: selectedColor });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-4">
        {colorList.map((color, index) => (
          <div
            key={index}
            className={`${
              selectedColor.bg_color === color[0] ? '' : 'opacity-60'
            } h-8 w-8 border-solid cursor-pointer border-2 rounded-full ${color[0]} ${color[1]}`}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;

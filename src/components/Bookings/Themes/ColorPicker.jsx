import React from 'react';
import './ColorPicker.css';

const ColorPicker = ({ label, colors, selectedColor, onSelectColor }) => {
  return (
    <div className="color-picker">
      <label>{label}</label>
      <div className="color-palette">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-swatch ${color === selectedColor ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onSelectColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
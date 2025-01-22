import React from 'react';
import ColorPicker from './ColorPicker';
import './CreateYourTheme.css';

const CreateYourTheme = ({ customTheme, onColorSelect, themeVariables, colorPalettes }) => {
  return (
    <div className="create-your-theme">
      <h3>Create Your Theme</h3>
      {themeVariables.map((variable) => (
        <ColorPicker
          key={variable}
          label={variable}
          colors={colorPalettes[variable]}
          selectedColor={customTheme[variable]}
          onSelectColor={(color) => onColorSelect(variable, color)}
        />
      ))}
    </div>
  );
};

export default CreateYourTheme;
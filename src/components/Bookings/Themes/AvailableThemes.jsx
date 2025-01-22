import React from 'react';
import { themes } from './themes';
import './AvailableThemes.css';

const AvailableThemes = ({ onSelectTheme }) => {
  const themeNames = ['default', 'dark', 'pastel', 'vibrant'];

  return (
    <div className="available-themes">
      <h3>Available Themes</h3>
      <div className="theme-bar">
        {themeNames.map((themeName) => (
          <div
            key={themeName}
            className="theme-preview"
            style={{ backgroundColor: themes[themeName].background }}
            onClick={() => onSelectTheme(themes[themeName])}
          >
            <span>{themeName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableThemes;
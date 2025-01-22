import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import AvailableThemes from './AvailableThemes';
import CreateYourTheme from './CreateYourTheme';
import ThemeVariablesList from './ThemeVariablesList'; // Import the new component
import './Settings.css';

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // State to manage custom theme
  const [customTheme, setCustomTheme] = useState({ ...theme });

  // Define theme variables
  const themeVariables = [
    'primary',
    'secondary',
    'background',
    'text',
    'cardBackground',
    'cardBorder',
    'buttonText',
    'buttonHover',
  ];

  // Define base color palettes for each theme variable
  const baseColorPalettes = {
    primary: ['#007bff', '#0d6efd', '#6610f2', '#6f42c1', '#d63384'],
    secondary: ['#6c757d', '#adb5bd', '#6c757d', '#495057', '#343a40'],
    background: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da'],
    text: ['#333333', '#212529', '#495057', '#6c757d', '#adb5bd'],
    cardBackground: ['#f9f9f9', '#ffffff', '#e9ecef', '#dee2e6', '#ced4da'],
    cardBorder: ['#e0e0e0', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d'],
    buttonText: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da'],
    buttonHover: ['#0056b3', '#0b5ed7', '#0a58ca', '#0a53be', '#094db1'],
  };

  // State to manage color palettes based on selected theme
  const [colorPalettes, setColorPalettes] = useState(baseColorPalettes);

  // Handle color selection
  const handleColorSelect = (property, color) => {
    setCustomTheme((prevTheme) => ({
      ...prevTheme,
      [property]: color,
    }));
  };

  // Apply the custom theme
  const applyCustomTheme = () => {
    setTheme(customTheme);
  };

  // Handle pre-made theme selection
  const handleThemeSelect = (selectedTheme) => {
    setCustomTheme(selectedTheme);

    // Update color palettes based on selected theme
    const newColorPalettes = {};
    themeVariables.forEach((variable) => {
      newColorPalettes[variable] = generateColorPalette(selectedTheme[variable]);
    });
    setColorPalettes(newColorPalettes);
  };

  // Function to generate a color palette based on a base color
  const generateColorPalette = (baseColor) => {
    // This is a simple example, you can use a more sophisticated algorithm
    return [
      baseColor,
      `${baseColor}cc`,
      `${baseColor}99`,
      `${baseColor}66`,
      `${baseColor}33`,
    ];
  };

  return (
    <div className="settings-container" style={{ backgroundColor: customTheme.background, color: customTheme.text }}>
      <h2>Theme Settings</h2>

      {/* Preview Box */}
      <div className="preview-box" style={{ backgroundColor: customTheme.cardBackground, borderColor: customTheme.cardBorder }}>
        <h3 style={{ color: customTheme.primary }}>Preview Box</h3>
        <p>This is a preview of how your theme will look.</p>
        <button
          className="preview-button"
          style={{ backgroundColor: customTheme.primary, color: customTheme.buttonText }}
        >
          Example Button
        </button>
      </div>

      {/* Available Themes */}
      <AvailableThemes onSelectTheme={handleThemeSelect} />



      {/* Create Your Theme */}
      <CreateYourTheme
        customTheme={customTheme}
        onColorSelect={handleColorSelect}
        themeVariables={themeVariables}
        colorPalettes={colorPalettes}
      />

      {/* Apply and Back Buttons */}
      <button
        className="apply-button"
        style={{ backgroundColor: customTheme.primary, color: customTheme.buttonText }}
        onClick={applyCustomTheme}
      >
        Apply Theme
      </button>
      <button
        className="back-button"
        style={{ backgroundColor: customTheme.secondary, color: customTheme.buttonText }}
        onClick={() => navigate('/')}
      >
        Back to Landing Page
      </button>

      {/* Theme Variables List */}
      <ThemeVariablesList themeVariables={themeVariables} />
    </div>
  );
};

export default Settings;
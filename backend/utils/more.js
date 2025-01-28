class ThemeGenerator {
    /**
     * Constructor for the ThemeGenerator class.
     * @param {object} userVariables - User-specified CSS variables (e.g., { textColor: "rgba(30, 30, 30, 1)", backgroundColor: "rgba(255, 255, 255, 1)" }).
     * @param {string} [colorMethod="two-tone"] - Color generation method ("two-tone", "triadic", "complementary").
     */
    constructor(userVariables = {}, colorMethod = "two-tone") {
      this.userVariables = userVariables;
      this.colorMethod = colorMethod;
  
      // Generate the theme
      this.themes = {
        light: this.generateTheme("light"),
        dark: this.generateTheme("dark"),
      };
    }
  
    /**
     * Generates a theme (light or dark mode).
     * @param {string} mode - "light" or "dark".
     * @returns {object} - Theme object.
     */
    generateTheme(mode) {
      const isDarkMode = mode === "dark";
  
      // Select the appropriate color generator based on the colorMethod
      const generator = this.getColorGenerator();
  
      // Generate the theme using the selected generator
      const theme = generator(isDarkMode);
  
      return theme;
    }
  
    /**
     * Returns the appropriate color generator function based on the colorMethod.
     * @returns {function} - Color generator function.
     */
    getColorGenerator() {
      switch (this.colorMethod) {
        case "two-tone":
          return this.twoToneGenerator.bind(this);
        case "triadic":
          return this.triadicGenerator.bind(this);
        case "complementary":
          return this.complementaryGenerator.bind(this);
        default:
          return this.twoToneGenerator.bind(this);
      }
    }
  
    /**
     * Generates a theme using the two-tone method.
     * @param {boolean} isDarkMode - Whether to generate a dark mode theme.
     * @returns {object} - Theme object.
     */
    twoToneGenerator(isDarkMode) {
      const primaryColor = this.userVariables.primaryColor || this.generatePrimaryColor();
      const secondaryColor = this.userVariables.secondaryColor || this.generateShade(primaryColor, 40); // Darker shade of primary
  
      return {
        // Core colors
        primaryColor,
        secondaryColor,
        textColor: this.userVariables.textColor || this.getReasonableTextColor(this.userVariables.backgroundColor || this.generateBackgroundColor(isDarkMode)),
        backgroundColor: this.userVariables.backgroundColor || this.generateBackgroundColor(isDarkMode),
  
        // Card colors
        cardBackgroundColor: this.userVariables.cardBackgroundColor || this.generateTint(primaryColor, 60),
        cardBorderColor: this.userVariables.cardBorderColor || this.generateShade(secondaryColor, 40),
        cardTextColor: this.userVariables.cardTextColor || this.getReasonableTextColor(this.generateTint(primaryColor, 60)),
        cardBoxShadowColor: this.userVariables.cardBoxShadowColor || this.generateCardBoxShadowColor(isDarkMode),
  
        // Text and shadows
        textShadowColor: this.userVariables.textShadowColor || this.generateTextShadowColor(isDarkMode),
  
        // Button colors
        buttonColor: this.userVariables.buttonColor || primaryColor,
        buttonHoverColor: this.userVariables.buttonHoverColor || this.generateTint(primaryColor, 20),
        buttonActiveColor: this.userVariables.buttonActiveColor || this.generateShade(primaryColor, 20),
        buttonTextColor: this.userVariables.buttonTextColor || this.getReasonableTextColor(primaryColor),
  
        // Link colors
        linkColor: this.userVariables.linkColor || secondaryColor,
        linkHoverColor: this.userVariables.linkHoverColor || this.generateTint(secondaryColor, 20),
  
        // Input colors
        inputBackgroundColor: this.userVariables.inputBackgroundColor || this.generateInputBackgroundColor(isDarkMode),
        inputBorderColor: this.userVariables.inputBorderColor || this.generateInputBorderColor(isDarkMode),
        inputFocusColor: this.userVariables.inputFocusColor || secondaryColor,
  
        // Status colors
        errorColor: this.userVariables.errorColor || this.generateErrorColor(),
        warningColor: this.userVariables.warningColor || this.generateWarningColor(),
        successColor: this.userVariables.successColor || this.generateSuccessColor(),
  
        // Disabled colors
        disabledColor: this.userVariables.disabledColor || this.generateDisabledColor(isDarkMode),
        disabledBackgroundColor: this.userVariables.disabledBackgroundColor || this.generateDisabledBackgroundColor(isDarkMode),
      };
    }
  
    /**
     * Generates a theme using the triadic method.
     * @param {boolean} isDarkMode - Whether to generate a dark mode theme.
     * @returns {object} - Theme object.
     */
    triadicGenerator(isDarkMode) {
      const primaryColor = this.userVariables.primaryColor || this.generatePrimaryColor();
      const [secondaryColor, tertiaryColor] = this.getTriadicColors(primaryColor);
  
      return {
        // Core colors
        primaryColor,
        secondaryColor,
        tertiaryColor,
        textColor: this.userVariables.textColor || this.getReasonableTextColor(this.userVariables.backgroundColor || this.generateBackgroundColor(isDarkMode)),
        backgroundColor: this.userVariables.backgroundColor || this.generateBackgroundColor(isDarkMode),
  
        // Card colors
        cardBackgroundColor: this.userVariables.cardBackgroundColor || this.generateTint(primaryColor, 60),
        cardBorderColor: this.userVariables.cardBorderColor || this.generateShade(secondaryColor, 40),
        cardTextColor: this.userVariables.cardTextColor || this.getReasonableTextColor(this.generateTint(primaryColor, 60)),
        cardBoxShadowColor: this.userVariables.cardBoxShadowColor || this.generateCardBoxShadowColor(isDarkMode),
  
        // Text and shadows
        textShadowColor: this.userVariables.textShadowColor || this.generateTextShadowColor(isDarkMode),
  
        // Button colors
        buttonColor: this.userVariables.buttonColor || primaryColor,
        buttonHoverColor: this.userVariables.buttonHoverColor || this.generateTint(primaryColor, 20),
        buttonActiveColor: this.userVariables.buttonActiveColor || this.generateShade(primaryColor, 20),
        buttonTextColor: this.userVariables.buttonTextColor || this.getReasonableTextColor(primaryColor),
  
        // Link colors
        linkColor: this.userVariables.linkColor || secondaryColor,
        linkHoverColor: this.userVariables.linkHoverColor || this.generateTint(secondaryColor, 20),
  
        // Input colors
        inputBackgroundColor: this.userVariables.inputBackgroundColor || this.generateInputBackgroundColor(isDarkMode),
        inputBorderColor: this.userVariables.inputBorderColor || this.generateInputBorderColor(isDarkMode),
        inputFocusColor: this.userVariables.inputFocusColor || secondaryColor,
  
        // Status colors
        errorColor: this.userVariables.errorColor || this.generateErrorColor(),
        warningColor: this.userVariables.warningColor || this.generateWarningColor(),
        successColor: this.userVariables.successColor || this.generateSuccessColor(),
  
        // Disabled colors
        disabledColor: this.userVariables.disabledColor || this.generateDisabledColor(isDarkMode),
        disabledBackgroundColor: this.userVariables.disabledBackgroundColor || this.generateDisabledBackgroundColor(isDarkMode),
      };
    }
  
    /**
     * Generates a theme using the complementary method.
     * @param {boolean} isDarkMode - Whether to generate a dark mode theme.
     * @returns {object} - Theme object.
     */
    complementaryGenerator(isDarkMode) {
      const primaryColor = this.userVariables.primaryColor || this.generatePrimaryColor();
      const secondaryColor = this.userVariables.secondaryColor || this.getComplementaryColor(primaryColor);
  
      return {
        // Core colors
        primaryColor,
        secondaryColor,
        textColor: this.userVariables.textColor || this.getReasonableTextColor(this.userVariables.backgroundColor || this.generateBackgroundColor(isDarkMode)),
        backgroundColor: this.userVariables.backgroundColor || this.generateBackgroundColor(isDarkMode),
  
        // Card colors
        cardBackgroundColor: this.userVariables.cardBackgroundColor || this.generateTint(primaryColor, 60),
        cardBorderColor: this.userVariables.cardBorderColor || this.generateShade(secondaryColor, 40),
        cardTextColor: this.userVariables.cardTextColor || this.getReasonableTextColor(this.generateTint(primaryColor, 60)),
        cardBoxShadowColor: this.userVariables.cardBoxShadowColor || this.generateCardBoxShadowColor(isDarkMode),
  
        // Text and shadows
        textShadowColor: this.userVariables.textShadowColor || this.generateTextShadowColor(isDarkMode),
  
        // Button colors
        buttonColor: this.userVariables.buttonColor || primaryColor,
        buttonHoverColor: this.userVariables.buttonHoverColor || this.generateTint(primaryColor, 20),
        buttonActiveColor: this.userVariables.buttonActiveColor || this.generateShade(primaryColor, 20),
        buttonTextColor: this.userVariables.buttonTextColor || this.getReasonableTextColor(primaryColor),
  
        // Link colors
        linkColor: this.userVariables.linkColor || secondaryColor,
        linkHoverColor: this.userVariables.linkHoverColor || this.generateTint(secondaryColor, 20),
  
        // Input colors
        inputBackgroundColor: this.userVariables.inputBackgroundColor || this.generateInputBackgroundColor(isDarkMode),
        inputBorderColor: this.userVariables.inputBorderColor || this.generateInputBorderColor(isDarkMode),
        inputFocusColor: this.userVariables.inputFocusColor || secondaryColor,
  
        // Status colors
        errorColor: this.userVariables.errorColor || this.generateErrorColor(),
        warningColor: this.userVariables.warningColor || this.generateWarningColor(),
        successColor: this.userVariables.successColor || this.generateSuccessColor(),
  
        // Disabled colors
        disabledColor: this.userVariables.disabledColor || this.generateDisabledColor(isDarkMode),
        disabledBackgroundColor: this.userVariables.disabledBackgroundColor || this.generateDisabledBackgroundColor(isDarkMode),
      };
    }
  
    // ... (other utility methods like generateShade, generateTint, getReasonableTextColor, etc.)
  }


  /**
 * Generates a darker shade of a color.
 * @param {string} color - The base color in RGBa format.
 * @param {number} percent - The percentage to darken (0-100).
 * @returns {string} - The shaded color in RGBa format.
 */
function generateShade(color, percent) {
    const rgb = color.match(/\d+/g).map(Number);
    const shade = rgb.map((c) => Math.round(c * (1 - percent / 100)));
    return `rgba(${shade.join(", ")}, 1)`;
  }
  
  /**
   * Generates a lighter tint of a color.
   * @param {string} color - The base color in RGBa format.
   * @param {number} percent - The percentage to lighten (0-100).
   * @returns {string} - The tinted color in RGBa format.
   */
  function generateTint(color, percent) {
    const rgb = color.match(/\d+/g).map(Number);
    const tint = rgb.map((c) => Math.round(c + (255 - c) * (percent / 100)));
    return `rgba(${tint.join(", ")}, 1)`;
  }
  
  /**
   * Generates a complementary color.
   * @param {string} color - The base color in RGBa format.
   * @returns {string} - Complementary color in RGBa format.
   */
  function getComplementaryColor(color) {
    const rgb = color.match(/\d+/g).map(Number);
    const complementary = rgb.map((c, i) => (i < 3 ? 255 - c : 1));
    return `rgba(${complementary.join(", ")}, 1)`;
  }
  
  /**
   * Generates a triadic color scheme.
   * @param {string} color - The base color in RGBa format.
   * @returns {string[]} - Array of three colors in RGBa format.
   */
  function getTriadicColors(color) {
    const rgb = color.match(/\d+/g).map(Number);
    const triadic1 = [rgb[1], rgb[2], rgb[0]];
    const triadic2 = [rgb[2], rgb[0], rgb[1]];
    return [
      `rgba(${triadic1.join(", ")}, 1)`,
      `rgba(${triadic2.join(", ")}, 1)`,
    ];
  }
  
  /**
   * Generates an analogous color.
   * @param {string} color - The base color in RGBa format.
   * @returns {string} - Analogous color in RGBa format.
   */
  function getAnalogousColor(color) {
    const rgb = color.match(/\d+/g).map(Number);
    const analogous = [rgb[1], rgb[2], rgb[0]]; // Rotate RGB values
    return `rgba(${analogous.join(", ")}, 1)`;
  }
  
  /**
   * Determines a readable text color based on the background color.
   * @param {string} backgroundColor - The background color in RGBa format.
   * @returns {string} - The text color in RGBa format (black or white).
   */
  function getReasonableTextColor(backgroundColor) {
    const rgb = backgroundColor.match(/\d+/g).map(Number);
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    return luminance > 0.5 ? "rgba(30, 30, 30, 1)" : "rgba(255, 255, 255, 1)";
  }
  
  /**
   * Generates an error color (red-based).
   * @returns {string} - Error color in RGBa format.
   */
  function generateErrorColor() {
    return "rgba(255, 59, 48, 1)";
  }
  
  /**
   * Generates a warning color (yellow-based).
   * @returns {string} - Warning color in RGBa format.
   */
  function generateWarningColor() {
    return "rgba(255, 204, 0, 1)";
  }
  
  /**
   * Generates a success color (green-based).
   * @returns {string} - Success color in RGBa format.
   */
  function generateSuccessColor() {
    return "rgba(52, 199, 89, 1)";
  }
  
  /**
   * Generates a disabled color (gray-based).
   * @param {boolean} isDarkMode - Whether to generate a dark mode color.
   * @returns {string} - Disabled color in RGBa format.
   */
  function generateDisabledColor(isDarkMode = false) {
    return isDarkMode ? "rgba(150, 150, 150, 1)" : "rgba(200, 200, 200, 1)";
  }
  
  /**
   * Generates a disabled background color (lighter gray).
   * @param {boolean} isDarkMode - Whether to generate a dark mode color.
   * @returns {string} - Disabled background color in RGBa format.
   */
  function generateDisabledBackgroundColor(isDarkMode = false) {
    return isDarkMode ? "rgba(70, 70, 70, 1)" : "rgba(230, 230, 230, 1)";
  }
  
  /**
   * Generates a card box shadow color.
   * @param {boolean} isDarkMode - Whether to generate a dark mode color.
   * @returns {string} - Card box shadow color in RGBa format.
   */
  function generateCardBoxShadowColor(isDarkMode = false) {
    return isDarkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)";
  }
  
  /**
   * Generates a text shadow color.
   * @param {boolean} isDarkMode - Whether to generate a dark mode color.
   * @returns {string} - Text shadow color in RGBa format.
   */
  function generateTextShadowColor(isDarkMode = false) {
    return isDarkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.05)";
  }
  
  /**
   * Generates an input background color.
   * @param {boolean} isDarkMode - Whether to generate a dark mode color.
   * @returns {string} - Input background color in RGBa format.
   */
  function generateInputBackgroundColor(isDarkMode = false) {
    return isDarkMode ? "rgba(40, 40, 40, 1)" : "rgba(255, 255, 255, 1)";
  }
  
  /**
   * Generates an input border color.
   * @param {boolean} isDarkMode - Whether to generate a dark mode color.
   * @returns {string} - Input border color in RGBa format.
   */
  function generateInputBorderColor(isDarkMode = false) {
    return isDarkMode ? "rgba(100, 100, 100, 1)" : "rgba(200, 200, 200, 1)";
  }



  /**
 * Generates a gamut of colors (10 shades from light to dark) for each color in the input JSON.
 * @param {object} colors - JSON object of colors (e.g., { primaryColor: "rgba(255, 87, 51, 1)", secondaryColor: "rgba(0, 123, 255, 1)" }).
 * @returns {object} - JSON object where each key maps to an array of 10 colors (light to dark).
 */
function generateCSSGamut(colors) {
    const gamut = {};
  
    for (const [key, color] of Object.entries(colors)) {
      const shades = [];
      for (let i = 0; i < 10; i++) {
        const percent = (i / 9) * 100; // Evenly distribute from 0% to 100%
        shades.push(generateShade(color, percent));
      }
      gamut[key] = shades;
    }
  
    return gamut;
  }



  import React, { useState } from "react";

/**
 * React component for fine-tuning theme colors.
 * @param {object} theme - The current theme (e.g., { primaryColor: "rgba(255, 87, 51, 1)", secondaryColor: "rgba(0, 123, 255, 1)" }).
 * @param {function} onColorSelect - Callback function to handle color selection.
 */
function ColorPicker({ theme, onColorSelect }) {
  const [selectedColors, setSelectedColors] = useState({});

  // Generate the color gamut for each CSS property
  const colorGamut = generateCSSGamut(theme);

  /**
   * Handles color selection for a specific CSS property.
   * @param {string} property - The CSS property (e.g., "primaryColor").
   * @param {string} color - The selected color.
   */
  const handleColorSelect = (property, color) => {
    setSelectedColors((prev) => ({ ...prev, [property]: color }));
    onColorSelect(property, color);
  };

  return (
    <div>
      {Object.entries(colorGamut).map(([property, colors]) => (
        <div key={property}>
          <h3>{property}</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: color,
                  border: selectedColors[property] === color ? "2px solid black" : "1px solid gray",
                  cursor: "pointer",
                  margin: "5px",
                }}
                onClick={() => handleColorSelect(property, color)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ColorPicker;


/**
 * Generates a professional two-tone theme.
 * @param {string} lighterColor - The lighter color in RGBa format.
 * @param {string} darkerColor - The darker color in RGBa format.
 * @returns {object} - Theme object with professional two-tone colors.
 */
function professionalTwoTone(lighterColor, darkerColor) {
    // Mute the input colors
    const mutedLighterColor = muteColor(lighterColor, 50); // Lighten and desaturate
    const mutedDarkerColor = muteColor(darkerColor, 50); // Darken and desaturate
  
    // Ensure maximum contrast between the two colors
    const contrastLighterColor = ensureContrast(mutedLighterColor, mutedDarkerColor, 4.5); // WCAG AA standard
    const contrastDarkerColor = ensureContrast(mutedDarkerColor, mutedLighterColor, 4.5); // WCAG AA standard
  
    return {
      // Core colors
      primaryColor: contrastLighterColor,
      secondaryColor: contrastDarkerColor,
      textColor: contrastDarkerColor,
      backgroundColor: contrastLighterColor,
  
      // Card colors
      cardBackgroundColor: generateTint(contrastLighterColor, 80), // Very light tint of the lighter color
      cardBorderColor: generateShade(contrastDarkerColor, 20), // Slightly darker shade of the darker color
      cardTextColor: contrastDarkerColor,
      cardBoxShadowColor: "rgba(0, 0, 0, 0.1)", // Subtle shadow
  
      // Text and shadows
      textShadowColor: "rgba(0, 0, 0, 0.05)", // Subtle text shadow
  
      // Button colors
      buttonColor: contrastDarkerColor,
      buttonHoverColor: generateTint(contrastDarkerColor, 20), // Lighter shade of the darker color
      buttonActiveColor: generateShade(contrastDarkerColor, 20), // Darker shade of the darker color
      buttonTextColor: contrastLighterColor,
  
      // Link colors
      linkColor: contrastDarkerColor,
      linkHoverColor: generateTint(contrastDarkerColor, 20), // Lighter shade of the darker color
  
      // Input colors
      inputBackgroundColor: "rgba(255, 255, 255, 1)", // White
      inputBorderColor: generateShade(contrastDarkerColor, 40), // Darker shade of the darker color
      inputFocusColor: contrastDarkerColor,
  
      // Status colors
      errorColor: "rgba(255, 59, 48, 1)", // Red
      warningColor: "rgba(255, 204, 0, 1)", // Yellow
      successColor: "rgba(52, 199, 89, 1)", // Green
  
      // Disabled colors
      disabledColor: "rgba(200, 200, 200, 1)", // Light gray
      disabledBackgroundColor: "rgba(230, 230, 230, 1)", // Lighter gray
    };
  }
  
  /**
   * Mutes a color by lightening/darkening and desaturating it.
   * @param {string} color - The base color in RGBa format.
   * @param {number} percent - The percentage to mute (0-100).
   * @returns {string} - The muted color in RGBa format.
   */
  function muteColor(color, percent) {
    const rgb = color.match(/\d+/g).map(Number);
    const muted = rgb.map((c) => Math.round(c + (128 - c) * (percent / 100))); // Move toward gray
    return `rgba(${muted.join(", ")}, 1)`;
  }
  
  /**
   * Ensures sufficient contrast between two colors.
   * @param {string} color1 - The first color in RGBa format.
   * @param {string} color2 - The second color in RGBa format.
   * @param {number} minContrast - The minimum contrast ratio (e.g., 4.5 for WCAG AA).
   * @returns {string} - The adjusted color to ensure contrast.
   */
  function ensureContrast(color1, color2, minContrast) {
    const contrast = getContrastRatio(color1, color2);
    if (contrast >= minContrast) {
      return color1;
    }
  
    // Adjust the color to meet the contrast requirement
    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.match(/\d+/g).map(Number);
    const adjusted = rgb1.map((c, i) => (i < 3 ? Math.round(c + (rgb2[i] - c) * 0.5) : 1)); // Move halfway toward the other color
    return `rgba(${adjusted.join(", ")}, 1)`;
  }
  
  /**
   * Calculates the contrast ratio between two colors.
   * @param {string} color1 - The first color in RGBa format.
   * @param {string} color2 - The second color in RGBa format.
   * @returns {number} - The contrast ratio.
   */
  function getContrastRatio(color1, color2) {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    return (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
  }
  
  /**
   * Calculates the relative luminance of a color.
   * @param {string} color - The color in RGBa format.
   * @returns {number} - The relative luminance (0-1).
   */
  function getLuminance(color) {
    const rgb = color.match(/\d+/g).map(Number);
    const [r, g, b] = rgb.map((c) => {
      const sRGB = c / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  {
    primaryColor: "rgba(255, 210, 128, 1)", // Muted light orange
    secondaryColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    textColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    backgroundColor: "rgba(255, 210, 128, 1)", // Muted light orange
    cardBackgroundColor: "rgba(255, 235, 205, 1)", // Very light tint of light orange
    cardBorderColor: "rgba(51, 0, 51, 1)", // Darker shade of dark purple
    cardTextColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    cardBoxShadowColor: "rgba(0, 0, 0, 0.1)", // Subtle shadow
    textShadowColor: "rgba(0, 0, 0, 0.05)", // Subtle text shadow
    buttonColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    buttonHoverColor: "rgba(89, 0, 89, 1)", // Lighter shade of dark purple
    buttonActiveColor: "rgba(38, 0, 38, 1)", // Darker shade of dark purple
    buttonTextColor: "rgba(255, 210, 128, 1)", // Muted light orange
    linkColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    linkHoverColor: "rgba(89, 0, 89, 1)", // Lighter shade of dark purple
    inputBackgroundColor: "rgba(255, 255, 255, 1)", // White
    inputBorderColor: "rgba(51, 0, 51, 1)", // Darker shade of dark purple
    inputFocusColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    errorColor: "rgba(255, 59, 48, 1)", // Red
    warningColor: "rgba(255, 204, 0, 1)", // Yellow
    successColor: "rgba(52, 199, 89, 1)", // Green
    disabledColor: "rgba(200, 200, 200, 1)", // Light gray
    disabledBackgroundColor: "rgba(230, 230, 230, 1)", // Lighter gray
  }


  /**
 * Generates a professional three-tone theme.
 * @param {string} lighterColor - The lighter color in RGBa format (e.g., orange).
 * @param {string} mediumColor - The medium color in RGBa format (e.g., purple).
 * @param {string} darkerColor - The darker color in RGBa format (e.g., navy blue).
 * @returns {object} - Theme object with professional three-tone colors.
 */
function professionalThreeTone(lighterColor, mediumColor, darkerColor) {
    // Mute the input colors
    const mutedLighterColor = muteColor(lighterColor, 50); // Lighten and desaturate
    const mutedMediumColor = muteColor(mediumColor, 50); // Lighten and desaturate
    const mutedDarkerColor = muteColor(darkerColor, 50); // Darken and desaturate
  
    // Ensure maximum contrast between the colors
    const contrastLighterColor = ensureContrast(mutedLighterColor, mutedDarkerColor, 4.5); // WCAG AA standard
    const contrastMediumColor = ensureContrast(mutedMediumColor, mutedDarkerColor, 4.5); // WCAG AA standard
    const contrastDarkerColor = ensureContrast(mutedDarkerColor, mutedLighterColor, 4.5); // WCAG AA standard
  
    return {
      // Core colors
      primaryColor: contrastLighterColor,
      secondaryColor: contrastMediumColor,
      tertiaryColor: contrastDarkerColor,
      textColor: contrastDarkerColor,
      backgroundColor: contrastLighterColor,
  
      // Card colors
      cardBackgroundColor: generateTint(contrastLighterColor, 80), // Very light tint of the lighter color
      cardBorderColor: generateShade(contrastMediumColor, 20), // Slightly darker shade of the medium color
      cardTextColor: contrastDarkerColor,
      cardBoxShadowColor: "rgba(0, 0, 0, 0.1)", // Subtle shadow
  
      // Text and shadows
      textShadowColor: "rgba(0, 0, 0, 0.05)", // Subtle text shadow
  
      // Button colors
      buttonColor: contrastMediumColor,
      buttonHoverColor: generateTint(contrastMediumColor, 20), // Lighter shade of the medium color
      buttonActiveColor: generateShade(contrastMediumColor, 20), // Darker shade of the medium color
      buttonTextColor: contrastLighterColor,
  
      // Link colors
      linkColor: contrastDarkerColor,
      linkHoverColor: generateTint(contrastDarkerColor, 20), // Lighter shade of the darker color
  
      // Input colors
      inputBackgroundColor: "rgba(255, 255, 255, 1)", // White
      inputBorderColor: generateShade(contrastDarkerColor, 40), // Darker shade of the darker color
      inputFocusColor: contrastDarkerColor,
  
      // Status colors
      errorColor: "rgba(255, 59, 48, 1)", // Red
      warningColor: "rgba(255, 204, 0, 1)", // Yellow
      successColor: "rgba(52, 199, 89, 1)", // Green
  
      // Disabled colors
      disabledColor: "rgba(200, 200, 200, 1)", // Light gray
      disabledBackgroundColor: "rgba(230, 230, 230, 1)", // Lighter gray
    };
  }
  
  // Utility functions (same as before)
  function muteColor(color, percent) { /* ... */ }
  function ensureContrast(color1, color2, minContrast) { /* ... */ }
  function getContrastRatio(color1, color2) { /* ... */ }
  function getLuminance(color) { /* ... */ }
  function generateShade(color, percent) { /* ... */ }
  function generateTint(color, percent) { /* ... */ }

  {
    primaryColor: "rgba(255, 210, 128, 1)", // Muted light orange
    secondaryColor: "rgba(128, 64, 128, 1)", // Muted medium purple
    tertiaryColor: "rgba(0, 0, 64, 1)", // Muted dark navy blue
    textColor: "rgba(0, 0, 64, 1)", // Muted dark navy blue
    backgroundColor: "rgba(255, 210, 128, 1)", // Muted light orange
    cardBackgroundColor: "rgba(255, 235, 205, 1)", // Very light tint of light orange
    cardBorderColor: "rgba(102, 51, 102, 1)", // Slightly darker shade of medium purple
    cardTextColor: "rgba(0, 0, 64, 1)", // Muted dark navy blue
    cardBoxShadowColor: "rgba(0, 0, 0, 0.1)", // Subtle shadow
    textShadowColor: "rgba(0, 0, 0, 0.05)", // Subtle text shadow
    buttonColor: "rgba(128, 64, 128, 1)", // Muted medium purple
    buttonHoverColor: "rgba(153, 77, 153, 1)", // Lighter shade of medium purple
    buttonActiveColor: "rgba(102, 51, 102, 1)", // Darker shade of medium purple
    buttonTextColor: "rgba(255, 210, 128, 1)", // Muted light orange
    linkColor: "rgba(0, 0, 64, 1)", // Muted dark navy blue
    linkHoverColor: "rgba(0, 0, 89, 1)", // Lighter shade of dark navy blue
    inputBackgroundColor: "rgba(255, 255, 255, 1)", // White
    inputBorderColor: "rgba(0, 0, 51, 1)", // Darker shade of dark navy blue
    inputFocusColor: "rgba(0, 0, 64, 1)", // Muted dark navy blue
    errorColor: "rgba(255, 59, 48, 1)", // Red
    warningColor: "rgba(255, 204, 0, 1)", // Yellow
    successColor: "rgba(52, 199, 89, 1)", // Green
    disabledColor: "rgba(200, 200, 200, 1)", // Light gray
    disabledBackgroundColor: "rgba(230, 230, 230, 1)", // Lighter gray
  }



  {
    primaryColor: "rgba(255, 255, 255, 1)", // White
    secondaryColor: "rgba(255, 210, 128, 1)", // Muted light orange
    tertiaryColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    quaternaryColor: "rgba(0, 0, 64, 1)", // Muted navy blue
    textColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    backgroundColor: "rgba(255, 255, 255, 1)", // White
    cardBackgroundColor: "rgba(255, 255, 255, 1)", // White
    cardBorderColor: "rgba(0, 0, 51, 1)", // Darker shade of navy blue
    cardTextColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    cardBoxShadowColor: "rgba(0, 0, 0, 0.1)", // Subtle shadow
    textShadowColor: "rgba(0, 0, 0, 0.05)", // Subtle text shadow
    buttonColor: "rgba(255, 210, 128, 1)", // Muted light orange
    buttonHoverColor: "rgba(255, 230, 153, 1)", // Lighter shade of light orange
    buttonActiveColor: "rgba(204, 168, 102, 1)", // Darker shade of light orange
    buttonTextColor: "rgba(64, 0, 64, 1)", // Muted dark purple
    linkColor: "rgba(0, 0, 64, 1)", // Muted navy blue
    linkHoverColor: "rgba(0, 0, 89, 1)", // Lighter shade of navy blue
    inputBackgroundColor: "rgba(255, 255, 255, 1)", // White
    inputBorderColor: "rgba(0, 0, 51, 1)", // Darker shade of navy blue
    inputFocusColor: "rgba(0, 0, 64, 1)", // Muted navy blue
    errorColor: "rgba(255, 59, 48, 1)", // Red
    warningColor: "rgba(255, 204, 0, 1)", // Yellow
    successColor: "rgba(52, 199, 89, 1)", // Green
    disabledColor: "rgba(128, 128, 128, 1)", // Gray
    disabledBackgroundColor: "rgba(96, 125, 139, 1)", // Bluish-gray
  }
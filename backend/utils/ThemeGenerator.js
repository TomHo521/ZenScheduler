class ThemeGenerator {
    /**
     * Constructor for the ThemeGenerator class.
     * @param {object} userVariables - User-specified CSS variables (e.g., { textColor: "rgba(30, 30, 30, 1)", backgroundColor: "rgba(255, 255, 255, 1)" }).
     * @param {string} [themeType="triadic"] - Type of color scheme ("triadic", "complementary", "analogous").
     */
    constructor(userVariables = {}, themeType = "triadic") {
      this.userVariables = userVariables;
      this.themeType = themeType;
  
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
  
      // Use user-specified variables or fall back to auto-generated values
      const theme = {
        // Core colors
        primaryColor: this.userVariables.primaryColor || this.generatePrimaryColor(),
        secondaryColor: this.userVariables.secondaryColor || this.generateSecondaryColor(),
        tertiaryColor: this.userVariables.tertiaryColor || this.generateTertiaryColor(),
        textColor: this.userVariables.textColor || this.generateTextColor(),
        backgroundColor: this.userVariables.backgroundColor || this.generateBackgroundColor(isDarkMode),
  
        // Card colors
        cardBackgroundColor: this.userVariables.cardBackgroundColor || this.generateCardBackgroundColor(isDarkMode),
        cardBorderColor: this.userVariables.cardBorderColor || this.generateCardBorderColor(isDarkMode),
        cardTextColor: this.userVariables.cardTextColor || this.generateCardTextColor(isDarkMode),
        cardBoxShadowColor: this.userVariables.cardBoxShadowColor || this.generateCardBoxShadowColor(isDarkMode),
  
        // Text and shadows
        textShadowColor: this.userVariables.textShadowColor || this.generateTextShadowColor(isDarkMode),
  
        // Button colors
        buttonColor: this.userVariables.buttonColor || this.generateButtonColor(),
        buttonHoverColor: this.userVariables.buttonHoverColor || this.generateButtonHoverColor(),
        buttonActiveColor: this.userVariables.buttonActiveColor || this.generateButtonActiveColor(),
        buttonTextColor: this.userVariables.buttonTextColor || this.generateButtonTextColor(),
  
        // Link colors
        linkColor: this.userVariables.linkColor || this.generateLinkColor(),
        linkHoverColor: this.userVariables.linkHoverColor || this.generateLinkHoverColor(),
  
        // Input colors
        inputBackgroundColor: this.userVariables.inputBackgroundColor || this.generateInputBackgroundColor(isDarkMode),
        inputBorderColor: this.userVariables.inputBorderColor || this.generateInputBorderColor(isDarkMode),
        inputFocusColor: this.userVariables.inputFocusColor || this.generateInputFocusColor(),
  
        // Status colors
        errorColor: this.userVariables.errorColor || this.generateErrorColor(),
        warningColor: this.userVariables.warningColor || this.generateWarningColor(),
        successColor: this.userVariables.successColor || this.generateSuccessColor(),
  
        // Disabled colors
        disabledColor: this.userVariables.disabledColor || this.generateDisabledColor(isDarkMode),
        disabledBackgroundColor: this.userVariables.disabledBackgroundColor || this.generateDisabledBackgroundColor(isDarkMode),
      };
  
      return theme;
    }
  
    /**
     * Generates the primary color.
     * @returns {string} - Primary color in RGBa format.
     */
    generatePrimaryColor() {
      // Use a default or derive from user-specified variables
      return this.userVariables.backgroundColor ? this.getComplementaryColor(this.userVariables.backgroundColor) : "rgba(255, 87, 51, 1)";
    }
  
    /**
     * Generates the secondary color.
     * @returns {string} - Secondary color in RGBa format.
     */
    generateSecondaryColor() {
      return this.getSecondaryColor(this.generatePrimaryColor(), this.themeType);
    }
  
    /**
     * Generates the tertiary color.
     * @returns {string} - Tertiary color in RGBa format.
     */
    generateTertiaryColor() {
      return this.getTertiaryColor(this.generatePrimaryColor(), this.themeType);
    }
  
    /**
     * Generates the text color.
     * @returns {string} - Text color in RGBa format.
     */
    generateTextColor() {
      return this.getReasonableTextColor(this.userVariables.backgroundColor || this.generateBackgroundColor());
    }
  
    /**
     * Generates the background color.
     * @param {boolean} isDarkMode - Whether to generate a dark mode color.
     * @returns {string} - Background color in RGBa format.
     */
    generateBackgroundColor(isDarkMode = false) {
      return isDarkMode ? "rgba(30, 30, 30, 1)" : "rgba(255, 255, 255, 1)";
    }
  
    // ... (other color generation methods like generateCardBackgroundColor, generateButtonColor, etc.)
  
    /**
     * Generates a complementary color.
     * @param {string} color - The base color in RGBa format.
     * @returns {string} - Complementary color in RGBa format.
     */
    getComplementaryColor(color) {
      const rgb = color.match(/\d+/g).map(Number);
      const complementary = rgb.map((c, i) => (i < 3 ? 255 - c : 1));
      return `rgba(${complementary.join(", ")}, 1)`;
    }
  
    /**
     * Generates a triadic color scheme.
     * @param {string} color - The base color in RGBa format.
     * @returns {string[]} - Array of three colors in RGBa format.
     */
    getTriadicColors(color) {
      const rgb = color.match(/\d+/g).map(Number);
      const triadic1 = [rgb[1], rgb[2], rgb[0]];
      const triadic2 = [rgb[2], rgb[0], rgb[1]];
      return [
        `rgba(${triadic1.join(", ")}, 1)`,
        `rgba(${triadic2.join(", ")}, 1)`,
      ];
    }
  
    /**
     * Determines a readable text color based on the background color.
     * @param {string} backgroundColor - The background color in RGBa format.
     * @returns {string} - The text color in RGBa format (black or white).
     */
    getReasonableTextColor(backgroundColor) {
      const rgb = backgroundColor.match(/\d+/g).map(Number);
      const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      return luminance > 0.5 ? "rgba(30, 30, 30, 1)" : "rgba(255, 255, 255, 1)";
    }
  
    // ... (other utility methods like generateShade, generateTint, etc.)
  }

//   const userVariables = {
//     textColor: "rgba(30, 30, 30, 1)", // Dark gray
//     backgroundColor: "rgba(255, 255, 255, 1)", // White
//   };
  
//   const themeGenerator = new ThemeGenerator(userVariables, "triadic");

//   console.log("Light Mode Theme:", themeGenerator.themes.light);
// console.log("Dark Mode Theme:", themeGenerator.themes.dark);

// {
//     primaryColor: "rgba(255, 87, 51, 1)", // Auto-generated
//     secondaryColor: "rgba(87, 51, 255, 1)", // Auto-generated (triadic)
//     tertiaryColor: "rgba(51, 255, 87, 1)", // Auto-generated (triadic)
//     textColor: "rgba(30, 30, 30, 1)", // User-provided
//     backgroundColor: "rgba(255, 255, 255, 1)", // User-provided
//     cardBackgroundColor: "rgba(245, 245, 245, 1)", // Auto-generated
//     cardBorderColor: "rgba(200, 200, 200, 1)", // Auto-generated
//     cardTextColor: "rgba(30, 30, 30, 1)", // Auto-generated (readable against cardBackgroundColor)
//     cardBoxShadowColor: "rgba(0, 0, 0, 0.1)", // Auto-generated
//     textShadowColor: "rgba(0, 0, 0, 0.05)", // Auto-generated
//     buttonColor: "rgba(255, 87, 51, 1)", // Auto-generated (primary color)
//     buttonHoverColor: "rgba(255, 120, 80, 1)", // Auto-generated (lighter primary)
//     buttonActiveColor: "rgba(200, 50, 20, 1)", // Auto-generated (darker primary)
//     buttonTextColor: "rgba(255, 255, 255, 1)", // Auto-generated (readable against buttonColor)
//     linkColor: "rgba(87, 51, 255, 1)", // Auto-generated (secondary color)
//     linkHoverColor: "rgba(120, 80, 255, 1)", // Auto-generated (lighter secondary)
//     inputBackgroundColor: "rgba(255, 255, 255, 1)", // Auto-generated
//     inputBorderColor: "rgba(200, 200, 200, 1)", // Auto-generated
//     inputFocusColor: "rgba(87, 51, 255, 1)", // Auto-generated (secondary color)
//     errorColor: "rgba(255, 59, 48, 1)", // Auto-generated (red)
//     warningColor: "rgba(255, 204, 0, 1)", // Auto-generated (yellow)
//     successColor: "rgba(52, 199, 89, 1)", // Auto-generated (green)
//     disabledColor: "rgba(200, 200, 200, 1)", // Auto-generated
//     disabledBackgroundColor: "rgba(230, 230, 230, 1)", // Auto-generated
//   }
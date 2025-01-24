// src/components/Auth/AuthPage.jsx
import React from 'react';
import { useTheme } from '../Bookings/Themes/ThemeContext';
import './AuthPage.css';

const AuthPage = ({ children, title }) => {
  const { theme } = useTheme();

  return (
    <div
      className="auth-page"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <h2 style={{ color: theme.primary }}>{title}</h2>
      {children}
    </div>
  );
};

export default AuthPage;
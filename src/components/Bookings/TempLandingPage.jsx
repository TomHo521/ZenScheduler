import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Bookings/Themes/ThemeContext'; // Import useTheme
import { useAuth } from '../Auth/AuthContext'; // Import useAuth
import './TempLandingPage.css';

const TempLandingPage = () => {
  const { theme } = useTheme(); // Access the theme
  const { currentUser } = useAuth(); // Access the authenticated user

  return (
    <div
      className="landing-page"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <h1 style={{ color: theme.primary }}>
        Welcome{currentUser ? `, ${currentUser.email}` : ''}!
      </h1>
      <div className="landing-links">
        <Link to="/bookings" className="landing-link" style={{ backgroundColor: theme.primary, color: theme.buttonText }}>
          Go to Bookings
        </Link>
        <Link to="/settings" className="landing-link" style={{ backgroundColor: theme.primary, color: theme.buttonText }}>
          Go to Settings
        </Link>
          <Link to="/dashboard" className="landing-link" style={{ backgroundColor: theme.primary, color: theme.buttonText }}>
          Owner Dashboard
        </Link>

        {!currentUser && (
          <>
            <Link to="/login" className="landing-link" style={{ backgroundColor: theme.primary, color: theme.buttonText }}>
              Login
            </Link>
            <Link to="/signup" className="landing-link" style={{ backgroundColor: theme.primary, color: theme.buttonText }}>
              Signup
            </Link>
            <Link to="/forgot-password" className="landing-link" style={{ backgroundColor: theme.primary, color: theme.buttonText }}>
              Forgot Password
            </Link>
          </>
        )}
        {currentUser && (
          <Link to="/profile" className="landing-link" style={{ backgroundColor: theme.primary, color: theme.buttonText }}>
            Profile
          </Link>
        )}
      </div>
    </div>
  );
};

export default TempLandingPage;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useTheme } from '../Bookings/Themes/ThemeContext'; // Import ThemeContext
// import './TempLandingPage.css';

// const TempLandingPage = () => {
//   const { theme } = useTheme(); // Get the current theme

//   return (
//     <div
//       className="landing-page"
//       style={{ backgroundColor: theme.background, color: theme.text }}
//     >
//       <h1 style={{ color: theme.primary }}>Welcome to the Barbershop Booking System</h1>
//       <div className="landing-links">
//         <Link to="/bookings" className="landing-link">
//           Go to Bookings
//         </Link>
//         <Link to="/settings" className="landing-link">
//           Go to Settings
//         </Link>
//         <Link to="/login" className="landing-link">
//           Login
//         </Link>
//         <Link to="/signup" className="landing-link">
//           Signup
//         </Link>
//         <Link to="/forgot-password" className="landing-link">
//           Forgot Password
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default TempLandingPage;
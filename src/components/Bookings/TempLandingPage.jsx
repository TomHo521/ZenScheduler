// TempLandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './TempLandingPage.css'; // Optional: Add styles if needed

const TempLandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the Barbershop Booking System made wider</h1>
      <div className="landing-links">
        <Link to="/bookings" className="landing-link">
          Go to Bookings
        </Link>
        <Link to="/settings" className="landing-link">
          Go to Settings
        </Link>
      </div>
    </div>
  );
};

export default TempLandingPage;
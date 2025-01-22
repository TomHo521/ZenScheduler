import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCog, FaUser } from 'react-icons/fa'; // Using FontAwesome icons for buttons
import './Navbar.css';

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="bookings-navbar">
      {/* Back Button */}
      <button className="bookings-navbar-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="bookings-navbar-icon" />
      </button>

      {/* Title */}
      <h1 className="bookings-navbar-title">{title}</h1>

      {/* Settings and Profile Buttons */}
      <div className="bookings-navbar-right">
        <button className="bookings-navbar-button" onClick={() => navigate('/settings')}>
          <FaCog className="bookings-navbar-icon" />
        </button>
        <button className="bookings-navbar-button" onClick={() => navigate('/profile')}>
          <FaUser className="bookings-navbar-icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
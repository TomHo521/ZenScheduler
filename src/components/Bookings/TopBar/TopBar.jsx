import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCog } from 'react-icons/fa'; // Using FontAwesome icons
import './TopBar.css';

const TopBar = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="top-bar">
      <button className="top-bar-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="top-bar-icon" />
      </button>
      <h1 className="top-bar-title">{title}</h1>
      <button className="top-bar-button" onClick={() => navigate('/profile')}>
        <FaCog className="top-bar-icon" />
      </button>
    </div>
  );
};
export default TopBar;
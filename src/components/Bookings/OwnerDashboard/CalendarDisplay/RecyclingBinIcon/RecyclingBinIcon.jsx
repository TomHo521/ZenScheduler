import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './RecyclingBinIcon.css';

const RecyclingBinIcon = ({ onClick }) => {
  return (
    <div className="recycling-bin-icon" onClick={onClick}>
      <FaTrash size={24} />
    </div>
  );
};

export default RecyclingBinIcon;
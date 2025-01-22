import React from 'react';
import './cardbooking.css';

const BookingButton = ({ onClick, children }) => {
  return (
    <button className="booking-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default BookingButton;
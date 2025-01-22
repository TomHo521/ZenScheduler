import React from 'react';
import './cardbooking.css';

const BookingCard = ({ name, timeRange }) => {
  return (
    <div className="booking-card">
      <div className="booking-info">
        <span className="booking-name">Appointment ({name})</span>
        <span className="booking-time">{timeRange}</span>
      </div>
    </div>
  );
};

export default BookingCard;
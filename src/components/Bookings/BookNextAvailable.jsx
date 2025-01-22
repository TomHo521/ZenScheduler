import React from 'react';
import { findNextAvailableSlot } from './bookingLogic';
import './BookNextAvailable.css';

const BookNextAvailable = ({ bookings, onBookNextAvailable }) => {
  const nextSlot = findNextAvailableSlot(bookings, 30); // 30-minute duration

  const nextAvailableTime = nextSlot
    ? `${new Date(nextSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(nextSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'No available slots';

  return (
    <div className="book-next-available">
      <h3>Next Available Appointment</h3>
      <div className="next-available-time">{nextAvailableTime}</div>
      <div className="clock-animation">
        {/* Scrollable clock animation placeholder */}
        <div className="clock-time">{nextAvailableTime}</div>
      </div>
      <button className="booking-button" onClick={onBookNextAvailable}>
        Book Next Available
      </button>
    </div>
  );
};

export default BookNextAvailable;
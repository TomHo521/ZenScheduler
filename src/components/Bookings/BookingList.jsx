import React from 'react';
import BookingCard from './BookingCard';
import './cardbooking.css';

const BookingList = ({ bookings }) => {
  return (
    <div className="booking-list">
      {bookings.map((booking, index) => (
        <BookingCard key={index} name={booking.name} timeRange={booking.timeRange} />
      ))}
    </div>
  );
};

export default BookingList;
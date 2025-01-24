import React from 'react';
import './MiniBookingCard.css';

const MiniBookingCard = ({ booking, theme }) => {
  return (
    <div className="mini-booking-card" style={{ backgroundColor: theme.primary, color: theme.text }}>
      <div className="mini-booking-content">
        <strong>{booking.extendedProps.customer}</strong>
        <p>{booking.title.split(' - ')[1]}</p>
      </div>
    </div>
  );
};

export default MiniBookingCard;

// import React from 'react';
// import './MiniBookingCard.css';

// const MiniBookingCard = ({ booking, theme }) => {
//   return (
//     <div className="mini-booking-card" style={{ backgroundColor: theme.primary, color: theme.text }}>
//       <div className="mini-booking-content">
//         <strong>{booking.extendedProps.customer}</strong>
//         <p>{booking.title.split(' - ')[1]}</p>
//       </div>
//     </div>
//   );
// };

// export default MiniBookingCard;
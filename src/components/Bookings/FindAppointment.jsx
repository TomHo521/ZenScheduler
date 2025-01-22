import React from 'react';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import './FindAppointment.css';

const FindAppointment = ({ selectedDate, selectedTime, selectedBarber, onDateChange, onTimeChange, onBarberChange, onBookAtTime }) => {
  return (
    <div className="find-appointment">
      <h3>Find a Time That Works for You!</h3>
      <div className="date-picker-section">
        <label>Pick a Date:</label>
        <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
      </div>
      <TimePicker
        selectedTime={selectedTime}
        selectedDate={selectedDate}
        selectedBarber={selectedBarber}
        onTimeChange={onTimeChange}
        onBarberChange={onBarberChange}
      />

      {/* Display selected date, time, and barber */}
      <div className="selected-details">
        <h4>Your Selection:</h4>
        <div className="selected-item">
          <span className="label">Date:</span>
          <span className="value">{new Date(selectedDate).toLocaleDateString()}</span>
        </div>
        <div className="selected-item">
          <span className="label">Time:</span>
          <span className="value">{selectedTime}</span>
        </div>
        <div className="selected-item">
          <span className="label">Barber:</span>
          <span className="value">{selectedBarber || 'Not selected'}</span>
        </div>
      </div>

      <button className="booking-button" onClick={onBookAtTime}>
        Book at Selected Time
      </button>
    </div>
  );
};

export default FindAppointment;




// import React from 'react';
// import DatePicker from './DatePicker';
// import TimePicker from './TimePicker';
// import './FindAppointment.css';

// const FindAppointment = ({ selectedDate, selectedTime, selectedBarber, onDateChange, onTimeChange, onBarberChange, onBookAtTime }) => {
//   return (
//     <div className="find-appointment">
//       <h3>Find a Time That Works for You!</h3>
//       <div className="date-picker-section">
//         <label>Pick a Date:</label>
//         <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
//       </div>
//       <TimePicker
//         selectedTime={selectedTime}
//         selectedDate={selectedDate}
//         selectedBarber={selectedBarber}
//         onTimeChange={onTimeChange}
//         onBarberChange={onBarberChange}
//       />
//       <button className="booking-button" onClick={onBookAtTime}>
//         Book at Selected Time
//       </button>
//     </div>
//   );
// };

// export default FindAppointment;

// import React, { useState } from 'react';
// import TimePicker from './TimePicker';
// import './FindAppointment.css';

// const FindAppointment = ({ selectedDate, selectedTime, selectedBarber, onDateChange, onTimeChange, onBarberChange, onBookAtTime }) => {
//   return (
//     <div className="find-appointment">
//       <h3>Find a Time That Works for You!</h3>
//       <div className="date-picker-section">
//         <label>Pick a Date:</label>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => onDateChange(e.target.value)}
//           className="date-picker"
//         />
//       </div>
//       <TimePicker
//         selectedTime={selectedTime}
//         selectedDate={selectedDate}
//         selectedBarber={selectedBarber}
//         onTimeChange={onTimeChange}
//         onBarberChange={onBarberChange}
//       />
//       <button className="booking-button" onClick={onBookAtTime}>
//         Book at Selected Time
//       </button>
//     </div>
//   );
// };

// export default FindAppointment;
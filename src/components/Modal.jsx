
import React, { useState } from 'react';
import DaySchedule from './DaySchedule';

// Modal Component
const Modal = ({ isOpen, onClose, yearData, monthNumber, currentDay}) => {

  const [schedule, setSchedule] = useState(yearData[monthNumber]['bookings'][0])
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="innerModal">
        <button onClick={onClose} className="close-button">X</button>
        {/* <DaySchedule/> */}
        <div>The current day is {currentDay}th </div>
        <div>monthNumber is: {yearData[monthNumber]['month']}</div>
        <div>scheduled for today is {schedule.status}</div>
      </div>
    </div>
  );
};

export default Modal;

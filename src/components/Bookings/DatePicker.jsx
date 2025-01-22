import React, { useState } from 'react';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  // Get the first day of the month and the number of days in the month
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)

  // Generate the days of the month
  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(null); // Empty days before the first day of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Handle date selection
  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      onDateChange(newDate.toISOString().split('T')[0]);
    }
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="date-picker">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>
          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day ? '' : 'empty'} ${
              day === new Date(selectedDate).getDate() &&
              currentMonth.getMonth() === new Date(selectedDate).getMonth() &&
              currentMonth.getFullYear() === new Date(selectedDate).getFullYear()
                ? 'selected'
                : ''
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
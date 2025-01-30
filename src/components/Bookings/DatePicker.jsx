import React, { useState, useEffect } from 'react';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onDateChange }) => {
  // Parse initial date (YYYY-MM-DD format)
  const [currentYear, setCurrentYear] = useState(() => parseInt(selectedDate.split('-')[0]));
  const [currentMonth, setCurrentMonth] = useState(() => parseInt(selectedDate.split('-')[1]) - 1); // 0-based
  
  // Get calendar details
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Generate calendar grid
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // Date selection handler
  const handleDateClick = (day) => {
    if (!day) return;
    const newDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateChange(newDate);
  };

  // Month navigation
  const changeMonth = (direction) => {
    const newMonth = currentMonth + direction;
    if (newMonth < 0) {
      setCurrentYear(y => y - 1);
      setCurrentMonth(11);
    } else if (newMonth > 11) {
      setCurrentYear(y => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  // Update calendar when selectedDate changes externally
  useEffect(() => {
    const [year, month] = selectedDate.split('-').map(Number);
    setCurrentYear(year);
    setCurrentMonth(month - 1);
  }, [selectedDate]);

  return (
    <div className="date-picker">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </span>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        
        {days.map((day, index) => {
          const isSelected = selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          return (
            <div
              key={index}
              className={`calendar-day ${day ? '' : 'empty'} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;

// import React, { useState, useEffect } from 'react';
// import './DatePicker.css';

// const DatePicker = ({ selectedDate, onDateChange }) => {
//   // Parse the initial selectedDate into a LOCAL date (not UTC)
//   const parseLocalDate = (dateString) => {
//     const [year, month, day] = dateString.split('-').map(Number);
//     return new Date(year, month - 1, day); // Months are 0-based in JS
//   };

//   const [currentMonth, setCurrentMonth] = useState(parseLocalDate(selectedDate));
//   const [selectedDateObj, setSelectedDateObj] = useState(parseLocalDate(selectedDate));

//   // Update state when selectedDate prop changes
//   useEffect(() => {
//     const newDate = parseLocalDate(selectedDate);
//     setSelectedDateObj(newDate);
//     setCurrentMonth(new Date(newDate)); // Keep calendar in sync
//   }, [selectedDate]);

//   // Get calendar data for the current month
//   const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//   const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
//   const startingDay = firstDayOfMonth.getDay();

//   // Generate days array (with nulls for empty slots)
//   const days = [];
//   for (let i = 0; i < startingDay; i++) days.push(null);
//   for (let i = 1; i <= daysInMonth; i++) days.push(i);

//   // Handle date selection
//   const handleDateClick = (day) => {
//     if (!day) return;
    
//     // Create date in LOCAL timezone
//     const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//     setSelectedDateObj(newDate);
    
//     // Format as YYYY-MM-DD without timezone conversion
//     const formattedDate = [
//       newDate.getFullYear(),
//       String(newDate.getMonth() + 1).padStart(2, '0'),
//       String(newDate.getDate()).padStart(2, '0')
//     ].join('-');
    
//     onDateChange(formattedDate);
//   };

//   // Month navigation handlers
//   const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

//   return (
//     <div className="date-picker">
//       <div className="calendar-header">
//         <button onClick={handlePrevMonth}>&lt;</button>
//         <span>
//           {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
//         </span>
//         <button onClick={handleNextMonth}>&gt;</button>
//       </div>
//       <div className="calendar-grid">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//           <div key={day} className="calendar-day-header">{day}</div>
//         ))}
//         {days.map((day, index) => {
//           const isSelected = day === selectedDateObj.getDate() &&
//             currentMonth.getMonth() === selectedDateObj.getMonth() &&
//             currentMonth.getFullYear() === selectedDateObj.getFullYear();

//           return (
//             <div
//               key={index}
//               className={`calendar-day ${day ? '' : 'empty'} ${isSelected ? 'selected' : ''}`}
//               onClick={() => handleDateClick(day)}
//             >
//               {day}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DatePicker;

// import React, { useState } from 'react';
// import './DatePicker.css';

// const DatePicker = ({ selectedDate, onDateChange }) => {
//   const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

//   // Get the first day of the month and the number of days in the month
//   const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//   const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
//   const startingDay = firstDayOfMonth.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)

//   // Generate the days of the month
//   const days = [];
//   for (let i = 0; i < startingDay; i++) {
//     days.push(null); // Empty days before the first day of the month
//   }
//   for (let i = 1; i <= daysInMonth; i++) {
//     days.push(i);
//   }

//   // Handle date selection
//   const handleDateClick = (day) => {
//     if (day) {
//       const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//       onDateChange(newDate.toISOString().split('T')[0]);
//     }
//   };

//   // Handle month navigation
//   const handlePrevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//   };

//   return (
//     <div className="date-picker">
//       <div className="calendar-header">
//         <button onClick={handlePrevMonth}>&lt;</button>
//         <span>
//           {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
//         </span>
//         <button onClick={handleNextMonth}>&gt;</button>
//       </div>
//       <div className="calendar-grid">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//           <div key={day} className="calendar-day-header">
//             {day}
//           </div>
//         ))}
//         {days.map((day, index) => (
//           <div
//             key={index}
//             className={`calendar-day ${day ? '' : 'empty'} ${
//               day === new Date(selectedDate).getDate() &&
//               currentMonth.getMonth() === new Date(selectedDate).getMonth() &&
//               currentMonth.getFullYear() === new Date(selectedDate).getFullYear()
//                 ? 'selected'
//                 : ''
//             }`}
//             onClick={() => handleDateClick(day)}
//           >
//             {day}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DatePicker;
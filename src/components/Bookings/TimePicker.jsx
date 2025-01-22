import React, { useState, useEffect } from 'react';
import './TimePicker.css';

const TimePicker = ({ selectedTime, selectedDate, selectedBarber, onTimeChange, onBarberChange }) => {
  const [availableBarbers, setAvailableBarbers] = useState([]);
  const [filteredBarbers, setFilteredBarbers] = useState([]);

  // Fetch barbers data from the server
  useEffect(() => {
    fetch('/api/barbers')
      .then((response) => response.json())
      .then((data) => {
        setAvailableBarbers(data); // Set the fetched barbers data
      })
      .catch((error) => console.error('Error fetching barbers:', error));
  }, []);

  // Generate times in 15-minute increments from 8:00 AM to 6:00 PM
  const times = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
      times.push(time);
    }
  }

  // Filter barbers for availability based on the selected time and date
  useEffect(() => {
    if (availableBarbers.length > 0 && selectedTime && selectedDate) {
      const selectedDay = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
      const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split(' ')[0]}:00`);

      const updatedBarbers = availableBarbers.map((barber) => {
        const isAvailable = barber.availability.some((slot) => {
          const slotStart = new Date(`${selectedDate}T${slot.start}:00`);
          const slotEnd = new Date(`${selectedDate}T${slot.end}:00`);
          return (
            slot.day === selectedDay &&
            selectedDateTime >= slotStart &&
            selectedDateTime < slotEnd
          );
        });
        return { ...barber, isAvailable };
      });

      setFilteredBarbers(updatedBarbers); // Update filtered barbers, not the original state
    }
  }, [selectedTime, selectedDate, availableBarbers]);

  return (
    <div className="time-picker-section">
      <div className="time-barber-container">
        <div className="time-slots">
          <label>Select a time:</label>
          {times.map((time) => (
            <div
              key={time}
              className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
              onClick={() => onTimeChange(time)}
            >
              {time}
            </div>
          ))}
        </div>

        <div className="barber-slots">
          <label>Select a barber:</label>
          {filteredBarbers.map((barber) => (
            <div
              key={barber.name}
              className={`barber-slot ${!barber.isAvailable ? 'unavailable' : ''} ${selectedBarber === barber.name ? 'selected' : ''}`}
              onClick={() => barber.isAvailable && onBarberChange(barber.name)}
            >
              {barber.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;


// import React, { useState, useEffect } from 'react';
// import './TimePicker.css';

// const TimePicker = ({ selectedTime, selectedDate, selectedBarber, onTimeChange, onBarberChange }) => {
//   const [availableBarbers, setAvailableBarbers] = useState([]);

//   // Fetch barbers data from the server
//   useEffect(() => {
//     fetch('/api/barbers')
//       .then((response) => response.json())
//       .then((data) => {
//         setAvailableBarbers(data); // Set the fetched barbers data
//       })
//       .catch((error) => console.error('Error fetching barbers:', error));
//   }, []);

//   // Generate times in 15-minute increments from 8:00 AM to 6:00 PM
//   const times = [];
//   for (let hour = 8; hour <= 18; hour++) {
//     for (let minute = 0; minute < 60; minute += 15) {
//       const time = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
//       times.push(time);
//     }
//   }

//   // Check barber availability for the selected date and time
//   useEffect(() => {
//     if (availableBarbers.length > 0) {
//       const selectedDay = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
//       const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split(' ')[0]}:00`);

//       const updatedBarbers = availableBarbers.map((barber) => {
//         const isAvailable = barber.availability.some((slot) => {
//           const slotStart = new Date(`${selectedDate}T${slot.start}:00`);
//           const slotEnd = new Date(`${selectedDate}T${slot.end}:00`);
//           return (
//             slot.day === selectedDay &&
//             selectedDateTime >= slotStart &&
//             selectedDateTime < slotEnd
//           );
//         });
//         return { ...barber, isAvailable };
//       });

//       setAvailableBarbers(updatedBarbers);
//     }
//   }, [selectedTime, selectedDate, availableBarbers]);

//   return (
//     <div className="time-picker-section">
//       <div className="time-barber-container">
//         <div className="time-slots">
//           <label>Select a time:</label>
//           {times.map((time) => (
//             <div
//               key={time}
//               className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
//               onClick={() => onTimeChange(time)}
//             >
//               {time}
//             </div>
//           ))}
//         </div>

//         <div className="barber-slots">
//           <label>Select a barber:</label>
//           {availableBarbers.map((barber) => (
//             <div
//               key={barber.name}
//               className={`barber-slot ${!barber.isAvailable ? 'unavailable' : ''} ${selectedBarber === barber.name ? 'selected' : ''}`}
//               onClick={() => barber.isAvailable && onBarberChange(barber.name)}
//             >
//               {barber.name}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimePicker;



// import React, { useState, useEffect } from 'react';
// import { barbers } from './barberData';
// import './TimePicker.css';

// const TimePicker = ({ selectedTime, selectedDate, selectedBarber, onTimeChange, onBarberChange }) => {
//   const [availableBarbers, setAvailableBarbers] = useState([]);

//   // Generate times in 15-minute increments from 8:00 AM to 6:00 PM
//   const times = [];
//   for (let hour = 8; hour <= 18; hour++) {
//     for (let minute = 0; minute < 60; minute += 15) {
//       const time = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
//       times.push(time);
//     }
//   }

//   // Check barber availability for the selected date and time
//   useEffect(() => {
//     const selectedDay = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
//     const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split(' ')[0]}:00`);

//     const updatedBarbers = barbers.map((barber) => {
//       const isAvailable = barber.availability.some((slot) => {
//         const slotStart = new Date(`${selectedDate}T${slot.start}:00`);
//         const slotEnd = new Date(`${selectedDate}T${slot.end}:00`);
//         return (
//           slot.day === selectedDay &&
//           selectedDateTime >= slotStart &&
//           selectedDateTime < slotEnd
//         );
//       });
//       return { ...barber, isAvailable };
//     });

//     setAvailableBarbers(updatedBarbers);
//   }, [selectedTime, selectedDate]);

//   return (
//     <div className="time-picker-section">
//       {/* <h3>Find a Time That Works for You!</h3> */}
//       <div className="time-barber-container">
//         <div className="time-slots">
//           <label>Select a time:</label>
//           {times.map((time) => (
//             <div
//               key={time}
//               className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
//               onClick={() => onTimeChange(time)}
//             >
//               {time}
//             </div>
//           ))}
//         </div>

//         <div className="barber-slots">
//           <label>Select a barber:</label>
//           {availableBarbers.map((barber) => (
//             <div
//               key={barber.name}
//               className={`barber-slot ${!barber.isAvailable ? 'unavailable' : ''} ${selectedBarber === barber.name ? 'selected' : ''}`}
//               onClick={() => barber.isAvailable && onBarberChange(barber.name)}
//             >
//               {barber.name}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimePicker;
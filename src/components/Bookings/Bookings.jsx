
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './Themes/ThemeContext'; // Import ThemeContext
import BookingList from './BookingList';
import BookNextAvailable from './BookNextAvailable';
import FindAppointment from './FindAppointment';
import { findNextAvailableSlot, isTimeAvailable } from './bookingLogic';
import './cardbooking.css';

const Bookings = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme
  const [bookings, setBookings] = useState([]);
  const [selectedTime, setSelectedTime] = useState('08:00 AM');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBarber, setSelectedBarber] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  // Fetch bookings data from the server
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleBookNextAvailable = () => {
    const duration = 30; // Duration of the booking in minutes
    const nextSlot = findNextAvailableSlot(bookings, duration);

    const newBooking = {
      name: 'Any Barber',
      timeRange: `${new Date(nextSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(nextSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      startTime: nextSlot.startTime,
      endTime: nextSlot.endTime,
    };

    setBookings((prevBookings) => [...prevBookings, newBooking]); // Use functional update
    setBookingStatus(`Booked next available slot: ${newBooking.timeRange}`);
  };

  const handleBookAtTime = async () => {
    const duration = 30; // Duration of the booking in minutes
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split(' ')[0]}:00`);

    if (isTimeAvailable(bookings, selectedDateTime.toISOString(), duration)) {
      const newBooking = {
        name: selectedBarber,
        timeRange: `${selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(selectedDateTime.getTime() + duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        startTime: selectedDateTime.toISOString(),
        endTime: new Date(selectedDateTime.getTime() + duration * 60000).toISOString(),
        userName: "Current User", // Replace with actual user name or ID
      };

      try {
        // Send a POST request to the backend
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: newBooking.userName,
            barberName: newBooking.name,
            date: selectedDate,
            time: newBooking.timeRange,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to book appointment');
        }

        const data = await response.json();
        console.log('Booking successful:', data);

        // Update local state with the new booking
        setBookings((prevBookings) => [...prevBookings, newBooking]); // Use functional update
        setBookingStatus(`Booked at: ${newBooking.timeRange} with ${selectedBarber}`);
      } catch (error) {
        console.error('Error booking appointment:', error);
        setBookingStatus('Failed to book appointment. Please try again.');
      }
    } else {
      setBookingStatus('Selected time is not available. Please choose another time.');
    }
  };

  return (
    <div
      className="bookings-container"
      style={{ backgroundColor: theme.background, color: theme.text }} // Apply theme
    >
      <h2 style={{ color: theme.primary }}>Today's Appointments</h2> {/* Apply theme */}
      <div className="bookings-list-container">
        <BookingList bookings={bookings} />
      </div>

      <BookNextAvailable bookings={bookings} onBookNextAvailable={handleBookNextAvailable} />
      <FindAppointment
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedBarber={selectedBarber}
        onDateChange={setSelectedDate}
        onTimeChange={setSelectedTime}
        onBarberChange={setSelectedBarber}
        onBookAtTime={handleBookAtTime}
      />

      {bookingStatus && (
        <div className="booking-status" style={{ color: theme.text }}>
          {bookingStatus}
        </div>
      )}
    </div>
  );
};

export default Bookings;


// import React, { useState, useEffect, useContext } from 'react';
// import { ThemeContext } from './Themes/ThemeContext'; // Import ThemeContext
// import BookingList from './BookingList';
// import BookNextAvailable from './BookNextAvailable';
// import FindAppointment from './FindAppointment';
// import './cardbooking.css';

// const Bookings = () => {
//   const { theme } = useContext(ThemeContext); // Get the current theme
//   const [bookings, setBookings] = useState([]);
//   const [selectedTime, setSelectedTime] = useState('08:00 AM');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedBarber, setSelectedBarber] = useState('');
//   const [bookingStatus, setBookingStatus] = useState('');

//   // Fetch bookings data from the server
//   useEffect(() => {
//     fetch('/api/bookings')
//       .then((response) => response.json())
//       .then((data) => setBookings(data))
//       .catch((error) => console.error('Error fetching bookings:', error));
//   }, []);

//   const handleBookNextAvailable = () => {
//     const duration = 30; // Duration of the booking in minutes
//     const nextSlot = findNextAvailableSlot(bookings, duration);

//     const newBooking = {
//       name: 'Any Barber',
//       timeRange: `${new Date(nextSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(nextSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
//       startTime: nextSlot.startTime,
//       endTime: nextSlot.endTime,
//     };

//     setBookings([...bookings, newBooking]);
//     setBookingStatus(`Booked next available slot: ${newBooking.timeRange}`);
//   };


//   const handleBookAtTime = async () => {
//     const duration = 30; // Duration of the booking in minutes
//     const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split(' ')[0]}:00`);
  
//     if (isTimeAvailable(bookings, selectedDateTime.toISOString(), duration)) {
//       const newBooking = {
//         name: selectedBarber,
//         timeRange: `${selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(selectedDateTime.getTime() + duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
//         startTime: selectedDateTime.toISOString(),
//         endTime: new Date(selectedDateTime.getTime() + duration * 60000).toISOString(),
//         userName: "Current User", // Replace with actual user name or ID
//       };
  
//       try {
//         // Send a POST request to the backend
//         const response = await fetch('/api/bookings', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             userName: newBooking.userName,
//             barberName: newBooking.name,
//             date: selectedDate,
//             time: newBooking.timeRange,
//           }),
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to book appointment');
//         }
  
//         const data = await response.json();
//         console.log('Booking successful:', data);
  
//         // Update local state with the new booking
//         setBookings([...bookings, newBooking]);
//         setBookingStatus(`Booked at: ${newBooking.timeRange} with ${selectedBarber}`);
//       } catch (error) {
//         console.error('Error booking appointment:', error);
//         setBookingStatus('Failed to book appointment. Please try again.');
//       }
//     } else {
//       setBookingStatus('Selected time is not available. Please choose another time.');
//     }
//   };

//   // const handleBookAtTime = () => {
//   //   const duration = 30; // Duration of the booking in minutes
//   //   const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split(' ')[0]}:00`);

//   //   if (isTimeAvailable(bookings, selectedDateTime.toISOString(), duration)) {
//   //     const newBooking = {
//   //       name: selectedBarber,
//   //       timeRange: `${selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(selectedDateTime.getTime() + duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
//   //       startTime: selectedDateTime.toISOString(),
//   //       endTime: new Date(selectedDateTime.getTime() + duration * 60000).toISOString(),
//   //     };

//   //     setBookings([...bookings, newBooking]);
//   //     setBookingStatus(`Booked at: ${newBooking.timeRange} with ${selectedBarber}`);
//   //   } else {
//   //     setBookingStatus('Selected time is not available. Please choose another time.');
//   //   }
//   // };

//   return (
//     <div
//       className="bookings-container"
//       style={{ backgroundColor: theme.background, color: theme.text }} // Apply theme
//     >
//       <h2 style={{ color: theme.primary }}>Today's Appointments</h2> {/* Apply theme */}
//       <div className="bookings-list-container">
//         <BookingList bookings={bookings} />
//       </div>

//       <BookNextAvailable bookings={bookings} onBookNextAvailable={handleBookNextAvailable} />
//       <FindAppointment
//         selectedDate={selectedDate}
//         selectedTime={selectedTime}
//         selectedBarber={selectedBarber}
//         onDateChange={setSelectedDate}
//         onTimeChange={setSelectedTime}
//         onBarberChange={setSelectedBarber}
//         onBookAtTime={handleBookAtTime}
//       />

//       {bookingStatus && (
//         <div className="booking-status" style={{ color: theme.text }}>
//           {bookingStatus}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bookings;




// import React, { useState, useEffect } from 'react';
// import BookingList from './BookingList';
// import BookNextAvailable from './BookNextAvailable';
// import FindAppointment from './FindAppointment';
// import './cardbooking.css';

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [selectedTime, setSelectedTime] = useState('08:00 AM');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedBarber, setSelectedBarber] = useState('');
//   const [bookingStatus, setBookingStatus] = useState('');

//   // Fetch bookings data from the server
//   useEffect(() => {
//     fetch('/api/bookings')
//       .then((response) => response.json())
//       .then((data) => setBookings(data))
//       .catch((error) => console.error('Error fetching bookings:', error));
//   }, []);

//   const handleBookNextAvailable = () => {
//     const duration = 30; // Duration of the booking in minutes
//     const nextSlot = findNextAvailableSlot(bookings, duration);

//     const newBooking = {
//       name: 'Any Barber',
//       timeRange: `${new Date(nextSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(nextSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
//       startTime: nextSlot.startTime,
//       endTime: nextSlot.endTime,
//     };

//     setBookings([...bookings, newBooking]);
//     setBookingStatus(`Booked next available slot: ${newBooking.timeRange}`);
//   };

//   const handleBookAtTime = () => {
//     const duration = 30; // Duration of the booking in minutes
//     const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split(' ')[0]}:00`);

//     if (isTimeAvailable(bookings, selectedDateTime.toISOString(), duration)) {
//       const newBooking = {
//         name: selectedBarber,
//         timeRange: `${selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(selectedDateTime.getTime() + duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
//         startTime: selectedDateTime.toISOString(),
//         endTime: new Date(selectedDateTime.getTime() + duration * 60000).toISOString(),
//       };

//       setBookings([...bookings, newBooking]);
//       setBookingStatus(`Booked at: ${newBooking.timeRange} with ${selectedBarber}`);
//     } else {
//       setBookingStatus('Selected time is not available. Please choose another time.');
//     }
//   };

//   return (
//     <div className="bookings-container">
//       <h2>Today's Appointments</h2>
//       <div className="bookings-list-container">
//         <BookingList bookings={bookings} />
//       </div>

//       <BookNextAvailable bookings={bookings} onBookNextAvailable={handleBookNextAvailable} />
//       <FindAppointment
//         selectedDate={selectedDate}
//         selectedTime={selectedTime}
//         selectedBarber={selectedBarber}
//         onDateChange={setSelectedDate}
//         onTimeChange={setSelectedTime}
//         onBarberChange={setSelectedBarber}
//         onBookAtTime={handleBookAtTime}
//       />

//       {bookingStatus && <div className="booking-status">{bookingStatus}</div>}
//     </div>
//   );
// };

// export default Bookings;







// import React, { useState } from 'react';
// import BookingList from './BookingList';
// import BookNextAvailable from './BookNextAvailable';
// import FindAppointment from './FindAppointment';
// import { initialBookings } from './bookingsData';
// import './cardbooking.css';

// const Bookings = () => {
//   const [bookings, setBookings] = useState(initialBookings);
//   const [selectedTime, setSelectedTime] = useState('08:00 AM');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedBarber, setSelectedBarber] = useState('');
//   const [bookingStatus, setBookingStatus] = useState('');

//   const handleBookNextAvailable = () => {
//     const duration = 30; // Duration of the booking in minutes
//     const nextSlot = findNextAvailableSlot(bookings, duration);

//     const newBooking = {
//       name: 'Any Barber',
//       timeRange: `${new Date(nextSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(nextSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
//       startTime: nextSlot.startTime,
//       endTime: nextSlot.endTime,
//     };

//     setBookings([...bookings, newBooking]);
//     setBookingStatus(`Booked next available slot: ${newBooking.timeRange}`);
//   };

//   const handleBookAtTime = () => {
//     const duration = 30; // Duration of the booking in minutes
//     const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split(' ')[0]}:00`);

//     if (isTimeAvailable(bookings, selectedDateTime.toISOString(), duration)) {
//       const newBooking = {
//         name: selectedBarber,
//         timeRange: `${selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(selectedDateTime.getTime() + duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
//         startTime: selectedDateTime.toISOString(),
//         endTime: new Date(selectedDateTime.getTime() + duration * 60000).toISOString(),
//       };

//       setBookings([...bookings, newBooking]);
//       setBookingStatus(`Booked at: ${newBooking.timeRange} with ${selectedBarber}`);
//     } else {
//       setBookingStatus('Selected time is not available. Please choose another time.');
//     }
//   };

//   return (
//     <div className="bookings-container">
//       <h2>Today's Appointments</h2>
//       <div className="bookings-list-container">
//         <BookingList bookings={bookings} />
//       </div>

//       <BookNextAvailable bookings={bookings} onBookNextAvailable={handleBookNextAvailable} />
//       <FindAppointment
//         selectedDate={selectedDate}
//         selectedTime={selectedTime}
//         selectedBarber={selectedBarber}
//         onDateChange={setSelectedDate}
//         onTimeChange={setSelectedTime}
//         onBarberChange={setSelectedBarber}
//         onBookAtTime={handleBookAtTime}
//       />

//       {bookingStatus && <div className="booking-status">{bookingStatus}</div>}
//     </div>
//   );
// };

// export default Bookings;



// import React, { useState } from 'react';
// import BookingList from './BookingList';
// import BookingButton from './BookingButton';
// import TimePicker from './TimePicker';
// import { findNextAvailableSlot, isTimeAvailable } from './bookingLogic';
// import { initialBookings } from './bookingsData';
// import './cardbooking.css';

// const Bookings = () => {
//   const [bookings, setBookings] = useState(initialBookings);
//   const [selectedTime, setSelectedTime] = useState('08:00 AM');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedBarber, setSelectedBarber] = useState('');
//   const [bookingStatus, setBookingStatus] = useState('');

//   const handleBookNextAvailable = () => {
//     const duration = 30; // Duration of the booking in minutes
//     const nextSlot = findNextAvailableSlot(bookings, duration);

//     const newBooking = {
//       name: 'Any Barber',
//       timeRange: `${new Date(nextSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(nextSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
//       startTime: nextSlot.startTime,
//       endTime: nextSlot.endTime,
//     };

//     setBookings([...bookings, newBooking]);
//     setBookingStatus(`Booked next available slot: ${newBooking.timeRange}`);
//   };

//   const handleBookAtTime = () => {
//     const duration = 30; // Duration of the booking in minutes
//     const selectedDateTime = new Date(`${selectedDate}T${selectedTime.split(' ')[0]}:00`);

//     if (isTimeAvailable(bookings, selectedDateTime.toISOString(), duration)) {
//       const newBooking = {
//         name: selectedBarber,
//         timeRange: `${selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(selectedDateTime.getTime() + duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
//         startTime: selectedDateTime.toISOString(),
//         endTime: new Date(selectedDateTime.getTime() + duration * 60000).toISOString(),
//       };

//       setBookings([...bookings, newBooking]);
//       setBookingStatus(`Booked at: ${newBooking.timeRange} with ${selectedBarber}`);
//     } else {
//       setBookingStatus('Selected time is not available. Please choose another time.');
//     }
//   };

//   return (
//     <div className="bookings-container">
//       <h2>Today's Appointments</h2>
//       <div className="bookings-list-container">
//         <BookingList bookings={bookings} />
//       </div>

//       <div className="booking-actions">
//         <BookingButton onClick={handleBookNextAvailable}>Book Next Available</BookingButton>
//       </div>

//       <div className="date-picker-section">
//         <h3>Pick a Date</h3>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="date-picker"
//         />
//       </div>

//       <div className="time-picker-section">
//         <h3>Find a Time That Works for You!</h3>
//         <TimePicker
//           selectedTime={selectedTime}
//           selectedDate={selectedDate}
//           selectedBarber={selectedBarber}
//           onTimeChange={setSelectedTime}
//           onDateChange={setSelectedDate}
//           onBarberChange={setSelectedBarber}
//         />
//         <BookingButton onClick={handleBookAtTime}>Book at Selected Time</BookingButton>
//       </div>

//       {bookingStatus && <div className="booking-status">{bookingStatus}</div>}
//     </div>
//   );
// };

// export default Bookings;
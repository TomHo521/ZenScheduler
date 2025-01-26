// OwnerDashboard.jsx
import React, { useState } from 'react';
import CalendarDisplay from './CalendarDisplay/CalendarDisplay';
import { initialBookings } from './bookingsData';
import { themes } from '../Themes/themes';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const [selectedBarber, setSelectedBarber] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(themes.default);

  return (
    <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
      <h1>Barbershop Appointments</h1>

      {/* Calendar Display */}
      <CalendarDisplay
        initialBookings={initialBookings}
        selectedBarber={selectedBarber}
        searchQuery={searchQuery}
        theme={theme}
      />
    </div>
  );
};

export default OwnerDashboard;
// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from './BottomSheet/BottomSheet';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [deletedEvents, setDeletedEvents] = useState({}); // Object to store deleted event IDs

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       id: booking.id, // Unique identifier
//       title: `${booking.service} - ${booking.customerName}`, // Service and customer name
//       start: booking.startTime, // ISO string for start time
//       end: booking.endTime, // ISO string for end time
//       backgroundColor: getEventColor(booking.service), // Custom color based on service
//       textColor: '#ffffff', // White text for better contrast
//       extendedProps: {
//         barber: booking.workerName, // Barber's name
//         customer: booking.customerName, // Customer's name
//         service: booking.service, // Service type
//         price: booking.price, // Service price
//         notes: booking.notes, // Additional notes
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Helper function to assign colors based on service type
//   const getEventColor = (service) => {
//     switch (service) {
//       case 'haircut and shampoo':
//         return '#4CAF50'; // Green
//       case 'hairstyling':
//         return '#2196F3'; // Blue
//       case 'hair coloring':
//         return '#9C27B0'; // Purple
//       case 'beard trim':
//         return '#FF9800'; // Orange
//       case 'full grooming':
//         return '#F44336'; // Red
//       default:
//         return '#607D8B'; // Default gray
//     }
//   };

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings.filter(event => !deletedEvents[event.id]); // Exclude deleted events

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings, deletedEvents]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setSelectedEvent(null); // Reset selected event when a day is clicked
//     setIsBottomSheetOpen(true);
//   };

//   // Handle event click
//   const handleEventClick = (info) => {
//     setSelectedEvent(info.event); // Store the clicked event
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//     setSelectedEvent(null); // Reset selected event when the bottom sheet is closed
//   };

//   // Delete an event
//   const handleDeleteEvent = (eventId) => {
//     // Add the event ID to the deletedEvents object
//     setDeletedEvents((prev) => ({ ...prev, [eventId]: true }));

//     // Remove the event from the selectedDayBookings if it's currently open
//     if (selectedDayBookings.some(event => event.id === eventId)) {
//       setSelectedDayBookings((prev) => prev.filter(event => event.id !== eventId));
//     }
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           dayMaxEvents={2}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick}
//           eventClick={handleEventClick} // Add eventClick handler
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedEvent ? [selectedEvent] : selectedDayBookings} // Pass selected event or day bookings
//         theme={theme}
//         onDeleteEvent={handleDeleteEvent} // Pass delete handler
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;

// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from './BottomSheet/BottomSheet';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [deletedEvents, setDeletedEvents] = useState([]); // State for deleted events

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       id: booking.id, // Unique identifier
//       title: `${booking.service} - ${booking.customerName}`, // Service and customer name
//       start: booking.startTime, // ISO string for start time
//       end: booking.endTime, // ISO string for end time
//       backgroundColor: getEventColor(booking.service), // Custom color based on service
//       textColor: '#ffffff', // White text for better contrast
//       extendedProps: {
//         barber: booking.workerName, // Barber's name
//         customer: booking.customerName, // Customer's name
//         service: booking.service, // Service type
//         price: booking.price, // Service price
//         notes: booking.notes, // Additional notes
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Helper function to assign colors based on service type
//   const getEventColor = (service) => {
//     switch (service) {
//       case 'haircut and shampoo':
//         return '#4CAF50'; // Green
//       case 'hairstyling':
//         return '#2196F3'; // Blue
//       case 'hair coloring':
//         return '#9C27B0'; // Purple
//       case 'beard trim':
//         return '#FF9800'; // Orange
//       case 'full grooming':
//         return '#F44336'; // Red
//       default:
//         return '#607D8B'; // Default gray
//     }
//   };

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setSelectedEvent(null); // Reset selected event when a day is clicked
//     setIsBottomSheetOpen(true);
//   };

//   // Handle event click
//   const handleEventClick = (info) => {
//     setSelectedEvent(info.event); // Store the clicked event
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//     setSelectedEvent(null); // Reset selected event when the bottom sheet is closed
//   };

//   // Delete an event
//   const handleDeleteEvent = (eventId) => {
//     const eventToDelete = bookings.find(event => event.id === eventId);
//     if (eventToDelete) {
//       // Remove the event from bookings and filteredBookings
//       const updatedBookings = bookings.filter(event => event.id !== eventId);
//       const updatedFilteredBookings = filteredBookings.filter(event => event.id !== eventId);

//       setBookings(updatedBookings);
//       setFilteredBookings(updatedFilteredBookings);

//       // Add the event to deletedEvents
//       setDeletedEvents([...deletedEvents, eventToDelete]);
//     }
//   };

//   // Restore an event
//   const handleRestoreEvent = (eventId) => {
//     const eventToRestore = deletedEvents.find(event => event.id === eventId);
//     if (eventToRestore) {
//       // Remove the event from deletedEvents
//       const updatedDeletedEvents = deletedEvents.filter(event => event.id !== eventId);
//       setDeletedEvents(updatedDeletedEvents);

//       // Add the event back to bookings and filteredBookings
//       setBookings([...bookings, eventToRestore]);
//       setFilteredBookings([...filteredBookings, eventToRestore]);
//     }
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           dayMaxEvents={2}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick}
//           eventClick={handleEventClick} // Add eventClick handler
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedEvent ? [selectedEvent] : selectedDayBookings} // Pass selected event or day bookings
//         theme={theme}
//         onDeleteEvent={handleDeleteEvent} // Pass delete handler
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;


// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from './BottomSheet/BottomSheet';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null); // New state for clicked event

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       id: booking.id, // Unique identifier
//       title: `${booking.service} - ${booking.customerName}`, // Service and customer name
//       start: booking.startTime, // ISO string for start time
//       end: booking.endTime, // ISO string for end time
//       backgroundColor: getEventColor(booking.service), // Custom color based on service
//       textColor: '#ffffff', // White text for better contrast
//       extendedProps: {
//         barber: booking.workerName, // Barber's name
//         customer: booking.customerName, // Customer's name
//         service: booking.service, // Service type
//         price: booking.price, // Service price
//         notes: booking.notes, // Additional notes
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Helper function to assign colors based on service type
//   const getEventColor = (service) => {
//     switch (service) {
//       case 'haircut and shampoo':
//         return '#4CAF50'; // Green
//       case 'hairstyling':
//         return '#2196F3'; // Blue
//       case 'hair coloring':
//         return '#9C27B0'; // Purple
//       case 'beard trim':
//         return '#FF9800'; // Orange
//       case 'full grooming':
//         return '#F44336'; // Red
//       default:
//         return '#607D8B'; // Default gray
//     }
//   };

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setSelectedEvent(null); // Reset selected event when a day is clicked
//     setIsBottomSheetOpen(true);
//   };

//   // Handle event click
//   const handleEventClick = (info) => {
//     setSelectedEvent(info.event); // Store the clicked event
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//     setSelectedEvent(null); // Reset selected event when the bottom sheet is closed
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           dayMaxEvents={2}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick}
//           eventClick={handleEventClick} // Add eventClick handler
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedEvent ? [selectedEvent] : selectedDayBookings} // Pass selected event or day bookings
//         theme={theme}
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;


// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from './BottomSheet/BottomSheet';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';



// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null); // New state for clicked event

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       id: booking.id, // Unique identifier
//       title: `${booking.service} - ${booking.customerName}`, // Service and customer name
//       start: booking.startTime, // ISO string for start time
//       end: booking.endTime, // ISO string for end time
//       backgroundColor: getEventColor(booking.service), // Custom color based on service
//       textColor: '#ffffff', // White text for better contrast
//       extendedProps: {
//         barber: booking.workerName, // Barber's name
//         customer: booking.customerName, // Customer's name
//         service: booking.service, // Service type
//         price: booking.price, // Service price
//         notes: booking.notes, // Additional notes
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Helper function to assign colors based on service type
//   const getEventColor = (service) => {
//     switch (service) {
//       case 'haircut and shampoo':
//         return '#4CAF50'; // Green
//       case 'hairstyling':
//         return '#2196F3'; // Blue
//       case 'hair coloring':
//         return '#9C27B0'; // Purple
//       case 'beard trim':
//         return '#FF9800'; // Orange
//       case 'full grooming':
//         return '#F44336'; // Red
//       default:
//         return '#607D8B'; // Default gray
//     }
//   };

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setSelectedEvent(null); // Reset selected event when a day is clicked
//     setIsBottomSheetOpen(true);
//   };

//   // Handle event click
//   const handleEventClick = (info) => {
//     setSelectedEvent(info.event); // Store the clicked event
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//     setSelectedEvent(null); // Reset selected event when the bottom sheet is closed
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           dayMaxEvents={2}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick}
//           eventClick={handleEventClick} // Add eventClick handler
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedEvent ? [selectedEvent] : selectedDayBookings} // Pass selected event or day bookings
//         theme={theme}
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;


// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       id: booking.id, // Unique identifier
//       title: `${booking.service} - ${booking.customerName}`, // Service and customer name
//       start: booking.startTime, // ISO string for start time
//       end: booking.endTime, // ISO string for end time
//       backgroundColor: getEventColor(booking.service), // Custom color based on service
//       textColor: '#ffffff', // White text for better contrast
//       extendedProps: {
//         barber: booking.workerName, // Barber's name
//         customer: booking.customerName, // Customer's name
//         service: booking.service, // Service type
//         price: booking.price, // Service price
//         notes: booking.notes, // Additional notes
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Helper function to assign colors based on service type
//   const getEventColor = (service) => {
//     switch (service) {
//       case 'haircut and shampoo':
//         return '#4CAF50'; // Green
//       case 'hairstyling':
//         return '#2196F3'; // Blue
//       case 'hair coloring':
//         return '#9C27B0'; // Purple
//       case 'beard trim':
//         return '#FF9800'; // Orange
//       case 'full grooming':
//         return '#F44336'; // Red
//       default:
//         return '#607D8B'; // Default gray
//     }
//   };

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           dayMaxEvents={2}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick}
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedDayBookings}
//         theme={theme}
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;




// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from './BottomSheet/BottomSheet';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       title: `${booking.name} - ${booking.timeRange}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       extendedProps: {
//         id: booking.id,
//         barber: booking.name,
//         customer: booking.name,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings} // Pass all events to FullCalendar
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           dayMaxEvents={2} // Correct parameter for FullCalendar v5+
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick} // Handle day clicks to open the bottom sheet
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedDayBookings}
//         theme={theme}
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;

// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from './BottomSheet/BottomSheet';
// import MiniBookingCard from './MiniBookingCard/MiniBookingCard';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       title: `${booking.name} - ${booking.timeRange}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       extendedProps: {
//         id: booking.id,
//         barber: booking.name,
//         customer: booking.name,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//   };

//   // Render event content with a limited number of MiniBookingCards
//   const renderEventContent = (eventInfo) => {
//     const MAX_VISIBLE_BOOKINGS = 2; // Show only 2 bookings per day
//     const dateStr = eventInfo.event.startStr.split('T')[0]; // Use startStr to get the date
//     const bookingsForDay = filteredBookings.filter(event => event.start.split('T')[0] === dateStr);

//     return (
//       <>
//         {bookingsForDay.slice(0, MAX_VISIBLE_BOOKINGS).map((booking) => (
//           <MiniBookingCard key={booking.extendedProps.id} booking={booking} theme={theme} />
//         ))}
//         {bookingsForDay.length > MAX_VISIBLE_BOOKINGS && (
//           <button
//             className="show-more-button"
//             onClick={() => handleDayClick({ dateStr })}
//             style={{ color: theme.text }}
//           >
//             Show More
//           </button>
//         )}
//       </>
//     );
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           eventContent={renderEventContent}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick}
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedDayBookings}
//         theme={theme}
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;

// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from './BottomSheet/BottomSheet';
// import MiniBookingCard from './MiniBookingCard/MiniBookingCard';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       title: `${booking.name} - ${booking.timeRange}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       extendedProps: {
//         id: booking.id,
//         barber: booking.name,
//         customer: booking.name,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//   };

//   // Render event content with a "Show More" button if there are too many bookings
//   const renderEventContent = (eventInfo) => {
//     const MAX_VISIBLE_BOOKINGS = 2; // Show only 2 bookings per day
//     const dateStr = eventInfo.event.startStr.split('T')[0]; // Use startStr instead of start
//     const bookingsForDay = filteredBookings.filter(event => event.start.split('T')[0] === dateStr);

//     return (
//       <>
//         {bookingsForDay.slice(0, MAX_VISIBLE_BOOKINGS).map((booking) => (
//           <MiniBookingCard key={booking.extendedProps.id} booking={booking} theme={theme} />
//         ))}
//         {bookingsForDay.length > MAX_VISIBLE_BOOKINGS && (
//           <button
//             className="show-more-button"
//             onClick={() => handleDayClick({ dateStr })}
//             style={{ color: theme.text }}
//           >
//             Show More
//           </button>
//         )}
//       </>
//     );
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           eventContent={renderEventContent}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick}
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedDayBookings}
//         theme={theme}
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;

// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from './BottomSheet/BottomSheet';
// import MiniBookingCard from './MiniBookingCard/MiniBookingCard'; // Import the MiniBookingCard component
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       title: `${booking.name} - ${booking.timeRange}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       extendedProps: {
//         id: booking.id,
//         barber: booking.name,
//         customer: booking.name,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           eventContent={(eventInfo) => (
//             <MiniBookingCard booking={eventInfo.event} theme={theme} />
//           )}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick} // Use dateClick instead of dayClick
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedDayBookings}
//         theme={theme}
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;


// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from './BottomSheet/BottomSheet';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       title: `${booking.name} - ${booking.timeRange}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       extendedProps: {
//         id: booking.id,
//         barber: booking.name,
//         customer: booking.name,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           eventContent={(eventInfo) => (
//             <div className="custom-event" style={{ backgroundColor: theme.primary, color: theme.text }}>
//               <strong>{eventInfo.event.title}</strong>
//               <p>Barber: {eventInfo.event.extendedProps.barber}</p>
//             </div>
//           )}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dateClick={handleDayClick} // Use dateClick instead of dayClick
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedDayBookings}
//         theme={theme}
//       />
//     </div>
//   );
// };

// export default OwnerDashboard;

// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { initialBookings } from './bookingsData';
// import { themes } from './themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isDayModalOpen, setIsDayModalOpen] = useState(false);

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       title: `${booking.name} - ${booking.timeRange}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       extendedProps: {
//         id: booking.id,
//         barber: booking.name,
//         customer: booking.name,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Handle day click
//   const handleDayClick = (info) => {
//     console.log('Day clicked:', info.dateStr); // Debugging
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsDayModalOpen(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setIsDayModalOpen(false);
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           eventContent={(eventInfo) => (
//             <div className="custom-event" style={{ backgroundColor: theme.primary, color: theme.text }}>
//               <strong>{eventInfo.event.title}</strong>
//               <p>Barber: {eventInfo.event.extendedProps.barber}</p>
//             </div>
//           )}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dayClick={handleDayClick} // Handle day click
//         />
//       </div>

//       {/* Day Bookings Modal */}
//       {isDayModalOpen && (
//         console.log('Modal is open'), // Debugging
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" style={{ backgroundColor: theme.card.background, color: theme.text }} onClick={(e) => e.stopPropagation()}>
//             <h3>Bookings for Selected Day</h3>
//             {selectedDayBookings.length > 0 ? (
//               selectedDayBookings.map((event) => (
//                 <div key={event.extendedProps.id} className="booking-item">
//                   <p><strong>Customer:</strong> {event.extendedProps.customer}</p>
//                   <p><strong>Time:</strong> {event.title.split(' - ')[1]}</p>
//                   <p><strong>Barber:</strong> {event.extendedProps.barber}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No bookings for this day.</p>
//             )}
//             <button onClick={closeModal} style={{ backgroundColor: theme.button.background, color: theme.button.text }}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OwnerDashboard;

// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]); // Bookings for the selected day
//   const [isDayModalOpen, setIsDayModalOpen] = useState(false); // Modal state

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       title: `${booking.name} - ${booking.timeRange}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       extendedProps: {
//         id: booking.id,
//         barber: booking.name,
//         customer: booking.name,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Export bookings as CSV
//   const exportBookings = () => {
//     const csvContent = "data:text/csv;charset=utf-8," +
//       filteredBookings.map(event => `${event.extendedProps.id},${event.extendedProps.customer},${event.start},${event.end}`).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "bookings.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   // Calculate statistics
//   const totalBookings = filteredBookings.length;
//   const busiestDay = filteredBookings.reduce((acc, event) => {
//     const date = event.start.split('T')[0];
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {});
//   const mostBookedBarber = filteredBookings.reduce((acc, event) => {
//     acc[event.extendedProps.barber] = (acc[event.extendedProps.barber] || 0) + 1;
//     return acc;
//   }, {});

//   // Handle day click
//   const handleDayClick = (info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsDayModalOpen(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setIsDayModalOpen(false);
//   };

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Theme Selector */}
//       <div className="theme-selector">
//         <label>Theme: </label>
//         <select onChange={(e) => setTheme(themes[e.target.value])}>
//           {Object.keys(themes).map((themeName) => (
//             <option key={themeName} value={themeName}>
//               {themeName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Filters and Search */}
//       <div className="filters">
//         <select onChange={(e) => setSelectedBarber(e.target.value)}>
//           <option value="All">All Barbers</option>
//           {barbers.map((barber) => (
//             <option key={barber} value={barber}>
//               {barber}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Search by customer..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={exportBookings} style={{ backgroundColor: theme.button.background, color: theme.button.text }}>
//           Export Bookings
//         </button>
//       </div>

//       {/* Statistics Panel */}
//       <div className="statistics" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <h3>Statistics</h3>
//         <p>Total Bookings: {totalBookings}</p>
//         <p>Busiest Day: {Object.keys(busiestDay).sort((a, b) => busiestDay[b] - busiestDay[a])[0]}</p>
//         <p>Most Booked Barber: {Object.keys(mostBookedBarber).sort((a, b) => mostBookedBarber[b] - mostBookedBarber[a])[0]}</p>
//       </div>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           eventContent={(eventInfo) => (
//             <div className="custom-event" style={{ backgroundColor: theme.primary, color: theme.text }}>
//               <strong>{eventInfo.event.title}</strong>
//               <p>Barber: {eventInfo.event.extendedProps.barber}</p>
//             </div>
//           )}
//           height="auto"
//           editable={true}
//           selectable={true}
//           dayClick={handleDayClick} // Handle day click
//         />
//       </div>

//       {/* Day Bookings Modal */}
//       {isDayModalOpen && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" style={{ backgroundColor: theme.card.background, color: theme.text }} onClick={(e) => e.stopPropagation()}>
//             <h3>Bookings for Selected Day</h3>
//             {selectedDayBookings.length > 0 ? (
//               selectedDayBookings.map((event) => (
//                 <div key={event.extendedProps.id} className="booking-item">
//                   <p><strong>Customer:</strong> {event.extendedProps.customer}</p>
//                   <p><strong>Time:</strong> {event.title.split(' - ')[1]}</p>
//                   <p><strong>Barber:</strong> {event.extendedProps.barber}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No bookings for this day.</p>
//             )}
//             <button onClick={closeModal} style={{ backgroundColor: theme.button.background, color: theme.button.text }}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OwnerDashboard;

// wow
// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { initialBookings } from './bookingsData';
// import { themes } from '../Themes/themes';
// import './OwnerDashboard.css';

// const OwnerDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedBarber, setSelectedBarber] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [theme, setTheme] = useState(themes.default); // Default theme

//   // Extract unique barber names for the filter dropdown
//   const barbers = [...new Set(initialBookings.map(booking => booking.name))];

//   useEffect(() => {
//     // Map bookings to FullCalendar events
//     const events = initialBookings.map(booking => ({
//       title: `${booking.name} - ${booking.timeRange}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       extendedProps: {
//         id: booking.id,
//         barber: booking.name,
//         customer: booking.name, // Assuming 'name' is the customer
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, []);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings;

//     if (selectedBarber !== 'All') {
//       filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(event =>
//         event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredBookings(filtered);
//   }, [selectedBarber, searchQuery, bookings]);

//   // Export bookings as CSV
//   const exportBookings = () => {
//     const csvContent = "data:text/csv;charset=utf-8," +
//       filteredBookings.map(event => `${event.extendedProps.id},${event.extendedProps.customer},${event.start},${event.end}`).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "bookings.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   // Calculate statistics
//   const totalBookings = filteredBookings.length;
//   const busiestDay = filteredBookings.reduce((acc, event) => {
//     const date = event.start.split('T')[0];
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {});
//   const mostBookedBarber = filteredBookings.reduce((acc, event) => {
//     acc[event.extendedProps.barber] = (acc[event.extendedProps.barber] || 0) + 1;
//     return acc;
//   }, {});

//   return (
//     <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
//       <h1>Barbershop Appointments</h1>

//       {/* Theme Selector */}
//       <div className="theme-selector">
//         <label>Theme: </label>
//         <select onChange={(e) => setTheme(themes[e.target.value])}>
//           {Object.keys(themes).map((themeName) => (
//             <option key={themeName} value={themeName}>
//               {themeName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Filters and Search */}
//       <div className="filters">
//         <select onChange={(e) => setSelectedBarber(e.target.value)}>
//           <option value="All">All Barbers</option>
//           {barbers.map((barber) => (
//             <option key={barber} value={barber}>
//               {barber}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Search by customer..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={exportBookings} style={{ backgroundColor: theme.button.background, color: theme.button.text }}>
//           Export Bookings
//         </button>
//       </div>

//       {/* Statistics Panel */}
//       <div className="statistics" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <h3>Statistics</h3>
//         <p>Total Bookings: {totalBookings}</p>
//         <p>Busiest Day: {Object.keys(busiestDay).sort((a, b) => busiestDay[b] - busiestDay[a])[0]}</p>
//         <p>Most Booked Barber: {Object.keys(mostBookedBarber).sort((a, b) => mostBookedBarber[b] - mostBookedBarber[a])[0]}</p>
//       </div>

//       {/* Calendar */}
//       <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={filteredBookings}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           eventContent={(eventInfo) => (
//             <div className="custom-event" style={{ backgroundColor: theme.primary, color: theme.text }}>
//               <strong>{eventInfo.event.title}</strong>
//               <p>Barber: {eventInfo.event.extendedProps.barber}</p>
//             </div>
//           )}
//           height="auto"
//           editable={true}
//           selectable={true}
//           eventClick={(info) => {
//             alert(`Booking ID: ${info.event.extendedProps.id}\nBarber: ${info.event.extendedProps.barber}`);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboard;
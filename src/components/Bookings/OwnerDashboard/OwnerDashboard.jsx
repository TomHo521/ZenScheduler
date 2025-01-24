import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import BottomSheet from './BottomSheet/BottomSheet';
import { initialBookings } from './bookingsData';
import { themes } from '../Themes/themes';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(themes.default);
  const [selectedDayBookings, setSelectedDayBookings] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Extract unique barber names for the filter dropdown
  const barbers = [...new Set(initialBookings.map(booking => booking.name))];

  useEffect(() => {
    // Map bookings to FullCalendar events
    const events = initialBookings.map(booking => ({
      title: `${booking.name} - ${booking.timeRange}`,
      start: booking.startTime,
      end: booking.endTime,
      extendedProps: {
        id: booking.id,
        barber: booking.name,
        customer: booking.name,
      },
    }));
    setBookings(events);
    setFilteredBookings(events);
  }, []);

  // Filter bookings by barber and search query
  useEffect(() => {
    let filtered = bookings;

    if (selectedBarber !== 'All') {
      filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
    }

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [selectedBarber, searchQuery, bookings]);

  // Handle day click
  const handleDayClick = (info) => {
    const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
    setSelectedDayBookings(dayBookings);
    setIsBottomSheetOpen(true);
  };

  // Close bottom sheet
  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor: theme.background, color: theme.text }}>
      <h1>Barbershop Appointments</h1>

      {/* Calendar */}
      <div className="calendar-container" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={filteredBookings}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          eventContent={(eventInfo) => (
            <div className="custom-event" style={{ backgroundColor: theme.primary, color: theme.text }}>
              <strong>{eventInfo.event.title}</strong>
              <p>Barber: {eventInfo.event.extendedProps.barber}</p>
            </div>
          )}
          height="auto"
          editable={true}
          selectable={true}
          dateClick={handleDayClick} // Use dateClick instead of dayClick
        />
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        bookings={selectedDayBookings}
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
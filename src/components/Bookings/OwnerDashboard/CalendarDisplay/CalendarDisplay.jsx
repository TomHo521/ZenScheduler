import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import BottomSheet from '../BottomSheet/BottomSheet';
import RecyclingBinIcon from './RecyclingBinIcon/RecyclingBinIcon';
import DeletedEventsModal from './DeletedEventsModal/DeletedEventsModal';
import EventModal from './EventModal/EventModal';
import './CalendarDisplay.css';

const CalendarDisplay = ({ initialBookings, selectedBarber, searchQuery, theme }) => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedDayBookings, setSelectedDayBookings] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [deletedEventsList, setDeletedEventsList] = useState([]); // Store deleted events
  const [isDeletedEventsModalOpen, setIsDeletedEventsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Initialize bookings
  useEffect(() => {
    const events = initialBookings.map(booking => ({
      id: booking.id,
      title: `${booking.service} - ${booking.customerName}`,
      start: booking.startTime,
      end: booking.endTime,
      backgroundColor: getEventColor(booking.service),
      textColor: '#ffffff',
      extendedProps: {
        barber: booking.workerName,
        customer: booking.customerName,
        service: booking.service,
        price: booking.price,
        notes: booking.notes,
      },
    }));
    setBookings(events);
    setFilteredBookings(events);
  }, [initialBookings]);

  // Filter bookings by barber and search query
  useEffect(() => {
    let filtered = bookings.filter(event => !deletedEventsList.some(deleted => deleted.id === event.id));

    if (selectedBarber !== 'All') {
      filtered = filtered.filter(event => event.extendedProps.barber === selectedBarber);
    }

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.extendedProps.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [selectedBarber, searchQuery, bookings, deletedEventsList]);

  // Handle day click
  const handleDayClick = useCallback((info) => {
    const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
    setSelectedDayBookings(dayBookings);
    setIsBottomSheetOpen(true);
  }, [filteredBookings]);

  // Handle event click
  const handleEventClick = useCallback((info) => {
    setSelectedEvent(info.event);
  }, []);

  // Close bottom sheet
  const closeBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  // Close event modal
  const closeEventModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  // Handle event deletion
  const handleDeleteEvent = useCallback((eventId) => {
    const eventToDelete = bookings.find(event => event.id === eventId);
    if (eventToDelete) {
      setDeletedEventsList((prev) => [...prev, eventToDelete]); // Add to deleted events list
      setBookings((prev) => prev.filter(event => event.id !== eventId)); // Remove from bookings
      setSelectedDayBookings((prev) => prev.filter(event => event.id !== eventId)); // Remove from selected day bookings
    }
  }, [bookings]);

  // Handle event undeletion
  const handleUndeleteEvent = useCallback((eventId) => {
    const eventToUndelete = deletedEventsList.find(event => event.id === eventId);
    if (eventToUndelete) {
      setBookings((prev) => [...prev, eventToUndelete]); // Add back to bookings
      setDeletedEventsList((prev) => prev.filter(event => event.id !== eventId)); // Remove from deleted events list
    }
  }, [deletedEventsList]);

  // Helper function to assign colors based on service type
  const getEventColor = (service) => {
    switch (service) {
      case 'haircut and shampoo':
        return '#4CAF50'; // Green
      case 'hairstyling':
        return '#2196F3'; // Blue
      case 'hair coloring':
        return '#9C27B0'; // Purple
      case 'beard trim':
        return '#FF9800'; // Orange
      case 'full grooming':
        return '#F44336'; // Red
      default:
        return '#607D8B'; // Default gray
    }
  };

  return (
    <>
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
          dayMaxEvents={2}
          height="auto"
          editable={true}
          selectable={true}
          dateClick={handleDayClick}
          eventClick={handleEventClick}
        />
      </div>

      {/* Recycling Bin Icon */}
      <RecyclingBinIcon onClick={() => setIsDeletedEventsModalOpen(true)} />

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        bookings={selectedDayBookings}
        theme={theme}
        onDeleteEvent={handleDeleteEvent}
      />

      {/* Deleted Events Modal */}
      <DeletedEventsModal
        isOpen={isDeletedEventsModalOpen}
        onClose={() => setIsDeletedEventsModalOpen(false)}
        deletedEvents={deletedEventsList} // Pass the correct list
        theme={theme}
        onUndeleteEvent={handleUndeleteEvent}
      />

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        theme={theme}
        onClose={closeEventModal}
        onDeleteEvent={handleDeleteEvent}
      />
    </>
  );
};

export default CalendarDisplay;

// import React, { useState, useEffect, useCallback } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from '../BottomSheet/BottomSheet';
// import RecyclingBinIcon from './RecyclingBinIcon/RecyclingBinIcon'; // New component
// import DeletedEventsModal from './DeletedEventsModal/DeletedEventsModal'; // Modal for deleted events
// import EventModal from './EventModal/EventModal'; // New modal for individual events
// import './CalendarDisplay.css';

// const CalendarDisplay = ({ initialBookings, selectedBarber, searchQuery, theme }) => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [deletedEvents, setDeletedEvents] = useState({});
//   const [pendingDeletion, setPendingDeletion] = useState({});
//   const [deletedEventsList, setDeletedEventsList] = useState([]); // Store deleted events
//   const [isDeletedEventsModalOpen, setIsDeletedEventsModalOpen] = useState(false); // Control modal visibility
//   const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event for modal

//   // Initialize bookings
//   useEffect(() => {
//     const events = initialBookings.map(booking => ({
//       id: booking.id,
//       title: `${booking.service} - ${booking.customerName}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       backgroundColor: getEventColor(booking.service),
//       textColor: '#ffffff',
//       extendedProps: {
//         barber: booking.workerName,
//         customer: booking.customerName,
//         service: booking.service,
//         price: booking.price,
//         notes: booking.notes,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, [initialBookings]);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings.filter(event => !deletedEvents[event.id]);

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
//   const handleDayClick = useCallback((info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsBottomSheetOpen(true);
//   }, [filteredBookings]);

//   // Handle event click
//   const handleEventClick = useCallback((info) => {
//     setSelectedEvent(info.event); // Set the selected event
//   }, []);

//   // Close bottom sheet
//   const closeBottomSheet = useCallback(() => {
//     setIsBottomSheetOpen(false);
//   }, []);

//   // Close event modal
//   const closeEventModal = useCallback(() => {
//     setSelectedEvent(null);
//   }, []);


//   const handleDeleteEvent = useCallback((eventId) => {
//     console.log(`handledeleteEvent called deletedEventsList:${deletedEventsList}`);
//     console.log(`handledeleteEvent called deletedEvents:${deletedEvents}`);
//     for (let x in deletedEvents) {
//       console.log(deletedEvents[x])
//     }

//     setPendingDeletion((prev) => ({ ...prev, [eventId]: true }));

  
//     setTimeout(() => {
//       // Normalize eventId to match the type of event.id (assuming event.id is a number)
//       const normalizedEventId = Number(eventId);
  
//       const eventToDelete = bookings.find(event => event.id === normalizedEventId);
//       if (eventToDelete) {
//         // Use functional update to ensure we're working with the latest state
//         setDeletedEventsList((prev) => {
//           const updatedList = [...prev, eventToDelete];
//           console.log('Updated Deleted Events List:', updatedList); // Debugging
//           return updatedList;
//         });
//       }
  
//       setDeletedEvents((prev) => ({ ...prev, [eventId]: true }));
//       setPendingDeletion((prev) => {
//         const updated = { ...prev };
//         delete updated[eventId];
//         return updated;
//       });

      
  
//       if (selectedDayBookings.some(event => event.id === normalizedEventId)) {
//         setSelectedDayBookings((prev) => prev.filter(event => event.id !== normalizedEventId));
//       }
//     }, 300); // Match the duration of the CSS transition
//   }, [bookings, selectedDayBookings]);

//   const handleUndeleteEvent = useCallback((eventId) => {
//     // Normalize eventId to match the type of event.id (assuming event.id is a number)
//     const normalizedEventId = Number(eventId);
  
//     const eventToUndelete = deletedEventsList.find(event => event.id === normalizedEventId);
//     if (eventToUndelete) {
//       // Check if the event already exists in the bookings array
//       setBookings((prev) => {
//         const eventExists = prev.some(event => event.id === normalizedEventId);
//         if (!eventExists) {
//           return [...prev, eventToUndelete]; // Add back to bookings if it doesn't exist
//         }
//         return prev; // Return the previous state if the event already exists
//       });
  
//       // Remove the event from the deletedEventsList
//       setDeletedEventsList((prev) => prev.filter(event => event.id !== normalizedEventId));
  
//       // Remove the event from the deletedEvents object
//       setDeletedEvents((prev) => {
//         const updated = { ...prev };
//         delete updated[eventId];
//         return updated;
//       });
//     }
//   }, [deletedEventsList]);

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

//   return (
//     <>
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
//           eventClick={handleEventClick} // Re-enable event click
//         />
//       </div>

//       {/* Recycling Bin Icon */}
//       <RecyclingBinIcon onClick={() => setIsDeletedEventsModalOpen(true)} />

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedDayBookings.filter(event => !pendingDeletion[event.id])}
//         theme={theme}
//         onDeleteEvent={handleDeleteEvent}
//       />

//       {/* Deleted Events Modal */}
//       <DeletedEventsModal
//         isOpen={isDeletedEventsModalOpen}
//         onClose={() => setIsDeletedEventsModalOpen(false)}
//         deletedEvents={deletedEvents}
//         theme={theme}
//         onUndeleteEvent={handleUndeleteEvent}
//       />

//       {/* Event Modal */}
//       <EventModal
//         event={selectedEvent}
//         theme={theme}
//         onClose={closeEventModal}
//         onDeleteEvent={handleDeleteEvent} // Pass delete handler
//       />
//     </>
//   );
// };

// export default CalendarDisplay;

// import React, { useState, useEffect, useCallback } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from '../BottomSheet/BottomSheet';
// import RecyclingBinIcon from './RecyclingBinIcon/RecyclingBinIcon'; // New component
// import DeletedEventsModal from './DeletedEventsModal/DeletedEventsModal'; // Modal for deleted events
// import './CalendarDisplay.css';

// const CalendarDisplay = ({ initialBookings, selectedBarber, searchQuery, theme }) => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [deletedEvents, setDeletedEvents] = useState({});
//   const [pendingDeletion, setPendingDeletion] = useState({});
//   const [deletedEventsList, setDeletedEventsList] = useState([]); // Store deleted events
//   const [isDeletedEventsModalOpen, setIsDeletedEventsModalOpen] = useState(false); // Control modal visibility

//   // Initialize bookings
//   useEffect(() => {
//     const events = initialBookings.map(booking => ({
//       id: booking.id,
//       title: `${booking.service} - ${booking.customerName}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       backgroundColor: getEventColor(booking.service),
//       textColor: '#ffffff',
//       extendedProps: {
//         barber: booking.workerName,
//         customer: booking.customerName,
//         service: booking.service,
//         price: booking.price,
//         notes: booking.notes,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, [initialBookings]);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings.filter(event => !deletedEvents[event.id]);

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
//   const handleDayClick = useCallback((info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setIsBottomSheetOpen(true);
//   }, [filteredBookings]);

//   // Close bottom sheet
//   const closeBottomSheet = useCallback(() => {
//     setIsBottomSheetOpen(false);
//   }, []);

//   // Delete an event
//   const handleDeleteEvent = useCallback((eventId) => {
//     setPendingDeletion((prev) => ({ ...prev, [eventId]: true }));

//     setTimeout(() => {
//       const eventToDelete = bookings.find(event => event.id === eventId);
//       if (eventToDelete) {
//         console.log('Deleted Event:', eventToDelete); // Debugging
//         setDeletedEventsList((prev) => [...prev, eventToDelete]); // Add to deleted events list
//       }

//       setDeletedEvents((prev) => ({ ...prev, [eventId]: true }));
//       setPendingDeletion((prev) => {
//         const updated = { ...prev };
//         delete updated[eventId];
//         return updated;
//       });

//       if (selectedDayBookings.some(event => event.id === eventId)) {
//         setSelectedDayBookings((prev) => prev.filter(event => event.id !== eventId));
//       }
//     }, 300); // Match the duration of the CSS transition
//   }, [bookings, selectedDayBookings]);

//   // Undelete an event
//   const handleUndeleteEvent = useCallback((eventId) => {
//     const eventToUndelete = deletedEventsList.find(event => event.id === eventId);
//     if (eventToUndelete) {
//       setBookings((prev) => [...prev, eventToUndelete]); // Add back to bookings
//       setDeletedEventsList((prev) => prev.filter(event => event.id !== eventId)); // Remove from deleted events list
//       setDeletedEvents((prev) => {
//         const updated = { ...prev };
//         delete updated[eventId];
//         return updated;
//       });
//     }
//   }, [deletedEventsList]);

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

//   return (
//     <>
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
//           eventClick={null} // Disable event click
//         />
//       </div>

//       {/* Recycling Bin Icon */}
//       <RecyclingBinIcon onClick={() => setIsDeletedEventsModalOpen(true)} />

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={selectedDayBookings.filter(event => !pendingDeletion[event.id])}
//         theme={theme}
//         onDeleteEvent={handleDeleteEvent}
//       />

//       {/* Deleted Events Modal */}
//       <DeletedEventsModal
//         isOpen={isDeletedEventsModalOpen}
//         onClose={() => setIsDeletedEventsModalOpen(false)}
//         deletedEvents={deletedEventsList}
//         theme={theme}
//         onUndeleteEvent={handleUndeleteEvent}
//       />
//     </>
//   );
// };

// export default CalendarDisplay;

// import React, { useState, useEffect, useCallback } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from '../BottomSheet/BottomSheet';
// import RecyclingBinIcon from './RecyclingBinIcon/RecyclingBinIcon'; // New component
// import DeletedEventsModal from './DeletedEventsModal/DeletedEventsModal'; // Modal for deleted events
// import './CalendarDisplay.css';

// const CalendarDisplay = ({ initialBookings, selectedBarber, searchQuery, theme }) => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [deletedEvents, setDeletedEvents] = useState({});
//   const [pendingDeletion, setPendingDeletion] = useState({});
//   const [deletedEventsList, setDeletedEventsList] = useState([]); // Store deleted events
//   const [isDeletedEventsModalOpen, setIsDeletedEventsModalOpen] = useState(false); // Control modal visibility

//   // Initialize bookings
//   useEffect(() => {
//     const events = initialBookings.map(booking => ({
//       id: booking.id,
//       title: `${booking.service} - ${booking.customerName}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       backgroundColor: getEventColor(booking.service),
//       textColor: '#ffffff',
//       extendedProps: {
//         barber: booking.workerName,
//         customer: booking.customerName,
//         service: booking.service,
//         price: booking.price,
//         notes: booking.notes,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, [initialBookings]);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings.filter(event => !deletedEvents[event.id]);

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
//   const handleDayClick = useCallback((info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setSelectedEvent(null);
//     setIsBottomSheetOpen(true);
//   }, [filteredBookings]);

//   // Handle event click
//   const handleEventClick = useCallback((info) => {
//     setSelectedEvent(info.event);
//     setIsBottomSheetOpen(true);
//   }, []);

//   // Close bottom sheet
//   const closeBottomSheet = useCallback(() => {
//     setIsBottomSheetOpen(false);
//     setSelectedEvent(null);
//   }, []);

//   // Delete an event
//   const handleDeleteEvent = useCallback((eventId) => {
//     setPendingDeletion((prev) => ({ ...prev, [eventId]: true }));

//     setTimeout(() => {
//       const eventToDelete = bookings.find(event => event.id === eventId);
//       if (eventToDelete) {
//         setDeletedEventsList((prev) => [...prev, eventToDelete]); // Add to deleted events list
//       }

//       setDeletedEvents((prev) => ({ ...prev, [eventId]: true }));
//       setPendingDeletion((prev) => {
//         const updated = { ...prev };
//         delete updated[eventId];
//         return updated;
//       });

//       if (selectedDayBookings.some(event => event.id === eventId)) {
//         setSelectedDayBookings((prev) => prev.filter(event => event.id !== eventId));
//       }
//     }, 300); // Match the duration of the CSS transition
//   }, [bookings, selectedDayBookings]);

//   // Undelete an event
//   const handleUndeleteEvent = useCallback((eventId) => {
//     const eventToUndelete = deletedEventsList.find(event => event.id === eventId);
//     if (eventToUndelete) {
//       setBookings((prev) => [...prev, eventToUndelete]); // Add back to bookings
//       setDeletedEventsList((prev) => prev.filter(event => event.id !== eventId)); // Remove from deleted events list
//       setDeletedEvents((prev) => {
//         const updated = { ...prev };
//         delete updated[eventId];
//         return updated;
//       });
//     }
//   }, [deletedEventsList]);

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

//   return (
//     <>
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
//           eventClick={handleEventClick}
//         />
//       </div>

//       {/* Recycling Bin Icon */}
//       <RecyclingBinIcon onClick={() => setIsDeletedEventsModalOpen(true)} />

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={
//           selectedEvent
//             ? [selectedEvent]
//             : selectedDayBookings.filter(event => !pendingDeletion[event.id])
//         }
//         theme={theme}
//         onDeleteEvent={handleDeleteEvent}
//       />

//       {/* Deleted Events Modal */}
//       <DeletedEventsModal
//         isOpen={isDeletedEventsModalOpen}
//         onClose={() => setIsDeletedEventsModalOpen(false)}
//         deletedEvents={deletedEventsList}
//         theme={theme}
//         onUndeleteEvent={handleUndeleteEvent}
//       />
//     </>
//   );
// };

// export default CalendarDisplay;

// import React, { useState, useEffect, useCallback } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from '../BottomSheet/BottomSheet';
// import './CalendarDisplay.css';

// const CalendarDisplay = ({ initialBookings, selectedBarber, searchQuery, theme }) => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [deletedEvents, setDeletedEvents] = useState({});
//   const [pendingDeletion, setPendingDeletion] = useState({});

//   // Initialize bookings
//   useEffect(() => {
//     const events = initialBookings.map(booking => ({
//       id: booking.id,
//       title: `${booking.service} - ${booking.customerName}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       backgroundColor: getEventColor(booking.service),
//       textColor: '#ffffff',
//       extendedProps: {
//         barber: booking.workerName,
//         customer: booking.customerName,
//         service: booking.service,
//         price: booking.price,
//         notes: booking.notes,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, [initialBookings]);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings.filter(event => !deletedEvents[event.id]);

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
//   const handleDayClick = useCallback((info) => {
//     const dayBookings = filteredBookings.filter(event => event.start.split('T')[0] === info.dateStr);
//     setSelectedDayBookings(dayBookings);
//     setSelectedEvent(null);
//     setIsBottomSheetOpen(true);
//   }, [filteredBookings]);

//   // Handle event click
//   const handleEventClick = useCallback((info) => {
//     setSelectedEvent(info.event);
//     setIsBottomSheetOpen(true);
//   }, []);

//   // Close bottom sheet
//   const closeBottomSheet = useCallback(() => {
//     setIsBottomSheetOpen(false);
//     setSelectedEvent(null);
//   }, []);

//   // Delete an event
//   const handleDeleteEvent = useCallback((eventId) => {
//     setPendingDeletion((prev) => ({ ...prev, [eventId]: true }));

//     setTimeout(() => {
//       setDeletedEvents((prev) => ({ ...prev, [eventId]: true }));
//       setPendingDeletion((prev) => {
//         const updated = { ...prev };
//         delete updated[eventId];
//         return updated;
//       });

//       if (selectedDayBookings.some(event => event.id === eventId)) {
//         setSelectedDayBookings((prev) => prev.filter(event => event.id !== eventId));
//       }
//     }, 300); // Match the duration of the CSS transition
//   }, [selectedDayBookings]);

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

//   return (
//     <>
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
//           eventClick={handleEventClick}
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={
//           selectedEvent
//             ? [selectedEvent]
//             : selectedDayBookings.filter(event => !pendingDeletion[event.id])
//         }
//         theme={theme}
//         onDeleteEvent={handleDeleteEvent}
//       />
//     </>
//   );
// };

// export default CalendarDisplay;

// // CalendarDisplay.jsx
// import React, { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import BottomSheet from '../BottomSheet/BottomSheet';
// import './CalendarDisplay.css';

// const CalendarDisplay = ({ initialBookings, selectedBarber, searchQuery, theme }) => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [selectedDayBookings, setSelectedDayBookings] = useState([]);
//   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [deletedEvents, setDeletedEvents] = useState({});
//   const [pendingDeletion, setPendingDeletion] = useState({});

//   // Initialize bookings
//   useEffect(() => {
//     const events = initialBookings.map(booking => ({
//       id: booking.id,
//       title: `${booking.service} - ${booking.customerName}`,
//       start: booking.startTime,
//       end: booking.endTime,
//       backgroundColor: getEventColor(booking.service),
//       textColor: '#ffffff',
//       extendedProps: {
//         barber: booking.workerName,
//         customer: booking.customerName,
//         service: booking.service,
//         price: booking.price,
//         notes: booking.notes,
//       },
//     }));
//     setBookings(events);
//     setFilteredBookings(events);
//   }, [initialBookings]);

//   // Filter bookings by barber and search query
//   useEffect(() => {
//     let filtered = bookings.filter(event => !deletedEvents[event.id]);

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
//     setSelectedEvent(null);
//     setIsBottomSheetOpen(true);
//   };

//   // Handle event click
//   const handleEventClick = (info) => {
//     setSelectedEvent(info.event);
//     setIsBottomSheetOpen(true);
//   };

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setIsBottomSheetOpen(false);
//     setSelectedEvent(null);
//   };

//   // Delete an event
//   const handleDeleteEvent = (eventId) => {
//     setPendingDeletion((prev) => ({ ...prev, [eventId]: true }));

//     setTimeout(() => {
//       setDeletedEvents((prev) => ({ ...prev, [eventId]: true }));
//       setPendingDeletion((prev) => {
//         const updated = { ...prev };
//         delete updated[eventId];
//         return updated;
//       });

//       if (selectedDayBookings.some(event => event.id === eventId)) {
//         setSelectedDayBookings((prev) => prev.filter(event => event.id !== eventId));
//       }
//     }, 300); // Match the duration of the CSS transition
//   };

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

//   return (
//     <>
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
//           eventClick={handleEventClick}
//         />
//       </div>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         isOpen={isBottomSheetOpen}
//         onClose={closeBottomSheet}
//         bookings={
//           selectedEvent
//             ? [selectedEvent]
//             : selectedDayBookings.filter(event => !pendingDeletion[event.id])
//         }
//         theme={theme}
//         onDeleteEvent={handleDeleteEvent}
//       />
//     </>
//   );
// };

// export default CalendarDisplay;





  // const handleDeleteEvent = useCallback((eventId) => {
  //   setPendingDeletion((prev) => ({ ...prev, [eventId]: true }));

  
  //   setTimeout(() => {
  //     console.log('Bookings:', bookings);
  //     console.log('Event ID:', eventId);
      


  //     const eventToDelete = bookings.find(event => event.id == eventId);
  //     console.log('Event to delete:', eventToDelete);
  //     if (eventToDelete) {
  //       // Use functional update to ensure we're working with the latest state
  //       setDeletedEventsList((prev) => {
  //         const updatedList = [...prev, eventToDelete];
  //         console.log('Updated Deleted Events List:', updatedList); // Debugging
  //         return updatedList;
  //       });
  //     }
  
  //     setDeletedEvents((prev) => ({ ...prev, [eventId]: true }));
  //     setPendingDeletion((prev) => {
  //       const updated = { ...prev };
  //       delete updated[eventId];
  //       return updated;
  //     });
  
  //     if (selectedDayBookings.some(event => event.id === eventId)) {
  //       setSelectedDayBookings((prev) => prev.filter(event => event.id !== eventId));
  //     }
  //   }, 300); // Match the duration of the CSS transition
  // }, [bookings, selectedDayBookings]);



  // const handleUndeleteEvent = useCallback((eventId) => {
  //   const eventToUndelete = deletedEventsList.find(event => event.id === eventId);
  //   if (eventToUndelete) {
  //     // Check if the event already exists in the bookings array
  //     setBookings((prev) => {
  //       const eventExists = prev.some(event => event.id === eventId);
  //       if (!eventExists) {
  //         return [...prev, eventToUndelete]; // Add back to bookings if it doesn't exist
  //       }
  //       return prev; // Return the previous state if the event already exists
  //     });
  
  //     // Remove the event from the deletedEventsList
  //     setDeletedEventsList((prev) => prev.filter(event => event.id !== eventId));
  
  //     // Remove the event from the deletedEvents object
  //     setDeletedEvents((prev) => {
  //       const updated = { ...prev };
  //       delete updated[eventId];
  //       return updated;
  //     });
  //   }
  // }, [deletedEventsList]);

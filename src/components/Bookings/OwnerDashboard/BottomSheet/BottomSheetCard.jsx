import React, { useState } from 'react';
import './BottomSheetCard.css';
import { FaTimes, FaBan, FaUndo } from 'react-icons/fa'; // Import icons from react-icons

const BottomSheetCard = ({ event, theme, onDeleteEvent, onUndeleteEvent, isDeleted }) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // State for deletion animation

  // Extract time and date from startTime
  const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTime = new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timeRange = `${startTime} - ${endTime}`;
  const eventDate = new Date(event.start).toLocaleDateString();

  // Handle cancel/uncancel action
  const handleCancel = () => {
    setIsCanceled((prev) => !prev);
  };

  // Handle delete action
  const handleDelete = () => {
    setIsDeleting(true); // Trigger deletion animation
    setTimeout(() => {
      onDeleteEvent(event.id); // Notify parent to delete the event after animation
    }, 500); // Match the duration of the CSS transition (0.5s)
  };

  // Handle undelete action
  const handleUndelete = () => {
    onUndeleteEvent(event.id); // Restore the event
  };

  return (
    <div
      className={`booking-item ${isCanceled ? 'canceled' : ''} ${isDeleting ? 'fade-out' : ''}`}
      style={{ borderColor: theme.primary }}
    >
      {/* Icons in the top-right corner */}
      <div className="action-icons">
        {isDeleted ? (
          <div className="icon-container" onClick={handleUndelete} title="Undelete Appointment">
            <FaUndo className="undelete-icon" />
          </div>
        ) : (
          <>
            <div className="icon-container" onClick={handleCancel} title={isCanceled ? "Mark Active" : "Mark Canceled"}>
              <FaBan className="cancel-icon" />
            </div>
            <div className="icon-container" onClick={handleDelete} title="Delete Appointment">
              <FaTimes className="delete-icon" />
            </div>
          </>
        )}
      </div>

      {/* CANCELED Text */}
      {isCanceled && (
        <div className="canceled-text">CANCELED</div>
      )}

      {/* Event Date */}
      <div className="event-date">
        {eventDate}
      </div>

      <div className="booking-item-header">
        <h4>{event.extendedProps.service}</h4>
        <p className="booking-time">{timeRange}</p>
      </div>
      <div className="booking-item-details">
        <div className="detail-row">
          <span className="detail-label">Customer:</span>
          <span className="detail-value">{event.extendedProps.customer}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Barber:</span>
          <span className="detail-value">{event.extendedProps.barber}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Price:</span>
          <span className="detail-value">${event.extendedProps.price}</span>
        </div>
        {event.extendedProps.notes !== 'no comment' && (
          <div className="detail-row">
            <span className="detail-label">Notes:</span>
            <span className="detail-value">{event.extendedProps.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomSheetCard;

// import React, { useState } from 'react';
// import './BottomSheetCard.css';
// import { FaTimes, FaBan, FaUndo } from 'react-icons/fa'; // Import icons from react-icons

// const BottomSheetCard = ({ event, theme, onDeleteEvent, onUndeleteEvent, isDeleted }) => {
//   const [isCanceled, setIsCanceled] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false); // State for deletion animation

//   // Extract time and date from startTime
//   const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const endTime = new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const timeRange = `${startTime} - ${endTime}`;
//   const eventDate = new Date(event.start).toLocaleDateString();

//   // Handle cancel/uncancel action
//   const handleCancel = () => {
//     setIsCanceled((prev) => !prev);
//   };

//   // Handle delete action
//   const handleDelete = () => {
//     setIsDeleting(true); // Trigger fade-out animation
//     onDeleteEvent(event.id); // Notify parent to delete the event
//   };

//   // Handle undelete action
//   const handleUndelete = () => {
//     onUndeleteEvent(event.id); // Restore the event
//   };

//   return (
//     <div
//       className={`booking-item ${isCanceled ? 'canceled' : ''} ${isDeleting ? 'fade-out' : ''}`}
//       style={{ borderColor: theme.primary }}
//     >
//       {/* Icons in the top-right corner */}
//       <div className="action-icons">
//         {isDeleted ? (
//           <div className="icon-container" onClick={handleUndelete} title="Undelete Appointment">
//             <FaUndo className="undelete-icon" />
//           </div>
//         ) : (
//           <>
//             <div className="icon-container" onClick={handleCancel} title={isCanceled ? "Mark Active" : "Mark Canceled"}>
//               <FaBan className="cancel-icon" />
//             </div>
//             <div className="icon-container" onClick={handleDelete} title="Delete Appointment">
//               <FaTimes className="delete-icon" />
//             </div>
//           </>
//         )}
//       </div>

//       {/* CANCELED Text */}
//       {isCanceled && (
//         <div className="canceled-text">CANCELED</div>
//       )}

//       {/* Event Date */}
//       <div className="event-date">
//         {eventDate}
//       </div>

//       <div className="booking-item-header">
//         <h4>{event.extendedProps.service}</h4>
//         <p className="booking-time">{timeRange}</p>
//       </div>
//       <div className="booking-item-details">
//         <div className="detail-row">
//           <span className="detail-label">Customer:</span>
//           <span className="detail-value">{event.extendedProps.customer}</span>
//         </div>
//         <div className="detail-row">
//           <span className="detail-label">Barber:</span>
//           <span className="detail-value">{event.extendedProps.barber}</span>
//         </div>
//         <div className="detail-row">
//           <span className="detail-label">Price:</span>
//           <span className="detail-value">${event.extendedProps.price}</span>
//         </div>
//         {event.extendedProps.notes !== 'no comment' && (
//           <div className="detail-row">
//             <span className="detail-label">Notes:</span>
//             <span className="detail-value">{event.extendedProps.notes}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BottomSheetCard;

// import React, { useState } from 'react';
// import './BottomSheetCard.css';
// import { FaTimes, FaBan, FaUndo } from 'react-icons/fa'; // Import icons from react-icons

// const BottomSheetCard = ({ event, theme, onDeleteEvent, onUndeleteEvent, isDeleted }) => {
//   const [isCanceled, setIsCanceled] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false); // State for deletion animation

//   // Extract time and date from startTime
//   const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const endTime = new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const timeRange = `${startTime} - ${endTime}`;
//   const eventDate = new Date(event.start).toLocaleDateString();

//   // Handle cancel/uncancel action
//   const handleCancel = () => {
//     setIsCanceled((prev) => !prev);
//   };

//   // Handle delete action
//   const handleDelete = () => {
//     setIsDeleting(true); // Trigger fade-out animation
//     setTimeout(() => {
//       onDeleteEvent(event.id); // Delete the event after animation completes
//     }, 300); // Match the duration of the CSS transition
//   };

//   // Handle undelete action
//   const handleUndelete = () => {
//     onUndeleteEvent(event.id); // Restore the event
//   };

//   return (
//     <div
//       className={`booking-item ${isCanceled ? 'canceled' : ''} ${isDeleting ? 'fade-out' : ''}`}
//       style={{ borderColor: theme.primary }}
//     >
//       {/* Icons in the top-right corner */}
//       <div className="action-icons">
//         {isDeleted ? (
//           <div className="icon-container" onClick={handleUndelete} title="Undelete Appointment">
//             <FaUndo className="undelete-icon" />
//           </div>
//         ) : (
//           <>
//             <div className="icon-container" onClick={handleCancel} title={isCanceled ? "Mark Active" : "Mark Canceled"}>
//               <FaBan className="cancel-icon" />
//             </div>
//             <div className="icon-container" onClick={handleDelete} title="Delete Appointment">
//               <FaTimes className="delete-icon" />
//             </div>
//           </>
//         )}
//       </div>

//       {/* CANCELED Text */}
//       {isCanceled && (
//         <div className="canceled-text">CANCELED</div>
//       )}

//       {/* Event Date */}
//       <div className="event-date">
//         {eventDate}
//       </div>

//       <div className="booking-item-header">
//         <h4>{event.extendedProps.service}</h4>
//         <p className="booking-time">{timeRange}</p>
//       </div>
//       <div className="booking-item-details">
//         <div className="detail-row">
//           <span className="detail-label">Customer:</span>
//           <span className="detail-value">{event.extendedProps.customer}</span>
//         </div>
//         <div className="detail-row">
//           <span className="detail-label">Barber:</span>
//           <span className="detail-value">{event.extendedProps.barber}</span>
//         </div>
//         <div className="detail-row">
//           <span className="detail-label">Price:</span>
//           <span className="detail-value">${event.extendedProps.price}</span>
//         </div>
//         {event.extendedProps.notes !== 'no comment' && (
//           <div className="detail-row">
//             <span className="detail-label">Notes:</span>
//             <span className="detail-value">{event.extendedProps.notes}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BottomSheetCard;
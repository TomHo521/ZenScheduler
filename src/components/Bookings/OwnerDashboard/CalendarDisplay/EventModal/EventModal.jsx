import React, { useState } from 'react';
import { FaBan, FaTimes } from 'react-icons/fa'; // Icons for cancel and delete
import './EventModal.css';

const EventModal = ({ event, theme, onClose, onDeleteEvent }) => {
  const [isCanceled, setIsCanceled] = useState(false); // State for canceling the event

  if (!event) return null;

  // Format time and date
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
    onDeleteEvent(event.id); // Notify parent to delete the event
    onClose(); // Close the modal after deletion
  };

  return (
    <>
      {/* Overlay */}
      <div className="event-modal-overlay" onClick={onClose} />

      {/* Modal */}
      <div className="event-modal" style={{ backgroundColor: theme.card.background, color: theme.text }}>
        <div className="modal-header">
          <h3>Event Details</h3>
          <button className="close-button" onClick={onClose} style={{ color: theme.text }}>
            ×
          </button>
        </div>
        <div className="modal-content">
          {/* Icons for cancel and delete */}
          <div className="action-icons">
            <div className="icon-container" onClick={handleCancel} title={isCanceled ? "Mark Active" : "Mark Canceled"}>
              <FaBan className="cancel-icon" />
            </div>
            <div className="icon-container" onClick={handleDelete} title="Delete Appointment">
              <FaTimes className="delete-icon" />
            </div>
          </div>

          {/* CANCELED Text */}
          {isCanceled && (
            <div className="canceled-text">CANCELED</div>
          )}

          {/* Event Date */}
          <div className="event-date">{eventDate}</div>

          {/* Event Details */}
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
      </div>
    </>
  );
};

export default EventModal;
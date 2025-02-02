import React, { useState } from 'react';
import { FaBan, FaTimes } from 'react-icons/fa'; // Icons for cancel and delete
import './EventCard.css';

const EventCard = ({ event, theme, onDeleteEvent }) => {
  const [isCanceled, setIsCanceled] = useState(false); // State for canceling the event
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation prompt

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
    setShowDeleteConfirmation(true); // Show the confirmation prompt
  };

  // Confirm deletion
  const confirmDelete = () => {
    onDeleteEvent(event.id); // Notify parent to delete the event
    setShowDeleteConfirmation(false); // Close the confirmation prompt
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteConfirmation(false); // Hide the confirmation prompt
  };

  return (
    <div className="event-card" style={{ backgroundColor: theme.card.background, boxShadow: theme.card.shadow }}>
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

      {/* Delete Confirmation Prompt */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal" style={{ backgroundColor: theme.card.background, color: theme.text }}>
            <p>Are you sure you want to delete this appointment?</p>
            <div className="confirmation-buttons">
              <button onClick={confirmDelete} style={{ backgroundColor: theme.primary, color: theme.text }}>
                Yes, Delete
              </button>
              <button onClick={cancelDelete} style={{ backgroundColor: theme.secondary, color: theme.text }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
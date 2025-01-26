import React from 'react';
import { FaUndo } from 'react-icons/fa';
import './DeletedEventCard.css';

const DeletedEventCard = ({ event, theme, onUndeleteEvent }) => {
  // Format time and date
  const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTime = new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timeRange = `${startTime} - ${endTime}`;
  const eventDate = new Date(event.start).toLocaleDateString();

  return (
    <div className="deleted-event-card" style={{ borderColor: theme.primary }}>
      {/* Undelete Button */}
      <div className="action-icons">
        <div className="icon-container" onClick={() => onUndeleteEvent(event.id)} title="Undelete Appointment">
          <FaUndo className="undelete-icon" />
        </div>
      </div>

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
  );
};

export default DeletedEventCard;
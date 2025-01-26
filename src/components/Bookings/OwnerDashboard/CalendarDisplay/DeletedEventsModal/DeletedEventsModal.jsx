import React from 'react';
import './DeletedEventsModal.css';
import DeletedEventCard from './DeletedEventCard/DeletedEventCard'; // Corrected import path

const DeletedEventsModal = ({ isOpen, onClose, deletedEvents, theme, onUndeleteEvent }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="deleted-events-overlay" onClick={onClose} />

      {/* Modal */}
      <div className="deleted-events-modal" style={{ backgroundColor: theme.card.background, color: theme.text }}>
        <div className="modal-header">
          <h3>Deleted Events</h3>
          <button className="close-button" onClick={onClose} style={{ color: theme.text }}>
            ×
          </button>
        </div>
        <div className="modal-content">
          {deletedEvents.length > 0 ? (
            deletedEvents.map((event) => (
              <DeletedEventCard
                key={event.id}
                event={event}
                theme={theme}
                onUndeleteEvent={onUndeleteEvent}
              />
            ))
          ) : (
            <p>No deleted events.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DeletedEventsModal;
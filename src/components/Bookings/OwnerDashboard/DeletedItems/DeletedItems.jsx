import React from 'react';
import BottomSheetCard from '../BottomSheet/BottomSheetCard';
import './DeletedItems.css';

const DeletedItems = ({ deletedEvents, onUndeleteEvent, theme }) => {
  return (
    <div className="deleted-items-container">
      <h3>Deleted Items</h3>
      <div className="deleted-items-list">
        {Object.keys(deletedEvents).map((eventId) => (
          <BottomSheetCard
            key={eventId}
            event={deletedEvents[eventId]}
            theme={theme}
            onUndeleteEvent={onUndeleteEvent}
            isDeleted={true}
          />
        ))}
      </div>
    </div>
  );
};

export default DeletedItems;
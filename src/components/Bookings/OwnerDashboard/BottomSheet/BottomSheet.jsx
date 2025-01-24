import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import './BottomSheet.css';

const BottomSheet = ({ isOpen, onClose, bookings, theme }) => {
  const bottomSheetRef = useRef(null);

  // Bottom sheet animation
  const [{ y }, api] = useSpring(() => ({ y: window.innerHeight }));

  // Open/close bottom sheet
  useEffect(() => {
    if (isOpen) {
      api.start({ y: 0, immediate: false });
    } else {
      api.start({ y: window.innerHeight, immediate: false });
    }
  }, [isOpen, api]);

  // Drag gesture for the bottom sheet
  const bind = useDrag(({ down, movement: [, my] }) => {
    if (down) {
      api.start({ y: my, immediate: true });
    } else {
      if (my > 100) {
        onClose();
      } else {
        api.start({ y: 0, immediate: false });
      }
    }
  });

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bottomSheetRef.current && !bottomSheetRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={onClose} />

      {/* Bottom Sheet */}
      <animated.div
        ref={bottomSheetRef}
        className="bottom-sheet"
        style={{
          y,
          backgroundColor: theme.card.background,
          color: theme.text,
          borderColor: theme.primary,
        }}
        {...bind()}
      >
        <div className="bottom-sheet-header">
          <h3 style={{ color: theme.primary }}>Bookings for Selected Day</h3>
          <button
            onClick={onClose}
            style={{ backgroundColor: theme.button.background, color: theme.button.text }}
          >
            Close
          </button>
        </div>
        <div className="bottom-sheet-content">
          {bookings.length > 0 ? (
            bookings.map((event) => (
              <div key={event.extendedProps.id} className="booking-item" style={{ borderColor: theme.primary }}>
                <p><strong>Customer:</strong> {event.extendedProps.customer}</p>
                <p><strong>Time:</strong> {event.title.split(' - ')[1]}</p>
                <p><strong>Barber:</strong> {event.extendedProps.barber}</p>
              </div>
            ))
          ) : (
            <p>No bookings for this day.</p>
          )}
        </div>
      </animated.div>
    </>
  );
};

export default BottomSheet;
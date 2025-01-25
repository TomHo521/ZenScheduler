import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import BottomSheetCard from './BottomSheetCard'; // Import the card component
import './BottomSheet.css';

const BottomSheet = ({ isOpen, onClose, bookings, theme, onDeleteEvent }) => {
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
        {/* Close Button (X Icon) */}
        <button
          className="close-button"
          onClick={onClose}
          style={{ color: theme.text }}
        >
          ×
        </button>

        <div className="bottom-sheet-header">
          <h3 style={{ color: theme.primary }}>
            {bookings.length === 1 ? 'Event Details' : 'Bookings for Selected Day'}
          </h3>
        </div>
        <div className="bottom-sheet-content">
          {bookings.length > 0 ? (
            bookings.map((event) => (
              <BottomSheetCard
                key={event.id}
                event={event}
                theme={theme}
                onDeleteEvent={onDeleteEvent} // Pass delete handler
              />
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

// import React, { useEffect, useRef } from 'react';
// import { useSpring, animated } from 'react-spring';
// import { useDrag } from '@use-gesture/react';
// import BottomSheetCard from './BottomSheetCard'; // Import the card component
// import './BottomSheet.css';

// const BottomSheet = ({ isOpen, onClose, bookings, theme, onDeleteEvent }) => {
//   const bottomSheetRef = useRef(null);

//   // Bottom sheet animation
//   const [{ y }, api] = useSpring(() => ({ y: window.innerHeight }));

//   // Open/close bottom sheet
//   useEffect(() => {
//     if (isOpen) {
//       api.start({ y: 0, immediate: false });
//     } else {
//       api.start({ y: window.innerHeight, immediate: false });
//     }
//   }, [isOpen, api]);

//   // Drag gesture for the bottom sheet
//   const bind = useDrag(({ down, movement: [, my] }) => {
//     if (down) {
//       api.start({ y: my, immediate: true });
//     } else {
//       if (my > 100) {
//         onClose();
//       } else {
//         api.start({ y: 0, immediate: false });
//       }
//     }
//   });

//   // Click outside to close
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (bottomSheetRef.current && !bottomSheetRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div className="overlay" onClick={onClose} />

//       {/* Bottom Sheet */}
//       <animated.div
//         ref={bottomSheetRef}
//         className="bottom-sheet"
//         style={{
//           y,
//           backgroundColor: theme.card.background,
//           color: theme.text,
//           borderColor: theme.primary,
//         }}
//         {...bind()}
//       >
//         {/* Close Button (X Icon) */}
//         <button
//           className="close-button"
//           onClick={onClose}
//           style={{ color: theme.text }}
//         >
//           ×
//         </button>

//         <div className="bottom-sheet-header">
//           <h3 style={{ color: theme.primary }}>
//             {bookings.length === 1 ? 'Event Details' : 'Bookings for Selected Day'}
//           </h3>
//         </div>
//         <div className="bottom-sheet-content">
//           {bookings.length > 0 ? (
//             bookings.map((event) => (
//               <BottomSheetCard
//                 key={event.extendedProps.id}
//                 event={event}
//                 theme={theme}
//                 onDeleteEvent={onDeleteEvent} // Pass delete handler
//               />
//             ))
//           ) : (
//             <p>No bookings for this day.</p>
//           )}
//         </div>
//       </animated.div>
//     </>
//   );
// };

// export default BottomSheet;

// import React, { useEffect, useRef } from 'react';
// import { useSpring, animated } from 'react-spring';
// import { useDrag } from '@use-gesture/react';
// import BottomSheetCard from './BottomSheetCard'; // Import the new component
// import './BottomSheet.css';

// const BottomSheet = ({ isOpen, onClose, bookings, theme }) => {
//   const bottomSheetRef = useRef(null);

//   // Bottom sheet animation
//   const [{ y }, api] = useSpring(() => ({ y: window.innerHeight }));

//   // Open/close bottom sheet
//   useEffect(() => {
//     if (isOpen) {
//       api.start({ y: 0, immediate: false });
//     } else {
//       api.start({ y: window.innerHeight, immediate: false });
//     }
//   }, [isOpen, api]);

//   // Drag gesture for the bottom sheet
//   const bind = useDrag(({ down, movement: [, my] }) => {
//     if (down) {
//       api.start({ y: my, immediate: true });
//     } else {
//       if (my > 100) {
//         onClose();
//       } else {
//         api.start({ y: 0, immediate: false });
//       }
//     }
//   });

//   // Click outside to close
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (bottomSheetRef.current && !bottomSheetRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div className="overlay" onClick={onClose} />

//       {/* Bottom Sheet */}
//       <animated.div
//         ref={bottomSheetRef}
//         className="bottom-sheet"
//         style={{
//           y,
//           backgroundColor: theme.card.background,
//           color: theme.text,
//           borderColor: theme.primary,
//         }}
//         {...bind()}
//       >
//         {/* Close Button (X Icon) */}
//         <button
//           className="close-button"
//           onClick={onClose}
//           style={{ color: theme.text }}
//         >
//           ×
//         </button>

//         <div className="bottom-sheet-header">
//           <h3 style={{ color: theme.primary }}>
//             {bookings.length === 1 ? 'Event Details' : 'Bookings for Selected Day'}
//           </h3>
//         </div>
//         <div className="bottom-sheet-content">
//           {bookings.length > 0 ? (
//             bookings.map((event) => (
//               <BottomSheetCard
//                 key={event.extendedProps.id}
//                 event={event}
//                 theme={theme}
//               />
//             ))
//           ) : (
//             <p>No bookings for this day.</p>
//           )}
//         </div>
//       </animated.div>
//     </>
//   );
// };

// export default BottomSheet;

// import React, { useEffect, useRef } from 'react';
// import { useSpring, animated } from 'react-spring';
// import { useDrag } from '@use-gesture/react';
// import BottomSheetCard from './BottomSheetCard'; // Import the new component
// import './BottomSheet.css';

// const BottomSheet = ({ isOpen, onClose, bookings, theme }) => {
//   const bottomSheetRef = useRef(null);

//   // Bottom sheet animation
//   const [{ y }, api] = useSpring(() => ({ y: window.innerHeight }));

//   // Open/close bottom sheet
//   useEffect(() => {
//     if (isOpen) {
//       api.start({ y: 0, immediate: false });
//     } else {
//       api.start({ y: window.innerHeight, immediate: false });
//     }
//   }, [isOpen, api]);

//   // Drag gesture for the bottom sheet
//   const bind = useDrag(({ down, movement: [, my] }) => {
//     if (down) {
//       api.start({ y: my, immediate: true });
//     } else {
//       if (my > 100) {
//         onClose();
//       } else {
//         api.start({ y: 0, immediate: false });
//       }
//     }
//   });

//   // Click outside to close
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (bottomSheetRef.current && !bottomSheetRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div className="overlay" onClick={onClose} />

//       {/* Bottom Sheet */}
//       <animated.div
//         ref={bottomSheetRef}
//         className="bottom-sheet"
//         style={{
//           y,
//           backgroundColor: theme.card.background,
//           color: theme.text,
//           borderColor: theme.primary,
//         }}
//         {...bind()}
//       >
//         {/* Close Button (X Icon) */}
//         <button
//           className="close-button"
//           onClick={onClose}
//           style={{ color: theme.text }}
//         >
//           ×
//         </button>

//         <div className="bottom-sheet-header">
//           <h3 style={{ color: theme.primary }}>Bookings for Selected Day</h3>
//         </div>
//         <div className="bottom-sheet-content">
//           {bookings.length > 0 ? (
//             bookings.map((event) => (
//               <BottomSheetCard
//                 key={event.extendedProps.id}
//                 event={event}
//                 theme={theme}
//               />
//             ))
//           ) : (
//             <p>No bookings for this day.</p>
//           )}
//         </div>
//       </animated.div>
//     </>
//   );
// };

// export default BottomSheet;
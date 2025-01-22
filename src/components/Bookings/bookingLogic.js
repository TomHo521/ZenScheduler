// Utility functions for booking logic

/**
 * Finds the next available booking slot.
 * @param {Array} bookings - The current list of bookings.
 * @param {number} duration - The duration of the booking in minutes.
 * @returns {Object} - The next available slot (start and end time).
 */
export const findNextAvailableSlot = (bookings, duration) => {
    // Sort bookings by start time
    const sortedBookings = [...bookings].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  
    // Add your segment tree logic here to find the next available slot
    // For now, this is a placeholder implementation
    let nextAvailableStart = new Date();
    if (sortedBookings.length > 0) {
      const lastBookingEnd = new Date(sortedBookings[sortedBookings.length - 1].endTime);
      nextAvailableStart = new Date(lastBookingEnd.getTime() + 30 * 60000); // Add 30 minutes after the last booking
    }
  
    const nextAvailableEnd = new Date(nextAvailableStart.getTime() + duration * 60000);
  
    return {
      startTime: nextAvailableStart.toISOString(),
      endTime: nextAvailableEnd.toISOString(),
    };
  };
  
  /**
   * Checks if a selected time is available.
   * @param {Array} bookings - The current list of bookings.
   * @param {string} selectedTime - The selected time in "HH:MM" format.
   * @param {number} duration - The duration of the booking in minutes.
   * @returns {boolean} - True if the time is available, false otherwise.
   */
  export const isTimeAvailable = (bookings, selectedTime, duration) => {
    const selectedDateTime = new Date(`2023-10-01T${selectedTime}:00`);
    const selectedEndTime = new Date(selectedDateTime.getTime() + duration * 60000);
  
    for (const booking of bookings) {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
  
      if (
        (selectedDateTime >= bookingStart && selectedDateTime < bookingEnd) ||
        (selectedEndTime > bookingStart && selectedEndTime <= bookingEnd)
      ) {
        return false; // Conflict found
      }
    }
    return true; // No conflict
  };
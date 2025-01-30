import SegmentTree from './SegmentTree.js';

class kBooking {
    constructor(k) {
      // [0,k] bookings allowed
      this.k = k;
      const currentYear = new Date().getFullYear();
      const isLeapYear = (currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0));
      
      // Initialize segment trees based on whether it's a leap year
      this.segmentTrees = Array(isLeapYear ? 366 : 365).fill(null); 
    }
  
    // Method to get the day of the year (0-indexed)
    getDayOfYear(date) {
        const startOfYear = new Date(date.getFullYear(), 0, 1); // January 1st of the same year
        const diffInMs = date - startOfYear;
        const dayOfYear = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert ms to days
        if (dayOfYear >= (new Date(date.getFullYear(), 11, 31).getDate() === 366 ? 366 : 365)) {
            throw new Error("Invalid date for this year"); // Guard for leap year issue
        }
        return dayOfYear;
    }
  
    // Method to get the segment tree root for a specific day
    getDayRoot(date) {
      const index = this.getDayOfYear(date); // Get the day index (0-indexed)
      
      if (!this.segmentTrees[index]) {
        this.segmentTrees[index] = new SegmentTree(0); // Initialize tree with granularity (e.g., 15 min intervals)
      }
      return this.segmentTrees[index];
    }

    // Convert time to SegmentTree range (index of 15-min intervals)
    timeToRange(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Only handle times between 6 AM and 6 PM
        const MIN_HOUR = 6; // 6 AM
        const MAX_HOUR = 18; // 6 PM
        
        if (hours < MIN_HOUR || hours >= MAX_HOUR) {
        throw new Error("Time must be between 6 AM and 6 PM");
        }
    
        // Calculate the interval index
        const totalMinutes = (hours - MIN_HOUR) * 60 + minutes; // Minutes since 6 AM
        const intervalIndex = Math.floor(totalMinutes / 15); // Each interval is 15 minutes
        
        return intervalIndex; // Returns a number between 0 and 47
    }

    // Convert a booking time to a SegmentTree range
    getSegmentTreeRange(startDate, endDate) {
        const startInterval = this.timeToRange(startDate);
        const endInterval = this.timeToRange(endDate);
        
        if (startInterval > endInterval) {
        throw new Error("Start time cannot be after end time");
        }
    
        return { left: startInterval, right: endInterval };
    }
  
    // Query method
    kbookingQuery(startTime, endTime) {
        const tree = this.getDayRoot(startTime);
        const [left, right] = this.getSegmentTreeRange(startTime, endTime);
        return tree.query(left, right);
    }

    // Update method
    kbookingUpdate(startTime, endTime, value = 1) {
        //startTime, endTime guaranteed to be same day.
        const tree = this.getDayRoot(startTime);
        const [left, right] = this.getSegmentTreeRange(startTime, endTime);
        // can only book one person at a time
        tree.update(left, right, value);
    }

    checkIfAvailable(startTime, endTime) {
        const maxBooked = this.kbookingQuery(startTime, endTime);
        return maxBooked < this.k; // Consistent with k-bound logic
    }
    
    bookIfAvailable(startTime, endTime) {
        if (!this.checkIfAvailable(startTime, endTime)) {
            return false;
        }
        this.kbookingUpdate(startTime, endTime, 1);
        return true;
    }

    async rebuildSegmentTreeForDay(date) {
        const dayOfYear = this.getDayOfYear(date);
        const tree = this.getDayRoot(date);

        // Rebuild logic for the segment tree goes here
        // Fetch booking data from API and update the segment tree accordingly

        try {
            const bookings = await this.fetchBookingsFromAPI(date);  // Replace with your actual API call
            bookings.forEach(booking => {
                const { startTime, endTime } = booking;
                const [left, right] = this.getSegmentTreeRange(startTime, endTime);
                tree.update(left, right, 1);  // Update tree with the booking
            });
        } catch (error) {
            console.error("Error rebuilding segment tree:", error);
        }
    }
    
    async rebuildSegmentTreeForMonth(year, month) {
        const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month
    
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day); // Create a date object
            await this.rebuildSegmentTreeForDay(date); // Rebuild for each day
        }
    }
    
    async rebuildSegmentTreeForYear(year) {
        for (let month = 1; month <= 12; month++) {
            await this.rebuildSegmentTreeForMonth(year, month); // Rebuild for each month
        }
    }
    
}

export default kBooking;

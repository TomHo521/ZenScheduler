import pool from '../config/db.js'; // Assuming you have a db.js file that exports the pool for database connection

// Fetch all bookings from the database
export const getAllBookings = async () => {
  const query = 'SELECT * FROM bookings ORDER BY bookings_id DESC';
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching bookings from database: ' + err.message);
  }
};

// Insert a new booking into the database
export const insertBooking = async (bookingData) => {
  const { name, timeRange, startTime, endTime, workerID, workerName, customerID, customerName, service, price, notes } = bookingData;

  // Insert the booking into the database (excluding bookings_id as it will auto-increment)
  const query = `
    INSERT INTO bookings 
      (booking_name, time_range, start_time, end_time, worker_id, worker_name, customer_id, customer_name, booking_service, price, notes)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING bookings_id;
  `;

  try {
    const result = await pool.query(query, [
      name, timeRange, startTime, endTime, 
      workerID, workerName, customerID, customerName, 
      service, price, notes
    ]);
    // Return the new booking ID along with the rest of the data
    return { id: result.rows[0].bookings_id, ...bookingData };
  } catch (err) {
    throw new Error('Error inserting booking into database: ' + err.message);
  }
};


// import pool from '../config/db.js';

// // Fetch all bookings
// export const getAllBookings = async () => {
//   const result = await pool.query('SELECT * FROM bookings');
//   return result.rows;
// };

// // Insert a new booking
// export const insertBooking = async (bookingData) => {
//   const {
//     id,
//     name,
//     timeRange,
//     startTime,
//     endTime,
//     workerID,
//     workerName,
//     customerID,
//     customerName,
//     service,
//     price,
//     notes
//   } = bookingData;

//   const result = await pool.query(
//     `INSERT INTO bookings (
//       bookings_id, booking_name, time_range, start_time, end_time,
//       worker_id, worker_name, customer_id, customer_name,
//       booking_service, price, notes
//     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
//     RETURNING *`,
//     [id, name, timeRange, startTime, endTime, workerID, workerName, customerID, customerName, service, price, notes]
//   );

//   return result.rows[0];
// };

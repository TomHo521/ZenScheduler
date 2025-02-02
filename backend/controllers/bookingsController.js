import { getAllBookings, insertBooking } from '../models/bookingsModel.js';

// Handle GET /api/bookings
export const fetchBookings = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const newBooking = await insertBooking(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

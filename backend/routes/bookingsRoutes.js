import express from 'express';
import { fetchBookings, createBooking } from '../controllers/bookingsController.js';

const router = express.Router();

router.get('/bookings', fetchBookings);
router.post('/bookings', createBooking);

export default router;

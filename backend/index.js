import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url'; // Needed to resolve __dirname in ES modules
import formRoutes from './routes/formRoutes.js';
import { initialBookings } from './bookingsData.js'; // Import bookings data
import { barbers } from './barberData.js'; // Import barbers data
import kBooking from './utils/kBooking.js';


const kBookingSystem = new kBooking(3);  

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/forms', formRoutes);

// GET endpoint for bookings
app.get('/api/bookings', (req, res) => {
  res.json(initialBookings);
});

// GET endpoint for barbers
app.get('/api/barbers', (req, res) => {
  res.json(barbers);
});

// POST endpoint for booking submissions
app.post('/api/bookings', (req, res) => {
  const { userName, barberName, date, time } = req.body;

  if (!userName || !barberName || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // Create a new booking object
  const newBooking = {
    id: initialBookings.length + 1, // Generate a new ID
    name: barberName,
    timeRange: time,
    startTime: `${date}T${time.split(' - ')[0]}:00`, // Convert time to ISO format
    endTime: `${date}T${time.split(' - ')[1].replace(' AM', '').replace(' PM', '')}:00`, // Convert time to ISO format
    userName, // Include the user's name or ID
  };

  // Add the new booking to the dummy data
  initialBookings.push(newBooking);

  // Respond with the new booking
  res.status(201).json(newBooking);
});

// Serve static files from the dist directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

// Handle SPA fallback: serve index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Initialize with a booking limit, for example 3.
app.get('/rebuildSegmentTree', async (req, res) => {
    const dateParam = req.query.date; // Date string as a query param (e.g., '2025-01-28')

    if (!dateParam) {
        return res.status(400).send('Date parameter is required.');
    }

    try {
        const date = new Date(dateParam);
        // Ensure the date is valid
        if (isNaN(date)) {
            return res.status(400).send('Invalid date format.');
        }

        // Rebuild the segment tree for the given date
        await kBookingSystem.rebuildSegmentTreeForDay(date);

        return res.status(200).send(`Segment Tree rebuilt successfully for ${date.toISOString().split('T')[0]}.`);
    } catch (error) {
        console.error('Error rebuilding segment tree:', error);
        return res.status(500).send('Internal server error.');
    }
});

// Simulate fetching bookings from a database for a specific day
async function getBookingsForDate(date) {
    // Simulating booking records for the date
    // Replace this with your actual DB query logic to get bookings for that day
    return [
        { startTime: new Date(date.setHours(6, 0, 0, 0)), endTime: new Date(date.setHours(6, 30, 0, 0)) },
        { startTime: new Date(date.setHours(7, 0, 0, 0)), endTime: new Date(date.setHours(7, 30, 0, 0)) },
        // Add more bookings as needed
    ];
}

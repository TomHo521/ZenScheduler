
INSERT INTO bookings (
    bookings_id, booking_name, time_range, start_time, end_time,
    worker_id, worker_name, customer_id, customer_name,
    booking_service, price, notes
)
VALUES
    (3001, 'Barber D', '02:15 PM - 03:45 PM', '2025-01-21T14:15:00', '2025-01-21T15:45:00', 113, 'Barber B', 298, 'Alice Johnson', 'haircut', 30, 'needs extra time'),
    (3002, 'Barber E', '07:45 PM - 09:00 PM', '2025-01-16T19:45:00', '2025-01-16T21:00:00', 119, 'Barber B', 292, 'Emily Wilson', 'hair coloring', 20, 'prefers a quiet session'),
    (3003, 'Barber C', '09:45 AM - 11:45 AM', '2025-01-09T09:45:00', '2025-01-09T11:45:00', 190, 'Barber E', 249, 'Alice Johnson', 'deep conditioning', 81, 'wants a messy look'),
    (3004, 'Barber A', '07:45 AM - 09:45 AM', '2025-01-09T07:45:00', '2025-01-09T09:45:00', 113, 'Barber D', 230, 'Alice Johnson', 'hair coloring', 94, 'wants a messy look'),
    (3005, 'Barber C', '12:00 PM - 12:30 PM', '2025-01-14T12:00:00', '2025-01-14T12:30:00', 152, 'Barber D', 285, 'Bob Williams', 'hair wash', 85, 'needs extra time'),
    (3006, 'Barber D', '09:15 AM - 11:15 AM', '2025-01-16T09:15:00', '2025-01-16T11:15:00', 194, 'Barber D', 245, 'Emily Wilson', 'hair coloring', 44, 'prefers a quiet session'),
    (3007, 'Barber D', '03:00 PM - 03:30 PM', '2025-01-10T15:00:00', '2025-01-10T15:30:00', 129, 'Barber A', 252, 'Sarah Davis', 'deep conditioning', 31, 'prefers a quiet session'),
    (3008, 'Barber A', '06:45 AM - 08:45 AM', '2025-01-07T06:45:00', '2025-01-07T08:45:00', 126, 'Barber E', 236, 'Alice Johnson', 'haircut', 45, 'prefers a quiet session'),
    (3009, 'Barber C', '09:30 AM - 10:30 AM', '2025-01-16T09:30:00', '2025-01-16T10:30:00', 156, 'Barber C', 249, 'Sarah Davis', 'hair coloring', 98, 'prefers a quiet session'),
    (3010, 'Barber A', '07:15 PM - 08:30 PM', '2025-01-03T19:15:00', '2025-01-03T20:30:00', 154, 'Barber C', 259, 'Alice Johnson', 'hair coloring', 91, 'wants a messy look'),
    (3011, 'Barber B', '11:00 AM - 11:45 AM', '2025-01-29T11:00:00', '2025-01-29T11:45:00', 161, 'Barber E', 284, 'Sarah Davis', 'haircut', 64, 'prefers a quiet session'),
    (3012, 'Barber C', '06:45 AM - 07:45 AM', '2025-01-18T06:45:00', '2025-01-18T07:45:00', 138, 'Barber D', 210, 'Emily Wilson', 'hair coloring', 61, 'wants a messy look'),
    (3013, 'Barber D', '01:15 PM - 02:15 PM', '2025-02-16T13:15:00', '2025-02-16T14:15:00', 177, 'Barber A', 283, 'Bob Williams', 'deep conditioning', 84, 'needs extra time'),
    (3014, 'Barber C', '07:45 PM - 09:45 PM', '2025-02-27T19:45:00', '2025-02-27T21:45:00', 132, 'Barber D', 241, 'Bob Williams', 'haircut', 26, 'wants a messy look'),
    (3015, 'Barber D', '07:00 PM - 08:15 PM', '2025-02-17T19:00:00', '2025-02-17T20:15:00', 198, 'Barber B', 233, 'Sarah Davis', 'hair wash', 71, 'wants a messy look'),
    (3016, 'Barber A', '02:30 PM - 04:15 PM', '2025-02-15T14:30:00', '2025-02-15T16:15:00', 118, 'Barber A', 293, 'Emily Wilson', 'hair coloring', 57, 'prefers a quiet session'),
    (3017, 'Barber E', '11:00 AM - 12:45 PM', '2025-02-16T11:00:00', '2025-02-16T12:45:00', 138, 'Barber B', 249, 'John Smith', 'haircut', 49, 'prefers a quiet session'),
    (3018, 'Barber C', '02:15 PM - 03:45 PM', '2025-02-05T14:15:00', '2025-02-05T15:45:00', 167, 'Barber B', 288, 'John Smith', 'hair coloring', 37, 'needs extra time'),
    (3019, 'Barber B', '01:45 PM - 03:30 PM', '2025-02-06T13:45:00', '2025-02-06T15:30:00', 150, 'Barber A', 296, 'Bob Williams', 'hair coloring', 20, 'needs extra time'),
    (3020, 'Barber A', '07:00 PM - 08:00 PM', '2025-02-16T19:00:00', '2025-02-16T20:00:00', 100, 'Barber D', 287, 'Emily Wilson', 'haircut', 23, 'wants a messy look'),
    (3021, 'Barber C', '03:30 PM - 04:30 PM', '2025-02-07T15:30:00', '2025-02-07T16:30:00', 191, 'Barber E', 224, 'Emily Wilson', 'haircut', 39, 'needs extra time'),
    (3022, 'Barber A', '04:45 PM - 06:45 PM', '2025-02-01T16:45:00', '2025-02-01T18:45:00', 128, 'Barber C', 273, 'Emily Wilson', 'hair coloring', 35, 'prefers a quiet session'),
    (3023, 'Barber A', '06:45 AM - 08:30 AM', '2025-02-19T06:45:00', '2025-02-19T08:30:00', 103, 'Barber B', 262, 'Bob Williams', 'haircut', 36, 'prefers a quiet session'),
    (3024, 'Barber E', '05:15 PM - 07:15 PM', '2025-02-12T17:15:00', '2025-02-12T19:15:00', 187, 'Barber D', 222, 'Emily Wilson', 'hair coloring', 77, 'prefers a quiet session');

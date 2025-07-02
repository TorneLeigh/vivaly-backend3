import express from 'express';

const router = express.Router();

// In-memory bookings store (replace with real DB in production)
let bookings: any[] = [];

// Create a new booking
router.post('/', (req, res) => {
  const booking = { id: Date.now().toString(), ...req.body };
  bookings.push(booking);
  res.json(booking);
});

// Get all bookings
router.get('/', (_req, res) => {
  res.json(bookings);
});

// Get a booking by ID
router.get('/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
});

export default router;

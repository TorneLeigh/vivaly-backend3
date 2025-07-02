import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import messageRoutes from './routes/messageRoutes';
import bookingRoutes from './routes/bookingRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookings', bookingRoutes);

// Root route for health check
app.get('/', (_req, res) => {
  res.send('Vivaly backend working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Vivaly backend running on port ${PORT}`);
});

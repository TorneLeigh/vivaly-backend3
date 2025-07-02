import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Placeholder route (replace with real routes later)
app.get('/', (_req, res) => {
  res.send('Vivaly backend working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Vivaly backend running on port ${PORT}`);
});

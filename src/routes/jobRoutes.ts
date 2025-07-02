import express from 'express';

const router = express.Router();

// In-memory job posts (replace with real DB in production)
let jobs: any[] = [];

// Create a new job
router.post('/', (req, res) => {
  const job = { id: Date.now().toString(), ...req.body };
  jobs.push(job);
  res.json(job);
});

// Get all jobs
router.get('/', (_req, res) => {
  res.json(jobs);
});

// Get a single job
router.get('/:id', (req, res) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

export default router;

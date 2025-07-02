import express from 'express';

const router = express.Router();

// In-memory messages store (replace with real DB in production)
let messages: any[] = [];

// Send a message
router.post('/', (req, res) => {
  const message = { id: Date.now().toString(), ...req.body, timestamp: new Date() };
  messages.push(message);
  res.json(message);
});

// Get all messages between two users
router.get('/:user1/:user2', (req, res) => {
  const { user1, user2 } = req.params;
  const filtered = messages.filter(
    m =>
      (m.from === user1 && m.to === user2) ||
      (m.from === user2 && m.to === user1)
  );
  res.json(filtered);
});

export default router;

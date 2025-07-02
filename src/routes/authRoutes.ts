import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Fake in-memory users store (replace with real DB in production)
const users: any[] = [];

// Register endpoint
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword, role });
  res.json({ message: 'Registered successfully' });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET || 'somethingSecret',
    { expiresIn: '24h' }
  );
  res.json({ token, role: user.role });
});

export default router;

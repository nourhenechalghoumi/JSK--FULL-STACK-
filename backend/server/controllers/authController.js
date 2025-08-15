// authController.js
import jwt from 'jsonwebtoken';
import { db } from '../database/db.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, role',
      [name, email, hashedPassword, 'user']
    );

    const token = jwt.sign(
      { id: result.rows[0].id, email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: result.rows[0].id, name, email, role: 'user' }
    });

  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // duplicate email
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const userQuery = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = userQuery.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// Middleware to authenticate JWT
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};



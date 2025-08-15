import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { db } from './database/db.js'; // <- use db, not initDatabase

// Import routes
import authRoutes from './routes/auth.js';
import teamsRoutes from './routes/teams.js';
import eventsRoutes from './routes/events.js';
import sponsorsRoutes from './routes/sponsors.js';
import staffRoutes from './routes/staff.js';
import leadershipRoutes from './routes/leadership.js';
import applicationsRoutes from './routes/applications.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',

  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/sponsors', sponsorsRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/leadership', leadershipRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Test DB connection and start server
db.query('SELECT NOW()')
  .then(res => console.log('PostgreSQL connected at', res.rows[0].now))
  .catch(err => console.error('DB connection error', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

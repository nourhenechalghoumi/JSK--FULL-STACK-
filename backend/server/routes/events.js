import express from 'express';
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../controllers/eventsController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', authenticateToken, requireRole(['admin', 'manager']), createEvent);
router.put('/:id', authenticateToken, requireRole(['admin', 'manager']), updateEvent);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteEvent);

export default router;

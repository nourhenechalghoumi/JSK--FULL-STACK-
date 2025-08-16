import express from 'express';
import { getTeams, getTeam, createTeam, updateTeam, deleteTeam, getGameTypes } from '../controllers/teamsController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTeams);
router.get('/game-types', getGameTypes);
router.get('/:id', getTeam);
router.post('/', authenticateToken, requireRole(['admin', 'manager']), createTeam);
router.put('/:id', authenticateToken, requireRole(['admin', 'manager']), updateTeam);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteTeam);

export default router;
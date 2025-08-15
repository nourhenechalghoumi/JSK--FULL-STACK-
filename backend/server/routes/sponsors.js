import express from 'express';
import { getSponsors, createSponsor, updateSponsor, deleteSponsor } from '../controllers/sponsorsController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSponsors);
router.post('/', authenticateToken, requireRole(['admin']), createSponsor);
router.put('/:id', authenticateToken, requireRole(['admin']), updateSponsor);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteSponsor);

export default router;

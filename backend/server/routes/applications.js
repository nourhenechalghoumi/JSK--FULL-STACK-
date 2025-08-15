import express from 'express';
import { 
  getApplications, 
  createApplication, 
  updateApplicationStatus, 
  deleteApplication, 
  upload 
} from '../controllers/applicationsController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, requireRole(['admin', 'manager']), getApplications);
router.post('/', upload.single('cv'), createApplication);
router.put('/:id/status', authenticateToken, requireRole(['admin', 'manager']), updateApplicationStatus);
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteApplication);

export default router;

// hiringApplicationsController.js
import { db } from '../database/db.js';
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'cv-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const getApplications = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM hiring_applications ORDER BY date_submitted DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

export const createApplication = async (req, res) => {
  const { name, email, message } = req.body;
  const cv_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO hiring_applications (name, email, cv_url, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, cv_url, message]
    );
    res.status(201).json({ message: 'Application submitted successfully', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });

  try {
    const result = await db.query('UPDATE hiring_applications SET status=$1 WHERE id=$2', [status, id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Application not found' });
    res.json({ message: 'Application status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update application status' });
  }
};

export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM hiring_applications WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Application not found' });
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete application' });
  }
};

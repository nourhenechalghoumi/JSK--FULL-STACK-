// staffController.js
import { db } from '../database/db.js';

export const getStaff = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM staff ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};

export const createStaff = async (req, res) => {
  const { name, position, bio, photo_url } = req.body;
  if (!name) return res.status(400).json({ error: 'Staff name is required' });

  try {
    const result = await db.query(
      'INSERT INTO staff (name, position, bio, photo_url) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, position, bio, photo_url]
    );
    res.status(201).json({ message: 'Staff member created successfully', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create staff member' });
  }
};

export const updateStaff = async (req, res) => {
  const { id } = req.params;
  const { name, position, bio, photo_url } = req.body;
  if (!name) return res.status(400).json({ error: 'Staff name is required' });

  try {
    const result = await db.query(
      'UPDATE staff SET name=$1, position=$2, bio=$3, photo_url=$4 WHERE id=$5',
      [name, position, bio, photo_url, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Staff member not found' });
    res.json({ message: 'Staff member updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update staff member' });
  }
};

export const deleteStaff = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM staff WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Staff member not found' });
    res.json({ message: 'Staff member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete staff member' });
  }
};

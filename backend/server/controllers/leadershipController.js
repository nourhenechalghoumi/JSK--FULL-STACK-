// leadershipController.js
import { db } from '../database/db.js';

export const getLeadership = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM leadership ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leadership' });
  }
};

export const createLeadership = async (req, res) => {
  const { name, position, bio, photo_url } = req.body;
  if (!name) return res.status(400).json({ error: 'Leadership name is required' });

  try {
    const result = await db.query(
      'INSERT INTO leadership (name, position, bio, photo_url) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, position, bio, photo_url]
    );
    res.status(201).json({ message: 'Leadership member created successfully', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create leadership member' });
  }
};

export const updateLeadership = async (req, res) => {
  const { id } = req.params;
  const { name, position, bio, photo_url } = req.body;
  if (!name) return res.status(400).json({ error: 'Leadership name is required' });

  try {
    const result = await db.query(
      'UPDATE leadership SET name=$1, position=$2, bio=$3, photo_url=$4 WHERE id=$5',
      [name, position, bio, photo_url, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Leadership member not found' });
    res.json({ message: 'Leadership member updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update leadership member' });
  }
};

export const deleteLeadership = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM leadership WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Leadership member not found' });
    res.json({ message: 'Leadership member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete leadership member' });
  }
};

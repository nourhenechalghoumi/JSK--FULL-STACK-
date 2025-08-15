// sponsorsController.js
import { db } from '../database/db.js';

export const getSponsors = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM sponsors ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sponsors' });
  }
};

export const createSponsor = async (req, res) => {
  const { name, logo_url, link } = req.body;
  if (!name) return res.status(400).json({ error: 'Sponsor name is required' });

  try {
    const result = await db.query(
      'INSERT INTO sponsors (name, logo_url, link) VALUES ($1, $2, $3) RETURNING id',
      [name, logo_url, link]
    );
    res.status(201).json({ message: 'Sponsor created successfully', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sponsor' });
  }
};

export const updateSponsor = async (req, res) => {
  const { id } = req.params;
  const { name, logo_url, link } = req.body;
  if (!name) return res.status(400).json({ error: 'Sponsor name is required' });

  try {
    const result = await db.query(
      'UPDATE sponsors SET name=$1, logo_url=$2, link=$3 WHERE id=$4',
      [name, logo_url, link, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Sponsor not found' });
    res.json({ message: 'Sponsor updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update sponsor' });
  }
};

export const deleteSponsor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM sponsors WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Sponsor not found' });
    res.json({ message: 'Sponsor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete sponsor' });
  }
};

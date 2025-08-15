// eventsController.js
import { db } from '../database/db.js';

export const getEvents = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM events WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

export const createEvent = async (req, res) => {
  const { name, location, date, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Event name is required' });

  try {
    const result = await db.query(
      'INSERT INTO events (name, location, date, description) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, location, date, description]
    );
    res.status(201).json({ message: 'Event created successfully', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, location, date, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Event name is required' });

  try {
    const result = await db.query(
      'UPDATE events SET name=$1, location=$2, date=$3, description=$4 WHERE id=$5',
      [name, location, date, description, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM events WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

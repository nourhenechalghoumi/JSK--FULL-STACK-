// contactMessagesController.js
import { db } from '../database/db.js';

export const getMessages = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact_messages ORDER BY date_sent DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required' });

  try {
    const result = await db.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, subject, message]
    );
    res.status(201).json({ message: 'Message sent successfully', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM contact_messages WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

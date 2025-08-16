// teamsController.js
import { db } from '../database/db.js';

export const getTeams = async (req, res) => {
  try {
    const { gender, game_type } = req.query;
    let query = 'SELECT * FROM teams';
    let params = [];
    let conditions = [];

    if (gender) {
      conditions.push('gender = $' + (params.length + 1));
      params.push(gender);
    }

    if (game_type) {
      conditions.push('game_type = $' + (params.length + 1));
      params.push(game_type);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};

export const getTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM teams WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Team not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
};

export const createTeam = async (req, res) => {
  const { name, description, logo_url, members, gender, game_type, game_logo } = req.body;
  if (!name) return res.status(400).json({ error: 'Team name is required' });

  try {
    const result = await db.query(
      'INSERT INTO teams (name, description, logo_url, members, gender, game_type, game_logo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [name, description, logo_url, members, gender, game_type, game_logo]
    );
    res.status(201).json({ message: 'Team created successfully', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create team' });
  }
};

export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, description, logo_url, members, gender, game_type, game_logo } = req.body;
  if (!name) return res.status(400).json({ error: 'Team name is required' });

  try {
    const result = await db.query(
      'UPDATE teams SET name=$1, description=$2, logo_url=$3, members=$4, gender=$5, game_type=$6, game_logo=$7 WHERE id=$8',
      [name, description, logo_url, members, gender, game_type, game_logo, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Team not found' });
    res.json({ message: 'Team updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update team' });
  }
};

export const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM teams WHERE id=$1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Team not found' });
    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
};

export const getGameTypes = async (req, res) => {
  try {
    const result = await db.query('SELECT DISTINCT game_type FROM teams WHERE game_type IS NOT NULL');
    res.json(result.rows.map(row => row.game_type));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch game types' });
  }
};
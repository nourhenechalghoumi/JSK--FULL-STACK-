import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Team {
  id?: number;
  name: string;
  description: string;
}

interface Props {
  editingTeam: Team | null;
  onSuccess: () => void;
}

const API_BASE_URL = 'http://localhost:5000/api';

const TeamForm = ({ editingTeam, onSuccess }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTeam) {
      setName(editingTeam.name);
      setDescription(editingTeam.description);
    }
  }, [editingTeam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (editingTeam) {
      await axios.put(`${API_BASE_URL}/teams/${editingTeam.id}`, { name, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${API_BASE_URL}/teams`, { name, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setName('');
    setDescription('');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Team Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingTeam ? 'Update Team' : 'Add Team'}
      </button>
    </form>
  );
};

export default TeamForm;

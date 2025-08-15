import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/admin/AdminNavbar';
import TeamForm from '../../components/admin/TeamForm';
import { useAuth } from '../../contexts/AuthContext';

interface Team {
  id: number;
  name: string;
  description: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Teams = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const fetchTeams = async () => {
    const res = await axios.get(`${API_BASE_URL}/teams`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setTeams(res.data);
  };

  const deleteTeam = async (id: number) => {
    if (!window.confirm('Are you sure?')) return;
    await axios.delete(`${API_BASE_URL}/teams/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchTeams();
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Teams</h1>
        <TeamForm editingTeam={editingTeam} onSuccess={fetchTeams} />
        <ul className="mt-6 space-y-2">
          {teams.map(team => (
            <li key={team.id} className="flex justify-between bg-gray-100 p-3 rounded">
              <span>{team.name}</span>
              <div className="space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => setEditingTeam(team)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteTeam(team.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Teams;

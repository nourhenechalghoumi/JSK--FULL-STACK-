import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Team {
  id?: number;
  name: string;
  description: string;
  logo_url?: string;
  members: string;
  gender: string;
  game_type: string;
  game_logo?: string;
}

interface Props {
  editingTeam: Team | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const API_BASE_URL = 'http://localhost:5000/api';

const TeamForm = ({ editingTeam, onSuccess, onCancel }: Props) => {
  const [formData, setFormData] = useState<Team>({
    name: '',
    description: '',
    logo_url: '',
    members: '',
    gender: 'mixed',
    game_type: '',
    game_logo: ''
  });

  useEffect(() => {
    if (editingTeam) {
      setFormData(editingTeam);
    } else {
      setFormData({
        name: '',
        description: '',
        logo_url: '',
        members: '',
        gender: 'mixed',
        game_type: '',
        game_logo: ''
      });
    }
  }, [editingTeam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (editingTeam) {
        await axios.put(`${API_BASE_URL}/teams/${editingTeam.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_BASE_URL}/teams`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save team:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
      <h3 className="text-xl font-bold text-accent-500 mb-6">
        {editingTeam ? 'Edit Team' : 'Create New Team'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-accent-400 mb-2">
              Team Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-accent-400 mb-2">
              Game Type
            </label>
            <input
              type="text"
              name="game_type"
              value={formData.game_type}
              onChange={handleChange}
              placeholder="e.g., Valorant, CS2, League of Legends"
              className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-accent-400 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-accent-400 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="mixed">Mixed</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-accent-400 mb-2">
              Team Logo URL
            </label>
            <input
              type="url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-accent-400 mb-2">
              Game Logo URL
            </label>
            <input
              type="url"
              name="game_logo"
              value={formData.game_logo}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-accent-400 mb-2">
              Members (comma-separated)
            </label>
            <input
              type="text"
              name="members"
              value={formData.members}
              onChange={handleChange}
              placeholder="Player1, Player2, Player3"
              className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
          >
            {editingTeam ? 'Update Team' : 'Create Team'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-dark-700 hover:bg-dark-600 text-accent-400 px-6 py-2 rounded-lg font-medium transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
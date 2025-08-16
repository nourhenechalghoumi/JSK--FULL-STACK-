import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Users, Filter } from 'lucide-react';
import axios from 'axios';
import TeamForm from '../../components/admin/TeamForm';

interface Team {
  id: number;
  name: string;
  description: string;
  logo_url?: string;
  members: string;
  gender: string;
  game_type: string;
  game_logo?: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: '',
    game_type: ''
  });
  const [gameTypes, setGameTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchTeams();
    fetchGameTypes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [teams, filters]);

  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/teams`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams(res.data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGameTypes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/teams/game-types`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGameTypes(res.data);
    } catch (error) {
      console.error('Failed to fetch game types:', error);
    }
  };

  const applyFilters = () => {
    let filtered = teams;

    if (filters.gender) {
      filtered = filtered.filter(team => team.gender === filters.gender);
    }

    if (filters.game_type) {
      filtered = filtered.filter(team => team.game_type === filters.game_type);
    }

    setFilteredTeams(filtered);
  };

  const deleteTeam = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this team?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/teams/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeams();
    } catch (error) {
      console.error('Failed to delete team:', error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingTeam(null);
    fetchTeams();
    fetchGameTypes();
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingTeam(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-accent-400">Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-accent-500">Teams Management</h1>
          <p className="text-accent-400 mt-1">Manage your esports teams</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Team</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-primary-500" />
          <div className="flex space-x-4">
            <select
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              className="px-3 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="mixed">Mixed</option>
            </select>

            <select
              value={filters.game_type}
              onChange={(e) => setFilters({ ...filters, game_type: e.target.value })}
              className="px-3 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Games</option>
              {gameTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <button
              onClick={() => setFilters({ gender: '', game_type: '' })}
              className="px-3 py-2 bg-dark-700 hover:bg-dark-600 text-accent-400 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <TeamForm
          editingTeam={editingTeam}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="bg-dark-900 rounded-lg border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {team.logo_url ? (
                    <img src={team.logo_url} alt={team.name} className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-500" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-accent-500">{team.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {team.game_logo && (
                        <img src={team.game_logo} alt={team.game_type} className="w-4 h-4 rounded" />
                      )}
                      <span className="text-sm text-accent-400">{team.game_type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(team)}
                    className="p-2 text-accent-400 hover:text-primary-400 hover:bg-primary-500/20 rounded-lg transition-all duration-300"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteTeam(team.id)}
                    className="p-2 text-accent-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-accent-400 text-sm mb-4 line-clamp-2">{team.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-accent-500">Gender:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    team.gender === 'male' ? 'bg-blue-500/20 text-blue-400' :
                    team.gender === 'female' ? 'bg-pink-500/20 text-pink-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {team.gender}
                  </span>
                </div>
                {team.members && (
                  <div>
                    <span className="text-xs text-accent-500">Members:</span>
                    <p className="text-xs text-accent-400 mt-1">{team.members}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-24 w-24 text-accent-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent-500 mb-2">No Teams Found</h3>
          <p className="text-accent-400">
            {teams.length === 0 ? 'Create your first team to get started.' : 'Try adjusting your filters.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Teams;
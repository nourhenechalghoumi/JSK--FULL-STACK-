import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Crown, User } from 'lucide-react';
import axios from 'axios';
import LeadershipForm from '../../components/admin/LeadershipForm';

interface Leader {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo_url?: string;
  created_at: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Leadership = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/leadership`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaders(res.data);
    } catch (error) {
      console.error('Failed to fetch leadership:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLeader = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this leader?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/leadership/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLeadership();
    } catch (error) {
      console.error('Failed to delete leader:', error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingLeader(null);
    fetchLeadership();
  };

  const handleEdit = (leader: Leader) => {
    setEditingLeader(leader);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingLeader(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-accent-400">Loading leadership...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-accent-500">Leadership Management</h1>
          <p className="text-accent-400 mt-1">Manage organization leaders</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Leader</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <LeadershipForm
          editingLeader={editingLeader}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Leadership Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {leaders.map((leader) => (
          <div
            key={leader.id}
            className="bg-dark-900 rounded-lg border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                {leader.photo_url ? (
                  <img
                    src={leader.photo_url}
                    alt={leader.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 md:h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                    <div className="w-20 h-20 bg-accent-500/20 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-accent-500" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-yellow-400 uppercase tracking-wide">
                      Leadership
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(leader)}
                      className="p-2 text-accent-400 hover:text-primary-400 hover:bg-primary-500/20 rounded-lg transition-all duration-300"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteLeader(leader.id)}
                      className="p-2 text-accent-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-accent-500 mb-2">
                  {leader.name}
                </h3>
                
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500/20 text-primary-400">
                    {leader.position}
                  </span>
                </div>
                
                <p className="text-accent-400 text-sm leading-relaxed line-clamp-4">
                  {leader.bio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {leaders.length === 0 && (
        <div className="text-center py-12">
          <Crown className="h-24 w-24 text-accent-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent-500 mb-2">No Leaders</h3>
          <p className="text-accent-400">Add your first leader to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Leadership;
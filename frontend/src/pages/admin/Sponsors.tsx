import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Handshake, ExternalLink } from 'lucide-react';
import axios from 'axios';
import SponsorForm from '../../components/admin/SponsorForm';

interface Sponsor {
  id: number;
  name: string;
  logo_url?: string;
  link: string;
  created_at: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/sponsors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSponsors(res.data);
    } catch (error) {
      console.error('Failed to fetch sponsors:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSponsor = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this sponsor?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/sponsors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSponsors();
    } catch (error) {
      console.error('Failed to delete sponsor:', error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSponsor(null);
    fetchSponsors();
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingSponsor(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-accent-400">Loading sponsors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-accent-500">Sponsors Management</h1>
          <p className="text-accent-400 mt-1">Manage partnerships and sponsors</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Sponsor</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <SponsorForm
          editingSponsor={editingSponsor}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Sponsors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="bg-dark-900 rounded-lg border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 bg-dark-800">
              {sponsor.logo_url ? (
                <img
                  src={sponsor.logo_url}
                  alt={sponsor.name}
                  className="w-full h-32 object-contain p-4"
                />
              ) : (
                <div className="w-full h-32 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <div className="bg-accent-500/20 rounded-lg p-4">
                    <Handshake className="h-8 w-8 text-accent-500" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-accent-500">
                  {sponsor.name}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(sponsor)}
                    className="p-2 text-accent-400 hover:text-primary-400 hover:bg-primary-500/20 rounded-lg transition-all duration-300"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteSponsor(sponsor.id)}
                    className="p-2 text-accent-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {sponsor.link && (
                <div className="flex items-center justify-between">
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                  <span className="text-xs text-accent-500">
                    {new Date(sponsor.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {sponsors.length === 0 && (
        <div className="text-center py-12">
          <Handshake className="h-24 w-24 text-accent-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent-500 mb-2">No Sponsors</h3>
          <p className="text-accent-400">Add your first sponsor to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Sponsors;
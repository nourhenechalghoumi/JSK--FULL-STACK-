import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Sponsor {
  id?: number;
  name: string;
  logo_url?: string;
  link: string;
}

interface Props {
  editingSponsor: Sponsor | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const API_BASE_URL = 'http://localhost:5000/api';

const SponsorForm = ({ editingSponsor, onSuccess, onCancel }: Props) => {
  const [formData, setFormData] = useState<Sponsor>({
    name: '',
    logo_url: '',
    link: ''
  });

  useEffect(() => {
    if (editingSponsor) {
      setFormData(editingSponsor);
    } else {
      setFormData({
        name: '',
        logo_url: '',
        link: ''
      });
    }
  }, [editingSponsor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (editingSponsor) {
        await axios.put(`${API_BASE_URL}/sponsors/${editingSponsor.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_BASE_URL}/sponsors`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save sponsor:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
      <h3 className="text-xl font-bold text-accent-500 mb-6">
        {editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-accent-400 mb-2">
            Sponsor Name *
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
            Logo URL
          </label>
          <input
            type="url"
            name="logo_url"
            value={formData.logo_url}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-accent-400 mb-2">
            Website URL
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://sponsor-website.com"
            className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
          >
            {editingSponsor ? 'Update Sponsor' : 'Add Sponsor'}
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

export default SponsorForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Leader {
  id?: number;
  name: string;
  position: string;
  bio: string;
  photo_url?: string;
}

interface Props {
  editingLeader: Leader | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const API_BASE_URL = 'http://localhost:5000/api';

const LeadershipForm = ({ editingLeader, onSuccess, onCancel }: Props) => {
  const [formData, setFormData] = useState<Leader>({
    name: '',
    position: '',
    bio: '',
    photo_url: ''
  });

  useEffect(() => {
    if (editingLeader) {
      setFormData(editingLeader);
    } else {
      setFormData({
        name: '',
        position: '',
        bio: '',
        photo_url: ''
      });
    }
  }, [editingLeader]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (editingLeader) {
        await axios.put(`${API_BASE_URL}/leadership/${editingLeader.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_BASE_URL}/leadership`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save leader:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
      <h3 className="text-xl font-bold text-accent-500 mb-6">
        {editingLeader ? 'Edit Leader' : 'Add New Leader'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-accent-400 mb-2">
              Full Name *
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
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., CEO, CTO, President"
              className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-accent-400 mb-2">
            Photo URL
          </label>
          <input
            type="url"
            name="photo_url"
            value={formData.photo_url}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-accent-400 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Leadership biography and achievements..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
          >
            {editingLeader ? 'Update Leader' : 'Add Leader'}
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

export default LeadershipForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
  id?: number;
  name: string;
  location: string;
  date: string;
  description: string;
}

interface Props {
  editingEvent: Event | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const API_BASE_URL = 'http://localhost:5000/api';

const EventForm = ({ editingEvent, onSuccess, onCancel }: Props) => {
  const [formData, setFormData] = useState<Event>({
    name: '',
    location: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    if (editingEvent) {
      // Format date for datetime-local input
      const date = new Date(editingEvent.date);
      const formattedDate = date.toISOString().slice(0, 16);
      
      setFormData({
        ...editingEvent,
        date: formattedDate
      });
    } else {
      setFormData({
        name: '',
        location: '',
        date: '',
        description: ''
      });
    }
  }, [editingEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (editingEvent) {
        await axios.put(`${API_BASE_URL}/events/${editingEvent.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_BASE_URL}/events`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save event:', error);
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
        {editingEvent ? 'Edit Event' : 'Create New Event'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-accent-400 mb-2">
              Event Name *
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
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Los Angeles, Online"
              className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-accent-400 mb-2">
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-accent-400 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Event description..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
          >
            {editingEvent ? 'Update Event' : 'Create Event'}
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

export default EventForm;
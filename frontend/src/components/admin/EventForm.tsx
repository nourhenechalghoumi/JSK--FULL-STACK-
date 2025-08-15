import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Event {
  id?: number;
  title: string;
  date: string;
  location: string;
}

interface Props {
  editingEvent: Event | null;
  onSuccess: () => void;
}

const API_BASE_URL = 'http://localhost:5000/api';

const EventForm = ({ editingEvent, onSuccess }: Props) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setLocation(editingEvent.location);
    }
  }, [editingEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (editingEvent) {
      await axios.put(`${API_BASE_URL}/events/${editingEvent.id}`, { title, date, location }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${API_BASE_URL}/events`, { title, date, location }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setTitle('');
    setDate('');
    setLocation('');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input type="text" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full rounded" required />
      <input type="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 w-full rounded" required />
      <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="border p-2 w-full rounded" required />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">{editingEvent ? 'Update Event' : 'Add Event'}</button>
    </form>
  );
};

export default EventForm;

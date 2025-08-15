import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/admin/AdminNavbar';
import EventForm from '../../components/admin/EventForm';
import { useAuth } from '../../contexts/AuthContext';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    const res = await axios.get(`${API_BASE_URL}/events`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setEvents(res.data);
  };

  const deleteEvent = async (id: number) => {
    if (!window.confirm('Are you sure?')) return;
    await axios.delete(`${API_BASE_URL}/events/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
        <EventForm editingEvent={editingEvent} onSuccess={fetchEvents} />
        <ul className="mt-6 space-y-2">
          {events.map(event => (
            <li key={event.id} className="flex justify-between bg-gray-100 p-3 rounded">
              <span>{event.title} - {event.date}</span>
              <div className="space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => setEditingEvent(event)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteEvent(event.id)}
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

export default Events;

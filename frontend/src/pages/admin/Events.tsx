import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Calendar, MapPin, Clock, Filter } from 'lucide-react';
import axios from 'axios';
import EventForm from '../../components/admin/EventForm';

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
  created_at: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, filter]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = events;
    const now = new Date();

    if (filter === 'upcoming') {
      filtered = events.filter(event => new Date(event.date) > now);
    } else if (filter === 'past') {
      filtered = events.filter(event => new Date(event.date) <= now);
    }

    setFilteredEvents(filtered);
  };

  const deleteEvent = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingEvent(null);
    fetchEvents();
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      year: date.getFullYear(),
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-accent-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-accent-500">Events Management</h1>
          <p className="text-accent-400 mt-1">Manage tournaments and competitions</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-primary-500" />
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-primary-500 text-accent-500' 
                  : 'bg-dark-800 text-accent-400 hover:bg-primary-500/20'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                filter === 'upcoming' 
                  ? 'bg-primary-500 text-accent-500' 
                  : 'bg-dark-800 text-accent-400 hover:bg-primary-500/20'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                filter === 'past' 
                  ? 'bg-primary-500 text-accent-500' 
                  : 'bg-dark-800 text-accent-400 hover:bg-primary-500/20'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <EventForm
          editingEvent={editingEvent}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const eventDate = formatDate(event.date);
          const upcoming = isUpcoming(event.date);
          
          return (
            <div
              key={event.id}
              className="bg-dark-900 rounded-lg border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${upcoming ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                    <Calendar className={`h-6 w-6 ${upcoming ? 'text-green-400' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 text-accent-400 hover:text-primary-400 hover:bg-primary-500/20 rounded-lg transition-all duration-300"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="p-2 text-accent-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-accent-500 mb-2">{event.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-accent-400">
                    <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-accent-400">
                    <Clock className="h-4 w-4 mr-2 text-primary-500" />
                    <span className="text-sm">{eventDate.full}</span>
                  </div>
                </div>

                <p className="text-accent-400 text-sm mb-4 line-clamp-3">{event.description}</p>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    upcoming 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {upcoming ? 'Upcoming' : 'Past Event'}
                  </span>
                  <span className="text-xs text-accent-500">
                    {eventDate.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-24 w-24 text-accent-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent-500 mb-2">No Events Found</h3>
          <p className="text-accent-400">
            {events.length === 0 ? 'Create your first event to get started.' : 'Try adjusting your filters.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Events;
import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      year: date.getFullYear()
    };
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  const upcomingEvents = events.filter(event => isUpcoming(event.date));
  const pastEvents = events.filter(event => !isUpcoming(event.date));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Events & Tournaments
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with our upcoming competitions, community events, and tournament schedules.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => {
                const eventDate = formatDate(event.date);
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-blue-500"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-blue-100 rounded-lg p-3 flex flex-col items-center min-w-[80px]">
                          <span className="text-blue-600 font-bold text-lg">
                            {eventDate.date}
                          </span>
                          <span className="text-blue-500 text-sm">
                            {eventDate.year}
                          </span>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {event.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{eventDate.time}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{event.description}</p>
                      <div className="mt-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Upcoming
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Calendar className="h-8 w-8 text-gray-600 mr-3" />
              Past Events
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {pastEvents.map((event) => {
                const eventDate = formatDate(event.date);
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-gray-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center min-w-[60px]">
                          <span className="text-gray-600 font-bold text-sm">
                            {eventDate.date}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {eventDate.year}
                          </span>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Completed
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {event.name}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-3 w-3 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      
                      <p className="text-gray-700 text-sm line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* No Events */}
        {events.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Scheduled</h3>
            <p className="text-gray-500">Check back soon for upcoming tournaments and events.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface Team {
  id: number;
  name: string;
  description: string;
  logo_url?: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

const Home = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamsRes, eventsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/teams'),
        axios.get('http://localhost:5000/api/events')
      ]);
      setTeams(teamsRes.data.slice(0, 3));
      setEvents(eventsRes.data.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              JSK Esports
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Dominating the competitive gaming scene with professional teams, 
              cutting-edge strategies, and unwavering dedication to excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/teams"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Explore Teams
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/events"
                className="bg-transparent border-2 border-blue-400 hover:bg-blue-400 hover:text-gray-900 text-blue-400 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Tournament Wins</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Professional Players</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Events Participated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teams */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Championship Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the elite players who represent JSK Esports in top-tier competitions worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {teams.map((team) => (
              <div key={team.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                  {team.logo_url ? (
                    <img src={team.logo_url} alt={team.name} className="w-24 h-24 object-cover rounded-full" />
                  ) : (
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{team.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{team.name}</h3>
                  <p className="text-gray-600 mb-4">{team.description}</p>
                  <Link
                    to={`/teams/${team.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/teams"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              View All Teams
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss our next competitions and tournaments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                <p className="text-gray-600 mb-4">{event.location}</p>
                <p className="text-gray-700 text-sm">{event.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/events"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our growing esports organization.
          </p>
          <Link
            to="/hiring"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
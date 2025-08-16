import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface Team {
  id: number;
  name: string;
  description: string;
  logo_url?: string;
  game_type: string;
  game_logo?: string;
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
    <div className="min-h-screen bg-dark-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark-900 via-primary-900 to-dark-900 text-accent-500">
        <div className="absolute inset-0 bg-dark-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent animate-glow">
              JSK Esports
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-accent-400 max-w-3xl mx-auto">
              Dominating the competitive gaming scene with professional teams, 
              cutting-edge strategies, and unwavering dedication to excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/teams"
                className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:shadow-lg transform hover:-translate-y-1"
              >
                Explore Teams
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/events"
                className="bg-transparent border-2 border-primary-400 hover:bg-primary-400 hover:text-dark-900 text-primary-400 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center transform hover:-translate-y-1"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="bg-primary-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-3xl font-bold text-accent-500 mb-2">15+</h3>
              <p className="text-accent-400">Tournament Wins</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-primary-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-3xl font-bold text-accent-500 mb-2">25+</h3>
              <p className="text-accent-400">Professional Players</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-primary-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-3xl font-bold text-accent-500 mb-2">50+</h3>
              <p className="text-accent-400">Events Participated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teams */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-accent-500 mb-4">
              Our Championship Teams
            </h2>
            <p className="text-xl text-accent-400 max-w-2xl mx-auto">
              Meet the elite players who represent JSK Esports in top-tier competitions worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {teams.map((team, index) => (
              <div 
                key={team.id} 
                className="bg-dark-900 rounded-lg border border-primary-500/20 overflow-hidden hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center relative">
                  {team.logo_url ? (
                    <img src={team.logo_url} alt={team.name} className="w-24 h-24 object-cover rounded-full border-4 border-accent-500" />
                  ) : (
                    <div className="w-24 h-24 bg-accent-500/20 rounded-full flex items-center justify-center border-4 border-accent-500">
                      <span className="text-accent-500 text-2xl font-bold">{team.name.charAt(0)}</span>
                    </div>
                  )}
                  {team.game_logo && (
                    <div className="absolute top-4 right-4">
                      <img src={team.game_logo} alt={team.game_type} className="w-8 h-8 rounded" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-accent-500 mb-2">{team.name}</h3>
                  <p className="text-primary-400 text-sm mb-2">{team.game_type}</p>
                  <p className="text-accent-400 mb-4">{team.description}</p>
                  <Link
                    to={`/teams/${team.id}`}
                    className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center transition-colors"
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
              className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center hover:shadow-lg transform hover:-translate-y-1"
            >
              View All Teams
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-accent-500 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-accent-400">
              Don't miss our next competitions and tournaments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className="bg-dark-800 border border-primary-500/20 rounded-lg p-6 hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary-500/20 rounded-lg p-3">
                    <Calendar className="h-6 w-6 text-primary-500" />
                  </div>
                  <span className="text-sm text-accent-400">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-accent-500 mb-2">{event.name}</h3>
                <p className="text-accent-400 mb-4">{event.location}</p>
                <p className="text-accent-400 text-sm">{event.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/events"
              className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center hover:shadow-lg transform hover:-translate-y-1"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent-500 mb-4">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-accent-400 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our growing esports organization.
          </p>
          <Link
            to="/hiring"
            className="bg-accent-500 hover:bg-accent-400 text-dark-900 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center hover:shadow-lg transform hover:-translate-y-1"
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
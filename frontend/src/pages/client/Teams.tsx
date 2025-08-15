import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface Team {
  id: number;
  name: string;
  description: string;
  logo_url?: string;
  members: string;
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Our Professional Teams
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the elite squads that compete at the highest levels of esports, 
            representing JSK across multiple game titles and tournaments.
          </p>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teams.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Teams Yet</h3>
              <p className="text-gray-500">Check back soon for our professional teams.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center relative">
                    {team.logo_url ? (
                      <img 
                        src={team.logo_url} 
                        alt={team.name} 
                        className="w-24 h-24 object-cover rounded-full border-4 border-white"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white">
                        <span className="text-white text-3xl font-bold">
                          {team.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {team.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {team.description}
                    </p>
                    
                    {team.members && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Team Members:</h4>
                        <p className="text-sm text-gray-600">
                          {team.members}
                        </p>
                      </div>
                    )}
                    
                    <Link
                      to={`/teams/${team.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      View Team Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Think You Have What It Takes?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our recruitment process and compete at the highest level of esports.
          </p>
          <Link
            to="/hiring"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
          >
            Apply to Join
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Teams;
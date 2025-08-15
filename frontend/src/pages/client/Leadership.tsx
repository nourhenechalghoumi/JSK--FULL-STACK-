import React, { useEffect, useState } from 'react';
import { Crown, Mail } from 'lucide-react';
import axios from 'axios';

interface Leader {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo_url?: string;
}

const Leadership = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leadership');
      setLeaders(response.data);
    } catch (error) {
      console.error('Failed to fetch leadership:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading leadership...</p>
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
            Leadership Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the visionary leaders who guide JSK Esports toward excellence and innovation in competitive gaming.
          </p>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {leaders.length === 0 ? (
            <div className="text-center py-16">
              <Crown className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Leadership Information</h3>
              <p className="text-gray-500">Leadership profiles will be available soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {leaders.map((leader) => (
                <div
                  key={leader.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      {leader.photo_url ? (
                        <img
                          src={leader.photo_url}
                          alt={leader.name}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 md:h-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">
                              {leader.name.split(' ').map(n => n.charAt(0)).join('')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center mb-4">
                        <Crown className="h-6 w-6 text-yellow-500 mr-2" />
                        <span className="text-sm font-medium text-yellow-600 uppercase tracking-wide">
                          Leadership
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {leader.name}
                      </h3>
                      
                      <div className="mb-4">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {leader.position}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {leader.bio}
                      </p>
                      
                      <div className="flex items-center text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        <span className="text-sm">Available through official channels</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Leading with Vision
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our leadership team brings together decades of experience in gaming, business, and 
              technology to drive JSK Esports toward new heights of success and innovation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategic Leadership</h3>
                <p className="text-gray-600">
                  Guiding our organization with clear vision and strategic thinking
                </p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation Focus</h3>
                <p className="text-gray-600">
                  Embracing new technologies and approaches to stay ahead
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Development</h3>
                <p className="text-gray-600">
                  Investing in our people and fostering a culture of excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
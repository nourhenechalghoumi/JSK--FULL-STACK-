import React, { useEffect, useState } from 'react';
import { Users, Mail } from 'lucide-react';
import axios from 'axios';

interface StaffMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo_url?: string;
}

const Staff = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/staff');
      setStaff(response.data);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading staff...</p>
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
            Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated professionals who work behind the scenes to make JSK Esports a success.
          </p>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {staff.length === 0 ? (
            <div className="text-center py-16">
              <Users className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Staff Members Listed</h3>
              <p className="text-gray-500">Check back soon to meet our team.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-w-4 aspect-h-3">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <span className="text-white text-3xl font-bold">
                            {member.name.split(' ').map(n => n.charAt(0)).join('')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {member.position}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    
                    <div className="flex items-center text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">Contact via admin</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to help us grow and achieve our goals.
          </p>
          <a
            href="/hiring"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
          >
            View Open Positions
            <Users className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Staff;
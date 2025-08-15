import React, { useEffect, useState } from 'react';
import { ExternalLink, Handshake } from 'lucide-react';
import axios from 'axios';

interface Sponsor {
  id: number;
  name: string;
  logo_url?: string;
  link: string;
}

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sponsors');
      setSponsors(response.data);
    } catch (error) {
      console.error('Failed to fetch sponsors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading sponsors...</p>
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
            Our Sponsors & Partners
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're proud to work with industry leaders who share our passion for esports excellence.
          </p>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sponsors.length === 0 ? (
            <div className="text-center py-16">
              <Handshake className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Sponsors Listed</h3>
              <p className="text-gray-500">Check back soon for our partnerships and sponsors.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Thank You to Our Partners
                </h2>
                <p className="text-xl text-gray-600">
                  These amazing companies make our success possible
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      {sponsor.logo_url ? (
                        <img
                          src={sponsor.logo_url}
                          alt={sponsor.name}
                          className="w-full h-48 object-contain p-8"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center">
                          <div className="bg-white bg-opacity-20 rounded-lg p-4">
                            <span className="text-white text-2xl font-bold">
                              {sponsor.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                        {sponsor.name}
                      </h3>
                      
                      {sponsor.link && (
                        <div className="text-center">
                          <a
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                          >
                            Visit Website
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Partnership Benefits
            </h2>
            <p className="text-xl text-gray-600">
              What our sponsors gain from partnering with JSK Esports
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-6 mb-4">
                <ExternalLink className="h-12 w-12 text-blue-600 mx-auto" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Brand Exposure</h4>
              <p className="text-gray-600">
                Reach thousands of engaged gaming enthusiasts across multiple platforms and events.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 rounded-lg p-6 mb-4">
                <Handshake className="h-12 w-12 text-teal-600 mx-auto" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Strategic Partnership</h4>
              <p className="text-gray-600">
                Collaborate with a professional organization that shares your commitment to excellence.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-lg p-6 mb-4">
                <ExternalLink className="h-12 w-12 text-orange-600 mx-auto" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Community Access</h4>
              <p className="text-gray-600">
                Connect directly with our passionate community of players and esports fans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interested in Sponsoring JSK Esports?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our growing network of partners and help us reach new heights in competitive gaming.
          </p>
          <a
            href="/contact"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
          >
            Contact Us
            <Handshake className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
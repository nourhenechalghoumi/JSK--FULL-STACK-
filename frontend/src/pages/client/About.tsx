import React from 'react';
import { Target, Eye, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            About JSK Esports
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leading the future of competitive gaming through innovation, dedication, and excellence.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6">
                Founded in 2020, JSK Esports emerged from a shared passion for competitive gaming 
                and a vision to create something extraordinary in the esports world. What started 
                as a small group of dedicated gamers has evolved into a professional organization 
                competing at the highest levels across multiple game titles.
              </p>
              <p className="text-gray-700 mb-6">
                Our journey has been marked by countless hours of practice, strategic innovation, 
                and an unwavering commitment to excellence. From our first local tournament win 
                to competing on international stages, every achievement has been a testament to 
                our team's dedication and skill.
              </p>
              <p className="text-gray-700">
                Today, JSK Esports stands as a beacon of professionalism in the esports industry, 
                fostering talent, building communities, and pushing the boundaries of competitive gaming.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Gaming Setup"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To elevate competitive gaming by nurturing exceptional talent, fostering innovation, 
                and creating memorable experiences for players and fans alike. We strive to set new 
                standards of excellence in esports through dedication, teamwork, and strategic thinking.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become a globally recognized esports organization that inspires the next generation 
                of competitive gamers. We envision a future where JSK Esports is synonymous with 
                championship-level performance, innovation, and positive community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-6 mb-4">
                <Award className="h-12 w-12 text-blue-600 mx-auto" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h4>
              <p className="text-gray-600">
                We pursue the highest standards in everything we do, from gameplay to team management.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 rounded-lg p-6 mb-4">
                <Users className="h-12 w-12 text-teal-600 mx-auto" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Teamwork</h4>
              <p className="text-gray-600">
                Success comes through collaboration, trust, and supporting each other's growth.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-lg p-6 mb-4">
                <Target className="h-12 w-12 text-orange-600 mx-auto" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600">
                We embrace new strategies, technologies, and approaches to stay ahead of the competition.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-6 mb-4">
                <Eye className="h-12 w-12 text-green-600 mx-auto" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Integrity</h4>
              <p className="text-gray-600">
                We compete with honor, respect our opponents, and maintain the highest ethical standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">
              Milestones that define our journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-8">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">15+</h3>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Tournament Victories</h4>
              <p className="text-gray-600">Major championships across multiple game titles</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-teal-50 to-green-50 rounded-lg p-8">
              <h3 className="text-4xl font-bold text-teal-600 mb-2">$500K+</h3>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Prize Money Won</h4>
              <p className="text-gray-600">Total earnings from competitive tournaments</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-8">
              <h3 className="text-4xl font-bold text-orange-600 mb-2">3</h3>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">World Championships</h4>
              <p className="text-gray-600">International titles representing our excellence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
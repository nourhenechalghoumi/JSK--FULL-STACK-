import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, Send, Users, Briefcase } from 'lucide-react';
import axios from 'axios';

interface HiringForm {
  name: string;
  email: string;
  message: string;
  cv: FileList;
}

const Hiring = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<HiringForm>();

  const onSubmit = async (data: HiringForm) => {
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      
      if (data.cv && data.cv.length > 0) {
        formData.append('cv', data.cv[0]);
      }

      await axios.post('http://localhost:5000/api/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSubmitted(true);
      reset();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in joining JSK Esports. We'll review your application 
              and get back to you soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Submit Another Application
            </button>
          </div>
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
            Join Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Are you passionate about esports? We're looking for talented individuals to join our growing organization.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Submit Your Application
            </h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CV/Resume
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="cv"
                    {...register('cv')}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Upload className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Accepted formats: PDF, DOC, DOCX (max 5MB)
                </p>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter / Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message', { required: 'Message is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself, your experience, and why you want to join JSK Esports..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Send className="h-5 w-5 mr-2" />
                )}
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Current Openings</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Professional Players</h4>
                  <p className="text-gray-600 text-sm">Multiple game titles available</p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Coach/Analyst</h4>
                  <p className="text-gray-600 text-sm">Strategic and performance analysis</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Content Creator</h4>
                  <p className="text-gray-600 text-sm">Social media and video content</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Team Manager</h4>
                  <p className="text-gray-600 text-sm">Operations and logistics</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-teal-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">What We Offer</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Competitive compensation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                  Professional development
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  Tournament opportunities
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Team collaboration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Industry networking
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Application Tips</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Be specific about your gaming experience and achievements</li>
                <li>• Include links to your gaming profiles or portfolios</li>
                <li>• Explain why you want to join JSK Esports specifically</li>
                <li>• Highlight any team experience or leadership roles</li>
                <li>• Proofread your application before submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hiring;
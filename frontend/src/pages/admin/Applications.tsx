import React, { useEffect, useState } from 'react';
import { FileText, Download, Trash2, Eye, Filter } from 'lucide-react';
import axios from 'axios';

interface Application {
  id: number;
  name: string;
  email: string;
  cv_url?: string;
  message: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  date_submitted: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'accepted' | 'rejected'>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applications, filter]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = applications;

    if (filter !== 'all') {
      filtered = applications.filter(app => app.status === filter);
    }

    setFilteredApplications(filtered);
  };

  const updateStatus = async (id: number, status: Application['status']) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/applications/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchApplications();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteApplication = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchApplications();
    } catch (error) {
      console.error('Failed to delete application:', error);
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'reviewed': return 'bg-blue-500/20 text-blue-400';
      case 'accepted': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-accent-400">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-accent-500">Applications Management</h1>
          <p className="text-accent-400 mt-1">Review job applications and CVs</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-primary-500" />
          <div className="flex space-x-4">
            {['all', 'pending', 'reviewed', 'accepted', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-3 py-2 rounded-lg transition-colors capitalize ${
                  filter === status 
                    ? 'bg-primary-500 text-accent-500' 
                    : 'bg-dark-800 text-accent-400 hover:bg-primary-500/20'
                }`}
              >
                {status === 'all' ? 'All Applications' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-dark-900 rounded-lg border border-primary-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent-400 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent-400 uppercase tracking-wider">
                  CV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-500/20">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-dark-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-accent-500">
                        {application.name}
                      </div>
                      <div className="text-sm text-accent-400">
                        {application.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={application.status}
                      onChange={(e) => updateStatus(application.id, e.target.value as Application['status'])}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)} bg-dark-800 border border-primary-500/20`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent-400">
                    {new Date(application.date_submitted).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {application.cv_url ? (
                      <a
                        href={`http://localhost:5000${application.cv_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-400 hover:text-primary-300"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </a>
                    ) : (
                      <span className="text-accent-500">No CV</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-primary-400 hover:text-primary-300"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteApplication(application.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-24 w-24 text-accent-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent-500 mb-2">No Applications Found</h3>
          <p className="text-accent-400">
            {applications.length === 0 ? 'No applications received yet.' : 'Try adjusting your filters.'}
          </p>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-900 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-accent-500">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-accent-400 hover:text-accent-300"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">Name</label>
                <p className="text-accent-500">{selectedApplication.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">Email</label>
                <p className="text-accent-500">{selectedApplication.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">Message</label>
                <p className="text-accent-500 whitespace-pre-wrap">{selectedApplication.message}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">Status</label>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApplication.status)}`}>
                  {selectedApplication.status}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">Submitted</label>
                <p className="text-accent-500">{new Date(selectedApplication.date_submitted).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Users, User } from 'lucide-react';
import axios from 'axios';
import StaffForm from '../../components/admin/StaffForm';

interface Staff {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo_url?: string;
  created_at: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Staff = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/staff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStaff = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/staff/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStaff();
    } catch (error) {
      console.error('Failed to delete staff:', error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingStaff(null);
    fetchStaff();
  };

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingStaff(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-accent-400">Loading staff...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-accent-500">Staff Management</h1>
          <p className="text-accent-400 mt-1">Manage your team members</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Staff</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <StaffForm
          editingStaff={editingStaff}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {staff.map((member) => (
          <div
            key={member.id}
            className="bg-dark-900 rounded-lg border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in overflow-hidden"
          >
            <div className="aspect-w-4 aspect-h-3">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <div className="w-20 h-20 bg-accent-500/20 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-accent-500" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-accent-500 mb-2">
                    {member.name}
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500/20 text-primary-400">
                    {member.position}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 text-accent-400 hover:text-primary-400 hover:bg-primary-500/20 rounded-lg transition-all duration-300"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteStaff(member.id)}
                    className="p-2 text-accent-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-accent-400 text-sm leading-relaxed line-clamp-3">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>

      {staff.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-24 w-24 text-accent-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent-500 mb-2">No Staff Members</h3>
          <p className="text-accent-400">Add your first staff member to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Staff;
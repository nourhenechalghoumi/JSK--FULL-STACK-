import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/admin/AdminNavbar';
import StaffForm from '../../components/admin/StaffForm';

interface Staff {
  id: number;
  name: string;
  email: string;
  role: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Staff = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const fetchStaff = async () => {
    const res = await axios.get(`${API_BASE_URL}/staff`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setStaffs(res.data);
  };

  const deleteStaff = async (id: number) => {
    if (!window.confirm('Are you sure?')) return;
    await axios.delete(`${API_BASE_URL}/staff/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchStaff();
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Staff</h1>
        <StaffForm editingStaff={editingStaff} onSuccess={fetchStaff} />
        <ul className="mt-6 space-y-2">
          {staffs.map(staff => (
            <li key={staff.id} className="flex justify-between bg-gray-100 p-3 rounded">
              <span>{staff.name} ({staff.role})</span>
              <div className="space-x-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => setEditingStaff(staff)}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteStaff(staff.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Staff;

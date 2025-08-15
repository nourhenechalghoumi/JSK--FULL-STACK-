import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Staff {
  id?: number;
  name: string;
  email: string;
  role: string;
}

interface Props {
  editingStaff: Staff | null;
  onSuccess: () => void;
}

const API_BASE_URL = 'http://localhost:5000/api';

const StaffForm = ({ editingStaff, onSuccess }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (editingStaff) {
      setName(editingStaff.name);
      setEmail(editingStaff.email);
      setRole(editingStaff.role);
    }
  }, [editingStaff]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (editingStaff) {
      await axios.put(`${API_BASE_URL}/staff/${editingStaff.id}`, { name, email, role }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${API_BASE_URL}/staff`, { name, email, role }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setName('');
    setEmail('');
    setRole('user');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full rounded" required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full rounded" required />
      <select value={role} onChange={e => setRole(e.target.value)} className="border p-2 w-full rounded">
        <option value="user">User</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">{editingStaff ? 'Update Staff' : 'Add Staff'}</button>
    </form>
  );
};

export default StaffForm;

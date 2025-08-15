import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminNavbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex space-x-4">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/teams">Teams</Link>
        <Link to="/admin/events">Events</Link>
        <Link to="/admin/staff">Staff</Link>
      </div>
      <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </nav>
  );
};

export default AdminNavbar;

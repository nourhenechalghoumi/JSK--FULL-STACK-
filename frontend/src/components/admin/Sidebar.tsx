import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-2"><Link to="/admin/dashboard">Dashboard</Link></li>
        <li className="mb-2"><Link to="/admin/teams">Teams</Link></li>
        <li className="mb-2"><Link to="/admin/events">Events</Link></li>
        <li className="mb-2"><Link to="/admin/staff">Staff</Link></li>
        <li className="mb-2"><Link to="/admin/sponsors">Sponsors</Link></li>
        <li className="mb-2"><Link to="/admin/leadership">Leadership</Link></li>
        <li className="mb-2"><Link to="/admin/applications">Applications</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

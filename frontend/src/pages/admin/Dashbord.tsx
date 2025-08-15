import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';

const Dashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome, manage your Teams, Events, and Staff here.</p>
      </div>
    </div>
  );
};

export default Dashboard;

import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar /> {/* Admin-specific navigation */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet /> {/* Renders nested admin routes like dashboard, teams, events */}
      </main>
    </div>
  );
};

export default AdminLayout;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserCheck, 
  Crown, 
  Handshake, 
  FileText, 
  MessageSquare,
  Zap,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Teams', path: '/admin/teams', icon: Users },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Staff', path: '/admin/staff', icon: UserCheck },
    { name: 'Leadership', path: '/admin/leadership', icon: Crown },
    { name: 'Sponsors', path: '/admin/sponsors', icon: Handshake },
    { name: 'Applications', path: '/admin/applications', icon: FileText },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="w-64 h-screen bg-dark-900 border-r border-primary-500/20 flex flex-col animate-slide-in">
      {/* Logo */}
      <div className="p-6 border-b border-primary-500/20">
        <Link to="/admin/dashboard" className="flex items-center space-x-3 group">
          <Zap className="h-8 w-8 text-primary-500 group-hover:animate-pulse" />
          <div>
            <h2 className="text-xl font-bold text-accent-500 group-hover:text-primary-400 transition-colors">
              JSK Admin
            </h2>
            <p className="text-xs text-accent-400">Management Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                isActive
                  ? 'bg-primary-500 text-accent-500 shadow-lg animate-glow'
                  : 'text-accent-400 hover:bg-primary-500/20 hover:text-primary-400'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-accent-500' : 'text-accent-400 group-hover:text-primary-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-primary-500/20 space-y-2">
        <Link
          to="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-accent-400 hover:bg-primary-500/20 hover:text-primary-400 transition-all duration-300"
        >
          <Zap className="h-5 w-5" />
          <span>Client Site</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 w-full"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
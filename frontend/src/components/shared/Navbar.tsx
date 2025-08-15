import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isAdmin = location.pathname.startsWith('/admin');

  const clientNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Teams', path: '/teams' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Staff', path: '/staff' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Hiring', path: '/hiring' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Teams', path: '/admin/teams' },
    { name: 'Events', path: '/admin/events' },
    { name: 'Staff', path: '/admin/staff' },
    { name: 'Leadership', path: '/admin/leadership' },
    { name: 'Sponsors', path: '/admin/sponsors' },
    { name: 'Applications', path: '/admin/applications' },
    { name: 'Messages', path: '/admin/messages' },
  ];

  const navItems = isAdmin ? adminNavItems : clientNavItems;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={isAdmin ? '/admin' : '/'} className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-500" />
              <span className="text-white text-xl font-bold">
                {isAdmin ? 'JSK Admin' : 'JSK Esports'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Welcome, {user.name}</span>
                {!isAdmin && user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Client Site
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              !isAdmin && (
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="border-t border-gray-700 pt-4">
                <div className="px-3 py-2 text-gray-300">Welcome, {user.name}</div>
                {!isAdmin && user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-gray-600 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Client Site
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              !isAdmin && (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
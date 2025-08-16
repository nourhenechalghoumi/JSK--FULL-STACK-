import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Don't show navbar on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

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

  return (
    <nav className="bg-dark-900 border-b border-primary-500/20 sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Zap className="h-8 w-8 text-primary-500 group-hover:animate-pulse" />
              <span className="text-accent-500 text-xl font-bold group-hover:text-primary-400 transition-colors">
                JSK Esports
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {clientNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-primary-500 text-accent-500 shadow-lg animate-glow'
                      : 'text-accent-400 hover:bg-primary-500/20 hover:text-primary-400'
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
                <span className="text-accent-400">Welcome, {user.name}</span>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-500 hover:bg-primary-600 text-accent-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-accent-400 hover:text-accent-500 p-2 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden animate-slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-800">
            {clientNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-primary-500 text-accent-500'
                    : 'text-accent-400 hover:bg-primary-500/20 hover:text-primary-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="border-t border-primary-500/20 pt-4">
                <div className="px-3 py-2 text-accent-400">Welcome, {user.name}</div>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-primary-500 text-accent-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 text-accent-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary-500 text-accent-500"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
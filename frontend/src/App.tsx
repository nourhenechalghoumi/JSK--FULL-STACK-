import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

// Client Pages
import Home from './pages/client/Home';
import Teams from './pages/client/Teams';
import Events from './pages/client/Events';
import About from './pages/client/About';
import Staff from './pages/client/Staff';
import Leadership from './pages/client/Leadership';
import Sponsors from './pages/client/Sponsors';
import Hiring from './pages/client/Hiring';
import Contact from './pages/client/Contact';
import Login from './pages/client/Login';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminTeams from './pages/admin/Teams';
import AdminEvents from './pages/admin/Events';
import AdminStaff from './pages/admin/Staff';
import AdminLeadership from './pages/admin/Leadership';
import AdminSponsors from './pages/admin/Sponsors';
import AdminApplications from './pages/admin/Applications';
import AdminMessages from './pages/admin/Messages';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-dark-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Client Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/events" element={<Events />} />
              <Route path="/about" element={<About />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/hiring" element={<Hiring />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="teams" element={<AdminTeams />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="staff" element={<AdminStaff />} />
                <Route path="leadership" element={<AdminLeadership />} />
                <Route path="sponsors" element={<AdminSponsors />} />
                <Route path="applications" element={<AdminApplications />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>

              {/* 404 fallback */}
              <Route path="*" element={<div className="text-center py-16 text-accent-500">Page not found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
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

import AdminDashboard from './pages/admin/Dashbord';
import AdminTeams from './pages/admin/Teams';
import AdminEvents from './pages/admin/Events';
import AdminStaff from './pages/admin/Staff';
import AdminLayout from './pages/admin/AdminLayout';

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
        <div className="flex flex-col min-h-screen">
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

              {/* Admin Routes (all protected) */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="teams" element={<AdminTeams />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="staff" element={<AdminStaff />} />
              </Route>

              {/* 404 fallback */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

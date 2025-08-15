import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />; // redirect non-admins

  return children;
};

export default ProtectedRoute;

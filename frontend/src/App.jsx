import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper function to get auth state from localStorage
  const getAuthState = useCallback(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const isAuth = !!parsed?.id && !!parsed?.upiId;
        return { user: parsed, isAuth };
      } catch (err) {
        console.error('Error parsing stored user:', err);
        return { user: null, isAuth: false };
      }
    }
    return { user: null, isAuth: false };
  }, []);

  // Update auth state from localStorage
  const updateAuthState = useCallback(() => {
    const { user: userData, isAuth } = getAuthState();
    console.log('[Auth Update] User:', userData, 'IsAuth:', isAuth);
    setUser(userData);
    setIsAuthenticated(isAuth);
  }, [getAuthState]);

  // Initial auth check on mount
  useEffect(() => {
    console.log('[App] Mounting - checking initial auth state');
    updateAuthState();
    setLoading(false);
  }, [updateAuthState]);

  // Listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      console.log('[App] Auth change detected, updating state');
      updateAuthState();
    };

    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', handleAuthChange);

    // Listen for custom auth change event (logout in current tab)
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [updateAuthState]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-phonepe"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  console.log('[App] Rendering routes - isAuthenticated:', isAuthenticated, 'user:', user);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
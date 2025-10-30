import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const loc = useLocation();

  if (!user) {
    
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }
  return children;
}
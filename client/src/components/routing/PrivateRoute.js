import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

function PrivateRoute({ children }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  if (!isAuthenticated && !loading) {
    return <Navigate to='/login' />;
  } else {
    return children;
  }
}

export default PrivateRoute;

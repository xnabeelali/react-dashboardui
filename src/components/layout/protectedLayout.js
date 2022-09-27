import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
  
  const ProtectedLayout = ({ children }) => {
     const { token } = useAuth();
   
      if (!token) {
        return <Navigate to="/login" replace />;
      }
  
    return children;
  };

  export default ProtectedLayout;
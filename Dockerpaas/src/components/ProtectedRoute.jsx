// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children; // else render the actual component
};

export default ProtectedRoute;

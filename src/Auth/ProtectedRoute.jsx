import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, show the requested page
  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const NonAuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // If user is logged in, redirect to posts page
    return <Navigate to="/post" replace />;
  }

  // If user is not logged in, show the requested page (login/register)
  return children;
};

export default NonAuthRoute;

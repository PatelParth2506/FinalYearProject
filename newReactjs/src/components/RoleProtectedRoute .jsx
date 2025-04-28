import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const role = Cookies.get("role");

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />; // or show error
  }

  return children;
};

export default RoleProtectedRoute;
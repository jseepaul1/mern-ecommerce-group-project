import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const cookieUserToken = document.cookie;

  if (!cookieUserToken) {
    <Navigate to="/" replace />;
  }

  const accessToken = cookieUserToken.split("=")[1];

  return !!accessToken ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const cookieUserToken = document.cookie;
  console.log(cookieUserToken)

  if (!cookieUserToken) {
    <Navigate to="/" replace />;
  }

  const accessToken = cookieUserToken.split("=")[1];
  console.log(accessToken)

  return !!accessToken ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

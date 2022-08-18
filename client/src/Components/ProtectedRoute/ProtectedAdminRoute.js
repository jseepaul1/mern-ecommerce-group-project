import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedAdminRoute = ({ children }) => {
  let admin = undefined;
  const cookieAdminToken = document.cookie;
  console.log(cookieAdminToken);
  const accessToken = cookieAdminToken.split("=")[1];

  if (!!accessToken) {
    admin = jwt_decode(accessToken);
    console.log("admin", admin);
  }

  return !!admin && admin.isAdmin === true ? (
    children
  ) : (
    <Navigate to="/dashboard" replace />
  );
};
export default ProtectedAdminRoute;

// 1. Grab the `accessToken` from the cookies (again)
// 2. We need to figure out if the user is an Admin
//    2.1 - Parse `accessToken` from step 1 using `jwt_decode` (refer to FBI code)
// 3. Once token is parsed, confirm if the user has `isAdmin` set to `true` in the decoded token object

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

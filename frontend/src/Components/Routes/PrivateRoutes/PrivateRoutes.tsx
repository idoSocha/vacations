import { Outlet, Navigate } from "react-router-dom";
import { project } from "../../../Redux/ProjectStore";

function PrivateRoutes(): any {
  const isLoggedIn = project.getState().users.isLoggedIn;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;

import { Outlet, Navigate } from "react-router-dom";
import { project } from "../../../Redux/ProjectStore";
import "./AdminRoutes.css";

function AdminRoutes() {
  const isAdmin = project.getState().users.isAdmin;
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;

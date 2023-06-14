import { Outlet, Navigate } from "react-router-dom";
import { project } from "../../Redux/ProjectStore";

const userAuth = () => {
  const userLogged = project.getState().users.isLoggedIn;
  const user = project.getState().users.users;

  return { userLogged, user };
};

const PrivateRoutes = () => {
  const { userLogged } = userAuth();
  console.log("PrivateRoutes isLoggedIn: ", userLogged);
  return userLogged ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoutes = () => {
  const { userLogged, user } = userAuth();
  if (userLogged === true) {
    const user = project.getState().users.users[0];

    return user.isAdmin ? <Outlet /> : <Navigate to="/login" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export { PrivateRoutes, AdminRoutes };

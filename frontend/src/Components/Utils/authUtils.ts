import { project } from "../../Redux/ProjectStore";

export const userLoggedIn = () => {
  return project.getState().users.isLoggedIn;
};

export function userIsAdmin(): boolean {
  const loggedIn = userLoggedIn();
  if (loggedIn) {
    const isAdmin = project.getState().users.isAdmin;
    return isAdmin;
  } else {
    return false;
  }
}

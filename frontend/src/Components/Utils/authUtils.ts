import { project } from "../../Redux/ProjectStore";

export const userLoggedIn = () => {
  return project.getState().users.isLoggedIn;
};

export function userIsAdmin(): boolean {
  const loggedIn = userLoggedIn();
  if (loggedIn) {
    const user = project.getState().users.users[0];
    return user.isAdmin;
  } else {
    return false;
  }
}

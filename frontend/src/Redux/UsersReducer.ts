import User from "../Components/Models/User";
//initial state
export class UsersState {
  public users: User[] = [];
  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;
}

//what action i will use...
export enum UserActionType {
  addUser = "addUser",
  getUser = "getUser",
  isLoggedIn = "isLoggedIn",
  updateLikes = "updateLikes",
}

//action data structure
export interface UserAction {
  type: UserActionType;
  payload?: any;
}

//which function will run when i will dispatch an action

export const addUserAction = (newUser: User): UserAction => {
  return { type: UserActionType.addUser, payload: newUser };
};

export const getUserAction = (User: User): UserAction => {
  return { type: UserActionType.getUser, payload: User };
};
export const isLoggedInAction = (isLogged: boolean): UserAction => {
  return { type: UserActionType.isLoggedIn, payload: isLogged };
};

export const updateLikesAction = (likes: number[]): UserAction => {
  return { type: UserActionType.updateLikes, payload: likes };
};

export function UsersReducer(
  currentState: UsersState = new UsersState(),
  action: UserAction
): UsersState {
  const newState = { ...currentState };

  switch (action.type) {
    case UserActionType.addUser:
      newState.users = [...newState.users, action.payload];
      break;
    case UserActionType.getUser:
      const user = action.payload;
      const likedVacationsString = user.likedVacations || "[]";
      const likedVacations = JSON.parse(likedVacationsString) as number[];
      const userWithLikedVacations = { ...user, likedVacations };
      newState.isAdmin = action.payload[0].isAdmin;
      newState.users = [userWithLikedVacations];
      break;
    case UserActionType.isLoggedIn:
      newState.isLoggedIn = action.payload;
      if (!action.payload) {
        newState.users = [];
      }
      break;

    // case UserActionType.isAdmin:
    //   const admin = [...newState.users];
    //   if (admin) {
    //     newState.isAdmin = true;
    //   }
    //   break;
    case UserActionType.updateLikes:
      const updatedUser = { ...newState.users[0] };
      const likedVacationId = action.payload[0] || 0;
      const updatedLikedVacations = [...updatedUser.likedVacations];

      if (updatedLikedVacations.includes(likedVacationId)) {
        // Remove the vacation ID if it already exists
        updatedLikedVacations.splice(
          updatedLikedVacations.indexOf(likedVacationId),
          1
        );
      } else {
        // Add the vacation ID if it doesn't exist
        updatedLikedVacations.push(likedVacationId);
      }

      updatedUser.likedVacations = updatedLikedVacations;
      newState.users = [updatedUser];
      return { ...newState };
    default:
      break;
  }
  return newState;
}

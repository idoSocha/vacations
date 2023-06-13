import User from "../Components/Models/User";
//initial state
export class UsersState {
  public users: User[] = [];
  public isLoggedIn: boolean = false;
  public isAdmin: boolean | null = false;
}

//what action i will use...
export enum UserActionType {
  addUser = "addUser",
  getUser = "getUser",
  isLoggedIn = "isLoggedIn",
  isAdmin = "isAdmin",
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
      newState.users = [...newState.users].filter(
        (item) =>
          item.email === action.payload.email &&
          item.password === action.payload.password
      );
      break;
    case UserActionType.isLoggedIn:
      newState.isLoggedIn = action.payload;
      if (!action.payload) {
        newState.users = [];
      }
      break;
  }

  return newState;
}

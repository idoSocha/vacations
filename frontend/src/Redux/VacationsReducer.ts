import Vacation from "../Components/Models/Vacation";
//initial state
export class VacationState {
  public allVacations: Vacation[] = [];
}

//what action i will use...
export enum VacationActionType {
  addVacation = "addVacation",
  deleteVacation = "deleteVacation",
  updateVacation = "updateVacation",
  getVacation = "getVacation",
  allVacations = "allVacations",
  vacationLikes = "VacationLikes",
  vacationUnlike = "VacationUnlike",
}

//action data structure
export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
export const allVacationAction = (allVacations: Vacation): VacationAction => {
  return { type: VacationActionType.allVacations, payload: allVacations };
};
export const addVacationAction = (newVacation: Vacation): VacationAction => {
  return { type: VacationActionType.addVacation, payload: newVacation };
};

export const deleteVacationAction = (Vacation_code: number): VacationAction => {
  return { type: VacationActionType.deleteVacation, payload: Vacation_code };
};

export const updateVacationAction = (vacation: Vacation): VacationAction => {
  return { type: VacationActionType.updateVacation, payload: vacation };
};

export const getVacationAction = (Vacation_code: number): VacationAction => {
  return { type: VacationActionType.getVacation, payload: Vacation_code };
};

export const vacationLikesAction = (vacationId: number): VacationAction => {
  return { type: VacationActionType.vacationLikes, payload: vacationId };
};

export const vacationUnlikeAction = (vacationId: number): VacationAction => {
  return { type: VacationActionType.vacationUnlike, payload: vacationId };
};
//this is the reducer function, but since it's manged only by redux, we built the function above
export function VacationReducer(
  currentState: VacationState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.addVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.deleteVacation:
      newState.allVacations = [...newState.allVacations].filter(
        (item) => item.vacation_code !== action.payload
      );
      break;
    case VacationActionType.updateVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.getVacation:
      newState.allVacations = [...newState.allVacations].filter(
        (item) => item.vacation_code === action.payload
      );
      break;
    case VacationActionType.allVacations:
      newState.allVacations = action.payload;

      break;
    case VacationActionType.vacationLikes:
      const vacationId = action.payload;
      const updatedVacations = currentState.allVacations.map((vacation) => {
        if (vacation.vacation_code === vacationId) {
          const updatedLikes = (vacation.likes || 0) + 1;
          return {
            ...vacation,
            likes: updatedLikes,
          };
        }
        return vacation;
      });

      return {
        ...currentState,
        allVacations: updatedVacations,
      };

    case VacationActionType.vacationUnlike:
      const unlikeVacationId = action.payload;

      const unlikeVacations = currentState.allVacations.map((vacation) => {
        if (vacation.vacation_code === unlikeVacationId) {
          const updatedLikes = (vacation.likes || 0) - 1;
          return {
            ...vacation,
            likes: updatedLikes, // Decrement the likes count
          };
        }
        return vacation;
      });
      return {
        ...currentState,
        allVacations: unlikeVacations,
      };
    default:
      return currentState;
  }

  return newState;
}

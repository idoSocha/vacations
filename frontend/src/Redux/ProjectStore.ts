import { configureStore } from "@reduxjs/toolkit";
import { VacationReducer } from "./VacationsReducer";
import { UsersReducer } from "./UsersReducer";

//choose all reducers....
const reducers = { vacations: VacationReducer, users: UsersReducer };

//combine reducers.
export const project = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});

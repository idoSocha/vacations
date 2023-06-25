import { configureStore } from "@reduxjs/toolkit";
import { VacationReducer } from "./VacationsReducer";
import { UsersReducer } from "./UsersReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// //choose all reducers....
// const reducers = { vacations: VacationReducer, users: UsersReducer };

// //combine reducers.
// export const project = configureStore({
//   reducer: reducers,
//   middleware: (getDefaultMiddleWare) =>
//     getDefaultMiddleWare({ serializableCheck: false }),
// });

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, UsersReducer);

export const project = configureStore({
  reducer: {
    vacations: VacationReducer,
    users: persistedUserReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});

export const persister = persistStore(project);

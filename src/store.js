import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appApi from "./service/appApi.js";
import courseSlice from "./features/courseSlice.js";
import lessonSlice from "./features/lessonSlice.js";
import userSlice from "./features/userSlice.js";

// persist
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// Create main reducer
const reducer = combineReducers({
  user: userSlice,
  courses: courseSlice, // courses will be the name to access when use useSelector => state.courses
  lessons: lessonSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath, "courses"],
};

// Persist store
const persistedReducer = persistReducer(persistConfig, reducer);

// Create main-persisted store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(appApi.middleware),
  devTools: false,
});

export const persistor = persistStore(store);
export default store;

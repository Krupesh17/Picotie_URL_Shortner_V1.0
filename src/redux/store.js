import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";
import authSlice from "./slices/auth_slice";
import uiSlice from "./slices/ui_slice";
import dashboardSlice from "./slices/dashboard_slice";

const rootReducer = combineReducers({
  auth: authSlice,
  ui: uiSlice,
  dashboard: dashboardSlice,
});

const authFilter = createFilter("auth", ["user"]);
const dashboardFilter = createFilter("dashboard", ["shortLinks", "clicks"]);

const persistConfig = {
  key: "root",
  storage,
  transforms: [authFilter, dashboardFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

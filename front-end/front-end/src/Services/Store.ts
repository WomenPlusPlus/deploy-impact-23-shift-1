import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./AuthenticationSlice";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
export const authPersistConfig = {
    key: "auth",
    storage,
  };

const persistedAuthenticationReducer = persistReducer(authPersistConfig, authenticationReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthenticationReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);

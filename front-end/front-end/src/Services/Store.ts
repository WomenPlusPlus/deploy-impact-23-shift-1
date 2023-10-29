import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./AuthenticationSlice";
import jobsReducer from "./JobsSlice"
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from 'redux-persist-transform-encrypt';

import storage from "redux-persist/lib/storage";
export const authPersistConfig = {
    key: "auth",
    storage,
    transforms: [
      encryptTransform({
        // TODO: switch to userid?
        secretKey: process.env.REACT_APP_SUPABASE_KEY ? process.env.REACT_APP_SUPABASE_KEY : "super_secret_key",
      }),
    ],
  };

const persistedAuthenticationReducer = persistReducer(authPersistConfig, authenticationReducer);

const devToolsEnabled = process.env.REACT_APP_NODE_ENV?.toLowerCase() === "dev" ? true : false;

export const store = configureStore({
    reducer: {
        auth: persistedAuthenticationReducer,
        jobs: jobsReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),  
    devTools: devToolsEnabled,
});

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);

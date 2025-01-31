import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { authReducer } from "@/store/authSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { groupReducer } from "./groupSlice";
import { userReducer } from "./userSlice";
import { loaderReducer } from "./loaderSlice";
import { optionReducer } from "./optionsSlice";
import { importReducer } from "./bulkUpload";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

  const authPersistConfig = {
    key: "auth",
    storage: storage,
    whitelist: ["isAuthenticated", "userId", "token"],
  };

const persistedReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedReducer,
  group: groupReducer,
  user: userReducer,
  loader: loaderReducer,
  option: optionReducer,
  bulkUpload: importReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
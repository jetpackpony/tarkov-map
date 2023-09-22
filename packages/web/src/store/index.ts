import type { DB } from "../db";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import markersReducer, * as markersSlice from "./markersSlice";
import uiReducer, * as uiSlice from "./uiSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { subscribeToDBUpdates } from "./subscribeToDBUpdates";
import {
  saveStateToLocalstorageMiddleware,
  updateSessionLastAccessMiddleware,
} from "./middleware";

const rootReducer = combineReducers({
  markers: markersReducer,
  ui: uiReducer,
});

const getPreloadedState = () => ({
  markers: markersSlice.rehydrate(),
  ui: uiSlice.rehydrate(),
});

const makeStore = (db: DB | null) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: getPreloadedState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        updateSessionLastAccessMiddleware,
        saveStateToLocalstorageMiddleware,
      ),
  });

  if (db) {
    subscribeToDBUpdates(db, store.dispatch);
  }

  return store;
};

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default makeStore;

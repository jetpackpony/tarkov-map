import { getDB } from "../db";
import { Action, Middleware } from "@reduxjs/toolkit";
import { hydrate, selectCurrentSession } from "./uiSlice";
import { AppState } from ".";

export const updateSessionLastAccessMiddleware: Middleware<unknown, AppState> =
  ({ getState }) =>
  (next) =>
  (action: Action) => {
    const session = selectCurrentSession(getState());
    if (session) {
      getDB().updateSessionLastAccess(session.id, new Date(session.lastAccess));
    }
    next(action);
  };

export const saveStateToLocalstorageMiddleware: Middleware<unknown, AppState> =
  ({ getState }) =>
  (next) =>
  (action: Action) => {
    next(action);
    hydrate(getState());
  };

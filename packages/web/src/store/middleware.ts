import { getDB } from "../firebase";
import { Action, Middleware } from "@reduxjs/toolkit";
import { selectCurrentSession } from "./uiSlice";
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

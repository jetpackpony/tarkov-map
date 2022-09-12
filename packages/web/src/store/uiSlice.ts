import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppState } from ".";
import { getDB, Session } from "../db";
import { Language } from "../language";
import { Color } from "../types";
import { MapName } from "./mapData";
import { clearAllMaps } from "./markersSlice";

export interface UIState {
  currentMap: MapName;
  markerColor: Color;
  lang: Language;
  isTrackPad: boolean;
  loading: boolean;
  session: Session | null;
}

const initialState: UIState = {
  currentMap: MapName.CustomsMain,
  // currentMap: MapName.CustomsHiddenStashes
  markerColor: "#ff0000",
  lang: Language.EN,
  isTrackPad: false,
  loading: false,
  session: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectMap: (state, action: PayloadAction<{ mapId: MapName }>) => {
      state.currentMap = action.payload.mapId;
    },
    changeMarkerColor: (state, action: PayloadAction<{ color: Color }>) => {
      state.markerColor = action.payload.color;
    },
    switchToTrackPad: (
      state,
      action: PayloadAction<{ isTrackPad: boolean }>
    ) => {
      state.isTrackPad = action.payload.isTrackPad;
    },
    updateSessionLastAccess: (
      state,
      action: PayloadAction<{ sessionId: string; lastAccess: string }>
    ) => {
      if (state.session && state.session.id === action.payload.sessionId) {
        state.session.lastAccess = action.payload.lastAccess;
      }
    },
    selectLanguage: (state, action: PayloadAction<{ lang: Language }>) => {
      state.lang = action.payload.lang;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadSession.fulfilled, (state, action) => {
      state.loading = false;
      state.session = action.payload.session;
    });
    builder.addCase(loadSession.rejected, (state, action) => {
      state.loading = false;
      console.error(action.error);
    });
  },
});

export const {
  changeMarkerColor,
  switchToTrackPad,
  updateSessionLastAccess,
  selectLanguage,
} = uiSlice.actions;

export const selectCurrentMap = (state: AppState) => state.ui.currentMap;
export const selectMarkerColor = (state: AppState) => state.ui.markerColor;
export const selectIsTrackPad = (state: AppState) => state.ui.isTrackPad;
export const selectCurrentSessionId = (state: AppState) => state.ui.session?.id;
export const selectCurrentSession = (state: AppState) => state.ui.session;
export const selectIsLoading = (state: AppState) => state.ui.loading;
export const selectCurrentLang = (state: AppState) => state.ui.lang;

export const loadSession = createAsyncThunk<
  { session: Session },
  string | undefined,
  { state: AppState }
>(
  "ui/loadSession",
  async (sessionId: string | undefined, { dispatch }) => {
    const session = sessionId
      ? await getDB().loadSession(sessionId)
      : await getDB().createSession();
    dispatch(clearAllMaps());
    getDB().listen(session.id);
    return { session };
  },
  {
    // This condition prevents us from loading session what has already been loaded
    condition(sessionId: string | undefined, { getState }) {
      return (
        sessionId === undefined ||
        selectCurrentSessionId(getState()) !== sessionId
      );
    },
  }
);

export const selectMap =
  ({ mapId }: { mapId: MapName }) =>
  (dispatch: AppDispatch, getState: () => AppState) => {
    const sessionId = selectCurrentSessionId(getState());
    if (!sessionId) return;
    dispatch(uiSlice.actions.selectMap({ mapId }));
  };

export default uiSlice.reducer;

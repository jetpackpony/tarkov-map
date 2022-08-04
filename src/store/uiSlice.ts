import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";
import { Language } from "../I18nContext";
import { Color } from "../types";
import { MapName } from "./mapData";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    currentMap: MapName.CustomsMain
    // currentMap: MapName.CustomsHiddenStashes
    ,
    markerColor: "#ff0000",
    lang: Language.EN,
    isTrackPad: false
  },
  reducers: {
    selectMap: (state, action: PayloadAction<{ mapId: MapName }>) => {
      state.currentMap = action.payload.mapId;
    },
    changeMarkerColor: (state, action: PayloadAction<{ color: Color }>) => {
      state.markerColor = action.payload.color;
    },
    switchToTrackPad: (state, action: PayloadAction<{ isTrackPad: boolean }>) => {
      state.isTrackPad = action.payload.isTrackPad;
    }
  }
});

export const { selectMap, changeMarkerColor, switchToTrackPad } = uiSlice.actions;

export const selectCurrentMap = (state: AppState) => state.ui.currentMap;
export const selectMarkerColor = (state: AppState) => state.ui.markerColor;

export default uiSlice.reducer;
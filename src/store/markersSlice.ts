import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { AppDispatch, AppState } from ".";
import { getDB } from "../firebase";
import { Color, Coords, Marker } from "../types";
import { MapName } from "./mapData";
import { selectCurrentMap, selectMarkerColor } from "./uiSlice";

export type MarkersState = {
  [key in MapName]: {
    markers: Marker[],
    selectedExtracts: string[]
  }
};

const remove = (id: number, list: any[]) => {
  return list.slice(0, id).concat(list.slice(id + 1));
};

export const getMapInitState = () => ({
  markers: [],
  selectedExtracts: []
});

const getAllMapsInitState = (): MarkersState => {
  return Object.values(MapName).reduce((res, mapName) => {
    res[mapName] = getMapInitState();
    return res;
  }, {} as MarkersState);
};

export const markersSlice = createSlice({
  name: "markers",
  initialState: getAllMapsInitState(),
  reducers: {
    drawMarker: (state, action: PayloadAction<{ mapName: MapName, id: string, coords: Coords, color: Color }>) => {
      const { id, coords, color, mapName } = action.payload;
      state[mapName].markers.push({ id, coords, color, type: "user" });
    },
    eraseMarkers: (state, action: PayloadAction<{ mapName: MapName, ids: string[] }>) => {
      const { mapName, ids } = action.payload;
      state[mapName].markers = (
        state[mapName].markers
          .filter((m) => !ids.includes(m.id))
      );
    },
    clearMapById: (state, action: PayloadAction<{ mapId: MapName }>) => {
      state[action.payload.mapId] = getMapInitState();
    },
    selectExtract: (state, action: PayloadAction<{ mapName: MapName, extId: string }>) => {
      const { mapName, extId } = action.payload;
      const selectedExtracts = state[mapName].selectedExtracts;
      const index = selectedExtracts.findIndex((id) => id === extId);
      if (index < 0) {
        state[mapName].selectedExtracts.push(extId);
      }
    },
    unselectExtract: (state, action: PayloadAction<{ mapName: MapName, extId: string }>) => {
      const { mapName, extId } = action.payload;
      const selectedExtracts = state[mapName].selectedExtracts;
      const index = selectedExtracts.findIndex((id) => id === extId);
      if (index >= 0) {
        state[mapName].selectedExtracts = remove(index, selectedExtracts);
      }
    }
  }
});

export const { drawMarker, eraseMarkers, clearMapById, selectExtract, unselectExtract } = markersSlice.actions;

export const selectIsExtractSelected = (extId: string) => (state: AppState) => {
  const selectedExtracts = state.markers[selectCurrentMap(state)].selectedExtracts;
  const index = selectedExtracts.findIndex((id) => id === extId);
  return (index >= 0);
};

export const addMarker = (coords: Coords) =>
  (dispatch: AppDispatch, getState: () => AppState) => {
    const id = nanoid(5);
    const color = selectMarkerColor(getState());
    const mapName = selectCurrentMap(getState());
    getDB().addMarker(id, mapName, { coords, color });
    dispatch(drawMarker({ id, coords, color, mapName }));
  };

export const removeMarkers = (ids: string[]) =>
  (dispatch: AppDispatch, getState: () => AppState) => {
    const mapName = selectCurrentMap(getState());
    ids.forEach((id) => {
      getDB().removeMarker(id, mapName);
    });
    dispatch(eraseMarkers({ mapName, ids }));
  };

export const toggleExtract = (extId: string) =>
  (dispatch: AppDispatch, getState: () => AppState) => {
    const mapName = selectCurrentMap(getState());
    const isExtractSelected = selectIsExtractSelected(extId)(getState());
    if (isExtractSelected) {
      getDB().removeExtraction(extId, mapName);
      dispatch(unselectExtract({ mapName, extId }));
    } else {
      getDB().addExtraction(extId, mapName);
      dispatch(selectExtract({ mapName, extId }));
    }
  };

export const clearMap = () =>
  (dispatch: AppDispatch, getState: () => AppState) => {
    const mapName = selectCurrentMap(getState());
    getDB().clearMap(mapName);
    dispatch(clearMapById({ mapId: mapName }));
  };

export default markersSlice.reducer;
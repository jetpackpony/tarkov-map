import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { AppDispatch, AppState } from ".";
import { getDB } from "../db";
import { Color, Coords, ExtractMarker, Marker } from "../types";
import mapData, { MapName } from "./mapData";
import {
  selectCurrentMap,
  selectCurrentSessionId,
  selectMarkerColor,
} from "./uiSlice";

export type MarkersState = {
  [key in MapName]: {
    markers: Marker[];
    selectedExtracts: string[];
  };
};

const remove = <T>(id: number, list: T[]): T[] => {
  return list.slice(0, id).concat(list.slice(id + 1));
};

export const getMapInitState = () => ({
  markers: [],
  selectedExtracts: [],
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
    drawMarker: (
      state,
      action: PayloadAction<{
        mapName: MapName;
        id: string;
        coords: Coords;
        color: Color;
      }>
    ) => {
      const { id, coords, color, mapName } = action.payload;
      state[mapName].markers.push({ id, coords, color, type: "user" });
    },
    eraseMarkers: (
      state,
      action: PayloadAction<{ mapName: MapName; ids: string[] }>
    ) => {
      const { mapName, ids } = action.payload;
      state[mapName].markers = state[mapName].markers.filter(
        (m) => !ids.includes(m.id)
      );
    },
    clearMap: (state, action: PayloadAction<{ mapId: MapName }>) => {
      state[action.payload.mapId] = getMapInitState();
    },
    clearAllMaps: (state) => {
      Object.values(MapName).forEach((mapId) => {
        state[mapId] = getMapInitState();
      });
    },
    selectExtract: (
      state,
      action: PayloadAction<{ mapName: MapName; extId: string }>
    ) => {
      const { mapName, extId } = action.payload;
      const selectedExtracts = state[mapName].selectedExtracts;
      const index = selectedExtracts.findIndex((id) => id === extId);
      if (index < 0) {
        state[mapName].selectedExtracts.push(extId);
      }
    },
    unselectExtract: (
      state,
      action: PayloadAction<{ mapName: MapName; extId: string }>
    ) => {
      const { mapName, extId } = action.payload;
      const selectedExtracts = state[mapName].selectedExtracts;
      const index = selectedExtracts.findIndex((id) => id === extId);
      if (index >= 0) {
        state[mapName].selectedExtracts = remove(index, selectedExtracts);
      }
    },
  },
});

export const {
  drawMarker,
  eraseMarkers,
  clearAllMaps,
  selectExtract,
  unselectExtract,
} = markersSlice.actions;

export const selectIsExtractSelected = (extId: string) => (state: AppState) => {
  const index = selectSelectedExtracts(state).findIndex((id) => id === extId);
  return index >= 0;
};

export const selectSelectedExtracts = (state: AppState) => {
  return state.markers[selectCurrentMap(state)].selectedExtracts;
};

export const selectUserMarkers = (state: AppState) => {
  const mapName = selectCurrentMap(state);
  return state.markers[mapName].markers;
};

export const selectExtractionMarkers = (state: AppState): ExtractMarker[] => {
  const mapName = selectCurrentMap(state);
  const currentMapData = mapData.maps[mapName];
  return currentMapData.extracts
    .filter((e) => state.markers[mapName].selectedExtracts.includes(e.id))
    .map((e) => {
      return {
        ...e,
        type: "extraction",
      };
    });
};

export const selectMarkers = (state: AppState) => {
  return [...selectUserMarkers(state), ...selectExtractionMarkers(state)];
};

export const addMarker =
  (coords: Coords) => (dispatch: AppDispatch, getState: () => AppState) => {
    const sessionId = selectCurrentSessionId(getState());
    if (!sessionId) return;
    const markerId = nanoid(5);
    const color = selectMarkerColor(getState());
    const mapName = selectCurrentMap(getState());
    getDB().addMarker(sessionId, markerId, mapName, { coords, color });
    dispatch(drawMarker({ id: markerId, coords, color, mapName }));
  };

export const removeMarkers =
  (ids: string[]) => (dispatch: AppDispatch, getState: () => AppState) => {
    const sessionId = selectCurrentSessionId(getState());
    if (!sessionId) return;
    const mapName = selectCurrentMap(getState());
    ids.forEach((markerId) => {
      getDB().removeMarker(sessionId, markerId);
    });
    dispatch(eraseMarkers({ mapName, ids }));
  };

export const toggleExtract =
  (extId: string) => (dispatch: AppDispatch, getState: () => AppState) => {
    const sessionId = selectCurrentSessionId(getState());
    if (!sessionId) return;
    const mapName = selectCurrentMap(getState());
    const isExtractSelected = selectIsExtractSelected(extId)(getState());
    if (isExtractSelected) {
      getDB().removeExtraction(sessionId, extId, mapName);
      dispatch(unselectExtract({ mapName, extId }));
    } else {
      getDB().addExtraction(sessionId, extId, mapName);
      dispatch(selectExtract({ mapName, extId }));
    }
  };

export const clearMap =
  () => (dispatch: AppDispatch, getState: () => AppState) => {
    const sessionId = selectCurrentSessionId(getState());
    if (!sessionId) return;
    const mapName = selectCurrentMap(getState());
    getDB().clearMap(sessionId, mapName);
    dispatch(markersSlice.actions.clearMap({ mapId: mapName }));
  };

export default markersSlice.reducer;

export const rehydrate = () => {
  return markersSlice.getInitialState();
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { append, concat, includes, lensPath, reject, set, slice, view } from "rambda";
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
  return concat(slice(0, id, list), slice(id + 1, Infinity, list));
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
      const newMarker: Marker = { id, coords, color, type: "user" };
      const lens = lensPath([mapName, 'markers']);
      const markers = view<MarkersState, Marker[]>(lens, state);
      if (!markers) {
        return state;
      }
      return set(lens, append(newMarker, markers), state);
    },
    eraseMarkers: (state, action: PayloadAction<{ mapName: MapName, ids: string[] }>) => {
      const { mapName, ids } = action.payload;
      const lens = lensPath([mapName, 'markers']);
      const markers = view<MarkersState, Marker[]>(lens, state);
      if (!markers) {
        return state;
      }
      const newMarkers = reject(
        (m) => includes(m.id, ids),
        markers
      );
      return set(lens, newMarkers, state);
    },
    clearMapById: (state, action: PayloadAction<{ mapId: MapName }>) => {
      const mapStateLens = lensPath([action.payload.mapId]);
      return set(mapStateLens, getMapInitState(), state);
    },
    selectExtract: (state, action: PayloadAction<{ mapName: MapName, extId: string }>) => {
      const lens = lensPath([action.payload.mapName, 'selectedExtracts']);
      const selectedExtracts = view<MarkersState, string[]>(lens, state);
      if (!selectedExtracts) {
        return state;
      }
      const index = selectedExtracts.findIndex((id) => id === action.payload.extId);
      if (index >= 0) {
        return state;
      }
      return set(lens, append(action.payload.extId, selectedExtracts), state);
    },
    unselectExtract: (state, action: PayloadAction<{ mapName: MapName, extId: string }>) => {
      const lens = lensPath(['mapState', action.payload.mapName, 'selectedExtracts']);
      const selectedExtracts = view<MarkersState, string[]>(lens, state);
      if (!selectedExtracts) {
        return state;
      }
      const index = selectedExtracts.findIndex((id) => id === action.payload.extId);
      if (index < 0) {
        return state;
      }
      return set(lens, remove(index, selectedExtracts), state);
    }
  }
});

export const { drawMarker, eraseMarkers, clearMapById, selectExtract, unselectExtract } = markersSlice.actions;

export const selectIsExtractSelected = (extId: string) => (state: AppState) => {
  const selLens = lensPath(['markers', selectCurrentMap(state), 'selectedExtracts']);
  const selectedExtracts = view<AppState, string[]>(selLens, state);
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
import { lensPath, view, set, append, slice, concat, reject, includes } from 'rambda';
import { AppState, Color, Coords, Marker } from '../types';
import { Action, ACTION_TYPES } from './actions';
import initState from './initialState';
import { getMapInitState } from './initialState';
import { MapName } from './mapData';

const remove = (id: number, list: any[]) => {
  return concat(slice(0, id, list), slice(id + 1, Infinity, list));
};
export const isExtractSelected = (state: AppState, extId: string) => {
  const selLens = lensPath(['mapState', getCurrentMap(state), 'selectedExtracts']);
  const selectedExtracts = view<AppState, string[]>(selLens, state);
  const index = selectedExtracts.findIndex((id) => id === extId);
  return (index >= 0)
};

export const getCurrentMap = (state: AppState) => state.ui.currentMap;
export const getCurrentMarkerColor = (state: AppState) => state.ui.markerColor;

const toggleExtract = (state: AppState, extId: string) => {
  return (isExtractSelected(state, extId))
    ? unselectExtract(state, getCurrentMap(state), extId)
    : selectExtract(state, getCurrentMap(state), extId);
};
const selectExtract = (state: AppState, mapName: MapName, extId: string) => {
  const lens = lensPath(['mapState', mapName, 'selectedExtracts']);
  const selectedExtracts = view<AppState, string[]>(lens, state);
  if (!selectedExtracts) {
    return state;
  }
  const index = selectedExtracts.findIndex((id) => id === extId);
  if (index >= 0) {
    return state;
  }
  return set(lens, append(extId, selectedExtracts), state);
};
const unselectExtract = (state: AppState, mapName: MapName, extId: string) => {
  const lens = lensPath(['mapState', mapName, 'selectedExtracts']);
  const selectedExtracts = view<AppState, string[]>(lens, state);
  if (!selectedExtracts) {
    return state;
  }
  const index = selectedExtracts.findIndex((id) => id === extId);
  if (index < 0) {
    return state;
  }
  return set(lens, remove(index, selectedExtracts), state);
};

const addMarker = (state: AppState, id: string, coords: Coords) => {
  return drawMarker(state, getCurrentMap(state), id, coords, getCurrentMarkerColor(state));
};
const drawMarker = (state: AppState, mapName: MapName, id: string, coords: Coords, color: Color) => {
  const newMarker = { id, coords, color };
  const lens = lensPath(['mapState', mapName, 'markers']);
  const markers = view<AppState, Marker[]>(lens, state);
  if (!markers) {
    return state;
  }
  return set(lens, append(newMarker, markers), state);
};

const removeMarker = (state: AppState, ids: string[]) => {
  return eraseMarker(state, getCurrentMap(state), ids);
};
const eraseMarker = (state: AppState, mapName: MapName, ids: string[]) => {
  const lens = lensPath(['mapState', mapName, 'markers']);
  const markers = view<AppState, Marker[]>(lens, state);
  if (!markers) {
    return state;
  }
  const newMarkers = reject(
    (m) => includes(m.id, ids),
    markers
  );
  return set(lens, newMarkers, state);
};

const selectMap = (state: AppState, mapId: MapName) => {
  return {
    ...state,
    ui: {
      ...state.ui,
      currentMap: mapId
    }
  };
};

const changeMarkerColor = (state: AppState, color: Color) => {
  return {
    ...state,
    ui: {
      ...state.ui,
      markerColor: color
    }
  };
};

const clearMap = (state: AppState, mapId: MapName) => {
  const mapStateLens = lensPath(['mapState', mapId]);
  return set(mapStateLens, getMapInitState(), state);
};

const switchToTrackPad = (state: AppState, isTrackPad: boolean) => {
  return {
    ...state,
    ui: {
      ...state.ui,
      isTrackPad
    }
  };
};

const reducer = (state = initState, action: Action) => {
  switch(action.type) {
    case ACTION_TYPES.TOGGLE_EXTRACT:
      return toggleExtract(state, action.extId);
    case ACTION_TYPES.SELECT_EXTRACT:
      return selectExtract(state, action.mapName, action.extId);
    case ACTION_TYPES.UNSELECT_EXTRACT:
      return unselectExtract(state, action.mapName, action.extId);

    case ACTION_TYPES.DRAW_MARKER:
      return drawMarker(state, action.mapName, action.id, action.coords, action.color);
    case ACTION_TYPES.ADD_MARKER:
      return addMarker(state, action.id, action.coords);

    case ACTION_TYPES.REMOVE_MARKER:
      return removeMarker(state, action.ids);
    case ACTION_TYPES.ERASE_MARKER:
      return eraseMarker(state, action.mapName, action.ids);

    case ACTION_TYPES.SELECT_MAP:
      return selectMap(state, action.mapId);

    case ACTION_TYPES.CHANGE_MARKER_COLOR:
      return changeMarkerColor(state, action.color);

    case ACTION_TYPES.CLEAR_MAP:
      return clearMap(state, action.mapId);

    case ACTION_TYPES.SWITCH_TO_TRACKPAD:
      return switchToTrackPad(state, action.isTrackPad);

    default:
      return state;
  }
}

export default reducer;
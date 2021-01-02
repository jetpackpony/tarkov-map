import { lensPath, view, set, append, slice, concat, reject, includes } from 'rambda';
import { ACTION_TYPES } from './actions';
import initState from './initialState';
import { getMapInitState } from './initialState';

const remove = (id, list) => {
  return concat(slice(0, id, list), slice(id + 1, Infinity, list));
};
export const isExtractSelected = (state, extId) => {
  const selLens = lensPath(['mapState', getCurrentMap(state), 'selectedExtracts']);
  const selectedExtracts = view(selLens, state);
  const index = selectedExtracts.findIndex((id) => id === extId);
  return (index >= 0)
};

export const getCurrentMap = (state) => state.ui.currentMap;
export const getCurrentMarkerColor = (state) => state.ui.markerColor;

const toggleExtract = (state, extId) => {
  return (isExtractSelected(state, extId))
    ? unselectExtract(state, getCurrentMap(state), extId)
    : selectExtract(state, getCurrentMap(state), extId);
};
const selectExtract = (state, mapName, extId) => {
  const lens = lensPath(['mapState', mapName, 'selectedExtracts']);
  const selectedExtracts = view(lens, state);
  if (!selectedExtracts) {
    return state;
  }
  const index = selectedExtracts.findIndex((id) => id === extId);
  if (index >= 0) {
    return state;
  }
  return set(lens, append(extId, selectedExtracts), state);
};
const unselectExtract = (state, mapName, extId) => {
  const lens = lensPath(['mapState', mapName, 'selectedExtracts']);
  const selectedExtracts = view(lens, state);
  if (!selectedExtracts) {
    return state;
  }
  const index = selectedExtracts.findIndex((id) => id === extId);
  if (index < 0) {
    return state;
  }
  return set(lens, remove(index, selectedExtracts), state);
};

const addMarker = (state, id, coords) => {
  return drawMarker(state, getCurrentMap(state), id, coords, getCurrentMarkerColor(state));
};
const drawMarker = (state, mapName, id, coords, color) => {
  const newMarker = { id, coords, color };
  const lens = lensPath(['mapState', mapName, 'markers']);
  const markers = view(lens, state);
  if (!markers) {
    return state;
  }
  return set(lens, append(newMarker, markers), state);
};

const removeMarker = (state, ids) => {
  return eraseMarker(state, getCurrentMap(state), ids);
};
const eraseMarker = (state, mapName, ids) => {
  const lens = lensPath(['mapState', mapName, 'markers']);
  const markers = view(lens, state);
  if (!markers) {
    return state;
  }
  const newMarkers = reject(
    (m) => includes(m.id, ids),
    markers
  );
  return set(lens, newMarkers, state);
};

const selectMap = (state, mapId) => {
  return {
    ...state,
    ui: {
      ...state.ui,
      currentMap: mapId
    }
  };
};

const changeMarkerColor = (state, color) => {
  return {
    ...state,
    ui: {
      ...state.ui,
      markerColor: color
    }
  };
};

const clearMap = (state, mapId) => {
  const mapStateLens = lensPath(['mapState', mapId]);
  return set(mapStateLens, getMapInitState(), state);
};

const reducer = (state = initState, action) => {
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
      return addMarker(state, action.id, action.coords, action.color);

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

    default:
      return state;
  }
}

export default reducer;
import * as R from 'ramda';
import { ACTION_TYPES } from './actions';
import initState from './initialState';
import { getMapInitState } from './initialState';

export const isExtractSelected = (state, extId) => {
  const selLens = R.lensPath(['mapState', getCurrentMap(state), 'selectedExtracts']);
  const selectedExtracts = R.view(selLens, state);
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
  const lens = R.lensPath(['mapState', mapName, 'selectedExtracts']);
  const selectedExtracts = R.view(lens, state);
  const index = selectedExtracts.findIndex((id) => id === extId);
  if (index >= 0) {
    return state;
  }
  return R.set(lens, R.append(extId, selectedExtracts), state);
};
const unselectExtract = (state, mapName, extId) => {
  const lens = R.lensPath(['mapState', mapName, 'selectedExtracts']);
  const selectedExtracts = R.view(lens, state);
  const index = selectedExtracts.findIndex((id) => id === extId);
  if (index < 0) {
    return state;
  }
  return R.set(lens, R.remove(index, 1, selectedExtracts), state);
};

const addMarker = (state, id, coords) => {
  return drawMarker(state, getCurrentMap(state), id, coords, getCurrentMarkerColor(state));
};
const drawMarker = (state, mapName, id, coords, color) => {
  const newMarker = { id, coords, color };
  const lens = R.lensPath(['mapState', mapName, 'markers']);
  const markers = R.view(lens, state);
  return R.set(lens, R.append(newMarker, markers), state);
};

const removeMarker = (state, ids) => {
  return eraseMarker(state, getCurrentMap(state), ids);
};
const eraseMarker = (state, mapName, ids) => {
  const lens = R.lensPath(['mapState', mapName, 'markers']);
  const markers = R.view(lens, state);
  const newMarkers = R.reject(
    (m) => R.includes(m.id, ids),
    markers
  );
  return R.set(lens, newMarkers, state);
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
  const mapStateLens = R.lensPath(['mapState', mapId]);
  return R.set(mapStateLens, getMapInitState(), state);
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
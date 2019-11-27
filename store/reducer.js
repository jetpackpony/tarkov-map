import * as R from 'ramda';
import { ACTION_TYPES } from './actions';
import initState from './initialState';

const toggleExtract = (state, extId) => {
  const selLens = R.lensPath(['mapState', state.ui.currentMap, 'selectedExtracts']);
  const selectedExtracts = R.view(selLens, state);
  const index = selectedExtracts.findIndex((id) => id === extId);
  const newExtracts =
    (index >= 0)
      ? R.remove(index, 1, selectedExtracts)
      : R.append(extId, selectedExtracts);
  return R.set(selLens, newExtracts, state);
};

const getMarkerLens = (state) =>
  R.lensPath(['mapState', state.ui.currentMap, 'markers']);
const getMarkers = (state) => {
  return R.view(getMarkerLens(state), state);
};
const addMarker = (state, id, coords) => {
  const newMarker = { id, coords };
  const markers = getMarkers(state);
  return R.set(getMarkerLens(state), R.append(newMarker, markers), state);
};

const removeMarker = (state, ids) => {
  const markers = getMarkers(state);
  const newMarkers = R.reject(
    (m) => R.includes(m.id, ids),
    markers
  );
  return R.set(getMarkerLens(state), newMarkers, state);
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

const reducer = (state = initState, action) => {
  switch(action.type) {
    case ACTION_TYPES.TOGGLE_EXTRACT:
      return toggleExtract(state, action.extId);
    case ACTION_TYPES.ADD_MARKER:
      return addMarker(state, action.id, action.coords);
    case ACTION_TYPES.REMOVE_MARKER:
      return removeMarker(state, action.ids);
    case ACTION_TYPES.SELECT_MAP:
      return selectMap(state, action.mapId);
    default:
      return state;
  }
}

export default reducer;
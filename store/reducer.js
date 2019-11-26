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

const addMarker = (state, id, coords) => {
  const markersLens = R.lensPath(['mapState', state.ui.currentMap, 'markers']);
  const markers = R.view(markersLens, state);
  const newMarker = { id, coords };

  return R.set(markersLens, R.append(newMarker, markers), state);
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case ACTION_TYPES.TOGGLE_EXTRACT:
      return toggleExtract(state, action.extId);
    case ACTION_TYPES.ADD_MARKER:
      return addMarker(state, action.id, action.coords);
    default:
      return state;
  }
}

export default reducer;
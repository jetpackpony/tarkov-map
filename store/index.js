import * as R from 'ramda';
import { createStore } from 'redux';
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
  debugger
  return R.set(selLens, newExtracts, state);
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case ACTION_TYPES.TOGGLE_EXTRACT:
      return toggleExtract(state, action.extId);
    default:
      return state;
  }
}

const makeStore = () => {
  return createStore(reducer);
};

export default makeStore;
import { createStore } from 'redux';
import { ACTION_TYPES } from './actions';
import initState from './initialState';

const reducer = (state = initState, action) => {
  switch(action.type) {
    case ACTION_TYPES.ADD_MARKER:
      return {
        ...state,
        markers: [
          ...state.markers,
          action.coords
        ]
      };
    default:
      return state;
  }
}

const makeStore = () => {
  return createStore(reducer);
};

export default makeStore;
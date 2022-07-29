import {
  isExtractSelected,
  getCurrentMap,
  getCurrentMarkerColor
} from '../reducer';
import { Action, ACTION_TYPES } from '../actions';
import { Dispatch, Middleware } from 'redux';
import { AppState } from '../../types';
import { DB } from '../../firebase';

const updateDB = (db: DB): Middleware<{}, AppState, Dispatch<Action>> =>
  (store) => (next) => (action: Action) => {
    const state = store.getState();
    switch (action.type) {
      case ACTION_TYPES.ADD_MARKER:
        db.addMarker(action.id, getCurrentMap(state), {
          coords: action.coords,
          color: getCurrentMarkerColor(state)
        });
        break;
      case ACTION_TYPES.REMOVE_MARKER:
        action.ids.forEach((id) => {
          db.removeMarker(id, getCurrentMap(state));
        });
        break;
      case ACTION_TYPES.TOGGLE_EXTRACT:
        if (isExtractSelected(state, action.extId)) {
          db.removeExtraction(action.extId, getCurrentMap(state));
        } else {
          db.addExtraction(action.extId, getCurrentMap(state));
        }
        break;
      case ACTION_TYPES.CLEAR_MAP:
        db.clearMap(action.mapId);
        break;
    }
    return next(action);
  };

export default updateDB;
import {
  isExtractSelected,
  getCurrentMap,
  getCurrentMarkerColor
} from '../reducer';
import { ACTION_TYPES } from '../actions';

const updateDB = (db) =>
  (store) => (next) => (action) => {
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
    }
    return next(action);
  };

export default updateDB;
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { createLogger } from 'redux-logger'
import {
  drawMarker,
  eraseMarkers,
  selectExtract,
  unselectExtract
} from './actions';
import updateDB from './middleware/updateDB';

const subscribeToDBUpdates = (db, dispatch) => {
  db.addDataListener((type, item) => {
    if (type === "added") {
      if (item.type === "marker") {
        dispatch(drawMarker(
          item.map,
          item.id,
          item.data.coords,
          item.data.color
        ));
      }
      if (item.type === "ext") {
        dispatch(selectExtract(item.map, item.id));
      }
    }
    if (type === "removed") {
      if (item.type === "marker") {
        dispatch(eraseMarkers(item.map, [item.id]));
      }
      if (item.type === "ext") {
        dispatch(unselectExtract(item.map, item.id));
      }
    }
  });
  db.listen();
};

const makeStore = (db) => {
  const middlewares = [
    createLogger()
  ];
  if (db) {
    middlewares.push(updateDB(db));
  }

  const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
  );

  if (db) {
    subscribeToDBUpdates(db, store.dispatch);
  }

  return store;
};

export default makeStore;
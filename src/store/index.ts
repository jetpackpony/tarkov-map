import { Dispatch } from 'redux';
import reducer from './reducer';
import { createLogger } from 'redux-logger'
import {
  Action,
  drawMarker,
  eraseMarkers,
  selectExtract,
  unselectExtract
} from './actions';
import updateDB from './middleware/updateDB';
import { DB } from '../firebase';
import { configureStore } from '@reduxjs/toolkit';

const subscribeToDBUpdates = (db: DB, dispatch: Dispatch<Action>) => {
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

const makeStore = (db: DB | null) => {
  const middlewares = [];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }
  if (db) {
    middlewares.push(updateDB(db));
  }

  const store = configureStore({
    reducer,
    middleware: middlewares
  });

  if (db) {
    subscribeToDBUpdates(db, store.dispatch);
  }

  return store;
};

export default makeStore;
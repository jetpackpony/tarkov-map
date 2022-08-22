import {
  drawMarker,
  eraseMarkers,
  selectExtract,
  unselectExtract
} from './markersSlice';
import { DB } from '../firebase';
import { configureStore } from '@reduxjs/toolkit';
import markersReducer from './markersSlice';
import uiReducer from './uiSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const subscribeToDBUpdates = (db: DB, dispatch: AppDispatch) => {
  db.addDataListener((type, item) => {
    if (type === "added") {
      if (item.type === "marker") {
        dispatch(drawMarker({
          mapName: item.map,
          id: item.id,
          coords: item.data.coords,
          color: item.data.color
        }
        ));
      }
      if (item.type === "ext") {
        const id = item.id.replace(item.map + "-", "");
        dispatch(selectExtract({ mapName: item.map, extId: id }));
      }
    }
    if (type === "removed") {
      if (item.type === "marker") {
        dispatch(eraseMarkers({ mapName: item.map, ids: [item.id] }));
      }
      if (item.type === "ext") {
        const id = item.id.replace(item.map + "-", "");
        dispatch(unselectExtract({ mapName: item.map, extId: id}));
      }
    }
  });
};

const makeStore = (db: DB | null) => {
  const store = configureStore({
    reducer: {
      markers: markersReducer,
      ui: uiReducer
    }
  });

  if (db) {
    subscribeToDBUpdates(db, store.dispatch);
  }

  return store;
};

export type AppState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default makeStore;
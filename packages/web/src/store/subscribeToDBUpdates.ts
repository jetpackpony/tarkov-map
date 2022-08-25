import {
  drawMarker,
  eraseMarkers,
  selectExtract,
  unselectExtract
} from './markersSlice';
import type { DB } from '../firebase';
import { updateSessionLastAccess } from './uiSlice';
import { AppDispatch } from '.';

export const subscribeToDBUpdates = (db: DB, dispatch: AppDispatch) => {
  db.addMapObjectListener((type, item) => {
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
        dispatch(unselectExtract({ mapName: item.map, extId: id }));
      }
    }
  });

  db.addSessionListener((session) => {
    dispatch(updateSessionLastAccess({
      sessionId: session.id,
      lastAccess: session.lastAccess
    }));
  });
};

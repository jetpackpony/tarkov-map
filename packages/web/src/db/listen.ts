import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import {
  DBMapObjectListener,
  DBSessionListener,
  isExtractMapObject,
  isMarkerMapObject,
  isSessionInDB,
  sessionDBToSession,
} from "./types";

export const listen =
  (
    sessionCollectionRef: CollectionReference<DocumentData>,
    mapObjectListeners: DBMapObjectListener[],
    sessionListeners: DBSessionListener[],
    currentListeners: Unsubscribe[]
  ) =>
  (sessionId: string): Unsubscribe[] => {
    // Unsub from all current updates
    currentListeners.forEach((l) => l());
    // Empty the array of listeners
    currentListeners.length = 0;

    // Sub to updates for the selected sessionId
    currentListeners.push(
      onSnapshot(
        collection(sessionCollectionRef, sessionId, "mapObjects"),
        (querySnapshot) => {
          querySnapshot.docChanges().forEach((docChange) => {
            const source = docChange.doc.metadata.hasPendingWrites
              ? "local"
              : "server";
            if (source !== "local") {
              const type = docChange.type;
              const data = docChange.doc.data();
              if (isMarkerMapObject(data) || isExtractMapObject(data)) {
                mapObjectListeners.forEach((f) => f(type, data));
              }
            }
          });
        }
      )
    );
    currentListeners.push(
      onSnapshot(doc(sessionCollectionRef, sessionId), (docSnapshot) => {
        const session = docSnapshot.data();
        if (isSessionInDB(session)) {
          sessionListeners.forEach((f) => f(sessionDBToSession(session)));
        }
      })
    );
    return currentListeners;
  };

export const addMapObjectListener =
  (mapObjectListeners: DBMapObjectListener[]) =>
  (f: DBMapObjectListener): void => {
    mapObjectListeners.push(f);
  };

export const addSessionListener =
  (sessionListeners: DBSessionListener[]) =>
  (f: DBSessionListener): void => {
    sessionListeners.push(f);
  };

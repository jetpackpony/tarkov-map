import { initializeApp } from "firebase/app";
import { collection, getFirestore, Unsubscribe } from "firebase/firestore";
import { addMapObjectListener, addSessionListener, listen } from "./listen";
import {
  addExtraction,
  addMarker,
  clearMap,
  removeExtraction,
  removeMarker,
} from "./markers";
import { createSession, loadSession, updateSessionLastAccess } from "./session";
import { DBMapObjectListener, DBSessionListener } from "./types";
export * from "./types";
export type DB = ReturnType<typeof initFirebase>;

const COLLECTION_NAME =
  process.env.NODE_ENV === "production"
    ? process.env.SESSION_COLLECTION_PROD
    : process.env.SESSION_COLLECTION_DEV;

export const getDB = (() => {
  let dbInstance: DB;
  return (): DB => {
    if (!dbInstance) {
      dbInstance = initFirebase();
    }
    return dbInstance;
  };
})();

const initFirebase = () => {
  if (
    !process.env.FIREBASE_API_KEY ||
    !process.env.FIREBASE_PROJECT_ID ||
    !COLLECTION_NAME
  ) {
    throw new Error("Can't find DB credentials in the environment");
  }
  const firebaseApp = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
  const db = getFirestore(firebaseApp);
  const mapObjectListeners: DBMapObjectListener[] = [];
  const sessionListeners: DBSessionListener[] = [];
  const sessionCollectionRef = collection(db, COLLECTION_NAME);
  const currentListeners: Unsubscribe[] = [];

  return {
    listen: listen(
      sessionCollectionRef,
      mapObjectListeners,
      sessionListeners,
      currentListeners
    ),
    addMapObjectListener: addMapObjectListener(mapObjectListeners),
    addSessionListener: addSessionListener(sessionListeners),
    addMarker: addMarker(sessionCollectionRef),
    removeMarker: removeMarker(sessionCollectionRef),
    addExtraction: addExtraction(sessionCollectionRef),
    removeExtraction: removeExtraction(sessionCollectionRef),
    clearMap: clearMap(sessionCollectionRef),
    loadSession: loadSession(sessionCollectionRef),
    createSession: createSession(sessionCollectionRef),
    updateSessionLastAccess: updateSessionLastAccess(sessionCollectionRef),
  };
};

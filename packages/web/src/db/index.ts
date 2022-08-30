import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { MapName } from "../store/mapData";
import {
  DBMapObjectListener,
  DBSessionListener,
  ExtractMapObject,
  isExtractMapObject,
  isMarkerMapObject,
  isSessionInDB,
  MarkerData,
  MarkerMapObject,
  Session,
  sessionDBToSession,
  SessionInDB,
} from "./types";
export * from "./types";
export type DB = ReturnType<typeof initFirebase>;

const lastAccessUpdateDelay = 24 * 60 * 60 * 1000;
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
  let currentListeners: Unsubscribe[] = [];

  // Sub to updates
  const listen = (sessionId: string): Unsubscribe[] => {
    // Unsub from all current updates
    currentListeners.forEach((l) => l());
    currentListeners = [];

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
  const addMapObjectListener = (f: DBMapObjectListener): void => {
    mapObjectListeners.push(f);
  };

  const addSessionListener = (f: DBSessionListener): void => {
    sessionListeners.push(f);
  };

  const getMarkerDoc = (sessionId: string, markerId: string) => {
    return doc(sessionCollectionRef, sessionId, "mapObjects", markerId);
  };

  const addMarker = async (
    sessionId: string,
    markerId: string,
    mapName: MapName,
    data: MarkerData
  ): Promise<void> => {
    const mapObject: MarkerMapObject = {
      id: markerId,
      map: mapName,
      type: "marker",
      data,
    };
    return setDoc(getMarkerDoc(sessionId, markerId), mapObject);
  };

  const removeMarker = (sessionId: string, markerId: string): Promise<void> => {
    return deleteDoc(getMarkerDoc(sessionId, markerId));
  };

  const addExtraction = (
    sessionId: string,
    extId: string,
    mapName: MapName
  ): Promise<void> => {
    const id = `${mapName}-${extId}`;
    const mapObject: ExtractMapObject = {
      id,
      map: mapName,
      type: "ext",
    };
    return setDoc(getMarkerDoc(sessionId, id), mapObject);
  };

  const removeExtraction = (
    sessionId: string,
    extId: string,
    mapName: MapName
  ): Promise<void> => {
    const id = `${mapName}-${extId}`;
    return deleteDoc(getMarkerDoc(sessionId, id));
  };

  const clearMap = async (
    sessionId: string,
    mapName: MapName
  ): Promise<void[]> => {
    const res = await getDocs(
      query(
        collection(sessionCollectionRef, sessionId, "mapObjects"),
        where("map", "==", mapName)
      )
    );
    return Promise.all(res.docs.map((doc) => deleteDoc(doc.ref)));
  };

  const updateSessionLastAccess = async (
    sessionId: string,
    lastAccess: Date
  ): Promise<Date> => {
    const now = new Date();
    if (now.valueOf() - lastAccess.valueOf() > lastAccessUpdateDelay) {
      await updateDoc(doc(sessionCollectionRef, sessionId), {
        lastAccess: Timestamp.fromDate(new Date()),
      });
      return new Date();
    }
    return lastAccess;
  };

  const loadSession = async (sessionId: string): Promise<Session> => {
    const session = await getDoc(doc(sessionCollectionRef, sessionId));
    const data = session.data();
    if (!session.exists() || !isSessionInDB(data)) {
      return createSession();
    }
    return sessionDBToSession(data);
  };

  const createSession = async (): Promise<Session> => {
    const id = nanoid(10);
    const sessionObject: SessionInDB = {
      id,
      createdAt: Timestamp.fromDate(new Date()),
      lastAccess: Timestamp.fromDate(new Date()),
    };
    try {
      await setDoc(doc(sessionCollectionRef, id), sessionObject);
    } catch (e) {
      let msg = "Couldn't create a new session. ";
      if (typeof e === "string") {
        msg += e;
      } else if (e instanceof Error) {
        msg += e.message;
      }
      throw new Error(msg);
    }
    return sessionDBToSession(sessionObject);
  };

  return {
    addMarker,
    removeMarker,
    addExtraction,
    removeExtraction,
    addMapObjectListener,
    addSessionListener,
    listen,
    clearMap,
    loadSession,
    createSession,
    updateSessionLastAccess,
  };
};

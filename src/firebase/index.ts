import { initializeApp } from "firebase/app";
import {
  collection, deleteDoc, doc, getDoc, getDocs,
  getFirestore, onSnapshot, query, setDoc, Unsubscribe, where
} from "firebase/firestore";
import { nanoid } from "nanoid";
import firebaseConfig from './config';
import { DB, DBListener, ExtractMapObject, isExtractMapObject, isMarkerMapObject, isSession, MarkerMapObject, Session } from "./types";
export * from "./types";

let dbInstance: DB | null = null;

export const getDB = (): DB => {
  if (!dbInstance) {
    console.log("Initializing Firebase");
    dbInstance = initFirebase();
  }
  return dbInstance;
};

export const initFirebase = (): DB => {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  if (!process.env.DB_COLLECTION_NAME) {
    throw new Error("Can't find the DB collection name");
  }
  const listeners: DBListener[] = [];
  const sessionCollectionRef = collection(db, 'sessions');
  let currentListener: Unsubscribe | null = null;

  // Sub to updates
  const listen: DB["listen"] = (sessionId, mapName) => {
    if (currentListener) {
      currentListener();
    }
    currentListener = onSnapshot(
      query(
        collection(sessionCollectionRef, sessionId, "mapObjects"),
        where("map", '==', mapName)
      ),
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((docChange) => {
          const source = docChange.doc.metadata.hasPendingWrites ? 'local' : 'server';
          if (source !== 'local') {
            const type = docChange.type;
            const data = docChange.doc.data();
            if (isMarkerMapObject(data) || isExtractMapObject(data)) {
              listeners.forEach((f) => f(type, data));
            }
          }
        })
      }
    );
    return currentListener;
  };

  const addDataListener: DB["addDataListener"] = (f) => {
    listeners.push(f);
  };

  const getMarkerDoc = (sessionId: string, markerId: string) => {
    return doc(sessionCollectionRef, sessionId, "mapObjects", markerId);
  };

  const addMarker: DB["addMarker"] = async (sessionId, markerId, mapName, data) => {
    const mapObject: MarkerMapObject = {
      id: markerId,
      map: mapName,
      type: "marker",
      data
    };
    return setDoc(getMarkerDoc(sessionId, markerId), mapObject);
  };

  const removeMarker: DB["removeMarker"] = (sessionId, markerId) => {
    return deleteDoc(getMarkerDoc(sessionId, markerId));
  };

  const addExtraction: DB["addExtraction"] = (sessionId, extId, mapName) => {
    const id = `${mapName}-${extId}`;
    const mapObject: ExtractMapObject = {
      id,
      map: mapName,
      type: "ext",
      data: {}
    };
    return setDoc(getMarkerDoc(sessionId, id), mapObject);
  };

  const removeExtraction: DB["removeExtraction"] = (sessionId, extId, mapName) => {
    const id = `${mapName}-${extId}`;
    return deleteDoc(getMarkerDoc(sessionId, id));
  };

  const clearMap: DB["clearMap"] = (sessionId, mapName) => {
    return getDocs(
      query(
        collection(sessionCollectionRef, sessionId, "mapObjects"),
        where("map", '==', mapName)
      )
    ).then((res) => {
      res.forEach((doc) => deleteDoc(doc.ref));
    });
  };

  const loadSession: DB["loadSession"] = async (sessionId: string) => {
    const session = await getDoc(doc(sessionCollectionRef, sessionId));
    const data = session.data();
    if (!session.exists() || !isSession(data)) {
      return createSession();
    }
    return data;
  };

  const createSession: DB["createSession"] = async () => {
    const id = nanoid(10);
    const sessionObject: Session = {
      id,
      createdAt: (new Date()).toISOString(),
      lastAccess: (new Date()).toISOString()
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
    };
    return sessionObject;
  };

  return {
    addMarker,
    removeMarker,
    addExtraction,
    removeExtraction,
    addDataListener,
    listen,
    clearMap,
    loadSession,
    createSession
  };
};
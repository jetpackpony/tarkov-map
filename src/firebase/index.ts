import { initializeApp } from "firebase/app";
import {
  collection, deleteDoc, doc, getDocs,
  getFirestore, onSnapshot, query, setDoc, where
} from "firebase/firestore";
import firebaseConfig from './config';
import { DB, DBListener, ExtractMapObject, isExtractMapObject, isMarkerMapObject, MarkerMapObject } from "./types";
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
  const mapObjectsRef = collection(db, process.env.DB_COLLECTION_NAME);
  const listeners: DBListener[] = [];

  // Sub to updates
  const listen: DB["listen"] = () => {
    return onSnapshot(mapObjectsRef, (querySnapshot) => {
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
    });
  };

  const addDataListener: DB["addDataListener"] = (f) => {
    listeners.push(f);
  };

  const addMarker: DB["addMarker"] = (id, mapName, data) => {
    const docName = `${mapName}-${id}`;
    const mapObject: MarkerMapObject = {
      id,
      map: mapName,
      type: "marker",
      data
    };
    return setDoc(doc(mapObjectsRef, docName), mapObject);
  };

  const removeMarker: DB["removeMarker"] = (id, mapName) => {
    const docName = `${mapName}-${id}`;
    return deleteDoc(doc(mapObjectsRef, docName));
  }

  const addExtraction: DB["addExtraction"] = (id, mapName) => {
    const docName = `${mapName}-${id}`;
    const mapObject: ExtractMapObject = {
      id,
      map: mapName,
      type: "ext",
      data: {}
    };
    return setDoc(doc(mapObjectsRef, docName), mapObject);
  };

  const removeExtraction: DB["removeExtraction"] = (id, mapName) => {
    const docName = `${mapName}-${id}`;
    return deleteDoc(doc(mapObjectsRef, docName));
  };

  const clearMap: DB["clearMap"] = (mapName) => {
    return getDocs(query(mapObjectsRef, where("map", '==', mapName)))
      .then((res) => {
        res.forEach((doc) => deleteDoc(doc.ref));
      });
  };

  return {
    addMarker,
    removeMarker,
    addExtraction,
    removeExtraction,
    addDataListener,
    listen,
    clearMap
  };
};
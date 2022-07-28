import { initializeApp } from "firebase/app";
import {
  collection, deleteDoc, doc, getDocs,
  getFirestore, onSnapshot, query, setDoc, where
} from "firebase/firestore";
import firebaseConfig from './config';

const initFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const mapObjectsRef = collection(db, process.env.DB_COLLECTION_NAME);
  const listeners = [];

  // Sub to updates
  const listen = () => {
    return onSnapshot(mapObjectsRef, (querySnapshot) => {
      querySnapshot.docChanges().forEach((docChange) => {
        const source = docChange.doc.metadata.hasPendingWrites ? 'local' : 'server';
        if (source !== 'local') {
          listeners.forEach((f) => f(docChange.type, docChange.doc.data()));
        }
      })
    });
  };

  const addDataListener = (f) => {
    listeners.push(f);
  };

  const addMarker = (id, mapName, data) => {
    const docName = `${mapName}-${id}`;
    const mapObject = {
      id,
      map: mapName,
      type: "marker",
      data
    };
    return setDoc(doc(mapObjectsRef, docName), mapObject);
  };

  const removeMarker = (id, mapName) => {
    const docName = `${mapName}-${id}`;
    return deleteDoc(doc(mapObjectsRef, docName));
  }

  const addExtraction = (id, mapName) => {
    const docName = `${mapName}-${id}`;
    const mapObject = {
      id,
      map: mapName,
      type: "ext",
      data: null
    };
    return setDoc(doc(mapObjectsRef, docName), mapObject);
  };

  const removeExtraction = (id, mapName) => {
    const docName = `${mapName}-${id}`;
    return deleteDoc(doc(mapObjectsRef, docName));
  };

  const clearMap = (mapName) => {
    getDocs(query(mapObjectsRef, where("map", '==', mapName)))
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
}

export default initFirebase;
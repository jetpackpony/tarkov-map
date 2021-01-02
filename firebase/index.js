import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from './config';

const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const mapObjectsRef = db.collection(process.env.DB_COLLECTION_NAME);
  const listeners = [];

  // Sub to updates
  const listen = () => {
    return mapObjectsRef.onSnapshot((querySnapshot) => {
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
    return mapObjectsRef.doc(docName).set(mapObject);
  };

  const removeMarker = (id, mapName) => {
    const docName = `${mapName}-${id}`;
    return mapObjectsRef.doc(docName).delete();
  }

  const addExtraction = (id, mapName) => {
    const docName = `${mapName}-${id}`;
    const mapObject = {
      id,
      map: mapName,
      type: "ext",
      data: null
    };
    return mapObjectsRef.doc(docName).set(mapObject);
  };

  const removeExtraction = (id, mapName) => {
    const docName = `${mapName}-${id}`;
    return mapObjectsRef.doc(docName).delete();
  };

  const clearMap = (mapName) => {
    mapObjectsRef.where("map", '==', mapName).get().then((res) => {
      res.forEach((doc) => doc.ref.delete());
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
import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from './config';

const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const mapObjectsRef = db.collection("mapObjects");

  // Sub to updates
  const unSubscribe = mapObjectsRef.onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((docChange) => {
      const source = docChange.doc.metadata.hasPendingWrites ? 'local' : 'server';
      console.log("Docchange: ", docChange);
      console.log("Source: ", source);
    })
  });

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
  }

  return {
    addMarker,
    removeMarker,
    addExtraction,
    removeExtraction,
    unSubscribe
  };
}

export default initFirebase;
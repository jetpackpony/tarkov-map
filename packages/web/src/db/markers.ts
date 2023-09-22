import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { MapName } from "../store/mapData";
import { ExtractMapObject, MarkerData, MarkerMapObject } from "./types";

const getMarkerDoc =
  (sessionCollectionRef: CollectionReference<DocumentData>) =>
  (sessionId: string, markerId: string) => {
    return doc(sessionCollectionRef, sessionId, "mapObjects", markerId);
  };

export const addMarker =
  (sessionCollectionRef: CollectionReference<DocumentData>) =>
  async (
    sessionId: string,
    markerId: string,
    mapName: MapName,
    data: MarkerData,
  ): Promise<void> => {
    const mapObject: MarkerMapObject = {
      id: markerId,
      map: mapName,
      type: "marker",
      data,
    };
    return setDoc(
      getMarkerDoc(sessionCollectionRef)(sessionId, markerId),
      mapObject,
    );
  };

export const removeMarker =
  (sessionCollectionRef: CollectionReference<DocumentData>) =>
  (sessionId: string, markerId: string): Promise<void> => {
    return deleteDoc(getMarkerDoc(sessionCollectionRef)(sessionId, markerId));
  };

export const addExtraction =
  (sessionCollectionRef: CollectionReference<DocumentData>) =>
  (sessionId: string, extId: string, mapName: MapName): Promise<void> => {
    const id = `${mapName}-${extId}`;
    const mapObject: ExtractMapObject = {
      id,
      map: mapName,
      type: "ext",
    };
    return setDoc(getMarkerDoc(sessionCollectionRef)(sessionId, id), mapObject);
  };

export const removeExtraction =
  (sessionCollectionRef: CollectionReference<DocumentData>) =>
  (sessionId: string, extId: string, mapName: MapName): Promise<void> => {
    const id = `${mapName}-${extId}`;
    return deleteDoc(getMarkerDoc(sessionCollectionRef)(sessionId, id));
  };

export const clearMap =
  (sessionCollectionRef: CollectionReference<DocumentData>) =>
  async (sessionId: string, mapName: MapName): Promise<void[]> => {
    const res = await getDocs(
      query(
        collection(sessionCollectionRef, sessionId, "mapObjects"),
        where("map", "==", mapName),
      ),
    );
    return Promise.all(res.docs.map((doc) => deleteDoc(doc.ref)));
  };

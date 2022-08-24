import { DocumentChangeType, Timestamp, Unsubscribe } from "firebase/firestore";
import { MapName } from "../store/mapData";
import { Color, Coords, isColor, isCoords } from "../types";

export type DBListener = (type: DocumentChangeType, data: MapObject) => void;

export interface DB {
  listen: (sessionId: string) => Unsubscribe,
  addDataListener: (f: DBListener) => void,
  addMarker: (sessionId: string, markerId: string, mapName: MapName, data: MarkerData) => Promise<void>,
  removeMarker: (sessionId: string, markerId: string) => Promise<void>,
  addExtraction: (sessionId: string, extId: string, mapName: MapName) => Promise<void>,
  removeExtraction: (sessionId: string, extId: string, mapName: MapName) => Promise<void>,
  clearMap: (sessionId: string, mapName: MapName) => Promise<void[]>,
  loadSession: (sessionId: string) => Promise<Session>;
  createSession: () => Promise<Session>;
};

export interface MarkerMapObject {
  id: string,
  map: MapName,
  type: "marker",
  data: MarkerData
};

export interface MarkerData {
  coords: Coords,
  color: Color
};

export interface ExtractMapObject {
  id: string,
  map: MapName,
  type: "ext",
  data: ExtractData
};

export interface ExtractData {

};

export type MapObject = MarkerMapObject | ExtractMapObject;

export const isMakerData = (data: any): data is MarkerData => {
  return (
    data
    && (data.coords && isCoords(data.coords))
    && (data.color && isColor(data.color))
  );
};

export const isMarkerMapObject = (obj: any): obj is MarkerMapObject => {
  return (
    obj
    && (obj.id && typeof obj.id === "string")
    && (obj.map && Object.values(MapName).includes(obj.map))
    && (obj.type && obj.type === "marker")
    && (obj.data && isMakerData(obj.data))
  );
};

export const isExtractMapObject = (obj: any): obj is ExtractMapObject => {
  return (
    obj
    && (obj.id && typeof obj.id === "string")
    && (obj.map && Object.values(MapName).includes(obj.map))
    && (obj.type && obj.type === "ext")
  );
};

export interface Session {
  id: string,
  createdAt: string,
  lastAccess: string
};

export const isSession = (obj: any): obj is Session => {
  return (
    obj
    && (obj.id && typeof obj.id === "string")
    && (obj.createdAt && typeof obj.createdAt === "string")
    && (obj.lastAccess && typeof obj.lastAccess === "string")
  );
};

export interface SessionInDB {
  id: string,
  createdAt: Timestamp,
  lastAccess: Timestamp
};

export const isSessionInDB = (obj: any): obj is SessionInDB => {
  return (
    obj
    && (obj.id && typeof obj.id === "string")
    && (obj.createdAt && obj.createdAt instanceof Timestamp)
    && (obj.lastAccess && obj.lastAccess instanceof Timestamp)
  );
};

export const sessionDBToSession = (sessionDB: SessionInDB): Session => {
  return {
    id: sessionDB.id,
    createdAt: sessionDB.createdAt.toDate().toISOString(),
    lastAccess: sessionDB.lastAccess.toDate().toISOString()
  }
};
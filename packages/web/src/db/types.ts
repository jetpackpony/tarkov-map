import { DocumentChangeType, Timestamp } from "firebase/firestore";
import { isMapName, MapName } from "../store/mapData";
import { Color, Coords, isColor, isCoords, isObject } from "../types";

export type DBMapObjectListener = (
  type: DocumentChangeType,
  data: MapObject
) => void;
export type DBSessionListener = (session: Session) => void;

export interface MarkerMapObject {
  id: string;
  map: MapName;
  type: "marker";
  data: MarkerData;
}

export interface MarkerData {
  coords: Coords;
  color: Color;
}

export interface ExtractMapObject {
  id: string;
  map: MapName;
  type: "ext";
}

export type MapObject = MarkerMapObject | ExtractMapObject;

export const isMakerData = (data: unknown): data is MarkerData => {
  return isObject(data) && isCoords(data.coords) && isColor(data.color);
};

export const isMarkerMapObject = (obj: unknown): obj is MarkerMapObject => {
  return (
    isObject(obj) &&
    typeof obj.id === "string" &&
    obj.id !== "" &&
    typeof obj.map === "string" &&
    isMapName(obj.map) &&
    obj.type === "marker" &&
    isMakerData(obj.data)
  );
};

export const isExtractMapObject = (obj: unknown): obj is ExtractMapObject => {
  return (
    isObject(obj) &&
    typeof obj.id === "string" &&
    typeof obj.map === "string" &&
    isMapName(obj.map) &&
    obj.type === "ext"
  );
};

export interface Session {
  id: string;
  createdAt: string;
  lastAccess: string;
}

export const isSession = (obj: unknown): obj is Session => {
  return (
    isObject(obj) &&
    typeof obj.id === "string" &&
    typeof obj.createdAt === "string" &&
    typeof obj.lastAccess === "string"
  );
};

export interface SessionInDB {
  id: string;
  createdAt: Timestamp;
  lastAccess: Timestamp;
}

export const isSessionInDB = (obj: unknown): obj is SessionInDB => {
  return (
    isObject(obj) &&
    typeof obj.id === "string" &&
    obj.createdAt instanceof Timestamp &&
    obj.lastAccess instanceof Timestamp
  );
};

export const sessionDBToSession = (sessionDB: SessionInDB): Session => {
  return {
    id: sessionDB.id,
    createdAt: sessionDB.createdAt.toDate().toISOString(),
    lastAccess: sessionDB.lastAccess.toDate().toISOString(),
  };
};

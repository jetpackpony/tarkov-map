import { LocalizedString } from "./I18nContext";
import { MapName } from "./store/mapData";

export type Color = string;

export interface Coords {
  x: number;
  y: number;
}

export const isCoords = (coords: any): coords is Coords => {
  return (
    typeof coords === "object" &&
    typeof coords !== null &&
    typeof coords.x === "number" &&
    typeof coords.y === "number"
  );
};

export const isColor = (color: any): color is Color => {
  return typeof color === "string" && color !== "";
};

export interface Marker {
  id: string;
  coords: Coords;
  color: Color;
  type: "user";
}

export interface ExtractMarker extends ExtractData {
  type: "extraction";
}

export enum Faction {
  ALL = "all",
  PMC = "pmc",
  SCAV = "scav",
}

export interface ExtractData {
  id: string;
  names: LocalizedString;
  faction: Faction;
  specialConditions: LocalizedString | null;
  coords: Coords;
  activationCoords?: Coords;
}

export interface MapData {
  groupId: MapGroupId;
  groupName: LocalizedString;
  title: LocalizedString;
  imgPath: string;
  extracts: ExtractData[];
}

export interface AllMapData {
  maps: {
    [key in MapName]: MapData;
  };
}

export enum MapGroupId {
  Customs = "customs",
  Factory = "factory",
  Interchange = "interchange",
  Labs = "labs",
  Lighthouse = "lighthouse",
  Reserve = "reserve",
  Shoreline = "shoreline",
  Woods = "woods",
}

export const isEnum =
  <Enum>(e: Enum) =>
  (token: any): token is Enum[keyof Enum] => {
    return Object.values(e).includes(token);
  };

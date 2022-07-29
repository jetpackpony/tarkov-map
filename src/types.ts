import { Language } from './i18n';
import { MapName } from './store/mapData';

export type Color = string;

export interface Coords {
  x: number,
  y: number
};

export const isCoords = (coords: any): coords is Coords => {
  return (
    typeof coords === "object" && typeof coords !== null
    && typeof coords.x === "number"
    && typeof coords.y === "number"
  );
};

export const isColor = (color: any): color is Color => {
  return typeof color === "string" && color !== "";
};

export interface Marker {
  id: string,
  coords: Coords,
  color: Color
};

export interface Extract {

};

export interface MapState {
  markers: Marker[],
  selectedExtracts: string[]
};

export type AllMapsState = {
  [key in MapName]: MapState
};

export interface UIState {
  currentMap: MapName,
  markerColor: Color,
  lang: Language,
  isTrackPad: boolean
};

export interface AppState {
  mapState: AllMapsState,
  ui: UIState
};

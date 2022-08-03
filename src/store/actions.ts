import { nanoid } from 'nanoid';
import { Color, Coords } from '../types';
import { MapName } from './mapData';

export type Action = AddMarkerAction | DrawMarkerAction | RemoveMarkersAction
  | EraseMarkersAction | ToggleExtractAction | SelectExtractAction
  | UnselectExtractAction | SelectMapAction | ChangeMarkerColorAction
  | ClearMapAction | SwitchToTrackPadAction;

export enum ACTION_TYPES {
  ADD_MARKER = 'ADD_MARKER',
  DRAW_MARKER = 'DRAW_MARKER',
  REMOVE_MARKER = 'REMOVE_MARKER',
  ERASE_MARKER = 'ERASE_MARKER',
  TOGGLE_EXTRACT = 'TOGGLE_EXTRACT',
  SELECT_EXTRACT = 'SELECT_EXTRACT',
  UNSELECT_EXTRACT = 'UNSELECT_EXTRACT',
  SELECT_MAP = 'SELECT_MAP',
  CHANGE_MARKER_COLOR = 'CHANGE_MARKER_COLOR',
  CLEAR_MAP = 'CLEAR_MAP',
  SWITCH_TO_TRACKPAD = 'SWITCH_TO_TRACKPAD'
};

export interface AddMarkerAction {
  type: ACTION_TYPES.ADD_MARKER,
  id: string,
  coords: Coords
};
export const addMarker = (coords: Coords): AddMarkerAction => ({
  type: ACTION_TYPES.ADD_MARKER,
  id: nanoid(5),
  coords
});

export interface DrawMarkerAction {
  type: ACTION_TYPES.DRAW_MARKER,
  mapName: MapName,
  id: string,
  coords: Coords,
  color: Color
};
export const drawMarker = (
  mapName: MapName,
  id: string,
  coords: Coords,
  color: Color
): DrawMarkerAction => ({
  type: ACTION_TYPES.DRAW_MARKER,
  mapName,
  id,
  coords,
  color
});

export interface RemoveMarkersAction {
  type: ACTION_TYPES.REMOVE_MARKER,
  ids: string[]
};
export const removeMarkers = (ids: string[]): RemoveMarkersAction => ({
  type: ACTION_TYPES.REMOVE_MARKER,
  ids
});

export interface EraseMarkersAction {
  type: ACTION_TYPES.ERASE_MARKER,
  ids: string[],
  mapName: MapName
};
export const eraseMarkers = (
  mapName: MapName,
  ids: string[]
): EraseMarkersAction => ({
  type: ACTION_TYPES.ERASE_MARKER,
  ids,
  mapName
});

export interface ToggleExtractAction {
  type: ACTION_TYPES.TOGGLE_EXTRACT,
  extId: string
};
export const toggleExtractAction = (extId: string): ToggleExtractAction => ({
  type: ACTION_TYPES.TOGGLE_EXTRACT,
  extId
});

export interface SelectExtractAction {
  type: ACTION_TYPES.SELECT_EXTRACT,
  mapName: MapName,
  extId: string
};
export const selectExtract = (
  mapName: MapName,
  extId: string
): SelectExtractAction => ({
  type: ACTION_TYPES.SELECT_EXTRACT,
  mapName,
  extId
});

export interface UnselectExtractAction {
  type: ACTION_TYPES.UNSELECT_EXTRACT,
  mapName: MapName,
  extId: string
};
export const unselectExtract = (
  mapName: MapName,
  extId: string
): UnselectExtractAction => ({
  type: ACTION_TYPES.UNSELECT_EXTRACT,
  mapName,
  extId
});

export interface SelectMapAction {
  type: ACTION_TYPES.SELECT_MAP,
  mapId: MapName
};
export const selectMap = (mapId: MapName): SelectMapAction => ({
  type: ACTION_TYPES.SELECT_MAP,
  mapId
});

export interface ChangeMarkerColorAction {
  type: ACTION_TYPES.CHANGE_MARKER_COLOR,
  color: Color
};
export const changeMarkerColor = (color: Color): ChangeMarkerColorAction => ({
  type: ACTION_TYPES.CHANGE_MARKER_COLOR,
  color
});

export interface ClearMapAction {
  type: ACTION_TYPES.CLEAR_MAP,
  mapId: MapName
};
export const clearMap = (mapId: MapName): ClearMapAction => ({
  type: ACTION_TYPES.CLEAR_MAP,
  mapId
});

export interface SwitchToTrackPadAction {
  type: ACTION_TYPES.SWITCH_TO_TRACKPAD,
  isTrackPad: boolean
};
export const switchToTrackPad = (isTrackPad: boolean): SwitchToTrackPadAction => ({
  type: ACTION_TYPES.SWITCH_TO_TRACKPAD,
  isTrackPad
});

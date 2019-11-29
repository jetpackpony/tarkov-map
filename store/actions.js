import nanoid from 'nanoid';

export const ACTION_TYPES = {
  ADD_MARKER: 'ADD_MARKER',
  DRAW_MARKER: 'DRAW_MARKER',
  REMOVE_MARKER: 'REMOVE_MARKER',
  ERASE_MARKER: 'ERASE_MARKER',
  TOGGLE_EXTRACT: 'TOGGLE_EXTRACT',
  SELECT_EXTRACT: 'SELECT_EXTRACT',
  UNSELECT_EXTRACT: 'UNSELECT_EXTRACT',
  SELECT_MAP: 'SELECT_MAP',
  CHANGE_MARKER_COLOR: 'CHANGE_MARKER_COLOR'
};

export const addMarker = (coords) => ({
  type: ACTION_TYPES.ADD_MARKER,
  id: nanoid(5),
  coords
});

export const drawMarker = (mapName, id, coords, color) => ({
  type: ACTION_TYPES.DRAW_MARKER,
  mapName,
  id,
  coords,
  color
});

export const removeMarkers = (ids) => ({
  type: ACTION_TYPES.REMOVE_MARKER,
  ids
});

export const eraseMarkers = (mapName, ids) => ({
  type: ACTION_TYPES.ERASE_MARKER,
  ids,
  mapName
});

export const toggleExtractAction = (extId) => ({
  type: ACTION_TYPES.TOGGLE_EXTRACT,
  extId
});

export const selectExtract = (mapName, extId) => ({
  type: ACTION_TYPES.SELECT_EXTRACT,
  mapName,
  extId
});

export const unselectExtract = (mapName, extId) => ({
  type: ACTION_TYPES.UNSELECT_EXTRACT,
  mapName,
  extId
});

export const selectMap = (mapId) => ({
  type: ACTION_TYPES.SELECT_MAP,
  mapId
});

export const changeMarkerColor = (color) => ({
  type: ACTION_TYPES.CHANGE_MARKER_COLOR,
  color
});

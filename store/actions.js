import nanoid from 'nanoid';

export const ACTION_TYPES = {
  ADD_MARKER: 'ADD_MARKER',
  REMOVE_MARKER: 'REMOVE_MARKER',
  TOGGLE_EXTRACT: 'TOGGLE_EXTRACT'
};

export const addMarker = (coords) => ({
  type: ACTION_TYPES.ADD_MARKER,
  id: nanoid(5),
  coords
});

export const removeMarkers = (ids) => ({
  type: ACTION_TYPES.REMOVE_MARKER,
  ids
});

export const toggleExtractAction = (extId) => ({
  type: ACTION_TYPES.TOGGLE_EXTRACT,
  extId
});

export const ACTION_TYPES = {
  ADD_MARKER: 'ADD_MARKER',
  TOGGLE_EXTRACT: 'TOGGLE_EXTRACT'
};

const rand = () => Math.random() * 1000;
export const addMarker = () => ({
  type: ACTION_TYPES.ADD_MARKER,
  coords: { x: rand(), y: rand() }
});

export const toggleExtractAction = (extId) => ({
  type: ACTION_TYPES.TOGGLE_EXTRACT,
  extId
});

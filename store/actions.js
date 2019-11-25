export const ACTION_TYPES = {
  ADD_MARKER: 'ADD_MARKER'
};

const rand = () => Math.random() * 1000;
export const addMarker = () => ({
  type: ACTION_TYPES.ADD_MARKER,
  coords: { x: rand(), y: rand() }
});

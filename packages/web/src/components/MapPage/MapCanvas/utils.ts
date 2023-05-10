import { Coords, ExtractMarker, Marker } from "../../../types";

export const getDevicePixelRatio = () => {
  return window?.devicePixelRatio || 1;
};

const maxX = 10 * getDevicePixelRatio();
const maxY = 15 * getDevicePixelRatio();
export const getCloseMarkers = (
  scale: number,
  markers: (Marker | ExtractMarker)[],
  { x, y }: Coords
) => {
  return markers
    .filter((m) => {
      const distX = Math.abs(m.coords.x - x);
      const distY = Math.abs(m.coords.y - y - 25 / scale);
      return distX * scale < maxX && distY * scale < maxY;
    })
    .filter((m) => m.type !== "extraction")
    .map((m) => m.id);
};

export const distance = (one: Coords, two: Coords) => {
  return Math.sqrt((one.x - two.x) ** 2 + (one.y - two.y) ** 2);
};

export const getMiddleCoords = (one: Coords, two: Coords): Coords => {
  return {
    x: Math.abs(one.x - two.x) / 2 + Math.min(one.x, two.x),
    y: Math.abs(one.y - two.y) / 2 + Math.min(one.y, two.y),
  };
};

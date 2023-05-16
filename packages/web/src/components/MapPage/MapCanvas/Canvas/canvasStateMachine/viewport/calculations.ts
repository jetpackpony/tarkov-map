import {
  Coords,
  Dimentions,
  ExtractMarker,
  Marker,
} from "../../../../../../types";
import { ViewportState } from ".";
import { MAX_SCALE, PAN_BORDER, SCALE_BORDER } from "./constants";
import { getDevicePixelRatio } from "../../getDevicePixelRatio";

export const clampValue = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const clampScale = (
  canvasSize: Dimentions,
  imgSize: Dimentions,
  scale: number
) => {
  const minWScale = (canvasSize.w - SCALE_BORDER) / imgSize.w;
  const minHScale = (canvasSize.h - SCALE_BORDER) / imgSize.h;
  const min = Math.min(minWScale, minHScale);
  if (scale < min) {
    return min;
  }
  if (scale > MAX_SCALE) {
    return MAX_SCALE;
  }
  return scale;
};

export const clampPos = (
  canvasLen: number,
  imgLen: number,
  scale: number,
  pos: number
) => {
  const imgCanvasLenDiff = canvasLen - imgLen * scale;
  if (imgCanvasLenDiff < PAN_BORDER * 2) {
    // If the image does not fit into canvas, make its sides stick to the
    // sides of the canvas
    return clampValue(pos, imgCanvasLenDiff - PAN_BORDER, PAN_BORDER);
  }
  // If the image does fit into canvas, let it flow freely inside the canvas
  // but not outside of it
  return clampValue(pos, PAN_BORDER, imgCanvasLenDiff - PAN_BORDER);
};

export const getImageCoords = (
  viewportCoords: Coords,
  viewportState: ViewportState
): Coords | null => {
  const imageCoords = {
    x: Math.round(
      (viewportCoords.x - viewportState.pos.x) / viewportState.scale
    ),
    y: Math.round(
      (viewportCoords.y - viewportState.pos.y) / viewportState.scale
    ),
  };
  // If the click is off the image, ignore
  if (
    !(
      imageCoords.x >= 0 &&
      imageCoords.y >= 0 &&
      imageCoords.x <= viewportState.imgSize.w &&
      imageCoords.y <= viewportState.imgSize.h
    )
  ) {
    return null;
  }
  return imageCoords;
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

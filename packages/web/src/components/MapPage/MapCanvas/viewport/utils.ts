import { Coords, Dimentions } from "../../../../types";
import { ViewportState } from ".";
import { MAX_SCALE, PAN_BORDER, SCALE_BORDER } from "./constants";

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

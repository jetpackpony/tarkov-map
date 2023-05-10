import { Coords, Dimentions } from "../../../../../../types";
import { MAX_SCALE, MIN_SCALE } from "./constants";
import { clampPos, clampScale } from "./calculations";

export interface ViewportState {
  canvasSize: Dimentions;
  imgSize: Dimentions;
  scale: number;
  pos: Coords;
}

const defaultViewport = {
  canvasSize: { w: 0, h: 0 },
  imgSize: { w: 0, h: 0 },
  scale: MIN_SCALE,
  pos: { x: 0, y: 0 },
};

export const initViewport = (
  canvasSize: Dimentions = { w: 0, h: 0 },
  imgSize: Dimentions = { w: 0, h: 0 },
  viewportState: ViewportState = defaultViewport
): ViewportState => {
  const scale = clampScale(
    canvasSize,
    imgSize,
    viewportState?.scale || MIN_SCALE
  );
  const pos = {
    x: clampPos(canvasSize.w, imgSize.w, scale, viewportState?.pos.x || 0),
    y: clampPos(canvasSize.h, imgSize.h, scale, viewportState?.pos.y || 0),
  };
  return {
    canvasSize,
    imgSize,
    scale,
    pos,
  };
};

export const panViewport = (
  viewportState: ViewportState,
  deltaX: number,
  deltaY: number
): ViewportState => {
  const { pos, scale, canvasSize, imgSize } = viewportState;
  return {
    ...viewportState,
    pos: {
      x: clampPos(canvasSize.w, imgSize.w, scale, pos.x - deltaX),
      y: clampPos(canvasSize.h, imgSize.h, scale, pos.y - deltaY),
    },
  };
};

export const zoomViewport = (
  viewportState: ViewportState,
  cursorPos: Coords,
  deltaY: number
): ViewportState => {
  const { pos, scale, canvasSize, imgSize } = viewportState;
  const newScale = clampScale(
    canvasSize,
    imgSize,
    scale - (scale / MAX_SCALE + MIN_SCALE) * deltaY
  );
  // Update viewport position postion on zoom
  const newPos = {
    x: cursorPos.x - ((cursorPos.x - pos.x) * newScale) / scale,
    y: cursorPos.y - ((cursorPos.y - pos.y) * newScale) / scale,
  };
  newPos.x = clampPos(canvasSize.w, imgSize.w, newScale, newPos.x);
  newPos.y = clampPos(canvasSize.h, imgSize.h, newScale, newPos.y);
  return {
    ...viewportState,
    scale: newScale,
    pos: newPos,
  };
};

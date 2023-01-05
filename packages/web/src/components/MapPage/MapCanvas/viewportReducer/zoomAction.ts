import { Coords } from "../../../../types";
import { maxScale, minScale } from "./constants";
import { ViewportState } from "./state";
import { clampPos, clampScale } from "./utils";
import { ViewportActionType } from "./viewportReducer";

export interface ZoomAction {
  type: ViewportActionType.ZOOM;
  payload: {
    canvas: HTMLCanvasElement;
    imgObj: HTMLImageElement | null;
    deltaY: number;
    cursorPos: Coords;
  };
}

export function makeZoomAction(payload: ZoomAction["payload"]): ZoomAction {
  return {
    type: ViewportActionType.ZOOM,
    payload,
  };
}

export function zoom(
  state: ViewportState,
  { canvas, imgObj, deltaY, cursorPos }: ZoomAction["payload"]
): ViewportState {
  if (!imgObj) return state;
  const newScale = clampScale(
    canvas,
    imgObj,
    state.scale - (state.scale / maxScale + minScale) * deltaY
  );

  // Update viewport postion on zoom
  const newPos = {
    x: cursorPos.x - ((cursorPos.x - state.pos.x) * newScale) / state.scale,
    y: cursorPos.y - ((cursorPos.y - state.pos.y) * newScale) / state.scale,
  };
  newPos.x = clampPos(canvas.width, imgObj.width, newScale, newPos.x);
  newPos.y = clampPos(canvas.height, imgObj.height, newScale, newPos.y);
  return {
    ...state,
    scale: newScale,
    pos: newPos,
  };
}

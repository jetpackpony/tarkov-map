import { ViewportState } from "./state";
import { clampPos, clampScale } from "./utils";
import { ViewportActionType } from "./viewportReducer";

export interface ClampViewportAction {
  type: ViewportActionType.CLAMP_VIEWPORT;
  payload: {
    canvas: HTMLCanvasElement;
    imgObj: HTMLImageElement | null;
  };
}

export function makeClampViewportAction(
  payload: ClampViewportAction["payload"]
): ClampViewportAction {
  return {
    type: ViewportActionType.CLAMP_VIEWPORT,
    payload,
  };
}

export function clampViewport(
  state: ViewportState,
  { imgObj, canvas }: ClampViewportAction["payload"]
): ViewportState {
  if (!imgObj) return state;
  const newScale = clampScale(canvas, imgObj, state.scale);
  const newPos = { ...state.pos };
  newPos.x = clampPos(canvas.width, imgObj.width, newScale, newPos.x);
  newPos.y = clampPos(canvas.height, imgObj.height, newScale, newPos.y);
  return {
    ...state,
    scale: newScale,
    pos: newPos,
  };
}

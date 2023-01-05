import { ViewportState } from "./state";
import { clampPos } from "./utils";
import { ViewportActionType } from "./viewportReducer";

export interface PanAction {
  type: ViewportActionType.PAN;
  payload: {
    canvas: HTMLCanvasElement;
    imgObj: HTMLImageElement | null;
    deltaX: number;
    deltaY: number;
  };
}

export function makePanAction(payload: PanAction["payload"]): PanAction {
  return {
    type: ViewportActionType.PAN,
    payload,
  };
}

export function pan(
  state: ViewportState,
  { canvas, imgObj, deltaX, deltaY }: PanAction["payload"]
): ViewportState {
  if (!imgObj) return state;
  const newPos = { ...state.pos };
  newPos.x -= deltaX;
  newPos.y -= deltaY;
  newPos.x = clampPos(canvas.width, imgObj.width, state.scale, newPos.x);
  newPos.y = clampPos(canvas.height, imgObj.height, state.scale, newPos.y);
  return {
    ...state,
    pos: newPos,
  };
}

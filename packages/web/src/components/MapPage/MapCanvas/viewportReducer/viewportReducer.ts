import { clampViewport, ClampViewportAction } from "./clampViewportAction";
import { pan, PanAction } from "./panAction";
import { reset, ResetAction } from "./resetAction";
import { ViewportState } from "./state";
import { zoom, ZoomAction } from "./zoomAction";

export enum ViewportActionType {
  ZOOM = "ZOOM",
  PAN = "PAN",
  RESET = "RESET",
  CLAMP_VIEWPORT = "CLAMP_VIEWPORT",
}

export type ViewportAction =
  | ZoomAction
  | PanAction
  | ResetAction
  | ClampViewportAction;

export function viewportReducer(
  state: ViewportState,
  action: ViewportAction
): ViewportState {
  switch (action.type) {
    case ViewportActionType.ZOOM:
      return zoom(state, action.payload);
    case ViewportActionType.PAN:
      return pan(state, action.payload);
    case ViewportActionType.RESET:
      return reset();
    case ViewportActionType.CLAMP_VIEWPORT:
      return clampViewport(state, action.payload);
  }
}

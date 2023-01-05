import { initViewport, ViewportState } from "./state";
import { ViewportActionType } from "./viewportReducer";

export interface ResetAction {
  type: ViewportActionType.RESET;
}

export function makeResetAction(): ResetAction {
  return {
    type: ViewportActionType.RESET,
  };
}

export function reset(): ViewportState {
  return initViewport();
}

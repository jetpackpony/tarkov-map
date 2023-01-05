import { useReducer } from "preact/compat";
import { compose } from "rambda";
import { makeClampViewportAction } from "./clampViewportAction";
import { makePanAction } from "./panAction";
import { makeResetAction } from "./resetAction";
import { initViewport } from "./state";
import { viewportReducer } from "./viewportReducer";
import { makeZoomAction } from "./zoomAction";

export const useViewport = () => {
  const [viewportState, dispatch] = useReducer(
    viewportReducer,
    null,
    initViewport
  );

  return {
    viewportState,
    zoomViewport: compose(dispatch, makeZoomAction),
    panViewport: compose(dispatch, makePanAction),
    resetViewport: compose(dispatch, makeResetAction),
    clampViewport: compose(dispatch, makeClampViewportAction),
  };
};

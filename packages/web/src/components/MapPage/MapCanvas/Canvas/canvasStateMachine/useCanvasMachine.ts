import { useCallback } from "preact/compat";
import {
  Coords,
  Dimentions,
  ExtractMarker,
  Marker,
} from "../../../../../types";
import { useInterpret, useSelector } from "@xstate/react";
import { canvasMachine, selectViewport } from "./canvas.machine";
import { makeLeftClickAction } from "./actions";
import { wrapPointerEvent, wrapWheelEvent } from "./eventWrappers";

export const useCanvasMachine = (
  markers: (Marker | ExtractMarker)[],
  addMarker: (coords: Coords) => void,
  removeMarkers: (ids: string[]) => void,
) => {
  const service = useInterpret(canvasMachine, {
    actions: {
      leftClick: makeLeftClickAction(addMarker, removeMarkers, markers),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any, // TODO: Remove this after updating to xstate v5
  });
  const viewportState = useSelector(service, selectViewport);

  const sendPointerEvent = useCallback(
    (e: PointerEvent) => {
      const wrapper = wrapPointerEvent(e);
      wrapper && service.send(wrapper);
    },
    [service],
  );
  const sendWheelEvent = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const wrapper = wrapWheelEvent(e);
      wrapper && service.send(wrapper);
    },
    [service],
  );
  const sendResetEvent = useCallback(
    (canvasSize: Dimentions, imgObj: HTMLImageElement) => {
      service.send({
        type: "RESET_CANVAS",
        payload: {
          canvasSize,
          imgSize: { w: imgObj.width, h: imgObj.height },
        },
      });
    },
    [service],
  );

  return {
    viewportState,
    sendPointerEvent,
    sendWheelEvent,
    sendResetEvent,
  };
};

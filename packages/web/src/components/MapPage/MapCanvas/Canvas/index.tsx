import { h } from "preact";
import { useCallback, useEffect } from "preact/compat";
import styles from "./canvas.module.css";
import { Coords, ExtractMarker, Marker } from "../../../../types";
import { useCanvasWithResizeHandler } from "./useCanvasWithResizeHandler";
import { useInterpret, useSelector } from "@xstate/react";
import {
  canvasMachine,
  selectViewport,
} from "./canvasStateMachine/canvas.machine";
import { makeLeftClickAction } from "./canvasStateMachine/actions";
import { useDrawCanvasDebounced } from "./useDrawCanvasDebounced";
import {
  wrapPointerEvent,
  wrapWheelEvent,
} from "./canvasStateMachine/eventWrappers";

interface CanvasProps {
  imgObj: HTMLImageElement;
  markers: (Marker | ExtractMarker)[];
  addMarker: (coords: Coords) => void;
  removeMarkers: (ids: string[]) => void;
}

const Canvas = ({ imgObj, markers, addMarker, removeMarkers }: CanvasProps) => {
  const { canvasRef, canvasSize } = useCanvasWithResizeHandler();
  const service = useInterpret(canvasMachine, {
    actions: {
      leftClick: makeLeftClickAction(addMarker, removeMarkers, markers),
    },
  });
  const viewportState = useSelector(service, selectViewport);

  const sendPointerEvent = useCallback(
    (e: PointerEvent) => {
      const wrapper = wrapPointerEvent(e);
      wrapper && service.send(wrapper);
    },
    [service]
  );
  const sendWheelEvent = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const wrapper = wrapWheelEvent(e);
      wrapper && service.send(wrapper);
    },
    [service]
  );
  const sendResetEvent = useCallback(() => {
    service.send({
      type: "RESET_CANVAS",
      payload: {
        canvasSize,
        imgSize: { w: imgObj.width, h: imgObj.height },
      },
    });
  }, [canvasSize, imgObj, service]);

  // Update viewport on canvas resize or image change
  useEffect(() => {
    sendResetEvent();
  }, [sendResetEvent]);

  useDrawCanvasDebounced(viewportState, markers, canvasRef, imgObj);

  return (
    <canvas
      tabIndex={0}
      class={styles.canvas}
      ref={canvasRef}
      id="canvas"
      width={canvasSize.w}
      height={canvasSize.h}
      style={{
        width: canvasSize.cssW,
        height: canvasSize.cssH,
      }}
      onContextMenu={(e: MouseEvent) => e.preventDefault()}
      onPointerDown={sendPointerEvent}
      onPointerUp={sendPointerEvent}
      onPointerMove={sendPointerEvent}
      onPointerLeave={sendPointerEvent}
      onWheel={sendWheelEvent}
      onBlur={sendResetEvent}
    />
  );
};

export default Canvas;

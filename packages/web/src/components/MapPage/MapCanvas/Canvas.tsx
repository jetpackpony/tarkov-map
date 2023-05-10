import { h } from "preact";
import { useCallback, useEffect } from "preact/compat";
import styles from "./canvas.module.css";
import { draw } from "./drawing";
import { Coords, ExtractMarker, Marker } from "../../../types";
import { useCanvasWithResizeHandler } from "./useCanvasWithResizeHandler";
import { useInterpret, useSelector } from "@xstate/react";
import {
  canvasMachine,
  selectViewport,
} from "./canvasStateMachine/canvas.machine";
import { isPointerEventType } from "./canvasStateMachine/types";
import { getDevicePixelRatio } from "./utils";
import { makeLeftClickAction } from "./canvasStateMachine/actions";

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

  // Update viewport on canvas resize
  useEffect(() => {
    service.send({
      type: "RESET_CANVAS",
      payload: {
        canvasSize,
        imgSize: { w: imgObj.width, h: imgObj.height },
      },
    });
  }, [canvasSize, imgObj, service]);

  const sendPointerEvent = useCallback(
    (e: PointerEvent) => {
      if (isPointerEventType(e.type)) {
        service.send({
          type: e.type,
          pointerEvent: {
            pointerId: e.pointerId,
            clientX: e.clientX * getDevicePixelRatio(),
            clientY: e.clientY * getDevicePixelRatio(),
          },
        });
      }
    },
    [service]
  );
  const sendWheelEvent = useCallback(
    (e: WheelEvent) => {
      if (e.type === "wheel") {
        e.preventDefault();
        service.send({
          type: e.type,
          wheelEvent: {
            clientX: e.clientX * getDevicePixelRatio(),
            clientY: e.clientY * getDevicePixelRatio(),
            ctrlKey: e.ctrlKey,
            deltaX: e.deltaX * getDevicePixelRatio(),
            deltaY: e.deltaY * getDevicePixelRatio(),
          },
        });
      }
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

  useEffect(() => {
    if (!imgObj || !canvasRef.current) return;
    draw(canvasRef.current, imgObj, viewportState, markers);
  }, [viewportState, markers, canvasRef, imgObj]);

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

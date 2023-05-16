import { h } from "preact";
import { useCallback, useEffect } from "preact/compat";
import styles from "./canvas.module.css";
import { Coords, ExtractMarker, Marker } from "../../../../types";
import { useCanvasWithResizeHandler } from "./useCanvasWithResizeHandler";
import { useDrawCanvasDebounced } from "./useDrawCanvasDebounced";
import { useCanvasMachine } from "./canvasStateMachine/useCanvasMachine";

interface CanvasProps {
  imgObj: HTMLImageElement;
  markers: (Marker | ExtractMarker)[];
  addMarker: (coords: Coords) => void;
  removeMarkers: (ids: string[]) => void;
}

const Canvas = ({ imgObj, markers, addMarker, removeMarkers }: CanvasProps) => {
  const { canvasRef, canvasSize } = useCanvasWithResizeHandler();
  const { viewportState, sendPointerEvent, sendWheelEvent, sendResetEvent } =
    useCanvasMachine(markers, addMarker, removeMarkers);

  // Update viewport on canvas resize or image change
  useEffect(() => {
    sendResetEvent(canvasSize, imgObj);
  }, [sendResetEvent, canvasSize, imgObj]);

  useDrawCanvasDebounced(viewportState, markers, canvasRef, imgObj);

  const onBlur = useCallback(() => {
    sendResetEvent(canvasSize, imgObj);
  }, [sendResetEvent, canvasSize, imgObj]);

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
      onBlur={onBlur}
    />
  );
};

export default Canvas;

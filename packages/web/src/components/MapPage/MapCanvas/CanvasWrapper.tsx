import { h } from "preact";
import { useEffect, useRef } from "preact/compat";
import { useCanvasWithResizeHandler } from "./hooks";
import styles from "./canvas.module.css";
import { Coords } from "../../../types";

const minDragDist = 5;
const trackPadScaleMulti = 0.01;
const mouseWheelScaleMulti = 0.3;
const posMulti = 1;

const resizeHandler = (canvas: HTMLCanvasElement) => {
  const parent = canvas.parentElement;
  if (parent) {
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }
};

interface DragState {
  started: boolean;
  mouseDownCoords: Coords;
  prevPos: Coords;
  maxDistFromOrigin: number;
  removeEventListener: () => void;
}

interface CanvasWrapperProps {
  redrawCanvas: (canvas: HTMLCanvasElement) => void;
  onLeftClick: (offsetX: number, offsetY: number) => void;
  onPan: (canvas: HTMLCanvasElement, deltaX: number, deltaY: number) => void;
  onZoom: (canvas: HTMLCanvasElement, deltaY: number, pos: Coords) => void;
  isTrackPad: boolean;
  onSwitchToTrackPad: (payload: { isTrackPad: boolean }) => void;
}

const CanvasWrapper = ({
  redrawCanvas,
  onLeftClick,
  onPan,
  onZoom,
  isTrackPad,
  onSwitchToTrackPad,
}: CanvasWrapperProps) => {
  const { canvasRef, addResizeListener } = useCanvasWithResizeHandler();

  addResizeListener(resizeHandler);

  const isDrawing = useRef(false);
  const dragState = useRef<DragState>({
    started: false,
    mouseDownCoords: { x: 0, y: 0 },
    prevPos: { x: 0, y: 0 },
    maxDistFromOrigin: 0,
    removeEventListener: () => {},
  });

  const redrawCanvasDebounced = () => {
    requestAnimationFrame(() => {
      if (canvasRef.current) {
        redrawCanvas(canvasRef.current);
      }
      isDrawing.current = false;
    });
    isDrawing.current = true;
  };
  addResizeListener(redrawCanvasDebounced);

  // change the state of the viewport, then redraw
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaX !== 0) {
      !isTrackPad && onSwitchToTrackPad({ isTrackPad: true });
    }

    if (canvasRef.current) {
      if (e.ctrlKey) {
        // This is trackpad pinching (scale)
        onZoom(canvasRef.current, e.deltaY * trackPadScaleMulti, {
          x: e.offsetX,
          y: e.offsetY,
        });
      } else if (isTrackPad) {
        // this is trackpad moving
        onPan(canvasRef.current, e.deltaX * posMulti, e.deltaY * posMulti);
      } else {
        // This is a real mouse wheel scale
        const delta = (e.deltaY / Math.abs(e.deltaY)) * mouseWheelScaleMulti;
        onZoom(canvasRef.current, delta, { x: e.offsetX, y: e.offsetY });
      }
    }
    if (!isDrawing.current) {
      redrawCanvasDebounced();
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    const distX = dragState.current.mouseDownCoords.x - e.offsetX;
    const distY = dragState.current.mouseDownCoords.y - e.offsetY;
    const dist = distX * distX + distY * distY;
    if (dist > dragState.current.maxDistFromOrigin) {
      dragState.current.maxDistFromOrigin = dist;
    }

    const deltaX = dragState.current.prevPos.x - e.offsetX;
    const deltaY = dragState.current.prevPos.y - e.offsetY;
    dragState.current.prevPos.x = e.offsetX;
    dragState.current.prevPos.y = e.offsetY;
    canvasRef.current &&
      onPan(canvasRef.current, deltaX * posMulti, deltaY * posMulti);
    if (!isDrawing.current) {
      redrawCanvasDebounced();
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (e.button === 0) {
      dragState.current.started = true;
      dragState.current.mouseDownCoords = {
        x: e.offsetX,
        y: e.offsetY,
      };
      dragState.current.prevPos = {
        x: e.offsetX,
        y: e.offsetY,
      };
      dragState.current.maxDistFromOrigin = 0;
      if (canvasRef.current) {
        canvasRef.current.addEventListener("mousemove", onMouseMove);
        dragState.current.removeEventListener = () =>
          canvasRef.current &&
          canvasRef.current.removeEventListener("mousemove", onMouseMove);
      }
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    if (dragState.current.started) {
      dragState.current.removeEventListener();
      if (dragState.current.maxDistFromOrigin < minDragDist) {
        e.preventDefault();
        onLeftClick(e.offsetX, e.offsetY);
      }
      dragState.current.started = false;
    }
  };

  // Redraw every time anything changes
  useEffect(() => {
    redrawCanvasDebounced();
  });

  // Resize canvas after initial load
  useEffect(() => {
    canvasRef.current && resizeHandler(canvasRef.current);
  }, [canvasRef]);

  return (
    <canvas
      class={styles.canvas}
      ref={canvasRef}
      id="canvas"
      width={100}
      height={100}
      onContextMenu={(e: MouseEvent) => e.preventDefault()}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

export default CanvasWrapper;

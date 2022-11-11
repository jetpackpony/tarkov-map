import { h } from "preact";
import { useEffect, useRef } from "preact/compat";
import { useCanvasWithResizeHandler } from "./hooks";
import styles from "./canvas.module.css";
import { Coords } from "../../../types";

const minDragDist = 5;
const trackPadScaleMulti = 0.02;
const mouseWheelScaleMulti = 0.3;
const posMulti = 1;
const pinchScaleMulti = 0.02;

const distance = (one: Coords, two: Coords) => {
  return Math.sqrt((one.x - two.x) ** 2 + (one.y - two.y) ** 2);
};

const getMiddleCoords = (one: Coords, two: Coords): Coords => {
  return {
    x: Math.abs(one.x - two.x) / 2 + Math.min(one.x, two.x),
    y: Math.abs(one.y - two.y) / 2 + Math.min(one.y, two.y),
  };
};

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
  const activePointers = useRef(new Map<number, PointerEvent>());
  const prevDiff = useRef(-1);

  addResizeListener(resizeHandler);

  const isDrawing = useRef(false);
  const dragState = useRef<DragState>({
    started: false,
    mouseDownCoords: { x: 0, y: 0 },
    prevPos: { x: 0, y: 0 },
    maxDistFromOrigin: 0,
  });

  const redrawCanvasDebounced = () => {
    if (!isDrawing.current) {
      isDrawing.current = true;
      requestAnimationFrame(() => {
        if (canvasRef.current) {
          redrawCanvas(canvasRef.current);
        }
        isDrawing.current = false;
      });
    }
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
    redrawCanvasDebounced();
  };

  const onPointerMove = (e: PointerEvent) => {
    activePointers.current.set(e.pointerId, e);
    if (activePointers.current.size === 2) {
      const pointers = Array.from(activePointers.current.values());
      const pointer0 = {
        x: pointers[0].offsetX,
        y: pointers[0].offsetY,
      };
      const pointer1 = {
        x: pointers[1].offsetX,
        y: pointers[1].offsetY,
      };
      const currDiff = distance(pointer0, pointer1);
      const delta = (prevDiff.current - currDiff) * pinchScaleMulti;
      canvasRef.current &&
        onZoom(canvasRef.current, delta, getMiddleCoords(pointer0, pointer1));
      prevDiff.current = currDiff;
      redrawCanvasDebounced();
    } else if (dragState.current.started) {
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
      redrawCanvasDebounced();
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    activePointers.current.set(e.pointerId, e);
    if (e.button === 0) {
      if (activePointers.current.size === 2) {
        // If this is a second pointer, remove the drag thing and start the zoom thing
        if (dragState.current.started) {
          dragState.current.started = false;
        }
        const pointers = Array.from(activePointers.current.values());
        prevDiff.current = distance(
          {
            x: pointers[0].offsetX,
            y: pointers[0].offsetY,
          },
          {
            x: pointers[1].offsetX,
            y: pointers[1].offsetY,
          }
        );
      } else if (activePointers.current.size === 1) {
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
      }
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    activePointers.current.delete(e.pointerId);
    if (dragState.current.started) {
      if (dragState.current.maxDistFromOrigin < minDragDist) {
        e.preventDefault();
        onLeftClick(e.offsetX, e.offsetY);
      }
      dragState.current.started = false;
    }
  };

  const onPointerLeave = (e: PointerEvent) => {
    activePointers.current.delete(e.pointerId);
    if (dragState.current.started) {
      dragState.current.started = false;
    }
  };

  const onBlur = () => {
    activePointers.current.clear();
    dragState.current.started = false;
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
      tabIndex={0}
      class={styles.canvas}
      ref={canvasRef}
      id="canvas"
      width={100}
      height={100}
      onContextMenu={(e: MouseEvent) => e.preventDefault()}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onBlur={onBlur}
      onPointerLeave={onPointerLeave}
    />
  );
};

export default CanvasWrapper;

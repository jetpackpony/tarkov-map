import { h } from "preact";
import { forwardRef, Ref, useRef } from "preact/compat";
import styles from "./canvas.module.css";
import { Coords } from "../../../types";
import { distance, getDevicePixelRatio, getMiddleCoords } from "./utils";

const minDragDist = 5;
const trackPadScaleMulti = 0.02;
const mouseWheelScaleMulti = 0.3;
const posMulti = 1;
const pinchScaleMulti = 0.02;

interface DragState {
  started: boolean;
  mouseDownCoords: Coords;
  prevPos: Coords;
  maxDistFromOrigin: number;
}

interface CanvasWrapperProps {
  onLeftClick: (corrds: Coords) => void;
  onPan: (canvas: HTMLCanvasElement, deltaX: number, deltaY: number) => void;
  onZoom: (canvas: HTMLCanvasElement, deltaY: number, pos: Coords) => void;
  isTrackPad: boolean;
  onSwitchToTrackPad: (payload: { isTrackPad: boolean }) => void;
  canvasSize: {
    w: number;
    h: number;
    cssW: string;
    cssH: string;
  };
}

const CanvasWrapper = forwardRef(
  (
    {
      onLeftClick,
      onPan,
      onZoom,
      isTrackPad,
      onSwitchToTrackPad,
      canvasSize,
    }: CanvasWrapperProps,
    canvasRef: Ref<HTMLCanvasElement>
  ) => {
    const activePointers = useRef(new Map<number, PointerEvent>());
    const prevDiff = useRef(-1);
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

    // change the state of the viewport, then redraw
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaX !== 0) {
        !isTrackPad && onSwitchToTrackPad({ isTrackPad: true });
      }

      if (canvasRef.current) {
        if (e.ctrlKey) {
          !isTrackPad && onSwitchToTrackPad({ isTrackPad: true });
          // This is trackpad pinching (scale)
          onZoom(
            canvasRef.current,
            e.deltaY * trackPadScaleMulti * getDevicePixelRatio(),
            {
              x: e.clientX * getDevicePixelRatio(),
              y: e.clientY * getDevicePixelRatio(),
            }
          );
        } else if (isTrackPad || e.deltaX !== 0) {
          // this is trackpad moving
          onPan(
            canvasRef.current,
            e.deltaX * posMulti * getDevicePixelRatio(),
            e.deltaY * posMulti * getDevicePixelRatio()
          );
        } else {
          // This is a real mouse wheel scale
          const delta = (e.deltaY / Math.abs(e.deltaY)) * mouseWheelScaleMulti;
          onZoom(canvasRef.current, delta, {
            x: e.clientX * getDevicePixelRatio(),
            y: e.clientY * getDevicePixelRatio(),
          });
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      activePointers.current.set(e.pointerId, e);
      if (activePointers.current.size === 2) {
        const pointers = Array.from(activePointers.current.values());
        const pointer0 = {
          x: pointers[0].clientX,
          y: pointers[0].clientY,
        };
        const pointer1 = {
          x: pointers[1].clientX,
          y: pointers[1].clientY,
        };
        const currDiff = distance(pointer0, pointer1);
        const delta =
          (prevDiff.current - currDiff) *
          pinchScaleMulti *
          getDevicePixelRatio();
        const middle = getMiddleCoords(pointer0, pointer1);
        canvasRef.current &&
          onZoom(canvasRef.current, delta, {
            x: middle.x * getDevicePixelRatio(),
            y: middle.y * getDevicePixelRatio(),
          });
        prevDiff.current = currDiff;
      } else if (dragState.current.started) {
        const distX = dragState.current.mouseDownCoords.x - e.clientX;
        const distY = dragState.current.mouseDownCoords.y - e.clientY;
        const dist = distX * distX + distY * distY;
        if (dist > dragState.current.maxDistFromOrigin) {
          dragState.current.maxDistFromOrigin = dist;
        }

        const deltaX = dragState.current.prevPos.x - e.clientX;
        const deltaY = dragState.current.prevPos.y - e.clientY;
        dragState.current.prevPos.x = e.clientX;
        dragState.current.prevPos.y = e.clientY;
        canvasRef.current &&
          onPan(
            canvasRef.current,
            deltaX * posMulti * getDevicePixelRatio(),
            deltaY * posMulti * getDevicePixelRatio()
          );
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
              x: pointers[0].clientX,
              y: pointers[0].clientY,
            },
            {
              x: pointers[1].clientX,
              y: pointers[1].clientY,
            }
          );
        } else if (activePointers.current.size === 1) {
          dragState.current.started = true;
          dragState.current.mouseDownCoords = {
            x: e.clientX,
            y: e.clientY,
          };
          dragState.current.prevPos = {
            x: e.clientX,
            y: e.clientY,
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
          onLeftClick({
            x: e.clientX * getDevicePixelRatio(),
            y: e.clientY * getDevicePixelRatio(),
          });
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
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onBlur={onBlur}
        onPointerLeave={onPointerLeave}
      />
    );
  }
);

export default CanvasWrapper;

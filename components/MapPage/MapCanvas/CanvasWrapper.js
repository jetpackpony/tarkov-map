import { h } from 'preact';
import { useEffect, useRef } from 'preact/compat';
import { useCanvasWithResizeHandler } from './hooks';
import './canvas.css';

const minDragDist = 5;
const trackPadScaleMulti = 0.01;
const mouseWheelScaleMulti = 0.3;
const posMulti = 1;

const resizeHandler = (canvasRef) => {
  const parent = canvasRef.current.parentElement;
  canvasRef.current.width = parent.clientWidth;
  canvasRef.current.height = parent.clientHeight;
};

const CanvasWrapper = ({
  redrawCanvas,
  onLeftClick,
  onPan,
  onZoom
}) => {
  const canvasRef = useCanvasWithResizeHandler(resizeHandler);
  const ctxRef = useRef(null);
  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext("2d");
  });
  const isDrawing = useRef(false);
  const dragState = useRef({});

  const redrawCanvasDebounced = () => {
    requestAnimationFrame(() => {
      if (canvasRef.current && ctxRef.current) {
        redrawCanvas(canvasRef.current, ctxRef.current);
      }
      isDrawing.current = false;
    });
    isDrawing.current = true;
  };

  // change the state of the viewport, then redraw
  const onWheel = (e) => {
    e.preventDefault();
    const isTrackPad = e.wheelDeltaY ? e.wheelDeltaY === -3 * e.deltaY : e.deltaMode === 0;

    if (e.ctrlKey) {
      // This is trackpad pinching (scale)
      onZoom(canvasRef.current, e.deltaY * trackPadScaleMulti, { x: e.offsetX, y: e.offsetY });
    } else if (isTrackPad) {
      // this is trackpad moving
      onPan(canvasRef.current, e.deltaX * posMulti, e.deltaY * posMulti);
    } else {
      // This is a real mouse wheel scale
      const delta = e.deltaY / Math.abs(e.deltaY) * mouseWheelScaleMulti;
      onZoom(canvasRef.current, delta, { x: e.offsetX, y: e.offsetY });
    }
    if (!isDrawing.current) {
      redrawCanvasDebounced();
    }
  };

  const onMouseMove = (e) => {
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
    onPan(canvasRef.current, deltaX * posMulti, deltaY * posMulti);
    if (!isDrawing.current) {
      redrawCanvasDebounced();
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    if (e.button === 0) {
      dragState.current.started = true;
      dragState.current.mouseDownCoords = {
        x: e.offsetX,
        y: e.offsetY
      };
      dragState.current.prevPos = {
        x: e.offsetX,
        y: e.offsetY
      };
      dragState.current.maxDistFromOrigin = 0;
      canvasRef.current.addEventListener('mousemove', onMouseMove);
      dragState.current.removeEventListener = 
        () => canvasRef.current.removeEventListener('mousemove', onMouseMove);
    }
  };

  const onMouseUp = (e) => {
    if (dragState.current.started) {
      dragState.current.removeEventListener();
      if (dragState.current.maxDistFromOrigin < minDragDist) {
        e.preventDefault();
        onLeftClick(e.offsetX, e.offsetY)
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
    resizeHandler(canvasRef);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={100}
      height={100}
      onContextMenu={(e) => e.preventDefault()}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
    </canvas>
  );
};

export default CanvasWrapper;

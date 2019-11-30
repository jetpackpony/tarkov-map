import { h } from 'preact';
import { useEffect, useRef } from 'preact/compat';
import { useCanvasWithResizeHandler } from './hooks';
import './canvas.css';

const resizeHandler = (canvasRef) => {
  const parent = canvasRef.current.parentElement;
  canvasRef.current.width = parent.clientWidth;
  canvasRef.current.height = parent.clientHeight;
};

const CanvasWrapper = ({ redrawCanvas, onWheel, onClick, onPan }) => {
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
  const handleWheel = (e) => {
    onWheel(canvasRef.current, ctxRef.current, e);
    if (!isDrawing.current) {
      redrawCanvasDebounced();
    }
  };

  const onMouseMove = (e) => {
    const distX = dragState.current.mouseDownCoords.x - e.offsetX;
    const distY = dragState.current.mouseDownCoords.y - e.offsetY;
    const dist = distX * distX + distY * distY;
    dragState.current.maxDistFromOrigin = 
      (dist > dragState.current.maxDistFromOrigin)
        ? dist
        : dragState.current.maxDistFromOrigin;

    const deltaX = dragState.current.prevPos.x - e.offsetX;
    const deltaY = dragState.current.prevPos.y - e.offsetY;
    dragState.current.prevPos.x = e.offsetX;
    dragState.current.prevPos.y = e.offsetY;
    onPan(canvasRef.current, deltaX, deltaY);
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
      dragState.current.prevPos = dragState.current.mouseDownCoords;
      dragState.current.maxDistFromOrigin = 0;
      canvasRef.current.addEventListener('mousemove', onMouseMove);
      dragState.current.removeEventListener = 
        () => canvasRef.current.removeEventListener('mousemove', onMouseMove);
    }
  };

  const maxDist = 5 * 5;
  const onMouseUp = (e) => {
    if (dragState.current.started) {
      dragState.current.removeEventListener();
      if (dragState.current.maxDistFromOrigin < maxDist) {
        onClick(canvasRef.current, ctxRef.current, e)
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
      onWheel={handleWheel}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
    </canvas>
  );
};

export default CanvasWrapper;

import { h } from 'preact';
import { useEffect, useRef } from 'preact/compat';
import { useCanvasWithResizeHandler } from './hooks';

const resizeHandler = (canvasRef) => {
  canvasRef.current.width = window.innerWidth;
  canvasRef.current.height = window.innerHeight;
};

const CanvasWrapper = ({ redrawCanvas, onWheel }) => {
  console.log("===> re-rendering");
  const canvasRef = useCanvasWithResizeHandler(resizeHandler);
  const ctxRef = useRef(null);
  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext("2d");
  });
  const isDrawing = useRef(false);

  const redrawCanvasDebounced = () => {
    requestAnimationFrame(() => {
      redrawCanvas(canvasRef.current, ctxRef.current);
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

  // Redraw every time anything changes
  useEffect(() => {
    console.log("General useeffect");
    redrawCanvasDebounced();
  });

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={window.innerWidth}
      height={window.innerHeight}
      onWheel={handleWheel}
    >
    </canvas>
  );
};

export default CanvasWrapper;

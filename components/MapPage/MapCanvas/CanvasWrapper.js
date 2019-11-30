import { h } from 'preact';
import { useEffect, useRef } from 'preact/compat';
import { useCanvasWithResizeHandler } from './hooks';
import './canvas.css';

const resizeHandler = (canvasRef) => {
  const parent = canvasRef.current.parentElement;
  canvasRef.current.width = parent.clientWidth;
  canvasRef.current.height = parent.clientHeight;
};

const CanvasWrapper = ({ redrawCanvas, onWheel, onClick }) => {
  const canvasRef = useCanvasWithResizeHandler(resizeHandler);
  const ctxRef = useRef(null);
  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext("2d");
  });
  const isDrawing = useRef(false);

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

  const handleClick = (e) => {
    onClick(canvasRef.current, ctxRef.current, e)
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
      onMouseUp={handleClick}
    >
    </canvas>
  );
};

export default CanvasWrapper;

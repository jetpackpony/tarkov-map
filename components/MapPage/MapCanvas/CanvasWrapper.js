import { h } from 'preact';
import { useEffect, useRef } from 'preact/compat';
import {
  useCanvasWithResizeHandler,
  useImageLoader
} from './hooks';

const draw = (state) => {
  console.log("Drawing", state);
};

const resizeHandler = (canvasRef) => {
  canvasRef.current.width = window.innerWidth;
  canvasRef.current.height = window.innerHeight;
};

const CanvasWrapper = ({ imgPath, count }) => {
  console.log("===> re-rendering");
  const canvasRef = useCanvasWithResizeHandler(resizeHandler);
  const imgObj = useImageLoader(imgPath);
  const viewportState = useRef({ scale: 1, count });
  const isDrawing = useRef(false);

  const redrawCanvas = () => {
    requestAnimationFrame(() => {
      if (imgObj) {
        const ctx = canvasRef.current.getContext("2d");
        viewportState.current.count = count;
        draw(viewportState.current);
      } else {
        console.log("Trying to draw while image is not ready");
      }
      isDrawing.current = false;
    });
    isDrawing.current = true;
  };

  // change the state of the viewport, then redraw
  const handleWheel = (e) => {
    viewportState.current.scale -= e.deltaY;
    if (!isDrawing.current) {
      redrawCanvas();
    }
  };

  // Redraw every time anything changes
  useEffect(() => {
    console.log("General useeffect");
    redrawCanvas();
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

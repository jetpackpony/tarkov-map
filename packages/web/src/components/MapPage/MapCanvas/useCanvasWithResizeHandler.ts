import { useEffect, useLayoutEffect, useState, useRef } from "preact/compat";
import { getDevicePixelRatio } from "./utils";

type CanvasResizeListener = (canvas: HTMLCanvasElement) => void;

const resizeHandler = (canvas: HTMLCanvasElement) => {
  const parent = canvas.parentElement;
  if (parent) {
    canvas.width = parent.clientWidth * getDevicePixelRatio();
    canvas.height = parent.clientHeight * getDevicePixelRatio();
    canvas.style.width = `${parent.clientWidth}px`;
    canvas.style.height = `${parent.clientHeight}px`;
  }
};

export const useCanvasWithResizeHandler = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({
    w: 100,
    h: 100,
    cssW: "100px",
    cssH: "100px",
  });
  // const listeners = useRef<CanvasResizeListener[]>([resizeHandler]);
  const listeners = useRef<CanvasResizeListener[]>([]);

  const resizeCanvas = () => {
    // listeners.current.forEach((f) => canvasRef.current && f(canvasRef.current));
    if (canvasRef.current) {
      const parent = canvasRef.current.parentElement;
      if (parent) {
        setCanvasSize({
          w: parent.clientWidth * getDevicePixelRatio(),
          h: parent.clientHeight * getDevicePixelRatio(),
          cssW: `${parent.clientWidth}px`,
          cssH: `${parent.clientHeight}px`,
        });
      }
    }
  };
  const addResizeListener = (f: CanvasResizeListener) => {
    if (!listeners.current.includes(f)) {
      listeners.current.push(f);
    }
  };

  // Resize canvas after initial load
  useLayoutEffect(() => {
    resizeCanvas();
  }, [canvasRef.current]);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return {
    canvasRef,
    canvasSize,
    addResizeListener,
  };
};

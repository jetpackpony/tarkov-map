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
  const [, setCanvasSize] = useState({ w: 0, h: 0 });
  const listeners = useRef<CanvasResizeListener[]>([resizeHandler]);

  const resizeCanvas = () => {
    listeners.current.forEach((f) => canvasRef.current && f(canvasRef.current));
    if (canvasRef.current) {
      setCanvasSize({
        w: canvasRef.current.width,
        h: canvasRef.current.height,
      });
    }
  };
  const addResizeListener = (f: CanvasResizeListener) => {
    if (!listeners.current.includes(f)) {
      listeners.current.push(f);
    }
  };

  // Resize canvas after initial load
  useLayoutEffect(() => {
    canvasRef.current && resizeHandler(canvasRef.current);
  }, [canvasRef]);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return {
    canvasRef,
    addResizeListener,
  };
};
